// Demo pricing. Choosing a plan reports a conversion (name + amount) to medFunnels Analytics.
export interface Plan {
    id: string;
    name: string;
    blurb: string;
    price: number;
    cadence: string;
    popular?: boolean;
    features: string[];
}

export const PLANS: Plan[] = [
    {
        id: "monthly",
        name: "Monthly",
        blurb: "Flexible care, month to month.",
        price: 129,
        cadence: "/month",
        features: ["Clinician review within 24 hours", "Unlimited messaging with your care team", "Free shipping", "Cancel anytime"],
    },
    {
        id: "quarterly",
        name: "3 months",
        blurb: "Our best value for steady progress.",
        price: 329,
        cadence: "/3 months",
        popular: true,
        features: ["Everything in Monthly", "Quarterly check-in with your provider", "Same price if your dose changes", "Save 15%"],
    },
];

export const CONVERSION_NAME = process.env.MEDFUNNELS_CONVERSION || "purchased";
