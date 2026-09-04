"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BUSINESS, WHATSAPP_NUMBER } from "@/lib/constants";
import { buildGenericChatMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = buildGenericChatMessage(name, message || "I'd like to get in touch.");
    const link = buildWhatsAppLink(WHATSAPP_NUMBER, text);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="container-page py-14">
      <p className="nameplate text-xs text-circuit-400 mb-2">Contact</p>
      <h1 className="font-display text-3xl md:text-4xl text-chalk mb-4">
        We're a message away
      </h1>
      <p className="text-mist max-w-xl mb-12">
        Fastest response is on WhatsApp. Send us a message below and we'll pick it up
        directly in our chat — no waiting on email replies.
      </p>

      <div className="grid lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="card rounded-xl p-6 space-y-4">
          <label className="block">
            <span className="block text-xs text-mist mb-1.5">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Chidera Okafor"
              className="contact-input"
            />
          </label>
          <label className="block">
            <span className="block text-xs text-mist mb-1.5">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you're looking for..."
              rows={5}
              className="contact-input resize-none"
            />
          </label>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] text-[#0b141a] text-sm font-semibold hover:opacity-90 transition-opacity focus-ring"
          >
            <MessageCircle size={16} /> Send on WhatsApp
          </button>
        </form>

        <div className="space-y-4">
          <div className="card rounded-xl p-6 flex gap-3">
            <MapPin size={18} className="text-circuit-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-chalk">Store Address</p>
              <p className="text-sm text-mist mt-1">
                {BUSINESS.addressLine1}, {BUSINESS.addressLine2}, {BUSINESS.city}, {BUSINESS.state}, {BUSINESS.country}
              </p>
            </div>
          </div>
          <div className="card rounded-xl p-6 flex gap-3">
            <Phone size={18} className="text-circuit-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-chalk">Phone / WhatsApp</p>
              <p className="text-sm text-mist mt-1">{BUSINESS.phoneDisplay}</p>
            </div>
          </div>
          <div className="card rounded-xl p-6 flex gap-3">
            <Mail size={18} className="text-circuit-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-chalk">Email</p>
              <p className="text-sm text-mist mt-1">{BUSINESS.email}</p>
            </div>
          </div>
          <div className="card rounded-xl p-6 flex gap-3">
            <Clock size={18} className="text-circuit-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-chalk">Opening Hours</p>
              <p className="text-sm text-mist mt-1">{BUSINESS.openingHours}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid #232b3d;
          border-radius: 0.75rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #edeff5;
          outline: none;
        }
        .contact-input:focus {
          border-color: #4fc3ff;
        }
        .contact-input::placeholder {
          color: #5b6478;
        }
      `}</style>
    </div>
  );
}
