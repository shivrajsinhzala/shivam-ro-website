"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
  LogOut,
  ExternalLink,
  Save,
  Image as ImageIcon,
  FileText,
  Sliders,
  Globe,
  ChevronLeft,
  Sparkles,
  RefreshCw,
  X,
  Layers,
  Wand2,
  CheckCircle2,
  HelpCircle,
  GripVertical,
  Share2,
  ArrowUpDown,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

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
  sort_order?: number;
  is_active?: number | boolean;
  [key: string]: unknown;
}

const API = "/api";

// ─── Standard Specification Presets ─────────────────────
const PRESETS = {
  domestic: {
    features: [
      "Multi-stage RO + UV + TDS Controller + Active Copper Filtration",
      "Food-Grade High-Capacity Storage Tank (10-12L)",
      "Smart LED Status Indicators & Auto Shut-Off",
      "1 Year Comprehensive Warranty on Electrical Components",
      "Free Doorstep Delivery & Professional Installation in Morbi & Rajkot",
    ],
    specs: [
      { key: "Purification Technology", val: "RO + UV + Alkaline + TDS Controller" },
      { key: "Storage Capacity", val: "10 - 12 Litres" },
      { key: "Purification Capacity", val: "Up to 15-20 Litres/Hour" },
      { key: "Body Material", val: "Food-Grade ABS Engineered Cabinet" },
      { key: "Installation Type", val: "Wall Mounted / Table Top" },
      { key: "Suitable Water TDS", val: "Up to 2000 ppm" },
      { key: "Warranty", val: "1 Year Comprehensive Warranty" },
    ],
  },
  commercial: {
    features: [
      "High-Flow Industrial RO Membrane (25 - 500 LPH)",
      "Heavy-Duty Stainless Steel SS304 Skid & Frame",
      "High-Pressure Booster Pump with Dry-Run Protection",
      "Dual Pressure Gauges & Online Flow Meter",
      "On-site Installation, Pipeline Commissioning & AMC Support",
    ],
    specs: [
      { key: "Plant Capacity", val: "50 - 250 LPH (Litres Per Hour)" },
      { key: "Membrane Type", val: "High Rejection TFC Industrial Membrane" },
      { key: "Pump Specification", val: "Heavy Duty High-Pressure Booster Pump" },
      { key: "Structure Frame", val: "Stainless Steel SS-304 Sturdy Skid" },
      { key: "Filtration Stages", val: "Sand Filter + Carbon Filter + Micron + RO" },
      { key: "Applications", val: "Ceramic Factories, Schools, Hospitals, Offices" },
      { key: "Warranty & Service", val: "1 Year Warranty + Rapid AMC Service" },
    ],
  },
  spares: {
    features: [
      "100% Genuine Certified Replacement Part",
      "Compatible with All Leading Domestic & Commercial RO Models",
      "High Chemical Resistance & Long Filter Lifespan",
      "Same-Day Doorstep Replacement Service across Morbi",
    ],
    specs: [
      { key: "Part Type", val: "RO Filter Cartridge / Membrane / Pump" },
      { key: "Material Grade", val: "Certified Food Grade Virgin Polypropylene" },
      { key: "Lifespan", val: "6 to 12 Months (Based on water quality)" },
      { key: "Compatibility", val: "Universal Fit for Domestic ROs" },
    ],
  },
};

