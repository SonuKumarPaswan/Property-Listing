"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function useInView(ref: React.RefObject<HTMLElement>) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return inView;
}

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children, delay = 0, className = "",
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<HTMLElement>);
    return (
        <div ref={ref} className={className} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        }}>
            {children}
        </div>
    );
};

// ─── Cookie SVG illustration ──────────────────────────────────────────────────
const CookieSVG: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="32" cy="32" r="28" fill="#2043B0" fillOpacity="0.08" stroke="#2043B0" strokeWidth="1.5" strokeOpacity="0.3" />
        <circle cx="22" cy="24" r="3.5" fill="#2043B0" opacity="0.7" />
        <circle cx="38" cy="20" r="2.5" fill="#2043B0" opacity="0.6" />
        <circle cx="42" cy="34" r="3" fill="#2043B0" opacity="0.5" />
        <circle cx="28" cy="38" r="2.5" fill="#3B82F6" opacity="0.6" />
        <circle cx="18" cy="36" r="2" fill="#2043B0" opacity="0.45" />
        <circle cx="34" cy="46" r="3" fill="#2043B0" opacity="0.55" />
        <circle cx="44" cy="26" r="2" fill="#3B82F6" opacity="0.7" />
        <path d="M26 28 Q32 22 38 28 Q32 34 26 28Z" fill="#2043B0" opacity="0.1" />
        <circle cx="32" cy="32" r="28" stroke="#2043B0" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" />
    </svg>
);

// ─── Cookie type data ─────────────────────────────────────────────────────────
const cookieTypes = [
    { label: "Essential", desc: "Platform login & security", always: true, emoji: "🔒" },
    { label: "Analytics", desc: "Usage patterns & performance", always: false, emoji: "📊" },
    { label: "Functional", desc: "Saved searches & preferences", always: false, emoji: "⚙️" },
    { label: "Marketing", desc: "Relevant property promotions", always: false, emoji: "📣" },
];

// ─── Policy sections ──────────────────────────────────────────────────────────
const sections = [
    {
        num: "01", icon: "🍪",
        title: "What Are Cookies?",
        text: "Cookies are small text files placed on your device when you visit MishtiSpaces.com. They allow our platform to remember your preferences, login sessions, and browsing behaviour. Cookies do not harm your device and cannot execute code. They exist solely to make your real estate search experience faster, personalised, and seamless across every visit.",
    },
    {
        num: "02", icon: "🔍",
        title: "Data We Collect Via Cookies",
        text: "We collect session identifiers, device type, browser language, pages visited, time spent per listing, and search filters applied. This data is anonymised where possible and never sold to advertisers. It is used exclusively to improve platform performance, surface relevant property listings, and measure the effectiveness of our features.",
    },
    {
        num: "03", icon: "🛡️",
        title: "How We Protect Your Privacy",
        text: "All cookie data is encrypted in transit using TLS 1.3 and stored on ISO 27001-certified servers within India. We comply fully with the Information Technology Act, 2000 and applicable Indian data protection regulations. You retain the right to access, correct, or delete your data at any time by contacting privacy@mishtSpaces.com.",
    },
    {
        num: "04", icon: "⚙️",
        title: "Your Cookie Choices",
        text: "You may accept, reject, or customise cookie preferences at any time via our Cookie Settings panel. Disabling non-essential cookies will not prevent access to listings but may affect personalisation features. Most browsers also allow you to delete cookies through their settings menu. We honour all user preferences within 24 hours of submission.",
    },
];

