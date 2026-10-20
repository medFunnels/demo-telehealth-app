import Link from "next/link";

import { Logo } from "../../components/Logo";
import { CATEGORIES, startHref } from "../../lib/catalog";

const REPO = "https://github.com/medFunnels/demo-telehealth-app";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="site-header">
                <div className="container header-row">
                    <Logo />
                    <nav className="nav" aria-label="Treatments">
                        {CATEGORIES.map((category) => <Link key={category.id} href={`/#${category.id}`}>{category.name}</Link>)}
                        <Link href="/#faq">FAQ</Link>
                    </nav>
                    <div className="header-actions">
                        <span className="signin">Sign in</span>
                        <Link href={startHref()} className="button button-small">See if you qualify</Link>
                    </div>
                </div>
            </header>
            <main>{children}</main>
            <footer className="site-footer">
                <div className="container footer-top">
                    <div className="footer-brand">
                        <Logo light />
                        <p>Online care from licensed clinicians, delivered to your door.</p>
                        <Link href={startHref()} className="button button-light">See if you qualify</Link>
                    </div>
                    <div className="footer-cols">
                        <div>
                            <h4>Treatments</h4>
                            {CATEGORIES.map((category) => <Link key={category.id} href={startHref(category)}>{category.name}</Link>)}
                        </div>
                        <div>
                            <h4>Company</h4>
                            <span>About us</span>
                            <span>Our clinicians</span>
                            <span>Contact</span>
                        </div>
                        <div>
                            <h4>Legal</h4>
                            <span>Terms of use</span>
                            <span>Privacy policy</span>
                            <span>Telehealth consent</span>
                        </div>
                    </div>
                </div>
                <div className="container footer-legal">
                    <p>
                        Tidewell is a fictional clinic created to demonstrate a <a href="https://www.medfunnels.app">medFunnels</a> integration. It is not a
                        healthcare provider, and nothing on this site is medical advice. Treatments, prices, ratings and reviews are illustrative.
                    </p>
                    <p>© Tidewell (demo) · <a href={REPO}>Source code, MIT licensed and free to reuse</a></p>
                </div>
            </footer>
        </>
    );
}
