import { Fraunces, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

import type { Concept } from "@/lib/concepts";

// Display faces used only by the homepage concepts; the main site stays on Plus Jakarta Sans.
const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export function ConceptFrame({ concept, brand = "Tidewell", children }: { concept: Concept; brand?: string; children: React.ReactNode }) {
    return (
        <div className={`cframe cframe-${concept.slug} ${serif.variable} ${mono.variable}`}>
            <div className="cframe-bar">
                <Link href="/concepts">← All concepts</Link>
                <span>Concept {concept.number} · <strong>{concept.name}</strong></span>
            </div>
            {children}
            <footer className="cframe-footer">
                <p>
                    {brand} is a fictional clinic created to demonstrate a <a href="https://www.medfunnels.app">medFunnels</a> integration. It is not a
                    healthcare provider, and nothing here is medical advice. Treatments, prices, results and quotes are illustrative.
                </p>
                <p><Link href="/">Main site</Link> · <Link href="/concepts">Concepts</Link></p>
            </footer>
        </div>
    );
}
