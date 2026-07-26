"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────
interface Product {
  id: string;
  name_en: string;
  name_gu?: string;
  badge_en?: string;
  badge_gu?: string;
  category: string;
  images: string[];
  tagline_en?: string;
  tagline_gu?: string;
  capacity_en?: string;
  capacity_gu?: string;
  warranty_en?: string;
  warranty_gu?: string;
  description_en?: string;
  description_gu?: string;
  features_en?: string[];
  features_gu?: string[];
  specs_en?: Record<string, string>;
  specs_gu?: Record<string, string>;
  meta_title?: string;
  meta_desc?: string;
  wa?: string;
  [key: string]: unknown;
}

const API = "/api";

// ─── Main Admin Component ───────────────────────────────
export default function AdminPage() {
  const [screen, setScreen] = useState<"login" | "dashboard">("login");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToastState] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ msg: "", color: "" });
  const [mobileEditing, setMobileEditing] = useState(false);

  // Form state
  const [formId, setFormId] = useState("");
  const [formCat, setFormCat] = useState("domestic");
  const [formName, setFormName] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formCapacity, setFormCapacity] = useState("");
  const [formWarranty, setFormWarranty] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formMetaTitle, setFormMetaTitle] = useState("");
  const [formMetaDesc, setFormMetaDesc] = useState("");
  const [editImages, setEditImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [specs, setSpecs] = useState<{ key: string; val: string }[]>([]);
  const [uploadMsg, setUploadMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check for existing session
  useEffect(() => {
    const t = sessionStorage.getItem("adm-token");
    const attempts = parseInt(localStorage.getItem("adm-attempts") || "0");
    const lockout = parseInt(localStorage.getItem("adm-lockout-until") || "0");
    setLoginAttempts(attempts);
    setLockoutUntil(lockout);
    if (t) {
      setToken(t);
      setScreen("dashboard");
    }
  }, []);

  // Load products when dashboard opens
  useEffect(() => {
    if (screen === "dashboard" && token) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, token]);

  // ─── Toast ──────────────────────────────────────────
  const toast = useCallback((msg: string, type = "") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToastState(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setShowToastState(false), 3800);
  }, []);

  // ─── Auth ───────────────────────────────────────────
  async function apiFetch(url: string, opts: RequestInit = {}) {
    const headers = new Headers(opts.headers || {});
    if (token) headers.set("Authorization", `Bearer ${token}`);
    opts.headers = headers;
    const r = await fetch(url, opts);
    if (r.status === 401) {
      doLogout();
      throw new Error("Unauthorized");
    }
    return r;
  }

  async function doLogin(pw: string) {
    if (Date.now() < lockoutUntil) {
      const m = Math.ceil((lockoutUntil - Date.now()) / 60000);
      setLoginError(`Too many attempts. Try again in ${m} min.`);
      return;
    }
    if (!pw) {
      setLoginError("Enter password");
      return;
    }
    try {
      const r = await fetch(`${API}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) {
        const { token: t } = await r.json();
        setToken(t);
        sessionStorage.setItem("adm-token", t);
        setLoginAttempts(0);
        localStorage.setItem("adm-attempts", "0");
        localStorage.removeItem("adm-lockout-until");
        setLoginError("");
        setScreen("dashboard");
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem("adm-attempts", String(newAttempts));
        if (newAttempts >= 5) {
          const lockTime = Date.now() + 30 * 60 * 1000;
          setLockoutUntil(lockTime);
          localStorage.setItem("adm-lockout-until", String(lockTime));
          setLoginError("Account locked for 30 minutes.");
        } else {
          setLoginError(`Wrong password. ${5 - newAttempts} attempts left.`);
        }
      }
    } catch {
      setLoginError("Could not reach server. Are you online?");
    }
  }

  function doLogout() {
    sessionStorage.removeItem("adm-token");
    setToken("");
    setScreen("login");
    setProducts([]);
    setEditingId(null);
  }

  // ─── Products CRUD ──────────────────────────────────
  async function loadProducts() {
    try {
      const r = await apiFetch(`${API}/products`);
      const data = await r.json();
      setProducts(data);
    } catch {
      toast("Failed to load products", "err");
    }
  }

  function populateForm(p: Product) {
    setFormId(p.id);
    setFormCat(p.category || "domestic");
    setFormName(p.name_en || "");
    setFormBadge(p.badge_en || "");
    setFormTagline(p.tagline_en || "");
    setFormCapacity(p.capacity_en || "");
    setFormWarranty(p.warranty_en || "");
    setFormDesc(p.description_en || "");
    setFormMetaTitle(p.meta_title || "");
    setFormMetaDesc(p.meta_desc || "");
    setEditImages([...(p.images || [])]);
    setFeatures([...(p.features_en || [])]);
    setSpecs(
      Object.entries(p.specs_en || {}).map(([key, val]) => ({ key, val }))
    );
    setActiveTab("basic");
    setDirty(false);
  }

  function editProduct(id: string) {
    if (dirty && !confirm("You have unsaved changes. Discard them?")) return;
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setEditingId(id);
    populateForm(p);
    setMobileEditing(true);
  }

  function newProduct() {
    if (dirty && !confirm("You have unsaved changes. Discard them?")) return;
    setEditingId("__new__");
    setFormId("");
    setFormCat("domestic");
    setFormName("");
    setFormBadge("");
    setFormTagline("");
    setFormCapacity("");
    setFormWarranty("");
    setFormDesc("");
    setFormMetaTitle("");
    setFormMetaDesc("");
    setEditImages([]);
    setFeatures([]);
    setSpecs([]);
    setActiveTab("basic");
    setDirty(false);
    setMobileEditing(true);
  }

  function exitEditor() {
    if (dirty && !confirm("You have unsaved changes. Discard them?")) return;
    setEditingId(null);
    setDirty(false);
    setMobileEditing(false);
  }

  async function saveProduct() {
    if (!formId) {
      toast("Product ID is required", "err");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(formId)) {
      toast("ID: lowercase, numbers, hyphens only", "err");
      return;
    }

    const specsObj: Record<string, string> = {};
    specs.forEach(({ key, val }) => {
      if (key) specsObj[key] = val;
    });

    const body = {
      id: formId,
      name_en: formName,
      name_gu: "",
      badge_en: formBadge,
      badge_gu: "",
      category: formCat,
      images: editImages,
      tagline_en: formTagline,
      tagline_gu: "",
      capacity_en: formCapacity,
      capacity_gu: "",
      warranty_en: formWarranty,
      warranty_gu: "",
      description_en: formDesc,
      description_gu: "",
      features_en: features,
      features_gu: [],
      specs_en: specsObj,
      specs_gu: {},
      meta_title: formMetaTitle,
      meta_desc: formMetaDesc,
    };

    setSaveStatus({ msg: "Saving...", color: "hsl(35,90%,42%)" });
    const isNew = editingId === "__new__";

    try {
      const r = await apiFetch(
        isNew ? `${API}/products` : `${API}/products/${editingId}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!r.ok) {
        const e = await r.json();
        throw new Error(e.error || r.statusText);
      }
      if (isNew) setEditingId(formId);
      await loadProducts();
      setDirty(false);
      setSaveStatus({ msg: "✅ Saved!", color: "hsl(142,65%,38%)" });
      toast("Product saved! Changes are live instantly.", "ok");
      setTimeout(() => setSaveStatus({ msg: "", color: "" }), 4000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setSaveStatus({ msg: "❌ " + msg, color: "hsl(0,75%,48%)" });
      toast("Save failed: " + msg, "err");
    }
  }

  async function deleteProduct(id: string) {
    const p = products.find((x) => x.id === id);
    if (!confirm(`Delete "${p?.name_en}"? This cannot be undone.`)) return;
    try {
      const r = await apiFetch(`${API}/products/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error((await r.json()).error);
      if (editingId === id) {
        setEditingId(null);
        setMobileEditing(false);
      }
      await loadProducts();
      toast("Product deleted.", "ok");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      toast("Delete failed: " + msg, "err");
    }
  }

  // ─── Image Upload ───────────────────────────────────
  async function uploadFiles(files: File[]) {
    if (!files.length) return;
    setIsUploading(true);
    for (const file of files) {
      setUploadMsg(`Uploading ${file.name}...`);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const r = await apiFetch(`${API}/upload`, { method: "POST", body: fd });
        if (!r.ok) {
          const e = await r.json();
          throw new Error(e.error);
        }
        const { url } = await r.json();
        setEditImages((prev) => [...prev, url]);
        setDirty(true);
        toast(`${file.name} uploaded ✓`, "ok");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        toast("Upload failed: " + msg, "err");
      }
    }
    setIsUploading(false);
    setUploadMsg("");
  }

  // ─── LOGIN SCREEN ───────────────────────────────────
  if (screen === "login") {
    return <LoginScreen error={loginError} onLogin={doLogin} />;
  }

  // ─── DASHBOARD ──────────────────────────────────────
  return (
    <div className="adm-dashboard">
      <style>{adminStyles}</style>

      {/* Topbar */}
      <div className="adm-topbar">
        <div className="adm-brand">
          <img src="/assets/logo_horizontal_transparent.png" alt="Logo" width="160" height="36" style={{ height: "32px", width: "auto", objectFit: "contain" }} />
          <span>
            Product Manager
          </span>
        </div>
        {dirty && (
          <span style={{ fontSize: ".78rem", fontWeight: 600, color: "hsl(35,90%,42%)" }}>
            ● Unsaved changes
          </span>
        )}
        <a href="/" target="_blank" className="adm-sb adm-sb-o" style={{ fontSize: ".78rem", padding: "7px 14px" }}>
          View Website ↗
        </a>
        <button className="adm-sb adm-sb-o" onClick={doLogout} style={{ fontSize: ".78rem", padding: "7px 14px" }}>
          Logout
        </button>
      </div>

      {/* Body */}
      <div className={`adm-body ${mobileEditing ? "editing" : ""}`}>
        {/* Sidebar */}
        <div className="adm-sidebar">
          <div className="sidebar-head">
            <h3>Products ({products.length})</h3>
            <button className="adm-sb adm-sb-p" onClick={newProduct} style={{ fontSize: ".74rem", padding: "6px 12px" }}>
              + New
            </button>
          </div>
          <div className="sidebar-list">
            {products.map((p) => (
              <div
                key={p.id}
                className={`ap-item ${editingId === p.id ? "active" : ""}`}
                onClick={() => editProduct(p.id)}
              >
                <img
                  className="ap-thumb"
                  src={p.images?.[0] || "/assets/product_domestic.webp"}
                  alt={p.name_en}
                  width="40"
                  height="40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/product_domestic.webp";
                  }}
                />
                <div className="ap-meta">
                  <h4>{p.name_en}</h4>
                  <p>
                    {p.category} · {p.images?.length || 1} img
                  </p>
                </div>
                <button
                  className="ap-del"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(p.id);
                  }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="adm-editor">
          {!editingId ? (
            <div className="editor-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".25">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              <p>Select a product to edit</p>
              <small>
                or click <strong>+ New</strong> to add one
              </small>
            </div>
          ) : (
            <div className="editor-panel">
              <button className="mobile-back-btn" onClick={exitEditor}>
                ← Back to Product List
              </button>
              <div className="editor-main-split">
                <div className="editor-form">
                  <div className="e-card">
                    {/* Tabs */}
                    <div className="e-tabs">
                      {["basic", "images", "specs", "seo"].map((tab) => (
                        <button
                          key={tab}
                          className={`etab ${activeTab === tab ? "active" : ""}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab === "basic" && "📝 Basic Info"}
                          {tab === "images" && "🖼 Images"}
                          {tab === "specs" && "⚙ Features & Specs"}
                          {tab === "seo" && "🔍 SEO"}
                        </button>
                      ))}
                    </div>

                    {/* Basic Tab */}
                    {activeTab === "basic" && (
                      <div className="tab-pane active">
                        <div className="frow">
                          <div className="ff">
                            <label className="fl">Product ID <em>(URL slug)</em></label>
                            <input
                              className="fi"
                              value={formId}
                              onChange={(e) => { setFormId(e.target.value); setDirty(true); }}
                              disabled={editingId !== "__new__"}
                              placeholder="aqua-era"
                            />
                          </div>
                          <div className="ff">
                            <label className="fl">Category</label>
                            <select className="fi" value={formCat} onChange={(e) => { setFormCat(e.target.value); setDirty(true); }}>
                              <option value="domestic">Domestic RO</option>
                              <option value="commercial">Commercial RO</option>
                              <option value="spares">Filters & Spares</option>
                            </select>
                          </div>
                        </div>
                        <div className="frow">
                          <div className="ff">
                            <label className="fl">Name</label>
                            <input className="fi" value={formName} onChange={(e) => { setFormName(e.target.value); setDirty(true); }} placeholder="Aqua Era Cabinet" />
                          </div>
                          <div className="ff">
                            <label className="fl">Badge <em>(optional)</em></label>
                            <input className="fi" value={formBadge} onChange={(e) => { setFormBadge(e.target.value); setDirty(true); }} placeholder="Best Seller" />
                          </div>
                        </div>
                        <div className="frow">
                          <div className="ff">
                            <label className="fl">Tagline</label>
                            <input className="fi" value={formTagline} onChange={(e) => { setFormTagline(e.target.value); setDirty(true); }} placeholder="Pure. Premium. Powerful." />
                          </div>
                        </div>
                        <div className="frow">
                          <div className="ff">
                            <label className="fl">Capacity</label>
                            <input className="fi" value={formCapacity} onChange={(e) => { setFormCapacity(e.target.value); setDirty(true); }} placeholder="9 Ltrs Storage Tank" />
                          </div>
                          <div className="ff">
                            <label className="fl">Warranty</label>
                            <input className="fi" value={formWarranty} onChange={(e) => { setFormWarranty(e.target.value); setDirty(true); }} placeholder="1 Year Warranty" />
                          </div>
                        </div>
                        <div className="frow one">
                          <div className="ff">
                            <label className="fl">Description</label>
                            <textarea className="fi" value={formDesc} onChange={(e) => { setFormDesc(e.target.value); setDirty(true); }} placeholder="Describe this product..." />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Images Tab */}
                    {activeTab === "images" && (
                      <div className="tab-pane active">
                        <p style={{ fontSize: ".83rem", color: "var(--text-light-3, #888)", margin: "0 0 14px" }}>
                          <strong>First image = main photo</strong> on listing card.
                        </p>
                        <div
                          className="drop-zone"
                          onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("over"); }}
                          onDragLeave={(e) => e.currentTarget.classList.remove("over")}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove("over");
                            const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
                            uploadFiles(files);
                          }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              uploadFiles(files);
                              e.target.value = "";
                            }}
                          />
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".4">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <p>Drag & drop images here, or click to browse</p>
                          <small>PNG, JPG, WebP — uploaded to Cloudflare R2</small>
                        </div>
                        {isUploading && (
                          <div className="upload-prog show">
                            <div className="spin" />
                            <span>{uploadMsg}</span>
                          </div>
                        )}
                        <div className="img-grid">
                          {editImages.map((url, i) => (
                            <div key={`${url}-${i}`} className={`img-cell ${i === 0 ? "primary" : ""}`}>
                              {i === 0 && <span className="img-primary-lbl">Main</span>}
                              <img src={url} alt={`Product ${i + 1}`} width="120" height="120" onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }} />
                              <div className="img-cell-ov">
                                {i > 0 && (
                                  <button className="icb" onClick={() => {
                                    const imgs = [...editImages];
                                    const [item] = imgs.splice(i, 1);
                                    imgs.unshift(item);
                                    setEditImages(imgs);
                                    setDirty(true);
                                  }}>Set as Main</button>
                                )}
                                <button className="icb red" onClick={() => {
                                  setEditImages((prev) => prev.filter((_, idx) => idx !== i));
                                  setDirty(true);
                                }}>Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <ManualUrlAdder onAdd={(url) => { setEditImages((prev) => [...prev, url]); setDirty(true); }} />
                      </div>
                    )}

                    {/* Specs Tab */}
                    {activeTab === "specs" && (
                      <div className="tab-pane active">
                        <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".86rem", margin: "0 0 10px" }}>Key Features</h4>
                        {features.map((f, i) => (
                          <div key={i} className="dyn-row feat">
                            <input className="fi" value={f} onChange={(e) => {
                              const arr = [...features]; arr[i] = e.target.value;
                              setFeatures(arr); setDirty(true);
                            }} placeholder="Feature" />
                            <button className="del-btn" onClick={() => {
                              setFeatures((prev) => prev.filter((_, idx) => idx !== i)); setDirty(true);
                            }}>✕</button>
                          </div>
                        ))}
                        <button className="add-row-btn" onClick={() => setFeatures((prev) => [...prev, ""])}>
                          + Add Feature
                        </button>

                        <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".86rem", margin: "22px 0 10px" }}>Technical Specifications</h4>
                        {specs.map((s, i) => (
                          <div key={i} className="dyn-row spec">
                            <input className="fi sk" value={s.key} onChange={(e) => {
                              const arr = [...specs]; arr[i] = { ...arr[i], key: e.target.value };
                              setSpecs(arr); setDirty(true);
                            }} placeholder="Storage Capacity" />
                            <input className="fi sv" value={s.val} onChange={(e) => {
                              const arr = [...specs]; arr[i] = { ...arr[i], val: e.target.value };
                              setSpecs(arr); setDirty(true);
                            }} placeholder="9 Litres" />
                            <button className="del-btn" onClick={() => {
                              setSpecs((prev) => prev.filter((_, idx) => idx !== i)); setDirty(true);
                            }}>✕</button>
                          </div>
                        ))}
                        <button className="add-row-btn" onClick={() => setSpecs((prev) => [...prev, { key: "", val: "" }])}>
                          + Add Spec Row
                        </button>
                      </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === "seo" && (
                      <div className="tab-pane active">
                        <p style={{ fontSize: ".82rem", color: "var(--text-light-3, #888)", margin: "0 0 18px" }}>
                          These appear in Google search results. Leave blank to auto-generate.
                        </p>
                        <div className="frow one">
                          <div className="ff">
                            <label className="fl">Page Title <em>(~60 chars)</em></label>
                            <input className="fi" value={formMetaTitle} onChange={(e) => { setFormMetaTitle(e.target.value); setDirty(true); }} placeholder="Aqua Era - Shivam Water Solution Morbi" />
                          </div>
                        </div>
                        <div className="frow one">
                          <div className="ff">
                            <label className="fl">Meta Description <em>(~155 chars)</em></label>
                            <textarea className="fi" value={formMetaDesc} onChange={(e) => { setFormMetaDesc(e.target.value); setDirty(true); }} placeholder="Buy Aqua Era RO purifier in Morbi..." style={{ minHeight: "72px" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Preview & WhatsApp Link Preview Simulator */}
                <div className="preview-wrap">
                  <h4>Live Website Card</h4>
                  <div className="product-card glass-card" style={{ width: "100%", margin: "0 auto", minWidth: "250px" }}>
                    {formBadge && <div className="product-badge">{formBadge}</div>}
                    <div className="product-img-wrap">
                      <img src={editImages[0] || "/assets/product_domestic.webp"} alt="Preview" width="400" height="400" onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }} />
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{formName || "Product Name"}</h3>
                      <p className="product-desc">{formTagline || "Tagline"}</p>
                      <div className="product-card-specs">
                        <div className="spec-pill">
                          <span>{formCapacity || "Tank"}</span>
                        </div>
                        <div className="spec-pill">
                          <span>{formWarranty || "Warranty"}</span>
                        </div>
                      </div>
                      <div className="card-action-row" style={{ marginTop: "auto" }}>
                        <span className="btn btn-outline btn-sm" style={{ width: "100%", textAlign: "center", justifyContent: "center", pointerEvents: "none" }}>
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp OG Link Preview Simulator */}
                  <h4 style={{ marginTop: "24px" }}>WhatsApp Chat Preview</h4>
                  <div className="wa-preview-card" style={{ background: "#efeae2", padding: "12px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)" }}>
                    <div style={{ background: "#dcf8c6", padding: "10px 12px", borderRadius: "8px 8px 0 8px", maxWidth: "280px", marginLeft: "auto", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", fontSize: "0.82rem" }}>
                      <div style={{ color: "#111b21", marginBottom: "6px" }}>
                        Hello Dilipbhai, I want to inquire about *{formName || "this model"}*.
                      </div>
                      {/* Rich OG Card inside WhatsApp */}
                      <div style={{ background: "#ffffff", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", marginTop: "4px" }}>
                        <img 
                          src={editImages[0] || "/assets/product_domestic.webp"} 
                          alt="OG Preview" 
                          style={{ width: "100%", height: "140px", objectFit: "contain", background: "#f8fafc", padding: "6px" }}
                          onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }} 
                        />
                        <div style={{ padding: "8px 10px" }}>
                          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#111b21", lineHeight: 1.2 }}>
                            {formName || "Product Title"} RO Water Purifier
                          </div>
                          <div style={{ fontSize: "0.74rem", color: "#667781", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {formCapacity || "10L"} • {formWarranty || "1 Year"} • Free Delivery & Installation
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#00a884", marginTop: "4px", fontWeight: 600 }}>
                            shivamwatersolution.in
                          </div>
                        </div>
                      </div>
                    </div>
                    {formId && (
                      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(`Hi, check out the ${formName} RO Water Purifier from Shivam Water Solution: https://shivamwatersolution.in/products/${formId}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="adm-sb adm-sb-p"
                          style={{ flex: 1, textDecoration: "none", textAlign: "center", fontSize: "0.75rem", padding: "6px 8px", background: "#25d366", borderColor: "#25d366" }}
                        >
                          📲 Send on WhatsApp
                        </a>
                        <button
                          type="button"
                          className="adm-sb adm-sb-o"
                          style={{ fontSize: "0.75rem", padding: "6px 8px" }}
                          onClick={() => {
                            navigator.clipboard.writeText(`https://shivamwatersolution.in/products/${formId}`);
                            toast("Product link copied!", "ok");
                          }}
                        >
                          📋 Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Bar */}
              <div className="save-bar">
                <button className="adm-sb adm-sb-p" onClick={saveProduct}>✓ Save Product</button>
                <button className="adm-sb adm-sb-d" onClick={exitEditor}>Discard</button>
                {saveStatus.msg && (
                  <span className="sb-status" style={{ marginLeft: "auto", fontSize: ".78rem", fontWeight: 600, color: saveStatus.color }}>
                    {saveStatus.msg}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <div className={`adm-toast ${toastType} ${showToast ? "show" : ""}`}>{toastMsg}</div>
    </div>
  );
}

// ─── Login Screen Component ─────────────────────────────
function LoginScreen({ error, onLogin }: { error: string; onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");

  return (
    <>
      <style>{loginStyles}</style>
      <div className="al-wrap">
        <div className="al-card">
          <img src="/assets/logo.webp" alt="Shivam Water Solution Logo" width="64" height="64" />
          <h1>Product Admin</h1>
          <p>Shivam Water Solution — Morbi</p>
          {error && <div className="al-err">{error}</div>}
          <input
            type="password"
            className="al-inp"
            placeholder="••••••••••"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { onLogin(pw); setPw(""); } }}
            autoComplete="current-password"
          />
          <button className="al-btn" onClick={() => { onLogin(pw); setPw(""); }}>
            Login →
          </button>
          <div style={{ marginTop: "18px" }}>
            <span className="sec-badge">🔒 Server-side Auth</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Manual URL Adder ───────────────────────────────────
function ManualUrlAdder({ onAdd }: { onAdd: (url: string) => void }) {
  const [url, setUrl] = useState("");
  return (
    <details>
      <summary style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--text-light-3, #888)", cursor: "pointer", marginBottom: "8px" }}>
        Or enter URL manually
      </summary>
      <div className="url-manual">
        <input className="fi" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="assets/photo.png or https://..." />
        <button onClick={() => { if (url.trim()) { onAdd(url.trim()); setUrl(""); } }}>Add</button>
      </div>
    </details>
  );
}

// ─── Styles ─────────────────────────────────────────────
const loginStyles = `
  .al-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,hsl(220,60%,97%),hsl(200,50%,94%))}
  .al-card{background:#fff;border-radius:20px;padding:48px 40px;width:100%;max-width:400px;box-shadow:0 24px 64px rgba(8,25,60,.1);border:1px solid rgba(0,150,255,.08);text-align:center}
  .al-card img{height:60px;margin-bottom:20px}
  .al-card h1{font-family:var(--font-display);font-size:1.7rem;color:var(--text-light-1);margin:0 0 6px}
  .al-card p{font-size:.88rem;color:var(--text-light-3);margin:0 0 28px}
  .al-err{background:rgba(220,0,0,.06);border:1px solid rgba(220,0,0,.15);border-radius:10px;padding:10px 14px;font-size:.84rem;color:hsl(0,80%,48%);margin-bottom:14px}
  .al-inp{width:100%;padding:13px 20px;border:1.5px solid rgba(0,150,255,.15);border-radius:30px;font-size:1rem;font-family:var(--font-body);color:var(--text-light-1);background:hsl(220,30%,99%);outline:none;transition:all .3s;margin-bottom:14px;display:block;letter-spacing:3px;text-align:center}
  .al-inp:focus{border-color:var(--color-primary);box-shadow:0 0 0 4px rgba(0,120,255,.08)}
  .al-btn{width:100%;padding:14px 28px;background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-accent) 100%);color:#fff;border:none;border-radius:30px;font-size:1rem;font-weight:700;font-family:var(--font-display);cursor:pointer;transition:all .3s;box-shadow:0 4px 12px rgba(0,90,255,.18)}
  .al-btn:hover{background:linear-gradient(135deg,var(--color-accent) 0%,var(--color-primary) 100%);transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,90,255,.28)}
  .sec-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);color:hsl(142,60%,35%);font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:20px}
`;

const adminStyles = `
  .adm-dashboard{display:flex;flex-direction:column;min-height:100vh;background:hsl(220,25%,96%);font-family:var(--font-body)}
  .adm-topbar{background:#fff;border-bottom:1px solid rgba(0,150,255,.1);height:60px;display:flex;align-items:center;padding:0 20px;gap:14px;position:sticky;top:0;z-index:200;box-shadow:0 2px 12px rgba(8,25,60,.04)}
  .adm-brand{display:flex;align-items:center;gap:10px;flex:1}
  .adm-brand img{height:32px}
  .adm-brand span{font-family:var(--font-display);font-weight:700;font-size:1rem;color:var(--text-light-1)}
  .adm-brand small{font-size:.72rem;color:var(--text-light-3);font-weight:400;margin-left:8px}
  .adm-body{display:flex;flex:1;height:calc(100vh - 60px);overflow:hidden}
  .adm-sidebar{width:280px;min-width:240px;background:#fff;border-right:1px solid rgba(0,150,255,.08);display:flex;flex-direction:column;overflow:hidden}
  .sidebar-head{padding:14px 16px;border-bottom:1px solid rgba(0,150,255,.08);display:flex;align-items:center;justify-content:space-between}
  .sidebar-head h3{font-family:var(--font-display);font-size:.88rem;font-weight:700;color:var(--text-light-1);margin:0}
  .sidebar-list{flex:1;overflow-y:auto;padding:8px}
  .ap-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:11px;cursor:pointer;transition:all .2s;border:2px solid transparent;margin-bottom:3px}
  .ap-item:hover{background:hsl(220,30%,97%)}
  .ap-item.active{background:rgba(0,120,255,.06);border-color:rgba(0,120,255,.15);box-shadow:0 4px 12px rgba(8,25,60,0.03)}
  .ap-thumb{width:42px;height:42px;border-radius:8px;object-fit:contain;background:#fff;border:1px solid rgba(0,150,255,.08);padding:4px;flex-shrink:0}
  .ap-meta{flex:1;min-width:0}
  .ap-meta h4{font-size:.82rem;font-weight:600;color:var(--text-light-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0 0 2px}
  .ap-meta p{font-size:.68rem;color:var(--text-light-3);margin:0}
  .ap-del{opacity:0;background:none;border:none;cursor:pointer;color:hsl(0,70%,55%);font-size:.9rem;padding:4px 6px;border-radius:6px;transition:opacity .15s}
  .ap-item:hover .ap-del{opacity:1}
  .adm-editor{flex:1;overflow-y:auto;background:hsl(220,25%,96%);padding:24px;display:flex;flex-direction:column;gap:20px}
  .editor-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;color:var(--text-light-3);gap:12px;min-height:60vh}
  .editor-empty p{font-size:1rem;font-weight:600;margin:0}
  .editor-empty small{font-size:.82rem}
  .editor-panel{display:flex;flex-direction:column;gap:20px}
  .e-card{background:#fff;border-radius:16px;border:1px solid rgba(0,150,255,.08);box-shadow:0 4px 24px rgba(8,25,60,.04);overflow:hidden}
  .e-tabs{display:flex;gap:6px;padding:6px;background:hsl(220,25%,95%);border-radius:12px;margin:16px 16px 0 16px}
  .etab{flex:1;text-align:center;padding:10px 16px;font-size:.82rem;font-weight:600;color:var(--text-light-2);cursor:pointer;border:none;background:none;border-radius:8px;transition:all .2s;font-family:var(--font-body)}
  .etab:hover{background:rgba(0,150,255,.04);color:var(--color-primary)}
  .etab.active{background:#fff;color:var(--color-primary);box-shadow:0 4px 12px rgba(8,25,60,.05)}
  .tab-pane{padding:22px}
  .frow{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}
  .frow.one{grid-template-columns:1fr}
  .ff{display:flex;flex-direction:column;gap:6px}
  .fl{font-size:.73rem;font-weight:700;color:var(--text-light-2);text-transform:uppercase;letter-spacing:.5px}
  .fl em{font-style:normal;font-weight:400;text-transform:none;font-size:.69rem;color:var(--text-light-3);letter-spacing:0;margin-left:4px}
  .fi{padding:11px 14px;border:1.5px solid rgba(0,150,255,.12);border-radius:10px;font-size:.88rem;font-family:var(--font-body);color:var(--text-light-1);background:#fff;outline:none;transition:border-color .2s,box-shadow .2s;width:100%}
  .fi:focus{border-color:var(--color-primary);box-shadow:0 0 0 4px rgba(0,120,255,.08)}
  textarea.fi{resize:vertical;min-height:90px;line-height:1.55}
  select.fi{appearance:none;cursor:pointer}
  .drop-zone{border:2px dashed rgba(0,120,255,.2);border-radius:14px;padding:36px 20px;text-align:center;cursor:pointer;transition:all .25s;background:linear-gradient(135deg,rgba(0,150,255,.01),rgba(0,120,255,.03));margin-bottom:16px}
  .drop-zone:hover,.drop-zone.over{border-color:var(--color-primary);background:linear-gradient(135deg,rgba(0,150,255,.03),rgba(0,120,255,.07))}
  .drop-zone p{font-size:.88rem;font-weight:600;color:var(--text-light-2);margin:8px 0 4px}
  .drop-zone small{font-size:.75rem;color:var(--text-light-3)}
  .upload-prog{background:rgba(0,150,255,.06);border-radius:10px;padding:11px 15px;font-size:.8rem;font-weight:600;color:var(--color-primary);margin-bottom:12px;display:flex;align-items:center;gap:10px}
  .spin{width:15px;height:15px;border:2px solid rgba(0,150,255,.2);border-top-color:var(--color-primary);border-radius:50%;animation:spin .8s linear infinite;flex-shrink:0}
  .img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px;margin-bottom:16px}
  .img-cell{position:relative;aspect-ratio:1;border-radius:12px;overflow:hidden;border:2px solid rgba(0,120,255,.08);background:#fff;box-shadow:0 4px 12px rgba(8,25,60,.02);transition:all .25s}
  .img-cell:hover{transform:translateY(-2px);border-color:rgba(0,120,255,.2)}
  .img-cell.primary{border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(0,120,255,.15)}
  .img-cell img{width:100%;height:100%;object-fit:contain;padding:8px}
  .img-cell-ov{position:absolute;inset:0;background:rgba(8,25,60,.65);backdrop-filter:blur(2px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;transition:opacity .2s}
  .img-cell:hover .img-cell-ov{opacity:1}
  .icb{background:#fff;border:none;border-radius:20px;padding:5px 12px;font-size:.68rem;font-weight:700;cursor:pointer;width:84%;color:var(--text-light-1);font-family:var(--font-body)}
  .icb.red{color:#ef4444}
  .img-primary-lbl{position:absolute;top:6px;left:6px;background:var(--color-primary);color:#fff;font-size:.55rem;font-weight:800;padding:3px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:.5px;z-index:2}
  .url-manual{display:flex;gap:8px;align-items:center;margin-top:8px}
  .url-manual .fi{flex:1}
  .url-manual button{padding:10px 13px;background:rgba(0,120,255,.08);border:1.5px solid rgba(0,120,255,.15);border-radius:10px;font-size:.78rem;font-weight:600;color:var(--color-primary);cursor:pointer;white-space:nowrap;font-family:var(--font-body)}
  .dyn-row{display:grid;gap:8px;align-items:center;margin-bottom:8px}
  .dyn-row.feat{grid-template-columns:1fr auto}
  .dyn-row.spec{grid-template-columns:1fr 1fr auto}
  .del-btn{background:rgba(220,38,38,.04);border:1.5px solid rgba(220,38,38,.15);border-radius:50%;color:#dc2626;cursor:pointer;width:32px;height:32px;font-size:.85rem;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
  .del-btn:hover{background:#dc2626;border-color:#dc2626;color:#fff}
  .add-row-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:rgba(0,120,255,.05);border:1.5px dashed rgba(0,120,255,.2);border-radius:30px;font-size:.78rem;font-weight:700;color:var(--color-primary);cursor:pointer;transition:all .2s;margin-top:6px;font-family:var(--font-body)}
  .add-row-btn:hover{background:var(--color-primary);border-color:var(--color-primary);color:#fff;border-style:solid}
  .editor-main-split{display:flex;gap:30px;align-items:flex-start}
  .editor-form{flex:1;min-width:0}
  .preview-wrap{width:280px;flex-shrink:0;position:sticky;top:20px;align-self:flex-start}
  .preview-wrap h4{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.75px;color:var(--text-light-3);margin:0 0 12px;display:flex;align-items:center;gap:6px}
  .preview-wrap h4::before{content:'';display:inline-block;width:6px;height:6px;background:var(--color-success,#22c55e);border-radius:50%;animation:pulse 1.5s infinite}
  .save-bar{background:rgba(255,255,255,.85);backdrop-filter:blur(12px);border-top:1px solid rgba(0,150,255,.08);padding:16px 24px;display:flex;align-items:center;gap:12px;position:sticky;bottom:0;z-index:50;box-shadow:0 -8px 32px rgba(8,25,60,.05);border-radius:0 0 16px 16px;flex-shrink:0}
  .adm-sb{padding:10px 24px;border-radius:30px;font-size:.85rem;font-weight:700;font-family:var(--font-body);cursor:pointer;border:none;transition:all .3s;display:inline-flex;align-items:center;gap:7px;text-decoration:none}
  .adm-sb-p{background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-secondary,#3b82f6) 100%);color:#fff;box-shadow:0 3px 8px rgba(0,90,255,.15)}
  .adm-sb-p:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(0,90,255,.25)}
  .adm-sb-o{background:transparent;color:var(--color-primary);border:2px solid var(--color-primary)}
  .adm-sb-o:hover{background:var(--color-primary);color:#fff}
  .adm-sb-d{background:transparent;color:var(--color-danger,#dc2626);border:2px solid var(--color-danger,#dc2626)}
  .adm-sb-d:hover{background:var(--color-danger,#dc2626);color:#fff}
  .adm-toast{position:fixed;bottom:80px;left:50%;z-index:9999;transform:translateX(-50%) translateY(30px);opacity:0;background:hsl(222,30%,18%);color:#fff;padding:11px 22px;border-radius:50px;font-size:.84rem;font-weight:600;display:flex;align-items:center;gap:8px;transition:transform .3s cubic-bezier(.175,.885,.32,1.275),opacity .3s;pointer-events:none;white-space:nowrap}
  .adm-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
  .adm-toast.ok{background:hsl(142,65%,38%)}
  .adm-toast.err{background:hsl(0,75%,48%)}
  .mobile-back-btn{display:none}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes pulse{0%{opacity:.3}50%{opacity:1}100%{opacity:.3}}
  @media(max-width:1150px){.editor-main-split{flex-direction:column;align-items:stretch;gap:24px}.preview-wrap{width:100%;max-width:280px;margin:0 auto;position:static;order:2}}
  @media(max-width:768px){
    .adm-body{display:flex;flex-direction:row;height:calc(100vh - 60px);position:relative;overflow:hidden}
    .adm-sidebar{width:100%;min-width:unset;height:100%;border-right:none;transition:transform .3s cubic-bezier(.4,0,.2,1);flex-shrink:0}
    .adm-editor{position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);padding:16px;flex-shrink:0;box-sizing:border-box}
    .editor-empty{display:none!important}
    .adm-body.editing .adm-sidebar{transform:translateX(-100%)}
    .adm-body.editing .adm-editor{transform:translateX(0)}
    .mobile-back-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:rgba(0,120,255,.06);border:1.5px solid rgba(0,120,255,.15);color:var(--color-primary);font-weight:700;font-family:var(--font-display);font-size:.85rem;border-radius:30px;cursor:pointer;margin-bottom:14px;width:fit-content}
    .frow{grid-template-columns:1fr;gap:12px;margin-bottom:12px}
    .save-bar{padding:12px 16px;gap:8px}
    .save-bar .adm-sb{flex:1;justify-content:center;padding:10px 12px;font-size:.8rem}
    .save-bar .sb-status{display:none}
  }
  @media(max-width:600px){.adm-brand span{display:none}.dyn-row.feat,.dyn-row.spec{grid-template-columns:1fr!important;gap:6px}}
`;
