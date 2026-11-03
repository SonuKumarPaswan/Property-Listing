"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Home, CheckCircle2, UserCheck, ShieldCheck, Building2,
    ClipboardList, Ban, CreditCard, Copyright, ExternalLink,
    Scale, Eye, PowerOff, RefreshCcw, Gavel, Mail,
    ChevronRight, ArrowUpRight, Star, AlertTriangle, X, Menu,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionDef {
    id: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

// ─── Primitives ───────────────────────────────────────────────────────────────

const Note: React.FC<{ children: React.ReactNode; warn?: boolean }> = ({ children, warn }) => (
    <div className={`relative my-5 rounded-xl border px-5 py-4 text-xs sm:text-sm leading-relaxed ${warn ? "border-amber-200 bg-amber-50 text-amber-900"
            : "border-blue-200 bg-[#F5F7FF] text-[#172554]"
        }`}>
        <AlertTriangle size={14} className={`absolute right-4 top-4 ${warn ? "text-amber-500" : "text-[#2043B0]"}`} />
        <div className="pr-6">{children}</div>
    </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="mt-3 mb-4 space-y-2">
        {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#4B5563] text-sm leading-relaxed">
                <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-[#2043B0]" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-[#4B5563] text-sm sm:text-[14.5px] leading-relaxed mb-4 last:mb-0">{children}</p>
);

// ─── Section content factory ──────────────────────────────────────────────────

function buildSections(): SectionDef[] {
    return [
        {
            id: "introduction", label: "Introduction", icon: <Home size={15} />,
            content: (
                <>
                    <P>Welcome to <strong className="text-[#172554] font-semibold">MishtiSpaces.com</strong> — a premium <em>real estate platform</em> built to transform the way people discover, evaluate, and transact in property across India. Whether you intend to <em>buy, sell, or rent property</em>, MishtiSpaces.com provides a secure, transparent, and technology-first environment.</P>
                    <P>These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;) and MishtiSpaces.com (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), governing your access to and use of the Platform.</P>
                    <Note>By accessing any part of this Platform — even without creating an account — you confirm that you have read, understood, and agreed to these Terms in their entirety. If you disagree with any provision, please discontinue use immediately.</Note>
                    <P>MishtiSpaces.com serves as a neutral digital marketplace connecting buyers, sellers, landlords, tenants, and registered agents. We do not directly own, manage, or sell any property featured herein.</P>
                </>
            ),
        },
        {
            id: "acceptance", label: "Acceptance of Terms", icon: <CheckCircle2 size={15} />,
            content: (
                <>
                    <P>Your continued use of MishtiSpaces.com — regardless of whether you have created an account — constitutes your unconditional acceptance of these Terms, our Privacy Policy, and any supplementary guidelines published on the Platform.</P>
                    <P>Acceptance is automatic and binding upon your first interaction with the Platform. This includes browsing property listings, saving a search, submitting an enquiry, or completing the registration process.</P>
                    <Note warn><strong>Important:</strong> If you are using this Platform on behalf of a business entity, you represent that you are duly authorised to bind that entity to these Terms.</Note>
                </>
            ),
        },
        {
            id: "eligibility", label: "User Eligibility", icon: <UserCheck size={15} />,
            content: (
                <>
                    <P>MishtiSpaces.com is available to individuals who meet all of the following criteria. By using the Platform, you represent and warrant that:</P>
                    <Bullets items={[
                        "You are at least 18 years of age, or the legal age of majority in your jurisdiction, whichever is higher.",
                        "You possess full legal capacity to enter into a binding contract under Indian law.",
                        "You are not subject to any legal prohibition that prevents you from using this Platform.",
                        "You will use the Platform exclusively for lawful purposes related to real estate transactions.",
                        "You have not been previously banned or suspended from MishtiSpaces.com.",
                    ]} />
                    <P>Corporate entities — including private limited companies, LLPs, trusts, and partnerships — may register for legitimate commercial real estate activity, provided a duly authorised representative accepts these Terms.</P>
                </>
            ),
        },
        {
            id: "account", label: "Account Registration & Security", icon: <ShieldCheck size={15} />,
            content: (
                <>
                    <P>Certain features of our real estate platform — including posting property listings, managing leads, and scheduling viewings — require a registered account. When creating your account, you agree to provide truthful, current, and complete information.</P>
                    <Note>We may require additional identity or document verification (e.g., Aadhaar, PAN, RERA registration number) before activating premium listing privileges on your account.</Note>
                    <P>You are solely responsible for safeguarding your credentials. You agree to:</P>
                    <Bullets items={[
                        "Use a strong, unique password and enable two-factor authentication where available.",
                        "Never share your login credentials with any third party.",
                        "Immediately notify us at security@mishtSpaces.com upon detecting unauthorised access.",
                        "Log out from shared or public devices after every session.",
                    ]} />
                    <P>MishtiSpaces.com will never request your password via email, SMS, or phone call. Accounts found to have been created using fraudulent information will be permanently suspended without prior notice.</P>
                </>
            ),
        },
        {
            id: "listings", label: "Property Listings & Accuracy", icon: <Building2 size={15} />,
            content: (
                <>
                    <P>MishtiSpaces.com functions as a <em>property listings</em> marketplace. All listings are published by Listers — individual owners, registered agents, or developers — who are entirely responsible for the content they submit.</P>
                    <P>By submitting a property listing, you warrant that:</P>
                    <Bullets items={[
                        "You are the legal owner of the property or hold a valid authorisation to list it.",
                        "All stated details — price, area, amenities, ownership status, location — are accurate and current.",
                        "Photographs and media genuinely represent the actual property being listed.",
                        "The property complies with RERA and all applicable local authority regulations.",
                        "The listing will be promptly removed or updated once the property is no longer available.",
                    ]} />
                    <Note warn>MishtiSpaces.com does not independently verify the accuracy of every listing. Users are strongly advised to conduct independent due diligence before initiating any property transaction.</Note>
                </>
            ),
        },
        {
            id: "responsibilities", label: "User Responsibilities", icon: <ClipboardList size={15} />,
            content: (
                <>
                    <P>All users of MishtiSpaces.com are expected to engage lawfully and professionally. You agree to:</P>
                    <Bullets items={[
                        "Use the Platform only for genuine property-related purposes — searching, listing, or transacting.",
                        "Communicate honestly and professionally with other users, agents, and property owners.",
                        "Comply with all applicable Indian laws, including RERA, FEMA, Income Tax Act, and GST provisions.",
                        "Ensure that all submitted content — text, images, and documents — is accurate and does not infringe third-party rights.",
                        "Promptly report any suspicious listings or policy violations to our support team.",
                    ]} />
                    <P>You further agree not to use any automated tools, bots, web scrapers, or crawlers to access or aggregate Platform data without prior written consent from MishtiSpaces.com</P>
                </>
            ),
        },
        {
            id: "prohibited", label: "Prohibited Activities", icon: <Ban size={15} />,
            content: (
                <>
                    <P>The following activities are strictly prohibited and may result in immediate account termination, civil action, or referral to law enforcement:</P>
                    <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
                        {[
                            "Posting false, misleading, or duplicate property listings.",
                            "Impersonating any person, agent, builder, or authority.",
                            "Harvesting personal data of other users without consent.",
                            "Listing properties you do not own or aren't authorised to list.",
                            "Sending spam, unsolicited bulk messages, or phishing links.",
                            "Attempting to hack, probe, or disrupt Platform infrastructure.",
                            "Uploading viruses, malware, or malicious code of any kind.",
                            "Engaging in money laundering or transactions of illegal origin.",
                            "Circumventing subscription paywalls or security mechanisms.",
                            "Publishing defamatory, discriminatory, or obscene content.",
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 bg-red-50/70 border border-red-100 rounded-xl px-3.5 py-3">
                                <Ban size={13} className="mt-0.5 flex-shrink-0 text-red-500" />
                                <span className="text-red-900/90 text-xs sm:text-[13px] leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: "payments", label: "Payments & Transactions", icon: <CreditCard size={15} />,
            content: (
                <>
                    <P>MishtiSpaces.com offers tiered subscription plans for individuals, real estate professionals, and developers. Premium features — such as promoted listings, verified seller badges, lead management tools, and advanced analytics — are exclusive to paid plans.</P>
                    <P>All fees are denominated in Indian Rupees (INR) and include applicable GST unless expressly stated otherwise. Payments are processed via PCI-DSS-compliant third-party gateways. We do not store card or banking details on our servers.</P>
                    <Note><strong>Refund Policy:</strong> Subscription fees are non-refundable once a billing cycle has commenced. Promotional credits are non-transferable and carry a defined expiry date communicated at the time of issuance.</Note>
                    <P>MishtiSpaces.com is not a party to property purchase, sale, or lease transactions between users. We strongly recommend consulting a qualified legal or financial advisor before committing to any real estate transaction.</P>
                </>
            ),
        },
        {
            id: "ip", label: "Intellectual Property", icon: <Copyright size={15} />,
            content: (
                <>
                    <P>All content, features, and functionality on MishtiSpaces.com — including text, graphics, logos, UI design, source code, and data compilations — are the exclusive intellectual property of MishtiSpaces.com or its licensors, protected under Indian and international copyright and trademark laws.</P>
                    <P>By submitting content to the Platform (including property photos, descriptions, and floor plans), you grant MishtiSpaces.com a non-exclusive, royalty-free, worldwide, sublicensable licence to use, display, and distribute such content solely for operating and promoting the Platform.</P>
                    <Note warn>Unauthorised reproduction, redistribution, or commercial exploitation of any content from this Platform is strictly prohibited and may result in civil and criminal liability under the Copyright Act, 1957.</Note>
                </>
            ),
        },
        {
            id: "third-party", label: "Third-Party Services", icon: <ExternalLink size={15} />,
            content: (
                <>
                    <P>MishtiSpaces.com may integrate or link to third-party services — including mapping tools, mortgage calculators, legal advisory portals, and payment gateways — to enhance your experience on our real estate platform. These are provided for convenience only.</P>
                    <P>We do not control, endorse, or assume responsibility for the content, privacy practices, or security of any third-party service. Your use of any linked external platform is entirely at your own risk and is governed by that platform&apos;s own terms and policies.</P>
                    <P>MishtiSpaces.com shall not be liable for any loss, damage, or inconvenience arising from your reliance on or interaction with third-party tools or services accessed through the Platform.</P>
                </>
            ),
        },
        {
            id: "liability", label: "Limitation of Liability", icon: <Scale size={15} />,
            content: (
                <>
                    <P>To the fullest extent permitted under applicable law, MishtiSpaces.com — including its directors, officers, employees, agents, and licensors — shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:</P>
                    <Bullets items={[
                        "Your use of, or inability to use, any part of the Platform.",
                        "Inaccuracies, omissions, or errors in any property listing.",
                        "Transactions, agreements, or disputes between Platform users.",
                        "Unauthorised access to your account or personal data.",
                        "Interruptions, downtime, or technical failures on the Platform.",
                    ]} />
                    <Note>In no event shall MishtiSpaces.com&apos;s total aggregate liability to you exceed the amount paid by you to the Company in the twelve (12) months preceding the event giving rise to the claim.</Note>
                </>
            ),
        },
        {
            id: "privacy", label: "Privacy Policy", icon: <Eye size={15} />,
            content: (
                <>
                    <P>MishtiSpaces.com is committed to protecting the privacy and security of your personal information. Our Privacy Policy explains in detail how we collect, use, store, share, and safeguard your data when you interact with the Platform.</P>
                    <P>By accepting these Terms, you simultaneously acknowledge and agree to our Privacy Policy, which is incorporated herein by reference and forms an inseparable part of this agreement.</P>
                    <Note>MishtiSpaces.com complies with the Information Technology Act, 2000, the IT (Reasonable Security Practices) Rules, 2011, and applicable Indian data protection frameworks.</Note>
                </>
            ),
        },
        {
            id: "termination", label: "Termination", icon: <PowerOff size={15} />,
            content: (
                <>
                    <P>MishtiSpaces.com reserves the right to suspend, restrict, or permanently terminate your access to the Platform at any time, with or without prior notice, for reasons including breach of these Terms, fraudulent activity, or conduct deemed harmful to other users or the Platform&apos;s integrity.</P>
                    <P>You may terminate your account at any time by using the account deletion option in your profile settings or by writing to support@mishtSpaces.com. Upon termination, your right to access the Platform ceases immediately.</P>
                    <P>Provisions that by their nature survive termination — including intellectual property rights, limitation of liability, dispute resolution, and governing law — shall remain in full force after your account is closed.</P>
                </>
            ),
        },
        {
            id: "changes", label: "Changes to Terms", icon: <RefreshCcw size={15} />,
            content: (
                <>
                    <P>MishtiSpaces.com may revise these Terms from time to time to reflect changes in our services, applicable laws, or operational requirements. We will notify registered users of material changes via email and through a prominent in-Platform notice.</P>
                    <P>The &quot;Last Updated&quot; date at the top of this page reflects the most recent revision. Minor clarifications may be made without separate notification.</P>
                    <Note>Your continued use of MishtiSpaces.com after any revised Terms take effect constitutes your binding acceptance of the updated agreement. If you do not agree with a revision, you must discontinue use immediately.</Note>
                </>
            ),
        },
        {
            id: "governing", label: "Governing Law", icon: <Gavel size={15} />,
            content: (
                <>
                    <P>These Terms shall be governed by, and construed in accordance with, the laws of the Republic of India. Any dispute arising out of or in connection with these Terms or your use of MishtiSpaces.com shall be subject to the exclusive jurisdiction of the courts of <strong className="text-[#172554]">New Delhi, India</strong>.</P>
                    <P>In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation within thirty (30) calendar days. If unsuccessful, disputes shall be resolved through binding arbitration under the Arbitration and Conciliation Act, 1996, conducted in English in New Delhi.</P>
                    <P>Nothing herein prevents MishtiSpaces.com from seeking injunctive or equitable relief from a court of competent jurisdiction to protect intellectual property rights or prevent imminent irreparable harm.</P>
                </>
            ),
        },
        {
            id: "contact", label: "Contact Information", icon: <Mail size={15} />,
            content: (
                <>
                    <P>For any questions, legal notices, or complaints regarding these Terms of Service, please reach out to our dedicated support team through the appropriate channel below:</P>
                    <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
                        {[
                            { role: "General Enquiries", email: "enquiries@mishtSpaces.com" },
                            { role: "Legal & Compliance", email: "legal@mishtSpaces.com" },
                            { role: "Account Support", email: "support@mishtSpaces.com" },
                            { role: "Security Reports", email: "security@mishtSpaces.com" },
                        ].map((c) => (
                            <div key={c.role} className="rounded-xl border border-[#E5E7EB] bg-[#F5F7FF]/60 px-4 py-3
                             hover:border-blue-300 hover:bg-[#F5F7FF] transition-all">
                                <p className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold mb-1">{c.role}</p>
                                <p className="text-sm text-[#2043B0] font-semibold">{c.email}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 rounded-xl border border-[#E5E7EB] bg-[#F5F7FF]/60 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold mb-1">Registered Office</p>
                        <p className="text-sm text-[#4B5563]">MishtiSpaces.com , Basement B-07, AGS Building, C-27 Sector-63, Noida, 201301, India.</p>
                    </div>
                </>
            ),
        },
    ];
}

// ─── Dynamic Heading Component ────────────────────────────────────────────────
// Animates when the active section label changes

const DynamicHeading: React.FC<{ label: string; icon: React.ReactNode }> = ({ label, icon }) => {
    return (
        <div className="overflow-hidden">
            <div
                key={label}
                style={{ animation: "headingEnter 0.28s cubic-bezier(.22,1,.36,1) forwards" }}
                className="flex items-center gap-3 min-w-0"
            >
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#F5F7FF] text-[#2043B0] border border-blue-100 flex-shrink-0">
                    {icon}
                </span>
                <h2 className="text-base sm:text-lg font-[Cinzel] font-bold text-[#172554] truncate">
                    {label}
                </h2>
            </div>
        </div>
    );
};

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard: React.FC<{ section: SectionDef; observerRef: (el: HTMLDivElement | null) => void }> = ({
    section,
    observerRef,
}) => (
    <div
        id={section.id}
        data-section-id={section.id}
        ref={observerRef}
        className="mb-6  border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs hover:border-blue-300 hover:shadow-md 
        transition-all duration-300"
    >
        {/* Section label strip */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center 
                justify-center text-[#2043B0] flex-shrink-0">
                    {section.icon}
                </div>
                <h3 className="font-[Cinzel] font-bold text-base sm:text-lg text-[#172554]">
                    {section.label}
                </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2043B0] bg-blue-50 border
             border-blue-200 px-2.5 py-1 rounded-full shrink-0">
                {section.id}
            </span>
        </div>
        <div>{section.content}</div>
    </div>
);

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function TermsOfServicePage() {
    const sections = buildSections();
    const [activeId, setActiveId] = useState(sections[0].id);
    const [mobileOpen, setMobileOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionEls = useRef<Map<string, HTMLDivElement>>(new Map());

    // ── IntersectionObserver — handles both page scroll and container scroll ──
    useEffect(() => {
        const container = scrollContainerRef.current;
        const isScrollable = Boolean(container && container.scrollHeight > container.clientHeight + 50);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    const id = (visible[0].target as HTMLElement).dataset.sectionId;
                    if (id) setActiveId(id);
                }
            },
            {
                root: isScrollable ? container : null,
                rootMargin: isScrollable ? "-10% 0px -55% 0px" : "-15% 0px -55% 0px",
                threshold: 0,
            }
        );

        sectionEls.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Memoised ref callback — stable per section id
    const getRefCallback = useCallback(
        (id: string) => (el: HTMLDivElement | null) => {
            if (el) sectionEls.current.set(id, el);
            else sectionEls.current.delete(id);
        },
        []
    );

    // Scroll section into view
    const scrollTo = useCallback((id: string) => {
        const el = sectionEls.current.get(id);
        if (el) {
            const container = scrollContainerRef.current;
            const isScrollable = Boolean(container && container.scrollHeight > container.clientHeight + 50);

            if (isScrollable && container) {
                container.scrollTo({
                    top: el.offsetTop - 16,
                    behavior: "smooth",
                });
            } else {
                const yOffset = -110; // Clearance for navbar & sticky header
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }
        setMobileOpen(false);
    }, []);

    const activeSection = sections.find((s) => s.id === activeId) ?? sections[0];
    const progressPct = ((sections.findIndex((s) => s.id === activeId) + 1) / sections.length) * 100;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');

        /* Sidebar scrollbar */
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 6px; }

        /* Dynamic heading entrance animation */
        @keyframes headingEnter {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <main className="min-h-screen bg-white text-[#172554] antialiased selection:bg-[#2043B0] selection:text-white">

                {/* ══════════════════════════════════════════
                    1 · HERO / INTRODUCTION SECTION
                ══════════════════════════════════════════ */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-white to-white px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 text-center border-b border-[#E5E7EB]">
                    {/* Subtle ambient decorative shapes */}
                    <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[260px] sm:h-[360px] w-[90%] max-w-[650px] rounded-full bg-[#2043B0]/5 blur-2xl sm:blur-3xl" />
                    <div className="pointer-events-none absolute right-[5%] sm:right-[10%] top-20 h-36 w-36 sm:h-48 sm:w-48 rounded-full bg-blue-100/50 blur-xl sm:blur-2xl" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        {/* Legal document pill badge */}
                        <div className="mb-4 sm:mb-5 flex justify-center">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#2043B0] shadow-xs">
                                <Scale size={13} className="text-[#2043B0]" />
                                <span>Legal Document — Effective April 2, 2026</span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight mb-4 sm:mb-6">
                            Terms of{" "}
                            <span className="text-[#2043B0]">Service</span>
                        </h1>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                            Please read these Terms carefully before using <strong className="text-[#172554]">MishtiSpaces.com</strong> — India&apos;s trusted real estate platform for property buyers, sellers, and renters.
                        </p>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    2 · TWO-COLUMN LEGAL DOCUMENT LAYOUT
                ══════════════════════════════════════════ */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

                        {/* ── LEFT SIDEBAR — sticky on desktop ─────────────────────── */}
                        <aside className="hidden lg:flex flex-col flex-shrink-0 w-72 xl:w-80 sticky top-28 self-start max-h-[calc(100vh-8.5rem)]">
                            <div className="flex flex-col h-full rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">

                                {/* Sidebar header with Dynamic Heading */}
                                <div className="flex-shrink-0 px-5 py-4 border-b border-[#E5E7EB] bg-[#F5F7FF]/50">
                                    <p className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold mb-2">
                                        Current Section
                                    </p>
                                    <DynamicHeading label={activeSection.label} icon={activeSection.icon} />
                                </div>

                                {/* Nav list */}
                                <nav className="sidebar-nav flex-1 overflow-y-auto p-2 space-y-1">
                                    {sections.map((s, i) => {
                                        const isActive = activeId === s.id;
                                        return (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => scrollTo(s.id)}
                                                className={`w-full text-left flex items-center gap-2.5 px-3.5 py-2.5 text-xs rounded-xl transition-all duration-150 relative group ${isActive
                                                        ? "text-[#2043B0] bg-[#F5F7FF] font-semibold shadow-2xs border-l-2 border-[#2043B0]"
                                                        : "text-[#4B5563] hover:text-[#172554] hover:bg-[#F5F7FF]/60"
                                                    }`}
                                            >
                                                <span className={`flex-shrink-0 ${isActive ? "text-[#2043B0]" : "text-[#4B5563] group-hover:text-[#172554]"}`}>
                                                    {s.icon}
                                                </span>
                                                <span className="flex-1 truncate leading-tight">{s.label}</span>
                                                <span className={`font-mono text-[10px] ${isActive ? "text-[#2043B0]" : "text-gray-400"}`}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* Reading progress bar */}
                                <div className="flex-shrink-0 px-5 py-4 border-t border-[#E5E7EB] bg-[#F5F7FF]/30">
                                    <div className="flex justify-between items-center mb-1.5 text-xs">
                                        <span className="text-[#4B5563] text-[10px] uppercase tracking-wider font-semibold">Progress</span>
                                        <span className="text-[#2043B0] font-bold text-xs">
                                            {sections.findIndex((s) => s.id === activeId) + 1} / {sections.length}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-[#2043B0] transition-all duration-300 ease-out"
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* ── RIGHT MAIN LEGAL CONTENT AREA ────────────────────────── */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 w-full min-w-0"
                        >
                            {/* Sticky Header for Mobile & Tablet with Contents Drawer trigger */}
                            <div className="sticky top-20 z-20 mb-6 lg:hidden">
                                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#E5E7EB]
                                 bg-white/95 backdrop-blur-md shadow-xs">
                                    <DynamicHeading label={activeSection.label} icon={activeSection.icon} />
                                    <button
                                        type="button"
                                        className="flex items-center gap-1.5 text-xs font-semibold text-[#2043B0] bg-[#F5F7FF] border border-blue-200 px-3 py-1.5 rounded-lg transition-all hover:bg-blue-100/60 flex-shrink-0"
                                        onClick={() => setMobileOpen(true)}
                                    >
                                        <Menu size={14} />
                                        <span>Contents</span>
                                    </button>
                                </div>
                            </div>

                            {/* Section Cards */}
                            {sections.map((section) => (
                                <SectionCard
                                    key={section.id}
                                    section={section}
                                    observerRef={getRefCallback(section.id)}
                                />
                            ))}

                            {/* ── Bottom CTA ───────────────────────────────────────── */}
                            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-[#F5F7FF] via-white to-blue-50/50 p-6 sm:p-10 shadow-xs relative overflow-hidden mt-8">
                                <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-blue-100/40 blur-3xl" />

                                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-3 shadow-2xs">
                                            <Star size={11} className="text-[#2043B0]" />
                                            <span>Start Your Journey</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] mb-2 leading-tight">
                                            Find Your Dream Property
                                        </h2>
                                        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-md">
                                            Explore thousands of verified <em>property listings</em> across India. Buy, sell, or rent with full confidence on MishtiSpaces.com.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center gap-2 bg-[#2043B0] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-xl transition-all shadow-sm shadow-blue-900/10"
                                        >
                                            Browse Listings
                                            <ArrowUpRight size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => scrollTo("contact")}
                                            className="inline-flex items-center justify-center gap-2 border border-[#E5E7EB] bg-white hover:bg-[#F5F7FF] hover:border-blue-300 text-[#172554] text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all shadow-2xs"
                                        >
                                            <Mail size={13} />
                                            Contact Us
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Mobile TOC Drawer ─────────────────────────────────────────── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-[#E5E7EB] shadow-2xl flex flex-col z-10">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB] bg-[#F5F7FF]/50">
                            <span className="text-base font-[Cinzel] font-bold text-[#172554]">
                                Table of Contents
                            </span>
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close"
                                className="p-1 rounded-lg hover:bg-gray-100 text-[#4B5563] transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <nav className="sidebar-nav flex-1 overflow-y-auto p-3 space-y-1">
                            {sections.map((s, i) => {
                                const isActive = activeId === s.id;
                                return (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => scrollTo(s.id)}
                                        className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs rounded-xl 
                                            transition-all duration-150 relative ${isActive
                                                ? "text-[#2043B0] bg-[#F5F7FF] font-semibold border-l-2 border-[#2043B0]"
                                                : "text-[#4B5563] hover:text-[#172554] hover:bg-gray-50"
                                            }`}
                                    >
                                        <span className={`shrink-0 ${isActive ? "text-[#2043B0]" : "text-[#4B5563]"}`}>{s.icon}</span>
                                        <span className="flex-1 font-medium truncate">{s.label}</span>
                                        <span className={`font-mono text-[10px] ${isActive ? "text-[#2043B0]" : "text-gray-400"}`}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