// ─── Main Admin Component ───────────────────────────────
export default function AdminPage() {
  const [screen, setScreen] = useState<"login" | "dashboard">("login");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(0);
  
  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "images" | "specs" | "seo">("basic");
  
  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'active' | 'hidden'
  const [sortBy, setSortBy] = useState<"order" | "name" | "category">("order");
  
  // Feedback state
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"ok" | "err" | "">("");
  const [showToast, setShowToastState] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ msg: "", color: "" });
  const [isReordering, setIsReordering] = useState(false);

  // Form state
  const [formId, setFormId] = useState("");
  const [formCat, setFormCat] = useState("domestic");
  const [formName, setFormName] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formCapacity, setFormCapacity] = useState("");
  const [formWarranty, setFormWarranty] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formMetaTitle, setFormMetaTitle] = useState("");
  const [formMetaDesc, setFormMetaDesc] = useState("");
  const [editImages, setEditImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [specs, setSpecs] = useState<{ key: string; val: string }[]>([]);
  const [uploadMsg, setUploadMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keyboard shortcuts (Cmd+S / Ctrl+S to save, Esc to exit editor)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (editingId) {
          saveProduct();
        }
      }
      if (e.key === "Escape" && editingId) {
        e.preventDefault();
        exitEditor();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingId, formId, formName, formCat, formBadge, formTagline, formCapacity, formWarranty, formDesc, formIsActive, formMetaTitle, formMetaDesc, editImages, features, specs]);

  // Check existing session
  useEffect(() => {
    const t = sessionStorage.getItem("adm-token");
    const attempts = parseInt(localStorage.getItem("adm-attempts") || "0", 10);
    const lockout = parseInt(localStorage.getItem("adm-lockout-until") || "0", 10);
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

  // Toast
  const toast = useCallback((msg: string, type: "ok" | "err" | "" = "") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToastState(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setShowToastState(false), 3800);
  }, []);

  // Auth fetch helper
  async function apiFetch(url: string, opts: RequestInit = {}) {
    const headers = new Headers(opts.headers || {});
    if (token) headers.set("Authorization", `Bearer ${token}`);
    opts.headers = headers;
    const r = await fetch(url, opts);
    if (r.status === 401) {
      doLogout();
      throw new Error("Session expired. Please log in again.");
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
      setLoginError("Please enter your password.");
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
          setLoginError(`Incorrect password. ${5 - newAttempts} attempts remaining.`);
        }
      }
    } catch {
      setLoginError("Unable to connect to server. Check your connection.");
    }
  }

  function doLogout() {
    sessionStorage.removeItem("adm-token");
    setToken("");
    setScreen("login");
    setProducts([]);
    setEditingId(null);
  }

  // ─── Products CRUD & Reordering ─────────────────────
  async function loadProducts() {
    setLoading(true);
    try {
      const r = await apiFetch(`${API}/products?all=true`);
      const data = await r.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (e: any) {
      toast(e.message || "Failed to load products", "err");
    } finally {
      setLoading(false);
    }
  }

  function populateForm(p: Product) {
    setFormId(p.id);
    setFormCat(p.category || "domestic");
    setFormName(p.name_en || (p as any).name || "");
    setFormBadge(p.badge_en || (p as any).badge || "");
    setFormTagline(p.tagline_en || (p as any).tagline || "");
    setFormCapacity(p.capacity_en || (p as any).capacity || "");
    setFormWarranty(p.warranty_en || (p as any).warranty || "");
    setFormDesc(p.description_en || (p as any).description || "");
    setFormIsActive(p.is_active !== 0 && p.is_active !== false && (p as any).is_active !== "0");
    setFormMetaTitle(p.meta_title || "");
    setFormMetaDesc(p.meta_desc || "");
    setEditImages([...(p.images || [])]);
    setFeatures([...(p.features_en || (p as any).features || [])]);
    setSpecs(
      Object.entries(p.specs_en || (p as any).specs || {}).map(([key, val]) => ({ key, val: String(val) }))
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
  }

  function newProduct() {
    if (dirty && !confirm("You have unsaved changes. Discard them?")) return;
    setEditingId("__new__");
    setFormId("");
    setFormCat("domestic");
    setFormName("");
    setFormBadge("");
    setFormTagline("");
    setFormCapacity("10 - 12 Litres Storage");
    setFormWarranty("1 Year Comprehensive Warranty");
    setFormDesc("");
    setFormIsActive(true);
    setFormMetaTitle("");
    setFormMetaDesc("");
    setEditImages([]);
    setFeatures([...PRESETS.domestic.features]);
    setSpecs([...PRESETS.domestic.specs]);
    setActiveTab("basic");
    setDirty(false);
  }

  // Duplicate a product
  function duplicateProduct(id: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (dirty && !confirm("You have unsaved changes. Discard them to duplicate?")) return;
    const p = products.find((x) => x.id === id);
    if (!p) return;

    const newSlug = `${p.id}-copy-${Math.floor(100 + Math.random() * 900)}`;
    setEditingId("__new__");
    setFormId(newSlug);
    setFormCat(p.category || "domestic");
    setFormName(`${p.name_en || (p as any).name || "Product"} (Copy)`);
    setFormBadge(p.badge_en || (p as any).badge || "");
    setFormTagline(p.tagline_en || (p as any).tagline || "");
    setFormCapacity(p.capacity_en || (p as any).capacity || "");
    setFormWarranty(p.warranty_en || (p as any).warranty || "");
    setFormDesc(p.description_en || (p as any).description || "");
    setFormIsActive(true);
    setFormMetaTitle(p.meta_title ? `${p.meta_title} (Copy)` : "");
    setFormMetaDesc(p.meta_desc || "");
    setEditImages([...(p.images || [])]);
    setFeatures([...(p.features_en || (p as any).features || [])]);
    setSpecs(
      Object.entries(p.specs_en || (p as any).specs || {}).map(([key, val]) => ({ key, val: String(val) }))
    );
    setActiveTab("basic");
    setDirty(true);
    toast(`Duplicated "${p.name_en}"! Review and save.`, "ok");
  }

  // Toggle Visibility (Publish / Hide)
  async function toggleVisibility(p: Product, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    const currentlyActive = p.is_active !== 0 && p.is_active !== false && (p as any).is_active !== "0";
    const nextActive = !currentlyActive;
    const nextVal = nextActive ? 1 : 0;

    // Optimistic UI update
    setProducts((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, is_active: nextVal } : item))
    );
    if (editingId === p.id) {
      setFormIsActive(nextActive);
    }

    try {
      const r = await apiFetch(`${API}/products`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, is_active: nextVal }),
      });
      if (!r.ok) throw new Error("Could not update visibility");
      toast(nextActive ? `"${p.name_en}" is now LIVE on website 👁️` : `"${p.name_en}" is now HIDDEN from website 🔒`, "ok");
    } catch (err: any) {
      toast("Visibility update failed: " + err.message, "err");
      loadProducts();
    }
  }

  // Move product up/down for reordering
  async function moveProduct(index: number, direction: "up" | "down", e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= products.length) return;

    const newOrder = [...products];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);

    setProducts(newOrder);
    setIsReordering(true);

    try {
      const orderIds = newOrder.map((item) => item.id);
      const r = await apiFetch(`${API}/products`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: orderIds }),
      });
      if (!r.ok) throw new Error("Failed to save order");
      toast(`Moved "${moved.name_en}" ${direction} ✓`, "ok");
    } catch (err: any) {
      toast("Order save failed: " + err.message, "err");
      loadProducts();
    } finally {
      setIsReordering(false);
    }
  }

  // Apply Industry Standard Spec Presets
  function applyPreset(type: "domestic" | "commercial" | "spares") {
    const preset = PRESETS[type];
    setFeatures([...preset.features]);
    setSpecs([...preset.specs]);
    if (type === "domestic") {
      setFormCapacity("10 - 12 Litres Storage");
      setFormWarranty("1 Year Comprehensive Warranty");
    } else if (type === "commercial") {
      setFormCapacity("50 - 250 LPH Plant");
      setFormWarranty("1 Year AMC Warranty Support");
    } else {
      setFormCapacity("Standard Universal Fit");
      setFormWarranty("Standard Manufacturer Warranty");
    }
    setDirty(true);
    toast(`Applied standard ${type.toUpperCase()} specifications template!`, "ok");
  }

  function exitEditor() {
    if (dirty && !confirm("You have unsaved changes. Discard them?")) return;
    setEditingId(null);
    setDirty(false);
  }

  async function saveProduct() {
    const cleanId = formId.trim().toLowerCase();
    if (!cleanId) {
      toast("Product ID (slug) is required", "err");
      setActiveTab("basic");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(cleanId)) {
      toast("ID must contain only lowercase letters, numbers, and hyphens", "err");
      setActiveTab("basic");
      return;
    }
    if (!formName.trim()) {
      toast("Product Name is required", "err");
      setActiveTab("basic");
      return;
    }

    const specsObj: Record<string, string> = {};
    specs.forEach(({ key, val }) => {
      if (key.trim()) specsObj[key.trim()] = val.trim();
    });

    const body = {
      id: cleanId,
      name_en: formName.trim(),
      name_gu: "",
      badge_en: formBadge.trim(),
      badge_gu: "",
      category: formCat,
      images: editImages,
      tagline_en: formTagline.trim(),
      tagline_gu: "",
      capacity_en: formCapacity.trim(),
      capacity_gu: "",
      warranty_en: formWarranty.trim(),
      warranty_gu: "",
      description_en: formDesc.trim(),
      description_gu: "",
      features_en: features.map((f) => f.trim()).filter(Boolean),
      features_gu: [],
      specs_en: specsObj,
      specs_gu: {},
      meta_title: formMetaTitle.trim(),
      meta_desc: formMetaDesc.trim(),
      is_active: formIsActive ? 1 : 0,
    };

    setSaveStatus({ msg: "Saving...", color: "var(--adm-primary)" });
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
      if (isNew) setEditingId(cleanId);
      await loadProducts();
      setDirty(false);
      setSaveStatus({ msg: "✅ Saved!", color: "#22c55e" });
      toast(`Product "${formName}" saved successfully!`, "ok");
      setTimeout(() => setSaveStatus({ msg: "", color: "" }), 4000);
    } catch (e: any) {
      const msg = e.message || "Unknown error";
      setSaveStatus({ msg: "❌ " + msg, color: "#ef4444" });
      toast("Save failed: " + msg, "err");
    }
  }

  async function deleteProduct(id: string, name: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (!confirm(`Are you sure you want to permanently delete "${name}"?\n(Tip: You can use "Hide" instead if you just want to remove it from the website temporarily.)`)) {
      return;
    }
    try {
      const r = await apiFetch(`${API}/products/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error((await r.json()).error);
      if (editingId === id) {
        setEditingId(null);
      }
      await loadProducts();
      toast(`Deleted "${name}".`, "ok");
    } catch (e: any) {
      toast("Delete failed: " + e.message, "err");
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
      } catch (e: any) {
        toast("Upload failed: " + (e.message || "Unknown"), "err");
      }
    }
    setIsUploading(false);
    setUploadMsg("");
  }

  // Metrics calculation
  const metrics = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.is_active !== 0 && p.is_active !== false && (p as any).is_active !== "0").length;
    const hidden = total - active;
    const domestic = products.filter((p) => p.category === "domestic").length;
    const commercial = products.filter((p) => p.category === "commercial").length;
    const spares = products.filter((p) => p.category === "spares").length;
    return { total, active, hidden, domestic, commercial, spares };
  }, [products]);

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const name = (p.name_en || (p as any).name || "").toLowerCase();
      const id = (p.id || "").toLowerCase();
      const matchesSearch = !q || name.includes(q) || id.includes(q);

      const matchesCat = catFilter === "all" || p.category === catFilter;

      const isActive = p.is_active !== 0 && p.is_active !== false && (p as any).is_active !== "0";
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "hidden" && !isActive);

      return matchesSearch && matchesCat && matchesStatus;
    });

    if (sortBy === "name") {
      list = [...list].sort((a, b) => (a.name_en || "").localeCompare(b.name_en || ""));
    } else if (sortBy === "category") {
      list = [...list].sort((a, b) => (a.category || "").localeCompare(b.category || ""));
    }

    return list;
  }, [products, searchQuery, catFilter, statusFilter, sortBy]);

  // ─── LOGIN SCREEN ───────────────────────────────────
  if (screen === "login") {
    return <LoginScreen error={loginError} onLogin={doLogin} />;
  }

  // ─── DASHBOARD ──────────────────────────────────────
  return (
    <div className="adm-dashboard">
      <style>{adminStyles}</style>

      {/* Top App Bar (Google Cloud Console Pattern) */}
      <header className="adm-topbar">
        <div className="adm-topbar-left">
          <img
            src="/assets/logo_horizontal_transparent.png"
            alt="Shivam Water Solution"
            height="28"
            className="adm-top-logo"
            onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
          />
          <div className="adm-top-title">
            <span className="adm-brand-name hide-360">Console</span>
            <span className="adm-top-breadcrumb">/ Products</span>
          </div>
        </div>

        <div className="adm-topbar-right">
          {dirty && (
            <span className="adm-unsaved-pill hide-360">
              ● Unsaved Changes
            </span>
          )}
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-outline-sm" title="View Live Website">
            <ExternalLink size={14} />
            <span className="hide-mobile">Website</span>
          </a>
          <button className="adm-btn adm-btn-outline-sm" onClick={doLogout} title="Logout">
            <LogOut size={14} />
            <span className="hide-mobile">Logout</span>
          </button>
        </div>
      </header>

      {/* Body Area */}
      <main className="adm-body-container">
        {/* ========================================================= */}
        {/* PRODUCT LIST VIEW (Master Panel) */}
        {/* ========================================================= */}
        <section className={`adm-sidebar-panel ${editingId ? "hide-on-mobile-when-editing" : ""}`}>
          {/* Top Metric Scorecards (Material Design 3 Dashboard Pattern) */}
          <div className="adm-metrics-row">
            <button
              type="button"
              className={`adm-metric-card ${statusFilter === "all" && catFilter === "all" ? "active" : ""}`}
              onClick={() => { setStatusFilter("all"); setCatFilter("all"); }}
              title="Show all products"
            >
              <div className="adm-metric-num">{metrics.total}</div>
              <div className="adm-metric-label">Total</div>
            </button>
            <button
              type="button"
              className={`adm-metric-card green ${statusFilter === "active" ? "active" : ""}`}
              onClick={() => { setStatusFilter("active"); }}
              title="Show live products only"
            >
              <div className="adm-metric-num text-success">{metrics.active}</div>
              <div className="adm-metric-label">Live 👁️</div>
            </button>
            <button
              type="button"
              className={`adm-metric-card amber ${statusFilter === "hidden" ? "active" : ""}`}
              onClick={() => { setStatusFilter("hidden"); }}
              title="Show hidden/draft products only"
            >
              <div className="adm-metric-num text-warning">{metrics.hidden}</div>
              <div className="adm-metric-label">Hidden 🔒</div>
            </button>
            <button
              type="button"
              className={`adm-metric-card ${catFilter === "domestic" ? "active" : ""}`}
              onClick={() => { setCatFilter(catFilter === "domestic" ? "all" : "domestic"); }}
              title="Show domestic models only"
            >
              <div className="adm-metric-num text-cyan">{metrics.domestic}</div>
              <div className="adm-metric-label">Domestic</div>
            </button>
          </div>

          {/* Controls Bar */}
          <div className="adm-panel-head">
            <div className="adm-panel-head-top">
              <div className="adm-head-title-row">
                <Layers size={17} className="text-primary" />
                <h2>Catalog Inventory</h2>
              </div>
              <button className="adm-btn adm-btn-primary" onClick={newProduct}>
                <Plus size={15} />
                <span>Add product</span>
              </button>
            </div>

            {/* Search Bar with Instant Clear */}
            <div className="adm-search-wrap">
              <Search size={15} className="adm-search-icon" />
              <input
                type="text"
                className="adm-search-input"
                placeholder="Search products by name or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="adm-search-clear" onClick={() => setSearchQuery("")} title="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Google M3 Filter Chips */}
            <div className="adm-filters-row">
              <div className="adm-filter-group">
                <button className={`adm-pill ${catFilter === "all" ? "active" : ""}`} onClick={() => setCatFilter("all")}>
                  All ({metrics.total})
                </button>
                <button className={`adm-pill ${catFilter === "domestic" ? "active" : ""}`} onClick={() => setCatFilter("domestic")}>
                  Domestic ({metrics.domestic})
                </button>
                <button className={`adm-pill ${catFilter === "commercial" ? "active" : ""}`} onClick={() => setCatFilter("commercial")}>
                  Commercial ({metrics.commercial})
                </button>
                <button className={`adm-pill ${catFilter === "spares" ? "active" : ""}`} onClick={() => setCatFilter("spares")}>
                  Spares ({metrics.spares})
                </button>
              </div>

              <div className="adm-filter-group status-group">
                <button className={`adm-pill ${statusFilter === "all" ? "active" : ""}`} onClick={() => setStatusFilter("all")}>
                  All status
                </button>
                <button className={`adm-pill green ${statusFilter === "active" ? "active" : ""}`} onClick={() => setStatusFilter("active")}>
                  🟢 Live ({metrics.active})
                </button>
                <button className={`adm-pill gray ${statusFilter === "hidden" ? "active" : ""}`} onClick={() => setStatusFilter("hidden")}>
                  🔒 Hidden ({metrics.hidden})
                </button>
              </div>
            </div>
          </div>

          {/* List of Products (Material Card Stack) */}
          <div className="adm-product-list">
            {loading && (
              <div className="adm-empty-state">
                <RefreshCw size={24} className="spin text-primary" />
                <p>Loading inventory from Cloudflare...</p>
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="adm-empty-state">
                <AlertCircle size={28} opacity={0.4} />
                <p>No products match your filters</p>
                <button className="adm-btn adm-btn-outline-sm" onClick={() => { setSearchQuery(""); setCatFilter("all"); setStatusFilter("all"); }}>
                  Reset filters
                </button>
              </div>
            )}

            {filteredProducts.map((p) => {
              const isActive = p.is_active !== 0 && p.is_active !== false && (p as any).is_active !== "0";
              const isSelected = editingId === p.id;
              const globalIndex = products.findIndex((item) => item.id === p.id);

              return (
                <div
                  key={p.id}
                  className={`adm-product-card ${isSelected ? "selected" : ""} ${!isActive ? "is-hidden" : ""}`}
                  onClick={() => editProduct(p.id)}
                >
                  {/* Top Row: Rank + Thumb + Title & Meta */}
                  <div className="adm-card-main-row">
                    <div className="adm-rank-badge" title={`Catalog Position #${globalIndex + 1}`}>
                      #{globalIndex + 1}
                    </div>

                    <div className="adm-thumb-wrapper">
                      <img
                        src={p.images?.[0] || "/assets/product_domestic.webp"}
                        alt={p.name_en}
                        className="adm-thumb-img"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }}
                      />
                      {!isActive && (
                        <span className="adm-hidden-overlay" title="Hidden from public catalog">
                          <EyeOff size={12} />
                        </span>
                      )}
                    </div>

                    <div className="adm-card-info">
                      <div className="adm-card-title-row">
                        <h4 className="adm-card-title">{p.name_en || (p as any).name}</h4>
                        {p.badge_en && <span className="adm-card-badge">{p.badge_en}</span>}
                      </div>
                      <div className="adm-card-sub">
                        <span className="adm-card-cat">{p.category}</span>
                        <span className="adm-card-dot">•</span>
                        <span className="adm-card-cap">{p.capacity_en || (p as any).capacity || "10L"}</span>
                        <span className="adm-card-dot">•</span>
                        <span className={`adm-status-tag ${isActive ? "active" : "hidden"}`}>
                          {isActive ? "Live" : "Hidden"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Standardized M3 Touch Toolbar */}
                  <div className="adm-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="adm-icon-action"
                      title="Move up in catalog order"
                      disabled={globalIndex === 0 || isReordering}
                      onClick={(e) => moveProduct(globalIndex, "up", e)}
                    >
                      <ArrowUp size={15} />
                      <span className="adm-action-lbl">Up</span>
                    </button>

                    <button
                      type="button"
                      className="adm-icon-action"
                      title="Move down in catalog order"
                      disabled={globalIndex === products.length - 1 || isReordering}
                      onClick={(e) => moveProduct(globalIndex, "down", e)}
                    >
                      <ArrowDown size={15} />
                      <span className="adm-action-lbl">Down</span>
                    </button>

                    <button
                      type="button"
                      className={`adm-icon-action ${isActive ? "active-eye" : "hidden-eye"}`}
                      title={isActive ? "Hide from website" : "Publish on website"}
                      onClick={(e) => toggleVisibility(p, e)}
                    >
                      {isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                      <span className="adm-action-lbl">{isActive ? "Live" : "Hide"}</span>
                    </button>

                    <button
                      type="button"
                      className="adm-icon-action"
                      title="Duplicate product"
                      onClick={(e) => duplicateProduct(p.id, e)}
                    >
                      <Copy size={14} />
                      <span className="adm-action-lbl">Copy</span>
                    </button>

                    <button
                      type="button"
                      className="adm-icon-action danger"
                      title="Delete product"
                      onClick={(e) => deleteProduct(p.id, p.name_en || p.id, e)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PRODUCT EDITOR PANEL (Master-Detail View) */}
        {/* ========================================================= */}
        <section className={`adm-editor-panel ${!editingId ? "hide-on-mobile-when-empty" : ""}`}>
          {!editingId ? (
            <div className="adm-editor-empty-state">
              <div className="adm-empty-circle">
                <Sliders size={32} className="text-primary" />
              </div>
              <h3>Select a product to edit</h3>
              <p>Choose an item from the list on the left to edit details, upload high-res images, apply specifications, or duplicate.</p>
              <button className="adm-btn adm-btn-primary" onClick={newProduct}>
                <Plus size={16} />
                <span>Create new product</span>
              </button>
            </div>
          ) : (
            <div className="adm-editor-form-wrapper">
              {/* Header Bar */}
              <div className="adm-editor-header">
                <button type="button" className="adm-back-btn" onClick={exitEditor}>
                  <ChevronLeft size={18} />
                  <span>Products</span>
                </button>

                <div className="adm-editor-header-title">
                  <h3>{editingId === "__new__" ? "New product" : formName || "Edit product"}</h3>
                  <span className="adm-editor-slug">{formId ? `/products/${formId}` : "Draft slug"}</span>
                </div>

                <div className="adm-editor-header-actions hide-mobile">
                  <span className="adm-shortcut-pill" title="Press ⌘S / Ctrl+S to save anytime">
                    ⌘S to save
                  </span>
                  <button type="button" className="adm-btn adm-btn-primary" onClick={saveProduct}>
                    <Save size={15} />
                    <span>Save changes</span>
                  </button>
                  <button type="button" className="adm-btn adm-btn-outline-sm" onClick={exitEditor}>
                    Close
                  </button>
                </div>
              </div>

              {/* M3 Segmented Tabs */}
              <div className="adm-editor-tabs-bar">
                <button
                  type="button"
                  className={`adm-tab-btn ${activeTab === "basic" ? "active" : ""}`}
                  onClick={() => setActiveTab("basic")}
                >
                  <FileText size={15} />
                  <span>General</span>
                </button>
                <button
                  type="button"
                  className={`adm-tab-btn ${activeTab === "images" ? "active" : ""}`}
                  onClick={() => setActiveTab("images")}
                >
                  <ImageIcon size={15} />
                  <span>Gallery ({editImages.length})</span>
                </button>
                <button
                  type="button"
                  className={`adm-tab-btn ${activeTab === "specs" ? "active" : ""}`}
                  onClick={() => setActiveTab("specs")}
                >
                  <Sliders size={15} />
                  <span>Features & specs</span>
                </button>
                <button
                  type="button"
                  className={`adm-tab-btn ${activeTab === "seo" ? "active" : ""}`}
                  onClick={() => setActiveTab("seo")}
                >
                  <Globe size={15} />
                  <span>SEO & WhatsApp</span>
                </button>
              </div>

              {/* Main Form + Live Preview Split */}
              <div className="adm-editor-body-split">
                {/* Form Content Area */}
                <div className="adm-form-content">
                  {/* TAB 1: BASIC INFO */}
                  {activeTab === "basic" && (
                    <div className="adm-form-card">
                      <div className="adm-card-header">
                        <h4>General information</h4>
                        <p>Core product identification, naming, category, and online visibility.</p>
                      </div>

                      {/* Visibility Switch Box */}
                      <div className="adm-visibility-box">
                        <div className="adm-vis-info">
                          <label className="adm-vis-label">Website visibility</label>
                          <p className="adm-vis-sub">
                            {formIsActive
                              ? "🟢 Live on website catalog & home page"
                              : "🔒 Hidden from website (saved in database)"}
                          </p>
                        </div>
                        <button
                          type="button"
                          className={`adm-toggle-switch ${formIsActive ? "active" : ""}`}
                          onClick={() => {
                            setFormIsActive(!formIsActive);
                            setDirty(true);
                          }}
                        >
                          <span className="adm-toggle-handle" />
                          <span className="adm-toggle-text">{formIsActive ? "LIVE" : "HIDDEN"}</span>
                        </button>
                      </div>

                      {/* Form Fields */}
                      <div className="adm-form-grid">
                        <div className="adm-field">
                          <label className="adm-label">
                            Product ID slug <em>(URL path)</em> <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formId}
                            onChange={(e) => {
                              setFormId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                              setDirty(true);
                            }}
                            disabled={editingId !== "__new__"}
                            placeholder="e.g. flonix-relax"
                          />
                          <span className="adm-hint">
                            {editingId === "__new__"
                              ? "Lowercase letters, numbers, and hyphens only."
                              : "ID cannot be changed after creation to maintain SEO links."}
                          </span>
                        </div>

                        <div className="adm-field">
                          <label className="adm-label">
                            Category <span className="req">*</span>
                          </label>
                          <select
                            className="adm-input select"
                            value={formCat}
                            onChange={(e) => {
                              setFormCat(e.target.value);
                              setDirty(true);
                            }}
                          >
                            <option value="domestic">Domestic RO (Home & Kitchen)</option>
                            <option value="commercial">Commercial & Industrial RO Plant</option>
                            <option value="spares">Filters, Membranes & Spares</option>
                          </select>
                        </div>

                        <div className="adm-field">
                          <label className="adm-label">
                            Product name <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formName}
                            onChange={(e) => {
                              setFormName(e.target.value);
                              setDirty(true);
                            }}
                            placeholder="e.g. FLONIX RELAX"
                          />
                        </div>

                        <div className="adm-field">
                          <label className="adm-label">
                            Badge <em>(optional)</em>
                          </label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formBadge}
                            onChange={(e) => {
                              setFormBadge(e.target.value);
                              setDirty(true);
                            }}
                            placeholder="e.g. Triple Power, Best Seller"
                          />
                        </div>

                        <div className="adm-field full-width">
                          <label className="adm-label">Tagline / Catchphrase</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formTagline}
                            onChange={(e) => {
                              setFormTagline(e.target.value);
                              setDirty(true);
                            }}
                            placeholder="e.g. Pure Protection in Every Drop."
                          />
                        </div>

                        <div className="adm-field">
                          <label className="adm-label">Storage capacity / Output</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formCapacity}
                            onChange={(e) => {
                              setFormCapacity(e.target.value);
                              setDirty(true);
                            }}
                            placeholder="e.g. 10 - 12 Litres Storage"
                          />
                        </div>

                        <div className="adm-field">
                          <label className="adm-label">Warranty details</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formWarranty}
                            onChange={(e) => {
                              setFormWarranty(e.target.value);
                              setDirty(true);
                            }}
                            placeholder="e.g. 1 Year Comprehensive Warranty"
                          />
                        </div>

                        <div className="adm-field full-width">
                          <label className="adm-label">Full product description</label>
                          <textarea
                            className="adm-input textarea"
                            value={formDesc}
                            onChange={(e) => {
                              setFormDesc(e.target.value);
                              setDirty(true);
                            }}
                            placeholder="Detailed product overview, purification stages, suitable water TDS levels, etc."
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: IMAGES */}
                  {activeTab === "images" && (
                    <div className="adm-form-card">
                      <div className="adm-card-header">
                        <h4>Product image gallery</h4>
                        <p>The first image is the main card photo. Upload multiple images to create a rich gallery.</p>
                      </div>

                      {/* Drop Zone */}
                      <div
                        className="adm-dropzone"
                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("hover"); }}
                        onDragLeave={(e) => e.currentTarget.classList.remove("hover")}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("hover");
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
                        <ImageIcon size={36} className="text-primary" />
                        <h5>Click or drag & drop images here</h5>
                        <p>PNG, JPG, WebP — automatically optimized in Cloudflare R2</p>
                      </div>

                      {isUploading && (
                        <div className="adm-upload-progress">
                          <RefreshCw size={16} className="spin text-primary" />
                          <span>{uploadMsg || "Uploading to Cloudflare..."}</span>
                        </div>
                      )}

                      {/* Image Grid */}
                      <div className="adm-image-gallery-grid">
                        {editImages.map((url, i) => (
                          <div key={`${url}-${i}`} className={`adm-image-item ${i === 0 ? "is-main" : ""}`}>
                            {i === 0 && <span className="adm-main-badge">★ Main Photo</span>}
                            <img
                              src={url}
                              alt={`Product image ${i + 1}`}
                              className="adm-gallery-thumb"
                              onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }}
                            />
                            <div className="adm-image-actions">
                              {i > 0 && (
                                <button
                                  type="button"
                                  className="adm-img-btn"
                                  onClick={() => {
                                    const arr = [...editImages];
                                    const [target] = arr.splice(i, 1);
                                    arr.unshift(target);
                                    setEditImages(arr);
                                    setDirty(true);
                                  }}
                                  title="Set as Main Card Photo"
                                >
                                  Make main
                                </button>
                              )}
                              <button
                                type="button"
                                className="adm-img-btn danger"
                                onClick={() => {
                                  setEditImages((prev) => prev.filter((_, idx) => idx !== i));
                                  setDirty(true);
                                }}
                                title="Remove Image"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Manual URL Input */}
                      <ManualUrlAdder
                        onAdd={(url) => {
                          setEditImages((prev) => [...prev, url]);
                          setDirty(true);
                        }}
                      />
                    </div>
                  )}

                  {/* TAB 3: FEATURES & SPECS */}
                  {activeTab === "specs" && (
                    <div className="adm-form-card">
                      {/* One-Click Template Presets Header */}
                      <div className="adm-presets-bar">
                        <div className="adm-presets-label">
                          <Wand2 size={15} className="text-primary" />
                          <span>Quick Templates:</span>
                        </div>
                        <div className="adm-presets-btns">
                          <button
                            type="button"
                            className="adm-preset-pill"
                            onClick={() => applyPreset("domestic")}
                          >
                            + Domestic RO Preset
                          </button>
                          <button
                            type="button"
                            className="adm-preset-pill"
                            onClick={() => applyPreset("commercial")}
                          >
                            + Commercial Plant Preset
                          </button>
                          <button
                            type="button"
                            className="adm-preset-pill"
                            onClick={() => applyPreset("spares")}
                          >
                            + Spares Preset
                          </button>
                        </div>
                      </div>

                      <div className="adm-card-header">
                        <h4>Key features & highlights</h4>
                        <p>Displayed as checkmark highlight points on product pages.</p>
                      </div>

                      <div className="adm-dyn-list">
                        {features.map((f, i) => (
                          <div key={i} className="adm-dyn-item">
                            <Check size={16} className="text-primary flex-shrink-0" />
                            <input
                              type="text"
                              className="adm-input"
                              value={f}
                              onChange={(e) => {
                                const arr = [...features];
                                arr[i] = e.target.value;
                                setFeatures(arr);
                                setDirty(true);
                              }}
                              placeholder="e.g. Triple Power: Active Copper + Zinc + Bio-Alkaline B12"
                            />
                            <button
                              type="button"
                              className="adm-del-row-btn"
                              onClick={() => {
                                setFeatures((prev) => prev.filter((_, idx) => idx !== i));
                                setDirty(true);
                              }}
                              title="Delete feature"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="adm-add-btn"
                          onClick={() => {
                            setFeatures((prev) => [...prev, ""]);
                            setDirty(true);
                          }}
                        >
                          <Plus size={14} />
                          <span>Add feature bullet</span>
                        </button>
                      </div>

                      <hr className="adm-divider" />

                      <div className="adm-card-header">
                        <h4>Technical specifications</h4>
                        <p>Key-value pairs displayed in the technical specs table.</p>
                      </div>

                      <div className="adm-dyn-list">
                        {specs.map((s, i) => (
                          <div key={i} className="adm-dyn-spec-item">
                            <input
                              type="text"
                              className="adm-input spec-key"
                              value={s.key}
                              onChange={(e) => {
                                const arr = [...specs];
                                arr[i] = { ...arr[i], key: e.target.value };
                                setSpecs(arr);
                                setDirty(true);
                              }}
                              placeholder="Spec name (e.g. Storage Capacity)"
                            />
                            <input
                              type="text"
                              className="adm-input spec-val"
                              value={s.val}
                              onChange={(e) => {
                                const arr = [...specs];
                                arr[i] = { ...arr[i], val: e.target.value };
                                setSpecs(arr);
                                setDirty(true);
                              }}
                              placeholder="Spec value (e.g. 10 - 12 Litres)"
                            />
                            <button
                              type="button"
                              className="adm-del-row-btn"
                              onClick={() => {
                                setSpecs((prev) => prev.filter((_, idx) => idx !== i));
                                setDirty(true);
                              }}
                              title="Delete spec"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="adm-add-btn"
                          onClick={() => {
                            setSpecs((prev) => [...prev, { key: "", val: "" }]);
                            setDirty(true);
                          }}
                        >
                          <Plus size={14} />
                          <span>Add spec row</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: SEO & SHARING */}
                  {activeTab === "seo" && (
                    <div className="adm-form-card">
                      <div className="adm-card-header">
                        <h4>Search engine & social preview</h4>
                        <p>Control what Google, WhatsApp, and social networks display when sharing this link.</p>
                      </div>

                      <div className="adm-form-grid">
                        <div className="adm-field full-width">
                          <label className="adm-label">
                            Meta title <em>(~55-65 characters)</em>
                          </label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formMetaTitle}
                            onChange={(e) => {
                              setFormMetaTitle(e.target.value);
                              setDirty(true);
                            }}
                            placeholder={`${formName || "Product"} RO Water Purifier | Shivam Water Solution Morbi`}
                          />
                        </div>

                        <div className="adm-field full-width">
                          <label className="adm-label">
                            Meta description <em>(~140-160 characters)</em>
                          </label>
                          <textarea
                            className="adm-input textarea"
                            value={formMetaDesc}
                            onChange={(e) => {
                              setFormMetaDesc(e.target.value);
                              setDirty(true);
                            }}
                            placeholder={`Buy ${formName || "this model"} in Morbi & Rajkot with RO + UV + TDS Controller. Free installation & warranty.`}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Preview Column (Sticky Companion) */}
                <div className="adm-preview-column">
                  <div className="adm-preview-card-wrap">
                    <div className="adm-preview-header">
                      <Sparkles size={14} className="text-primary" />
                      <span>Live website card</span>
                    </div>

                    {/* Product Card Simulator */}
                    <div className="product-card glass-card preview-box">
                      {formBadge && <div className="product-badge">{formBadge}</div>}
                      <div className="product-img-wrap">
                        <img
                          src={editImages[0] || "/assets/product_domestic.webp"}
                          alt="Preview"
                          width="400"
                          height="400"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }}
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">{formName || "Product Title"}</h3>
                        <p className="product-desc">{formTagline || "Pure Protection in Every Drop"}</p>
                        <div className="product-card-specs">
                          <div className="spec-pill">
                            <span>{formCapacity || "10L"}</span>
                          </div>
                          <div className="spec-pill">
                            <span>{formWarranty || "1 Year"}</span>
                          </div>
                        </div>
                        <div className="card-action-row" style={{ marginTop: "auto" }}>
                          <span className="btn btn-outline btn-sm w-full text-center" style={{ pointerEvents: "none" }}>
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Chat Preview */}
                    <div className="adm-wa-sim-wrap">
                      <div className="adm-preview-header">
                        <span className="text-wa">WhatsApp link preview</span>
                      </div>
                      <div className="adm-wa-bubble">
                        <div className="adm-wa-msg-text">
                          Hello Dilipbhai, I am interested in inquiring about the *{formName || "model"}*.
                        </div>
                        <div className="adm-wa-link-card">
                          <img
                            src={editImages[0] || "/assets/product_domestic.webp"}
                            alt="WhatsApp Preview"
                            className="adm-wa-img"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }}
                          />
                          <div className="adm-wa-card-text">
                            <h6>{formName || "Product"} RO Purifier</h6>
                            <p>{formCapacity || "10L"} • {formWarranty || "1 Year"} • Free Delivery</p>
                            <span className="adm-wa-domain">shivamwatersolution.in</span>
                          </div>
                        </div>
                      </div>

                      {formId && (
                        <div className="adm-wa-actions">
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`Check out the ${formName} RO Purifier: https://shivamwatersolution.in/products/${formId}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="adm-btn adm-btn-wa"
                          >
                            Send on WhatsApp
                          </a>
                          <button
                            type="button"
                            className="adm-btn adm-btn-outline-sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`https://shivamwatersolution.in/products/${formId}`);
                              toast("Copied product URL to clipboard!", "ok");
                            }}
                          >
                            Copy link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Action Bar (Google Material 3 Bottom Bar Pattern) */}
              <div className="adm-sticky-save-bar">
                <div className="adm-save-bar-left">
                  <button type="button" className="adm-btn adm-btn-primary btn-lg" onClick={saveProduct}>
                    <Save size={16} />
                    <span>Save changes</span>
                  </button>
                  <button type="button" className="adm-btn adm-btn-danger" onClick={exitEditor}>
                    Discard
                  </button>
                </div>

                {saveStatus.msg && (
                  <div className="adm-save-status-pill" style={{ color: saveStatus.color }}>
                    {saveStatus.msg}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Material Design 3 SnackBar / Floating Toast */}
      <div className={`adm-toast ${toastType} ${showToast ? "show" : ""}`}>
        {toastType === "ok" && <Check size={16} />}
        {toastType === "err" && <AlertCircle size={16} />}
        <span>{toastMsg}</span>
      </div>
    </div>
  );
}

