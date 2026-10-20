// Small inline icons (no icon library needed).
type Props = { className?: string; size?: number };

function Svg({ size = 20, className, children }: Props & { children: React.ReactNode }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            {children}
        </svg>
    );
}

export const ArrowRight = (p: Props) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const Check = (p: Props) => <Svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>;
export const Shield = (p: Props) => <Svg {...p}><path d="M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6l7-3z" /><path d="M9 12l2 2 4-4" /></Svg>;
export const Clock = (p: Props) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>;
export const Lock = (p: Props) => <Svg {...p}><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" /></Svg>;
export const Stethoscope = (p: Props) => <Svg {...p}><path d="M6 3v5a4 4 0 008 0V3" /><path d="M10 12v2.5a5 5 0 0010 0V13" /><circle cx="20" cy="11" r="2" /></Svg>;
export const Sparkle = (p: Props) => <Svg {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></Svg>;
export const Pill = (p: Props) => <Svg {...p}><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.5 9.5l5 5" /></Svg>;
export const Chat = (p: Props) => <Svg {...p}><path d="M20 12a7.5 7.5 0 01-11 6.6L4 20l1.4-4.6A7.5 7.5 0 1120 12z" /></Svg>;
export const Code = (p: Props) => <Svg {...p}><path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" /></Svg>;
export const Chart = (p: Props) => <Svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></Svg>;
export const Plus = (p: Props) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>;
export const Github = ({ size = 20, className }: Props) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 015 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0022 12.2C22 6.6 17.5 2 12 2z" />
    </svg>
);
export const Star = ({ size = 16, className }: Props) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8L12 2.8z" /></svg>
);
export const Truck = (p: Props) => <Svg {...p}><path d="M3 6.5h11v9H3zM14 10h4l3 3v2.5h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></Svg>;
export const Heart = (p: Props) => <Svg {...p}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z" /></Svg>;
export const Bolt = (p: Props) => <Svg {...p}><path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z" /></Svg>;
export const Scale = (p: Props) => <Svg {...p}><rect x="3.5" y="4" width="17" height="16" rx="4" /><path d="M9 9.5a4 4 0 016 0M12 9.5l1.2-1.8" /></Svg>;
export const Card = (p: Props) => <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h3" /></Svg>;
export const Close = (p: Props) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
