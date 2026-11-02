"use client";

import { useState } from "react";

// Tab strip for the homepage concepts; panels are rendered on the server and passed in.
export function ConceptTabs({ tabs, className = "" }: { tabs: { label: string; panel: React.ReactNode }[]; className?: string }) {
    const [active, setActive] = useState(0);
    return (
        <div className={className}>
            <div role="tablist" className="ctabs-list">
                {tabs.map((tab, i) => (
                    <button key={tab.label} type="button" role="tab" aria-selected={i === active} className={i === active ? "is-active" : ""} onClick={() => setActive(i)}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div role="tabpanel" className="ctabs-panel">{tabs[active].panel}</div>
        </div>
    );
}
