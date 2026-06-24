'use client';

import React, { useState } from "react";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; service?: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = true;

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) newErrors.phone = true;

    if (!service) newErrors.service = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const message = `Hi Shivam Water Solution,\nI would like to book a service:\n- Name: ${name.trim()}\n- Mobile: ${phone.trim()}\n- Service Type: ${service}`;
    const waUrl = `https://wa.me/919173096727?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setName("");
    setPhone("");
    setService("");
  };

  return (
    <div className="booking-form-card">
      <h2>Book a Service</h2>
      <p>Schedule a technician visit or installation in 60 seconds.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="booking-name">Your Name</label>
          <input
            type="text"
            id="booking-name"
            className="form-input"
            placeholder="e.g. Jayesh Patel"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: false });
            }}
            style={errors.name ? { borderColor: "var(--color-danger)", boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)" } : {}}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="booking-phone">Mobile Number</label>
          <input
            type="tel"
            id="booking-phone"
            className="form-input"
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: false });
            }}
            style={errors.phone ? { borderColor: "var(--color-danger)", boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)" } : {}}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="booking-service">Service Required</label>
          <select
            id="booking-service"
            className="form-select"
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              if (errors.service) setErrors({ ...errors, service: false });
            }}
            style={errors.service ? { borderColor: "var(--color-danger)", boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)" } : {}}
            required
          >
            <option value="" disabled>Select service / સેવા પસંદ કરો...</option>
            <option value="General Maintenance">General Maintenance / જનરલ સર્વિસ</option>
            <option value="Filter Replacement">Filter Replacement / ફિલ્ટર બદલવા</option>
            <option value="Repair / Leakage">RO Repair / રીપેરીંગ અને લીકેજ</option>
            <option value="New Installation">New RO Installation / નવું ઇન્સ્ટોલેશન</option>
            <option value="Water Quality Testing">Water TDS testing / પાણીનું ટીડીએસ ચેક કરવું</option>
            <option value="Commercial Plant">Commercial Plant AMC / કોમર્શિયલ પ્લાન્ટ</option>
          </select>
        </div>
        <button type="submit" className="btn btn-whatsapp" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%" }}>
          <svg className="icon-whatsapp-svg icon-xs" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Book via WhatsApp
        </button>
      </form>
    </div>
  );
}
