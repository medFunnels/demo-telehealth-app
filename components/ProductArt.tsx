// Drawn product shots (no photos needed): a vial, a pill bottle and a shipping box in the brand style.
const LABEL = "#ffffff";

export function Vial({ cap = "#0e3b43", liquid = "#cfe6e1", name = "", x = 0, y = 0, scale = 1 }: { cap?: string; liquid?: string; name?: string; x?: number; y?: number; scale?: number }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <ellipse cx="50" cy="214" rx="46" ry="8" fill="rgba(14,59,67,0.12)" />
            <rect x="22" y="18" width="56" height="26" rx="6" fill={cap} />
            <rect x="26" y="40" width="48" height="10" rx="2" fill="#d9dfde" />
            <rect x="12" y="48" width="76" height="164" rx="16" fill="rgba(255,255,255,0.55)" stroke="rgba(14,59,67,0.18)" />
            <rect x="16" y="120" width="68" height="88" rx="12" fill={liquid} opacity="0.85" />
            <rect x="12" y="84" width="76" height="70" fill={LABEL} />
            <text x="50" y="108" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#0e3b43">TIDEWELL</text>
            <text x="50" y="126" textAnchor="middle" fontSize="9" fill="#4b5d5f">{name}</text>
            <text x="50" y="143" textAnchor="middle" fontSize="7" fill="#8a9799">Rx only</text>
            <rect x="20" y="56" width="8" height="140" rx="4" fill="rgba(255,255,255,0.7)" />
        </g>
    );
}

export function Bottle({ cap = "#0e3b43", body = "#ffffff", name = "", x = 0, y = 0, scale = 1 }: { cap?: string; body?: string; name?: string; x?: number; y?: number; scale?: number }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <ellipse cx="70" cy="226" rx="64" ry="9" fill="rgba(14,59,67,0.12)" />
            <rect x="22" y="10" width="96" height="40" rx="10" fill={cap} />
            <rect x="16" y="46" width="108" height="176" rx="22" fill={body} stroke="rgba(14,59,67,0.12)" />
            <rect x="16" y="96" width="108" height="84" fill="#f3efe7" />
            <text x="70" y="128" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="2" fill="#0e3b43">TIDEWELL</text>
            <text x="70" y="148" textAnchor="middle" fontSize="10" fill="#4b5d5f">{name}</text>
            <text x="70" y="166" textAnchor="middle" fontSize="8" fill="#8a9799">30 tablets · Rx only</text>
            <rect x="26" y="56" width="10" height="150" rx="5" fill="rgba(255,255,255,0.6)" />
        </g>
    );
}

export function Box({ x = 0, y = 0, scale = 1, color = "#0e3b43" }: { x?: number; y?: number; scale?: number; color?: string }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <ellipse cx="120" cy="168" rx="116" ry="10" fill="rgba(14,59,67,0.12)" />
            <path d="M8 40 L120 8 L232 40 L232 152 L120 176 L8 152 Z" fill={color} />
            <path d="M8 40 L120 70 L232 40 L120 8 Z" fill="rgba(255,255,255,0.14)" />
            <path d="M120 70 L120 176" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
            <text x="64" y="118" textAnchor="middle" fontSize="16" fontWeight="700" letterSpacing="3" fill="#fff" transform="skewY(14) translate(0 -18)">tidewell</text>
        </g>
    );
}

/** Product art for each category card and the hero. */
export function ProductScene({ kind }: { kind: "hero" | "sexual" | "weight" | "longevity" }) {
    if (kind === "hero") {
        return (
            <svg viewBox="0 0 520 380" className="scene" role="img" aria-label="Tidewell treatments: a shipping box, a pill bottle and two vials">
                <Box x={40} y={170} scale={1.05} />
                <Bottle x={250} y={110} name="Sildenafil 50 mg" />
                <Vial x={380} y={128} name="Semaglutide" cap="#7c6bc4" liquid="#e4ddfa" />
                <Vial x={440} y={160} scale={0.82} name="NAD+" cap="#c9862e" liquid="#f6e5c8" />
            </svg>
        );
    }
    if (kind === "sexual") {
        return (
            <svg viewBox="0 0 300 250" className="scene" aria-hidden="true">
                <Bottle x={40} y={14} name="Sildenafil" cap="#c4552b" />
                <Bottle x={150} y={40} scale={0.85} name="Tadalafil" cap="#0e3b43" />
            </svg>
        );
    }
    if (kind === "weight") {
        return (
            <svg viewBox="0 0 300 250" className="scene" aria-hidden="true">
                <Vial x={60} y={8} name="Semaglutide" cap="#7c6bc4" liquid="#e4ddfa" />
                <Vial x={160} y={30} scale={0.9} name="Tirzepatide" cap="#4a3f8f" liquid="#d8d0f5" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 300 250" className="scene" aria-hidden="true">
            <Vial x={50} y={8} name="NAD+" cap="#c9862e" liquid="#f6e5c8" />
            <Vial x={155} y={30} scale={0.9} name="Sermorelin" cap="#0e3b43" liquid="#cfe6e1" />
        </svg>
    );
}
