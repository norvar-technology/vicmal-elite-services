import StructuredData from "./StructuredData";

const FAQS = [
  {
    q: "Does Vicmal Elite Services sell wholesale to shop owners?",
    a: "Yes. Every product page shows a wholesale price and minimum order quantity (MOQ) alongside the retail price. For custom bulk quotes, message us on WhatsApp.",
  },
  {
    q: "Where is Vicmal Elite Services located?",
    a: "We are based in Owerri, Imo State, Nigeria, and ship nationwide. Local pickup is available for Owerri-based customers at checkout.",
  },
  {
    q: "Are the earbuds, chargers and other accessories genuine?",
    a: "Yes. Every unit is quality-checked before it ships and comes with a warranty ranging from 3 to 12 months depending on the product category.",
  },
  {
    q: "How do I pay for an order?",
    a: "Checkout is secured by Paystack and accepts cards, bank transfer, and USSD. Your order is confirmed automatically once payment is verified.",
  },
  {
    q: "Can I track my order or ask questions after paying?",
    a: "After a successful payment, you're redirected to WhatsApp with your order details pre-filled so our team can confirm delivery immediately.",
  },
];

export default function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="container-page py-16">
      <StructuredData data={faqSchema} />
      <p className="nameplate text-xs text-circuit-400 mb-2">FAQ</p>
      <h2 className="font-display text-2xl md:text-3xl text-chalk mb-8">
        Common questions
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {FAQS.map((f) => (
          <div key={f.q} className="card rounded-xl p-5">
            <h3 className="text-sm font-medium text-chalk mb-2">{f.q}</h3>
            <p className="text-sm text-mist leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