// ─── Login Screen Component ─────────────────────────────
function LoginScreen({ error, onLogin }: { error: string; onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");

  return (
    <div className="al-wrap">
      <style>{loginStyles}</style>
      <div className="al-card">
        <img src="/assets/logo.png" alt="Logo" width="56" height="56" onError={(e) => { (e.target as HTMLElement).style.display = "none"; }} />
        <h1>Admin Console</h1>
        <p>Shivam Water Solution — Morbi & Rajkot</p>
        {error && <div className="al-err">{error}</div>}
        <input
          type="password"
          className="al-inp"
          placeholder="••••••••••"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { onLogin(pw); setPw(""); } }}
          autoComplete="current-password"
          autoFocus
        />
        <button className="al-btn" onClick={() => { onLogin(pw); setPw(""); }}>
          Unlock console →
        </button>
        <div style={{ marginTop: "18px" }}>
          <span className="sec-badge">🔒 Cloudflare Edge Security</span>
        </div>
      </div>
    </div>
  );
}

// ─── Manual URL Adder ───────────────────────────────────
function ManualUrlAdder({ onAdd }: { onAdd: (url: string) => void }) {
  const [url, setUrl] = useState("");
  return (
    <details className="adm-manual-url">
      <summary>Or link an existing image URL manually</summary>
      <div className="adm-manual-url-box">
        <input
          type="text"
          className="adm-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/assets/photo.png or https://..."
        />
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={() => {
            if (url.trim()) {
              onAdd(url.trim());
              setUrl("");
            }
          }}
        >
          Add image
        </button>
      </div>
    </details>
  );
}

