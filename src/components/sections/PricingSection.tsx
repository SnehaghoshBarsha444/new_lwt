"use client";

import Link from "next/link";

interface PricingPlan {
  id: string;
  name: string;
  tag?: string;
  badge?: string;
  description: string;
  price: string;
  period: string;
  popular?: boolean;
  ctaText: string;
  ctaHref: string;
  isCurrent?: boolean;
  includedFeatures: string[];
  featureIntro?: string;
  limitations?: string[];
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "student",
    name: "Student",
    tag: "Free",
    description: "Perfect for students starting their professional journey.",
    price: "Free",
    period: "Forever",
    popular: false,
    ctaText: "Current Plan",
    ctaHref: "#",
    isCurrent: true,
    includedFeatures: [
      "AI Workplace Access",
      "1 Workspace",
      "Up to 2 Active Projects",
      "Basic AI Project Manager",
      "Basic AI Mentor",
      "GitHub Integration",
      "Sprint Planning",
      "Task Management",
      "Progress Dashboard",
      "Basic Portfolio",
      "XP & Reputation System",
      "Community Access",
    ],
    limitations: [
      "Limited AI requests per day",
      "Limited project templates",
      "Basic AI feedback",
      "Basic analytics",
      "Limited portfolio customization",
      "No advanced AI project generation",
      "No premium workplace simulation",
      "No human mentor requests",
    ],
  },
  {
    id: "pro",
    name: "Developer Pro",
    badge: "RECOMMENDED",
    description: "For developers, freelancers, startup builders, and serious learners.",
    price: "₹199",
    period: "/ month",
    popular: true,
    ctaText: "Upgrade to Pro",
    ctaHref: "https://letsworktogether.lakshyniti.com/dashboard/billing",
    isCurrent: false,
    featureIntro: "Everything in Student, plus:",
    includedFeatures: [
      "Unlimited Projects",
      "Unlimited AI Usage (Fair Use Policy)",
      "Advanced AI Mentor",
      "Premium AI Project Generation",
      "AI Architecture Review",
      "AI Code Review",
      "AI Documentation Generator",
      "Advanced Workplace Simulation",
      "AI Team Members",
      "GitHub Integration",
      "Advanced Analytics",
      "Resume Builder",
      "Portfolio Website",
      "Career Readiness Reports",
      "Export Reports",
      "Priority AI Processing",
      "Premium Templates",
      "Team Collaboration",
      "Early Access to New Features",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-20 sm:py-28 overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#153EC1]/10 via-[#2ED2EF]/15 to-[#7B3ED6]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 relative z-10">
        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#153EC1] uppercase block mb-2">
          TRANSPARENT SIMULATOR TIERS
        </span>
        <h2 className="text-4xl sm:text-6xl font-editorial font-normal text-[#0A0F2B] tracking-tight">
          Choose your plan, <br />
          <span className="italic text-[#153EC1]">accelerate your career</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#535D80] leading-relaxed">
          Level up from basic practice projects to unlimited production simulation with staff-level AI reviews, career readiness reports, and verifiable portfolio proof.
        </p>
      </div>

      {/* Responsive 2-Column Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch relative z-10">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
              plan.popular
                ? "bg-white border-2 border-[#153EC1] shadow-xl shadow-[#153EC1]/10 md:-translate-y-2 hover:-translate-y-3"
                : "saas-card p-6 sm:p-8 hover:-translate-y-1.5"
            }`}
          >
            {/* Recommended Top Badge */}
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#153EC1] to-[#7B3ED6] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ED2EF] animate-pulse" />
                {plan.badge}
              </div>
            )}

            {/* Plan Header & Pricing */}
            <div className={plan.popular ? "p-6 sm:p-8 pb-0" : ""}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0F2B]">
                  {plan.name}
                </h3>
                {plan.tag && (
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#153EC1]/10 text-[#153EC1] border border-[#153EC1]/25">
                    {plan.tag}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#535D80] leading-relaxed min-h-[38px]">
                {plan.description}
              </p>

              {/* Price Display */}
              <div className="my-6 pb-6 border-b border-[#CBB4FF]/40">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#0A0F2B] tracking-tight font-sans">
                    {plan.price}
                  </span>
                  <span className="text-xs sm:text-sm text-[#535D80] font-medium font-mono">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mb-8">
                {plan.isCurrent ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3.5 px-6 rounded-full text-center text-xs font-bold bg-[#F5F7FE] text-[#535D80] border border-[#CBB4FF]/60 cursor-default block"
                  >
                    {plan.ctaText}
                  </button>
                ) : (
                  <Link
                    href={plan.ctaHref}
                    className="w-full py-3.5 px-6 rounded-full text-center text-xs font-bold bg-gradient-to-r from-[#153EC1] via-[#287BEB] to-[#2ED2EF] text-white hover:shadow-lg hover:shadow-[#153EC1]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 block shadow-md"
                  >
                    {plan.ctaText} &rarr;
                  </Link>
                )}
              </div>

              {/* Included Features Section */}
              <div className="space-y-3.5">
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#153EC1] uppercase block">
                  INCLUDED FEATURES:
                </span>

                {plan.featureIntro && (
                  <p className="text-xs font-bold text-[#0A0F2B] flex items-center gap-1.5 pb-1">
                    <span className="text-[#2ED2EF]">⚡</span>
                    {plan.featureIntro}
                  </p>
                )}

                <ul className="space-y-2.5 text-xs text-[#535D80]">
                  {plan.includedFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#153EC1] font-bold text-sm leading-none mt-0.5">
                        ✓
                      </span>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations Section (Student Plan) */}
              {plan.limitations && (
                <div className="mt-8 pt-6 border-t border-[#CBB4FF]/40 space-y-3">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#7B3ED6] uppercase block">
                    LIMITATIONS:
                  </span>
                  <ul className="space-y-2 text-xs text-[#535D80]/80">
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-red-400 font-bold text-xs mt-0.5">
                          ✕
                        </span>
                        <span className="leading-snug">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Card Footer Spacing */}
            <div className={plan.popular ? "p-6 sm:p-8 pt-0" : ""} />
          </div>
        ))}
      </div>

      {/* Trust & Billing Note */}
      <div className="mt-14 text-center text-xs text-[#535D80] space-y-1 relative z-10">
        <p>
          Need to manage billing or view past invoices? Visit your{" "}
          <Link
            href="https://letsworktogether.lakshyniti.com/dashboard/billing"
            className="text-[#153EC1] font-bold hover:underline"
          >
            LWT Billing Dashboard
          </Link>
          .
        </p>
        <p className="font-mono text-[11px] text-[#7B3ED6]">
          ● UNLIMITED PROJECTS · VERIFIED PORTFOLIO · CANCEL ANYTIME
        </p>
      </div>
    </section>
  );
}