const rights = [
    { icon: "📋", title: "Right to Access", body: "Request a full export of all personal data we hold about you at any time." },
    { icon: "✏️", title: "Right to Correct", body: "Update or rectify any inaccurate personal information stored on our platform." },
    { icon: "🗑️", title: "Right to Delete", body: "Ask us to permanently erase your data. We'll action all requests within 72 hours." },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CookiePolicyPage() {
    const [accepted, setAccepted] = useState<Record<string, boolean>>({
        Analytics: true, Functional: true, Marketing: false,
    });
    const [bannerDismissed, setBannerDismissed] = useState(false);
    const [heroLoaded, setHeroLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    const heroStyle = (delay: number): React.CSSProperties => ({
        opacity: heroLoaded ? 1 : 0,
        transform: heroLoaded ? "none" : "translateY(16px)",
        transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
        
        .card-lift {
          transition: transform 0.25s cubic-bezier(.22,1,.36,1),
                      border-color 0.25s ease,
                      box-shadow 0.25s ease;
        }
        .card-lift:hover {
          transform: translateY(-3px);
          border-color: #93C5FD !important;
          box-shadow: 0 10px 25px -5px rgba(32, 67, 176, 0.08);
        }
      `}</style>

            <main className="min-h-screen bg-white text-[#172554] antialiased selection:bg-[#2043B0] selection:text-white overflow-x-hidden">

                {/* ══════════════════════════════════════════
                    1 · HERO SECTION (White & Light Blue)
                ══════════════════════════════════════════ */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-white to-white px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 text-center">
                    {/* Subtle ambient decorative shapes */}
                    <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[260px] sm:h-[360px] w-[90%]
                     max-w-[650px] rounded-full bg-[#2043B0]/5 blur-2xl sm:blur-3xl" />
                    <div className="pointer-events-none absolute right-[5%] sm:right-[10%] top-20 h-36 w-36 sm:h-48 sm:w-48 
                    rounded-full bg-blue-100/50 blur-xl sm:blur-2xl" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        {/* Pill badge */}
                        <div style={heroStyle(0)} className="mb-5 sm:mb-6 flex justify-center">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200
                             bg-[#F5F7FF] px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold 
                             uppercase tracking-wider text-[#2043B0] shadow-xs">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2043B0]" />
                                <span>🍪 Data Privacy & Transparency · Effective April 2, 2026</span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 style={{ ...heroStyle(120) }}
                            className="text-3xl sm:text-5xl md:text-6xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight mb-4 sm:mb-6">
                            Our Cookie{" "}
                            <span className="text-[#2043B0]">Policy</span>
                        </h1>

                        {/* Description */}
                        <p style={heroStyle(240)} className="text-sm sm:text-base md:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
                            We believe your privacy is a right, not a privilege. Here&apos;s exactly how MishtiSpaces.com uses cookies — with full transparency.
                        </p>

                        {/* Four statistics cards */}
                        <div style={heroStyle(360)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
                            {[
                                { v: "4", label: "Cookie Types" },
                                { v: "0", label: "Data Sold" },
                                { v: "100%", label: "Encrypted" },
                                { v: "24hr", label: "Opt-out SLA" },
                            ].map((s) => (
                                <div key={s.label}
                                    className="card-lift flex flex-col items-center justify-center p-4 sm:p-5 rounded border border-[#E5E7EB] bg-white shadow-xs">
                                    <span className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#2043B0]">
                                        {s.v}
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#172554] uppercase tracking-wider mt-1">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    2 · POLICY INFORMATION CARDS
                ══════════════════════════════════════════ */}
                <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white border-t border-[#E5E7EB]">
                    <div className="max-w-6xl mx-auto">
                        <Reveal className="text-center mb-10 sm:mb-12">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-3">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2043B0]" />
                                <span>What You Should Know</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[Cinzel] font-bold tracking-tight text-[#172554]">
                                Privacy, Explained <span className="text-[#2043B0]">Plainly</span>
                            </h2>
                        </Reveal>

                        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                            {sections.map((s, i) => (
                                <Reveal key={s.num} delay={i * 80}>
                                    <div className="card-lift h-full flex flex-col  border border-[#E5E7EB] bg-white p-6 sm:p-7 shadow-xs">
                                        {/* Card Header */}
                                        <div className="flex items-center gap-3.5 pb-4 border-b border-[#E5E7EB]">
                                            <div className="w-10 h-10 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-lg flex-shrink-0">
                                                {s.icon}
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2043B0]">
                                                    Section {s.num}
                                                </span>
                                                <h3 className="font-[Cinzel] font-bold text-base sm:text-lg text-[#172554] leading-snug">
                                                    {s.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="pt-4 flex-1">
                                            <p className="text-sm text-[#4B5563] leading-relaxed">
                                                {s.text}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    3 · MANAGE YOUR COOKIES PANEL
                ══════════════════════════════════════════ */}
                <section id="manage-cookies" className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-[#F5F7FF] border-t border-[#E5E7EB]">
                    <div className="max-w-3xl mx-auto">
                        <Reveal className="text-center mb-8 sm:mb-10">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-3">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2043B0]" />
                                <span>Your Control</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[Cinzel] font-bold tracking-tight text-[#172554] mb-3">
                                Manage Your <span className="text-[#2043B0]">Cookies</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-lg mx-auto">
                                Toggle each cookie category on or off. Essential cookies are always active to keep the platform running securely.
                            </p>
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="rounded border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
                                {cookieTypes.map((ct, i) => (
                                    <div key={ct.label}
                                        className={`flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 ${i < cookieTypes.length - 1 ? "border-b border-[#E5E7EB]" : ""}`}>
                                        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-base flex-shrink-0">
                                                {ct.emoji}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm sm:text-base text-[#172554] truncate">{ct.label}</p>
                                                <p className="text-xs text-[#4B5563] truncate sm:whitespace-normal">{ct.desc}</p>
                                            </div>
                                        </div>

                                        {ct.always ? (
                                            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-[#2043B0] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shrink-0">
                                                Always On
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={Boolean(accepted[ct.label])}
                                                onClick={() => setAccepted((p) => ({ ...p, [ct.label]: !p[ct.label] }))}
                                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2043B0] focus:ring-offset-2 ${accepted[ct.label] ? "bg-[#2043B0]" : "bg-[#E5E7EB]"
                                                    }`}
                                                aria-label={`Toggle ${ct.label}`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${accepted[ct.label] ? "translate-x-5" : "translate-x-0"
                                                        }`}
                                                />
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Action bar */}
                                <div className="px-5 sm:px-6 py-4 bg-[#F5F7FF] border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3 items-center justify-between">
                                    <p className="text-xs text-[#4B5563]">Changes take effect within 24 hours.</p>
                                    <div className="flex gap-2.5 w-full sm:w-auto">
                                        <button
                                            type="button"
                                            onClick={() => setAccepted({ Analytics: false, Functional: false, Marketing: false })}
                                            className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F5F7FF] hover:border-blue-300 text-[#172554] text-xs font-semibold transition-all shadow-2xs"
                                        >
                                            Reject All
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAccepted({ Analytics: true, Functional: true, Marketing: true })}
                                            className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#2043B0] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-900/10"
                                        >
                                            Accept All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    4 · DATA RIGHTS SECTION
                ══════════════════════════════════════════ */}
                <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white border-t border-[#E5E7EB]">
                    <div className="max-w-6xl mx-auto">
                        <Reveal className="text-center mb-10 sm:mb-12">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200
                             bg-[#F5F7FF] px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider
                              text-[#2043B0] mb-3">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2043B0]" />
                                <span>Data Rights</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[Cinzel] font-bold tracking-tight text-[#172554]">
                                Your Data <span className="text-[#2043B0]">Rights</span>
                            </h2>
                        </Reveal>

                        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
                            {rights.map((r, i) => (
                                <Reveal key={r.title} delay={i * 90}>
                                    <div className="card-lift h-full  border border-[#E5E7EB] bg-white p-6 sm:p-7 text-center shadow-xs">
                                        <div className="mx-auto w-12 h-12 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-2xl mb-4">
                                            {r.icon}
                                        </div>
                                        <h3 className="font-[Cinzel] font-bold text-base sm:text-lg text-[#172554] mb-2">
                                            {r.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                                            {r.body}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    5 · PRIVACY CONTACT CTA
                ══════════════════════════════════════════ */}
                <section className="relative px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <Reveal>
                            <div className="relative  overflow-hidden border border-blue-200 bg-gradient-to-br from-[#F5F7FF] via-white to-blue-50/50 p-6 sm:p-10 shadow-xs">
                                <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-blue-100/40 blur-3xl" />

                                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-3 shadow-2xs">
                                            <span>🍪 Questions?</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] mb-2 leading-tight">
                                            We&apos;re here to help.
                                        </h2>
                                        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-md">
                                            For any privacy questions, data requests, or cookie-related concerns, reach our dedicated privacy team directly.
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                                        <a href="mailto:privacy@mishtSpaces.com"
                                            className="inline-flex items-center gap-2 bg-[#2043B0] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-xl transition-all shadow-sm shadow-blue-900/10">
                                            📧 &nbsp;privacy@mishtSpaces.com
                                        </a>
                                        <p className="text-[#4B5563] text-[11px] text-center sm:text-right">
                                            Sector-63, Noida, 201301, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    6 · COOKIE CONSENT BANNER
                ══════════════════════════════════════════ */}
                {!bannerDismissed && (
                    <div className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:left-auto sm:right-6 sm:max-w-md z-50">
                        <div className="rounded-2xl border border-[#E5E7EB] bg-white/95 backdrop-blur-md shadow-xl shadow-blue-950/10 overflow-hidden">
                            <div className="h-1 bg-gradient-to-r from-[#2043B0] via-blue-400 to-[#2043B0]" />
                            <div className="p-5">
                                <div className="flex items-start gap-3.5">
                                    <span className="text-2xl shrink-0">🍪</span>
                                    <div>
                                        <p className="font-[Cinzel] font-bold text-[#172554] text-sm mb-1">
                                            We use cookies
                                        </p>
                                        <p className="text-xs text-[#4B5563] leading-relaxed">
                                            We use cookies to personalise your property search, analyse usage, and ensure platform security. Your data is never sold.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setBannerDismissed(true)}
                                        className="flex-1 border border-[#E5E7EB] bg-white hover:bg-[#F5F7FF] hover:border-blue-300 text-[#172554] text-xs font-semibold py-2.5 rounded-xl transition-all shadow-2xs"
                                    >
                                        Manage
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAccepted({ Analytics: true, Functional: true, Marketing: true });
                                            setBannerDismissed(true);
                                        }}
                                        className="flex-1 bg-[#2043B0] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-sm shadow-blue-900/10"
                                    >
                                        Accept All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
