import React from "react";
import { Phone, Clock } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <div className="contact-info">
          <a href="tel:+919173096727" className="announce-link">
            <Phone className="icon-sm text-turquoise" size={14} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
            <span>+91 91730 96727</span>
          </a>
          <span className="divider">|</span>
          <span className="announce-text">
            <Clock className="icon-sm text-turquoise" size={14} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
            <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
          </span>
        </div>
        <div className="announce-badge">
          Emergency Service Available
        </div>
      </div>
    </div>
  );
}
