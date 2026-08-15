import { ArrowRight, CalendarCheck, Link2, Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";

const AffiliateBanner = () => {
  const perks = [
    {
      icon: "money",
      value: "5–10%",
      label: "Commission",
    },
    {
      icon: CalendarCheck,
      value: "Monthly",
      label: "Payouts",
    },
    {
      icon: Link2,
      value: "Unique",
      label: "Coupon Code",
    },
  ];

  return (
    <section className="relative mt-4 overflow-hidden rounded-xl bg-[#191919] px-6 py-10 text-white sm:px-8 lg:px-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
        {/* Left */}
        <div className="w-full lg:max-w-2xl">
          {/* Status */}
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>

            <span className="text-[11px] font-semibold tracking-[0.2em] text-white/50">
              AFFILIATE PROGRAM
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Join <span className="text-primary">OqtosEarm</span>
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/55 sm:text-[15px]">
            Turn your influence into income. Share products you love and earn on
            every sale.
          </p>

          {/* Perks */}
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-5">
            {perks.map((perk) => {
              const Icon = typeof perk.icon === "string" ? null : perk.icon;

              return (
                <div key={perk.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-primary">
                    {Icon ? (
                      <Icon size={18} strokeWidth={1.8} />
                    ) : (
                      <span className="text-sm font-bold">$</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{perk.value}</span>
                    <span className="text-[11px] text-white/40">
                      {perk.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <Link href="/affiliate/dashboard">
          <button className="group cursor-pointer mt-8 inline-flex items-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:gap-4 hover:brightness-110">
            <span>Start Earning Today</span>

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          </Link>
        </div>

        {/* Right Graphic */}
        <div className="relative hidden h-52 w-52 shrink-0 items-center justify-center sm:flex lg:mr-8">
          {/* Outer circles */}
          <div className="absolute h-52 w-52 animate-[spin_18s_linear_infinite] rounded-full border border-primary/10" />

          <div className="absolute h-40 w-40 animate-[spin_14s_linear_infinite_reverse] rounded-full border border-primary/15" />

          <div className="absolute h-28 w-28 animate-pulse rounded-full border border-primary/20" />

          {/* Decorative dots */}
          <span className="absolute right-3 top-10 h-2 w-2 animate-pulse rounded-full bg-primary/60" />

          <span className="absolute bottom-8 left-5 h-1.5 w-1.5 animate-[bounce_3s_ease-in-out_infinite] rounded-full bg-white/30" />

          <span className="absolute left-8 top-16 h-1.5 w-1.5 animate-[ping_3s_ease-in-out_infinite] rounded-full bg-primary/40" />

          {/* Center */}
          <div className="relative flex h-20 w-20 animate-[float_4s_ease-in-out_infinite] items-center justify-center rounded-full bg-primary shadow-[0_0_50px_rgba(8,112,150,0.35)]">
            <Rocket
              size={34}
              strokeWidth={1.6}
              className="-rotate-45 text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateBanner;
