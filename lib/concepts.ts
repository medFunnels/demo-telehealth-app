export type Concept = {
    slug: "hearth" | "signal" | "formulary" | "bloom" | "pulse" | "overdrive";
    number: string;
    name: string;
    summary: string;
    tint: "mist" | "sand" | "lilac" | "blush" | "peach" | "moss";
    href: string;
    // Mobbin sections the concept borrows patterns from (layout ideas only, never copy or branding).
    references: { site: string; pattern: string; url: string }[];
};

export const CONCEPTS: Concept[] = [
    {
        slug: "hearth", number: "01", name: "Hearth", tint: "sand", href: "/concepts/hearth",
        summary: "Oriel, a fictional longevity brand in the style of Function. Cream and terracotta, light serif headlines with italic accents, a $1-a-day membership card, soft step cards and a story wall.",
        references: [
            { site: "Function", pattern: "Serif hero with italic price line", url: "https://mobbin.com/sites/sections/aca08215-3663-4656-ab5c-a9be1081dfc4" },
            { site: "Function", pattern: "“What could cost you $15,000 is $365”", url: "https://mobbin.com/sites/sections/a4e3f14f-e77d-4c33-b31c-54b6c4cadf54" },
            { site: "Function", pattern: "Three soft step cards with mini UI", url: "https://mobbin.com/sites/sections/0767f6cf-cb58-4ea6-9039-a778f50aba8d" },
            { site: "Function", pattern: "Membership card and footer card", url: "https://mobbin.com/sites/sections/f5d5c740-7af0-4718-9893-3b8e80e39eed" },
        ],
    },
    {
        slug: "signal", number: "02", name: "Signal", tint: "lilac", href: "/concepts/signal",
        summary: "Dark and data-led. Monospace labels, biomarker and biological-age cards, a protocol you build from your labs, and one bright accent colour.",
        references: [
            { site: "Superpower", pattern: "Bracketed [1] [2] steps with data cards", url: "https://mobbin.com/sites/sections/243118d9-6810-4b04-ba20-31e2040d0463" },
            { site: "Superpower", pattern: "Grayscale goal tiles", url: "https://mobbin.com/sites/sections/b9c7f06e-7c9a-4cfe-bc4b-d2cf2bc69dfc" },
            { site: "Biograph", pattern: "Night hero with a stat row", url: "https://mobbin.com/sites/sections/b226f222-74f1-46a9-9015-b704a7e740ff" },
        ],
    },
    {
        slug: "formulary", number: "03", name: "Formulary", tint: "mist", href: "/concepts/formulary",
        summary: "Bright and product-led, in the style of Hims. A headline with one coloured word, a grid of goal tiles, product cards with prices, and compliance notes in plain sight.",
        references: [
            { site: "Hims", pattern: "Coloured-word hero over a goal-tile grid", url: "https://mobbin.com/sites/sections/2f955ac6-a176-4877-8348-f18d324bd6ee" },
            { site: "Hims", pattern: "Treatment cards with price and footnotes", url: "https://mobbin.com/sites/sections/0db7c930-3ebb-43aa-bcd5-df20e85fb192" },
            { site: "Hims", pattern: "Four-step “How it works” row", url: "https://mobbin.com/sites/sections/9014405b-dcc4-44ca-bc3a-c725a0dbb86a" },
        ],
    },
    {
        slug: "bloom", number: "04", name: "Bloom", tint: "blush", href: "/concepts/bloom",
        summary: "Wren, a fictional midlife women's health brand inspired by Hers. Soft blush and mint, an animated “hormone rhythm” hero, headlines in two tones, format chips (patch, pill, cream, peptide) and a comparison with in-person care.",
        references: [
            { site: "Hers", pattern: "“Care that evolves with you” waveform hero", url: "https://mobbin.com/screens/e8ccbd7a-56d2-4d52-a388-7efb1c38f382" },
            { site: "Hers", pattern: "Mint goal tiles with two-tone headline", url: "https://mobbin.com/screens/2e8b759a-3808-42a3-961c-d1941cee82a7" },
            { site: "Hers", pattern: "Patch / Pill / Cream format chips", url: "https://mobbin.com/screens/98d7c894-ab6c-4416-a834-336848ca25c6" },
            { site: "Hers", pattern: "Mosaic with HSA pill and lime checks", url: "https://mobbin.com/screens/f333b6bb-7fdf-45e4-a568-c5c3c56bb1dd" },
            { site: "Hers", pattern: "Online vs in-person comparison table", url: "https://mobbin.com/screens/d9786116-865a-4432-b366-7e3c082d59a8" },
        ],
    },
    {
        slug: "pulse", number: "05", name: "Pulse", tint: "peach", href: "/concepts/pulse",
        summary: "ember, a fictional longevity brand inspired by Superpower's bright side. A floating pill nav, a “digital twin” dashboard, product tabs, a marbled orange membership card, a lab-panel barcode and a giant gradient wordmark.",
        references: [
            { site: "Superpower", pattern: "Tablet dashboard with body “twin”", url: "https://mobbin.com/sites/sections/047654c6-d06f-4cda-b8a3-c7301567d930" },
            { site: "Superpower", pattern: "Feature tabs over a device", url: "https://mobbin.com/sites/sections/78f7b7da-0364-4ded-8900-0d35f5583a56" },
            { site: "Superpower", pattern: "Marbled membership card with pricing", url: "https://mobbin.com/sites/sections/9f0f69e1-cda3-4da2-9796-3dcc3751b8b8" },
            { site: "Superpower", pattern: "Lab panel chips with barcode strip", url: "https://mobbin.com/sites/sections/b36ee07b-1e4d-45d5-b39f-f4090292daa2" },
            { site: "Superpower", pattern: "Giant gradient wordmark footer", url: "https://mobbin.com/sites/sections/2e97efff-7b06-4fb2-ae67-2e33e2073eab" },
        ],
    },
    {
        slug: "overdrive", number: "06", name: "Overdrive", tint: "moss", href: "/concepts/overdrive",
        summary: "TORQUE, a fictional performance-medicine brand. Acid green on graphite, giant condensed type that runs off the page, crossing marquee bands, a sample protocol dashboard, mission rows that fill green on hover, and a 12-week timeline.",
        references: [
            { site: "The Performance Lab", pattern: "Giant type that runs off the page with split CTA", url: "https://mobbin.com/sites/sections/eca587d3-df1d-45ec-920b-9bbb15fd03ad" },
            { site: "The Performance Lab", pattern: "Mission statement with crosshair marks", url: "https://mobbin.com/sites/sections/8da262f1-ff5b-4152-a27a-85d99807d5f3" },
            { site: "GTE", pattern: "Dark hero with a /// slash accent", url: "https://mobbin.com/sites/sections/bf09f8aa-2241-453c-b0e2-b29d4868f345" },
        ],
    },
];

export function getConcept(slug: Concept["slug"]): Concept {
    return CONCEPTS.find((concept) => concept.slug === slug)!;
}
