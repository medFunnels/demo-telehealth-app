import Link from "next/link";

import { Close, Lock } from "../../components/icons";
import { Logo } from "../../components/Logo";

// The visit and checkout: a focused layout with no site navigation, like most intake flows.
export default function VisitLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flow-shell">
            <header className="flow-header">
                <div className="container flow-header-row">
                    <Logo />
                    <span className="secure"><Lock size={15} /> Secure &amp; private</span>
                    <Link href="/" className="exit" aria-label="Exit to home"><Close size={20} /></Link>
                </div>
            </header>
            <main className="flow-main">{children}</main>
            <footer className="flow-footer">
                <span>Questions? Message our care team anytime.</span>
                <span>Tidewell is a fictional clinic (demo).</span>
            </footer>
        </div>
    );
}
