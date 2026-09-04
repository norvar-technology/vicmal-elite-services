import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page py-28 text-center">
      <Compass size={40} className="mx-auto text-mist mb-5" />
      <h1 className="font-display text-3xl text-chalk mb-3">Page not found</h1>
      <p className="text-mist mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-power-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity focus-ring"
      >
        Back to Home
      </Link>
    </div>
  );
}
