import Link from "next/link";

export function Logo({ light }: { light?: boolean }) {
    return (
        <Link href="/" className={`logo${light ? " logo-light" : ""}`} aria-label="Tidewell, home">
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="16" fill="currentColor" />
                <path d="M7 14c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0 3.6-1.7 4.8-.6M7 19.5c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0 3.6-1.7 4.8-.6" fill="none" stroke="var(--logo-wave, #fff)" strokeWidth="2.3" strokeLinecap="round" />
            </svg>
            <span>tidewell</span>
        </Link>
    );
}
