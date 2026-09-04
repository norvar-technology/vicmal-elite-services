"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { WHATSAPP_NUMBER, SITE_NAME } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface ChatMessage {
  id: number;
  from: "bot" | "user";
  text: string;
}

const INTRO: ChatMessage = {
  id: 0,
  from: "bot",
  text: `Hi 👋 Welcome to ${SITE_NAME}! Ask us about a product, wholesale pricing, or delivery — type below and tap Send to continue on WhatsApp.`,
};

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO]);
  const [draft, setDraft] = useState("");
  const [name, setName] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function addMessage() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: prev.length, from: "user", text }]);
    setDraft("");
  }

  function sendToWhatsApp() {
    const userTexts = messages.filter((m) => m.from === "user").map((m) => m.text);
    const pending = draft.trim();
    const allTexts = pending ? [...userTexts, pending] : userTexts;

    const finalMessage = [
      `Hi ${SITE_NAME} 👋`,
      name ? `My name is ${name}.` : "",
      "",
      allTexts.length > 0 ? allTexts.join("\n") : "I'd like to know more about your products.",
    ]
      .filter(Boolean)
      .join("\n");

    const link = buildWhatsAppLink(WHATSAPP_NUMBER, finalMessage);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-glow hover:scale-105 transition-transform focus-ring"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[92vw] max-w-sm h-[70vh] max-h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-line/60 flex flex-col bg-[#0b141a] animate-fade-up">
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#25D366]/20 grid place-items-center text-white font-display">
              V
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{SITE_NAME}</p>
              <p className="text-white/70 text-xs">Typically replies within minutes</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-white/80 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-2"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23111b21%22/></svg>')",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                  m.from === "bot"
                    ? "bg-[#202c33] text-white/90 rounded-tl-none"
                    : "bg-[#005c4b] text-white ml-auto rounded-tr-none"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-[#0b141a] border-t border-white/5 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full bg-[#202c33] text-white text-xs placeholder:text-white/40 rounded-full px-3 py-1.5 outline-none focus-ring"
            />
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMessage();
                  }
                }}
                placeholder="Type a message"
                className="flex-1 bg-[#202c33] text-white text-sm placeholder:text-white/40 rounded-full px-4 py-2.5 outline-none focus-ring"
              />
              <button
                onClick={addMessage}
                aria-label="Add message"
                className="h-10 w-10 shrink-0 grid place-items-center rounded-full bg-[#202c33] text-white/80 hover:text-white focus-ring"
              >
                <Send size={16} />
              </button>
            </div>
            <button
              onClick={sendToWhatsApp}
              className="w-full py-2.5 rounded-full bg-[#25D366] text-[#0b141a] text-sm font-semibold hover:opacity-90 transition-opacity focus-ring"
            >
              Continue on WhatsApp →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