// ─── Google Material 3 Design Tokens & Styles ───────────
const loginStyles = `
  .al-wrap {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: #070d19;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    box-sizing: border-box;
    width: 100%;
  }
  .al-card {
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 36px 24px;
    width: 100%;
    max-width: 350px;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    margin: 0 auto;
  }
  .al-card img {
    height: 48px;
    width: auto;
    margin: 0 auto 14px;
    display: block;
  }
  .al-card h1 {
    font-size: 1.45rem;
    font-weight: 800;
    margin: 0 0 4px;
    color: #f8fafc;
  }
  .al-card p {
    font-size: 0.8rem;
    color: #94a3b8;
    margin: 0 0 20px;
  }
  .al-err {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 10px;
    padding: 9px 12px;
    font-size: 0.8rem;
    color: #fca5a5;
    margin-bottom: 14px;
  }
  .al-inp {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    font-size: 0.95rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.25);
    outline: none;
    transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
    margin-bottom: 14px;
    text-align: center;
    letter-spacing: 2px;
    box-sizing: border-box;
  }
  .al-inp:focus {
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.25);
  }
  .al-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
    box-sizing: border-box;
  }
  .al-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(6, 182, 212, 0.3);
  }
  .sec-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.25);
    color: #4ade80;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
  }
`;

