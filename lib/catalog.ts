// The demo clinic's catalog. Prices are illustrative. Each category starts the questionnaire whose slug or title
// matches its keywords; if none matches, the first questionnaire this build synced (see lib/programs.ts).
import { listPrograms } from "./programs";

export interface Treatment {
    name: string;
    detail: string;
    price: number;
    badge?: string;
}

export interface Category {
    id: "sexual" | "weight" | "longevity";
    name: string;
    tagline: string;
    from: number;
    keywords: string[];
    tint: string;
    treatments: Treatment[];
}

export const CATEGORIES: Category[] = [
    {
        id: "sexual", name: "Sexual Health", tagline: "Bring back the spark.", from: 36, keywords: ["sexual", "erect"], tint: "sand",
        treatments: [
            { name: "Sildenafil", detail: "Generic Viagra®. Take as needed.", price: 36, badge: "Most popular" },
            { name: "Tadalafil", detail: "Generic Cialis®. Daily or as needed.", price: 45 },
        ],
    },
    {
        id: "weight", name: "Weight Loss", tagline: "GLP-1 care, personalized.", from: 199, keywords: ["weight", "glp", "sema", "tirz"], tint: "lilac",
        treatments: [
            { name: "Semaglutide", detail: "Weekly GLP-1 injection.", price: 199 },
            { name: "Tirzepatide", detail: "Weekly GLP-1 + GIP injection.", price: 299, badge: "New" },
        ],
    },
    {
        id: "longevity", name: "Longevity", tagline: "Energy that shows up.", from: 90, keywords: ["longevity", "nad", "aging", "energy"], tint: "mist",
        treatments: [
            { name: "NAD+", detail: "Cellular energy support.", price: 90 },
            { name: "Sermorelin", detail: "Peptide therapy for recovery and sleep.", price: 129 },
        ],
    },
];

/** Where "Get started" goes for a category: its matching questionnaire, else the first one. */
export function startHref(category?: Category): string {
    const programs = listPrograms();
    if (!programs.length) return "/#treatments";
    const match = category
        ? programs.find((program) => category.keywords.some((word) => `${program.slug} ${program.name}`.toLowerCase().includes(word)))
        : undefined;
    return `/start/${(match ?? programs[0]).slug}`;
}
