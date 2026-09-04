import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amarachi.",
    role: "Business owner, Owerri",
    quote:
      "The power bank i got is like an over protective boyfriend, I'm rest assured i'm not having a flat battery anytime soon.",
  },
  {
    name: "Martins",
    role: "Owerri",
    quote:
      "The bass and sound of my earbuds is awesome! I love it.",
  },
  {
    name: "Ngozi I.",
    role: "University student, FUTO",
    quote:
      "The charger charges my phone very fast like follow come charger.",
  },
];

export default function Testimonials() {
  return (
    <section className="container-page py-16">
      <p className="nameplate text-xs text-circuit-400 mb-2">Customers</p>
      <h2 className="font-display text-2xl md:text-3xl text-chalk mb-8">
        Trusted across Owerri and beyond
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="card rounded-xl p-5 flex flex-col">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-signal-500 text-signal-500" />
              ))}
            </div>
            <p className="text-sm text-chalk/90 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4">
              <p className="text-sm font-medium text-chalk">{t.name}</p>
              <p className="text-xs text-mist">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