const adminStyles = `
  :root {
    --adm-bg: #070d19;
    --adm-surface: #0b1120;
    --adm-surface-container: #0f172a;
    --adm-surface-container-high: #1e293b;
    --adm-border: rgba(255, 255, 255, 0.08);
    --adm-border-active: #0284c7;
    --adm-primary: #0284c7;
    --adm-primary-hover: #0369a1;
    --adm-text-1: #f8fafc;
    --adm-text-2: #cbd5e1;
    --adm-text-3: #94a3b8;
    --adm-ease: cubic-bezier(0.2, 0, 0, 1);
  }

  .adm-dashboard {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    background: var(--adm-bg);
    color: var(--adm-text-1);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* Top App Bar */
  .adm-topbar {
    height: 56px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--adm-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 100;
    flex-shrink: 0;
  }
  .adm-topbar-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .adm-top-logo {
    height: 28px;
    width: auto;
    object-fit: contain;
  }
  .adm-top-title {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
    font-size: 0.92rem;
    white-space: nowrap;
  }
  .adm-brand-name {
    color: #f8fafc;
  }
  .adm-top-breadcrumb {
    color: var(--adm-primary);
    font-weight: 600;
    font-size: 0.85rem;
  }
  .adm-topbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .adm-unsaved-pill {
    font-size: 0.72rem;
    font-weight: 700;
    color: #f59e0b;
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.3);
    padding: 3px 8px;
    border-radius: 20px;
    animation: pulse 1.5s infinite;
  }
  .adm-shortcut-pill {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--adm-text-3);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--adm-border);
    padding: 3px 8px;
    border-radius: 6px;
  }

  /* Body Container */
  .adm-body-container {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  /* Sidebar Panel (Left) */
  .adm-sidebar-panel {
    width: 440px;
    min-width: 360px;
    background: var(--adm-surface);
    border-right: 1px solid var(--adm-border);
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  /* Google M3 Metric Scorecards */
  .adm-metrics-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    padding: 10px 12px;
    background: rgba(15, 23, 42, 0.8);
    border-bottom: 1px solid var(--adm-border);
    flex-shrink: 0;
  }
  .adm-metric-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--adm-border);
    border-radius: 10px;
    padding: 6px 4px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s var(--adm-ease);
  }
  .adm-metric-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }
  .adm-metric-card.active {
    background: rgba(2, 132, 199, 0.15);
    border-color: var(--adm-primary);
  }
  .adm-metric-num {
    font-size: 1.05rem;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
  }
  .adm-metric-label {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--adm-text-3);
    margin-top: 2px;
    white-space: nowrap;
  }

  /* Controls Bar */
  .adm-panel-head {
    padding: 12px;
    border-bottom: 1px solid var(--adm-border);
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(15, 23, 42, 0.5);
    flex-shrink: 0;
  }
  .adm-panel-head-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .adm-head-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .adm-head-title-row h2 {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0;
  }
  .adm-search-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .adm-search-icon {
    position: absolute;
    left: 12px;
    color: var(--adm-text-3);
    pointer-events: none;
  }
  .adm-search-input {
    width: 100%;
    padding: 8px 32px 8px 34px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--adm-border);
    border-radius: 8px;
    color: #fff;
    font-size: 0.84rem;
    outline: none;
    transition: all 0.2s var(--adm-ease);
    box-sizing: border-box;
  }
  .adm-search-input:focus {
    border-color: var(--adm-primary);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.25);
  }
  .adm-search-clear {
    position: absolute;
    right: 8px;
    background: none;
    border: none;
    color: var(--adm-text-3);
    cursor: pointer;
    padding: 4px;
  }
  .adm-filters-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .adm-filter-group {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }
  .adm-filter-group::-webkit-scrollbar {
    display: none;
  }
  .adm-pill {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--adm-border);
    color: var(--adm-text-2);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s var(--adm-ease);
  }
  .adm-pill:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
  .adm-pill.active {
    background: var(--adm-primary);
    border-color: var(--adm-primary);
    color: #fff;
  }
  .adm-pill.green.active {
    background: #16a34a;
    border-color: #16a34a;
  }
  .adm-pill.gray.active {
    background: #475569;
    border-color: #475569;
  }

  /* Product List */
  .adm-product-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
  }
  .adm-product-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 12px;
    background: var(--adm-surface-container);
    border: 1px solid var(--adm-border);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s var(--adm-ease);
    position: relative;
    box-sizing: border-box;
  }
  .adm-product-card:hover {
    background: var(--adm-surface-container-high);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
  .adm-product-card.selected {
    background: rgba(2, 132, 199, 0.15);
    border-color: var(--adm-primary);
    box-shadow: 0 0 0 1px var(--adm-primary);
  }
  .adm-product-card.is-hidden {
    opacity: 0.7;
    background: rgba(15, 23, 42, 0.5);
  }

  /* Card Main Row */
  .adm-card-main-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-width: 0;
  }
  .adm-rank-badge {
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--adm-text-3);
    min-width: 22px;
    text-align: center;
    flex-shrink: 0;
  }
  .adm-thumb-wrapper {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: #000;
    border: 1px solid var(--adm-border);
    overflow: hidden;
    flex-shrink: 0;
  }
  .adm-thumb-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 3px;
  }
  .adm-hidden-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f87171;
  }
  .adm-card-info {
    flex: 1;
    min-width: 0;
  }
  .adm-card-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .adm-card-title {
    font-size: 0.88rem;
    font-weight: 700;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    max-width: 100%;
  }
  .adm-card-badge {
    font-size: 0.62rem;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 8px;
    background: rgba(6, 182, 212, 0.15);
    color: #38bdf8;
    white-space: nowrap;
  }
  .adm-card-sub {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    color: var(--adm-text-3);
    margin-top: 3px;
  }
  .adm-card-cat {
    text-transform: capitalize;
  }
  .adm-card-dot {
    opacity: 0.4;
  }
  .adm-status-tag {
    font-size: 0.62rem;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 4px;
  }
  .adm-status-tag.active {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
  }
  .adm-status-tag.hidden {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }

  /* Card Actions Toolbar */
  .adm-card-actions {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-top: 6px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    width: 100%;
    box-sizing: border-box;
  }
  .adm-icon-action {
    flex: 1;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--adm-border);
    color: var(--adm-text-2);
    height: 32px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.15s var(--adm-ease);
    padding: 0 4px;
  }
  .adm-action-lbl {
    font-size: 0.68rem;
    font-weight: 700;
  }
  .adm-icon-action:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }
  .adm-icon-action:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
  .adm-icon-action.active-eye {
    color: #4ade80;
  }
  .adm-icon-action.hidden-eye {
    color: #f87171;
    background: rgba(239, 68, 68, 0.08);
  }
  .adm-icon-action.danger:hover {
    background: #dc2626;
    border-color: #dc2626;
    color: #fff;
  }

  /* Presets Bar */
  .adm-presets-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    background: rgba(2, 132, 199, 0.08);
    border: 1px solid rgba(2, 132, 199, 0.2);
    padding: 8px 12px;
    border-radius: 10px;
    margin-bottom: 18px;
  }
  .adm-presets-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: #38bdf8;
  }
  .adm-presets-btns {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .adm-preset-pill {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f8fafc;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s var(--adm-ease);
  }
  .adm-preset-pill:hover {
    background: var(--adm-primary);
    border-color: var(--adm-primary);
    color: #fff;
  }

  /* Editor Panel (Right) */
  .adm-editor-panel {
    flex: 1;
    background: var(--adm-bg);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .adm-editor-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    padding: 40px 20px;
    color: var(--adm-text-3);
  }
  .adm-empty-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(2, 132, 199, 0.1);
    border: 1px solid rgba(2, 132, 199, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
  }
  .adm-editor-empty-state h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
  }
  .adm-editor-empty-state p {
    max-width: 360px;
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0 0 18px;
  }

  /* Editor Form Wrapper */
  .adm-editor-form-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  /* Editor Header */
  .adm-editor-header {
    padding: 12px 20px;
    background: var(--adm-surface);
    border-bottom: 1px solid var(--adm-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: sticky;
    top: 0;
    z-index: 30;
  }
  .adm-back-btn {
    display: none;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--adm-border);
    border-radius: 8px;
    color: #fff;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
  }
  .adm-editor-header-title {
    flex: 1;
    min-width: 0;
  }
  .adm-editor-header-title h3 {
    font-size: 1.05rem;
    font-weight: 800;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .adm-editor-slug {
    font-size: 0.7rem;
    color: var(--adm-primary);
    font-family: monospace;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .adm-editor-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  /* Tabs Bar */
  .adm-editor-tabs-bar {
    display: flex;
    gap: 4px;
    padding: 8px 16px;
    background: rgba(15, 23, 42, 0.6);
    border-bottom: 1px solid var(--adm-border);
    overflow-x: auto;
    scrollbar-width: none;
    flex-shrink: 0;
  }
  .adm-editor-tabs-bar::-webkit-scrollbar {
    display: none;
  }
  .adm-tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: 8px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--adm-text-2);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s var(--adm-ease);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .adm-tab-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
  .adm-tab-btn.active {
    background: var(--adm-surface-container);
    border-color: var(--adm-border);
    color: #38bdf8;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  /* Body Split */
  .adm-editor-body-split {
    display: flex;
    padding: 20px;
    gap: 20px;
    align-items: flex-start;
    flex: 1;
  }
  .adm-form-content {
    flex: 1;
    min-width: 0;
  }
  .adm-form-card {
    background: var(--adm-surface-container);
    border: 1px solid var(--adm-border);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  .adm-card-header {
    margin-bottom: 16px;
  }
  .adm-card-header h4 {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0 0 3px;
    color: #fff;
  }
  .adm-card-header p {
    font-size: 0.78rem;
    color: var(--adm-text-3);
    margin: 0;
  }

  /* Visibility Toggle Box */
  .adm-visibility-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--adm-border);
    margin-bottom: 20px;
    gap: 12px;
  }
  .adm-vis-info {
    flex: 1;
    min-width: 0;
  }
  .adm-vis-label {
    font-size: 0.84rem;
    font-weight: 700;
    color: #fff;
    display: block;
    margin-bottom: 2px;
  }
  .adm-vis-sub {
    font-size: 0.74rem;
    color: var(--adm-text-3);
    margin: 0;
    line-height: 1.35;
  }
  .adm-toggle-switch {
    position: relative;
    width: 82px;
    height: 34px;
    border-radius: 20px;
    background: #334155;
    border: 2px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.25s var(--adm-ease);
    padding: 2px;
    flex-shrink: 0;
  }
  .adm-toggle-switch.active {
    background: #16a34a;
    border-color: #22c55e;
  }
  .adm-toggle-handle {
    position: absolute;
    top: 3px;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.25s var(--adm-ease);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  .adm-toggle-switch.active .adm-toggle-handle {
    transform: translateX(46px);
  }
  .adm-toggle-text {
    position: absolute;
    font-size: 0.68rem;
    font-weight: 800;
    color: #fff;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
  }
  .adm-toggle-switch.active .adm-toggle-text {
    right: auto;
    left: 8px;
  }

  /* Form Controls */
  .adm-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .adm-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .adm-field.full-width {
    grid-column: 1 / -1;
  }
  .adm-label {
    font-size: 0.74rem;
    font-weight: 700;
    color: var(--adm-text-2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .adm-label em {
    font-style: normal;
    font-weight: 400;
    color: var(--adm-text-3);
    text-transform: none;
    letter-spacing: 0;
  }
  .adm-label .req {
    color: #ef4444;
  }
  .adm-input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--adm-border);
    background: rgba(255, 255, 255, 0.04);
    color: #fff;
    font-size: 0.88rem;
    outline: none;
    transition: all 0.2s var(--adm-ease);
    box-sizing: border-box;
  }
  .adm-input:focus {
    border-color: var(--adm-primary);
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.25);
    background: rgba(255, 255, 255, 0.07);
  }
  .adm-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .adm-input.select {
    cursor: pointer;
    background-color: #0f172a;
  }
  .adm-input.textarea {
    resize: vertical;
    min-height: 85px;
    line-height: 1.5;
  }
  .adm-hint {
    font-size: 0.7rem;
    color: var(--adm-text-3);
  }

  /* Dropzone */
  .adm-dropzone {
    border: 2px dashed rgba(2, 132, 199, 0.35);
    background: rgba(2, 132, 199, 0.03);
    border-radius: 14px;
    padding: 28px 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s var(--adm-ease);
    margin-bottom: 16px;
  }
  .adm-dropzone:hover, .adm-dropzone.hover {
    border-color: var(--adm-primary);
    background: rgba(2, 132, 199, 0.08);
  }
  .adm-dropzone h5 {
    font-size: 0.9rem;
    font-weight: 700;
    margin: 8px 0 3px;
    color: #fff;
  }
  .adm-dropzone p {
    font-size: 0.74rem;
    color: var(--adm-text-3);
    margin: 0;
  }
  .adm-upload-progress {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(2, 132, 199, 0.1);
    border: 1px solid rgba(2, 132, 199, 0.2);
    border-radius: 8px;
    font-size: 0.78rem;
    color: #38bdf8;
    margin-bottom: 14px;
  }
  .adm-image-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 10px;
    margin-bottom: 14px;
  }
  .adm-image-item {
    position: relative;
    aspect-ratio: 1;
    border-radius: 10px;
    background: #000;
    border: 2px solid var(--adm-border);
    overflow: hidden;
  }
  .adm-image-item.is-main {
    border-color: var(--adm-primary);
    box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.3);
  }
  .adm-main-badge {
    position: absolute;
    top: 4px;
    left: 4px;
    background: var(--adm-primary);
    color: #fff;
    font-size: 0.55rem;
    font-weight: 800;
    padding: 2px 5px;
    border-radius: 4px;
    z-index: 2;
  }
  .adm-gallery-thumb {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }
  .adm-image-actions {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    opacity: 0;
    transition: opacity 0.2s var(--adm-ease);
  }
  .adm-image-item:hover .adm-image-actions {
    opacity: 1;
  }
  .adm-img-btn {
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.68rem;
    font-weight: 700;
    border: none;
    background: #fff;
    color: #000;
    cursor: pointer;
  }
  .adm-img-btn.danger {
    background: #ef4444;
    color: #fff;
  }
  .adm-manual-url {
    margin-top: 10px;
    font-size: 0.78rem;
    color: var(--adm-text-3);
  }
  .adm-manual-url summary {
    cursor: pointer;
    font-weight: 600;
  }
  .adm-manual-url-box {
    display: flex;
    gap: 6px;
    margin-top: 6px;
  }

  /* Dynamic Spec & Feature rows */
  .adm-dyn-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .adm-dyn-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .adm-dyn-spec-item {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 8px;
    align-items: center;
  }
  .adm-del-row-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.25);
    color: #f87171;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s var(--adm-ease);
  }
  .adm-del-row-btn:hover {
    background: #ef4444;
    color: #fff;
  }
  .adm-add-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: rgba(2, 132, 199, 0.08);
    border: 1.5px dashed rgba(2, 132, 199, 0.3);
    border-radius: 8px;
    color: #38bdf8;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    width: fit-content;
    margin-top: 4px;
    transition: all 0.2s var(--adm-ease);
  }
  .adm-add-btn:hover {
    background: var(--adm-primary);
    border-style: solid;
    color: #fff;
  }
  .adm-divider {
    border: none;
    border-top: 1px solid var(--adm-border);
    margin: 20px 0;
  }

  /* Preview Column (Right) */
  .adm-preview-column {
    width: 300px;
    flex-shrink: 0;
    position: sticky;
    top: 70px;
  }
  .adm-preview-card-wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .adm-preview-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--adm-text-3);
  }
  .preview-box {
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  /* WhatsApp Simulator */
  .adm-wa-sim-wrap {
    background: var(--adm-surface-container);
    border: 1px solid var(--adm-border);
    border-radius: 14px;
    padding: 14px;
  }
  .text-wa {
    color: #25d366;
  }
  .adm-wa-bubble {
    background: #005c4b;
    border-radius: 10px 10px 0 10px;
    padding: 10px 12px;
    margin: 8px 0;
  }
  .adm-wa-msg-text {
    font-size: 0.78rem;
    color: #fff;
    margin-bottom: 6px;
  }
  .adm-wa-link-card {
    background: #022c22;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .adm-wa-img {
    width: 100%;
    height: 110px;
    object-fit: contain;
    background: #000;
  }
  .adm-wa-card-text {
    padding: 6px 8px;
  }
  .adm-wa-card-text h6 {
    font-size: 0.78rem;
    font-weight: 700;
    margin: 0 0 2px;
    color: #fff;
  }
  .adm-wa-card-text p {
    font-size: 0.7rem;
    color: #94a3b8;
    margin: 0 0 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .adm-wa-domain {
    font-size: 0.65rem;
    color: #25d366;
    font-weight: 600;
  }
  .adm-wa-actions {
    display: flex;
    gap: 6px;
  }
  .adm-btn-wa {
    background: #25d366;
    color: #fff;
    flex: 1;
    justify-content: center;
    padding: 7px 8px;
    font-size: 0.74rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
  }

  /* Sticky Save Bar (M3 Floating Action Bar) */
  .adm-sticky-save-bar {
    position: sticky;
    bottom: 0;
    background: rgba(11, 17, 32, 0.96);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--adm-border);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 40;
    margin-top: auto;
  }
  .adm-save-bar-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .adm-save-status-pill {
    font-size: 0.8rem;
    font-weight: 700;
  }

  /* General Buttons */
  .adm-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 0.15s var(--adm-ease);
    text-decoration: none;
  }
  .adm-btn.btn-lg {
    padding: 10px 20px;
    font-size: 0.88rem;
  }
  .adm-btn-primary {
    background: #0284c7;
    color: #fff;
  }
  .adm-btn-primary:hover {
    background: #0369a1;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(2, 132, 199, 0.35);
  }
  .adm-btn-outline-sm {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--adm-border);
    color: var(--adm-text-2);
  }
  .adm-btn-outline-sm:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }
  .adm-btn-danger {
    background: transparent;
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #f87171;
  }
  .adm-btn-danger:hover {
    background: #ef4444;
    color: #fff;
  }

  /* Toast (Material Design 3 SnackBar) */
  .adm-toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(40px);
    opacity: 0;
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    padding: 10px 18px;
    border-radius: 40px;
    font-size: 0.82rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    pointer-events: none;
    z-index: 9999;
  }
  .adm-toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  .adm-toast.ok {
    background: #15803d;
    border-color: #22c55e;
  }
  .adm-toast.err {
    background: #b91c1c;
    border-color: #ef4444;
  }

  .text-primary { color: #38bdf8; }
  .text-success { color: #4ade80; }
  .text-warning { color: #fbbf24; }
  .text-cyan { color: #22d3ee; }
  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

  /* Responsive Mobile Breakpoints */
  @media (max-width: 1100px) {
    .adm-editor-body-split {
      flex-direction: column;
    }
    .adm-preview-column {
      width: 100%;
      position: static;
    }
    .preview-box {
      max-width: 320px;
    }
  }

  @media (max-width: 768px) {
    .adm-topbar {
      padding: 0 10px;
    }
    .hide-mobile {
      display: none !important;
    }
    .adm-sidebar-panel {
      width: 100%;
      min-width: unset;
      border-right: none;
    }
    .adm-sidebar-panel.hide-on-mobile-when-editing {
      display: none !important;
    }
    .adm-editor-panel.hide-on-mobile-when-empty {
      display: none !important;
    }
    .adm-editor-panel {
      width: 100%;
      height: 100%;
    }
    .adm-back-btn {
      display: inline-flex;
    }
    .adm-editor-header {
      padding: 10px 12px;
    }
    .adm-editor-tabs-bar {
      padding: 6px 10px;
    }
    .adm-editor-body-split {
      padding: 12px;
    }
    .adm-form-card {
      padding: 14px;
      border-radius: 12px;
    }
    .adm-form-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .adm-sticky-save-bar {
      padding: 10px 12px;
      padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
    }
    .adm-save-bar-left {
      width: 100%;
      gap: 8px;
    }
    .adm-save-bar-left .adm-btn {
      flex: 1;
      justify-content: center;
      padding: 9px 10px;
      font-size: 0.82rem;
    }
  }

  @media (max-width: 480px) {
    .hide-360 {
      display: none !important;
    }
    .adm-metrics-row {
      padding: 8px;
      gap: 4px;
    }
    .adm-metric-num {
      font-size: 0.95rem;
    }
    .adm-metric-label {
      font-size: 0.6rem;
    }
    .adm-panel-head {
      padding: 10px;
      gap: 8px;
    }
    .adm-product-list {
      padding: 8px;
      gap: 8px;
    }
    .adm-product-card {
      padding: 10px;
    }
    .adm-card-main-row {
      gap: 8px;
    }
    .adm-thumb-wrapper {
      width: 40px;
      height: 40px;
    }
    .adm-card-title {
      font-size: 0.84rem;
    }
    .adm-card-actions {
      gap: 4px;
      padding-top: 6px;
    }
    .adm-icon-action {
      height: 30px;
      padding: 0 2px;
    }
    .adm-action-lbl {
      font-size: 0.64rem;
    }
    .adm-dyn-spec-item {
      grid-template-columns: 1fr;
      gap: 6px;
      background: rgba(255, 255, 255, 0.02);
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--adm-border);
    }
    .adm-dyn-spec-item .adm-del-row-btn {
      width: 100%;
      height: 30px;
      border-radius: 6px;
    }
  }
`;
