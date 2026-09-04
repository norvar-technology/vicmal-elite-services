import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WholesaleBanner() {
  const link = buildWhatsAppLink(
    WHATSAPP_NUMBER,
    "Hi Vicmal Elite Services, I'd like to discuss wholesale pricing for a bulk order."
  );

  return (
    <section className="container-page py-6">
      <div className="rounded-2xl bg-circuit-600 p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="nameplate text-xs text-white/70 mb-2">For shops &amp; resellers</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white max-w-xl">
            Buying in bulk? Get wholesale rates on every category.
          </h2>
          <p className="text-white/80 mt-3 max-w-xl text-sm md:text-base">
            MOQ-based pricing on genuine MICH PRO earbuds, chargers, powerbanks, cords
            and batteries — with priority stock allocation for repeat partners.
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-void text-white text-sm font-bold hover:bg-black transition-colors focus-ring whitespace-nowrap"
        >
          Talk to Sales <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
