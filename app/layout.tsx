import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: { default: "Tidewell · Online care from licensed clinicians", template: "%s · Tidewell" },
    description: "Tidewell is a fictional telehealth clinic: a demo of a medFunnels integration. MIT-licensed code, free to reuse.",
};

export const viewport: Viewport = { themeColor: "#0e3b43" };

const REPO = "https://github.com/medFunnels/demo-telehealth-app";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={sans.variable} data-scroll-behavior="smooth">
            <body>
                <div className="announce">
                    <span className="announce-long"><strong>Demo site</strong> · A fictional clinic demonstrating a <a href="https://www.medfunnels.app">medFunnels</a> integration. Don&apos;t enter real health information.</span>
                    <span className="announce-short"><strong>Demo site</strong> · A <a href="https://www.medfunnels.app">medFunnels</a> integration demo</span>
                    <a href={REPO} className="announce-link"><span className="announce-long">MIT-licensed code, free to reuse →</span><span className="announce-short">MIT code →</span></a>
                </div>
                {children}
            </body>
        </html>
    );
}
