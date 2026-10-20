
import { hindSiliguri } from "@/app/font";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const PriceSection = () => {
  const benefits = [
    "প্রিমিয়াম সফট ফেব্রিক",
    "বোরকা ও হিজাবের সম্পূর্ণ সেট",
    "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি",
  ];

  return (
    <section
      id="price"
      className={`${hindSiliguri.className} relative overflow-hidden px-4 py-16 sm:py-24`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <Sparkles size={16} />
            আপনার ছোট্ট রাজকন্যার জন্য বিশেষ উপহার
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            ভালোবাসার পোশাক,
            <span className="mt-2 block text-primary">
              সাশ্রয়ী দামে!
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            আরামদায়ক প্রিমিয়াম বেবি বোরকা ও হিজাব সেটে থাকুক
            আপনার ছোট্ট সোনামণির মিষ্টি সাজ।
          </p>
        </div>

        {/* Modern Offer Panel */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,91,117,0.10)]">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Offer details */}
            <div className="relative p-6 sm:p-9 lg:p-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                  <BadgeCheck size={15} />
                  স্পেশাল অফার
                </span>

                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600">
                  ২০% পর্যন্ত সাশ্রয়
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">
                প্রিমিয়াম বেবি বোরকা
                <span className="block text-primary">
                  + হিজাব সেট
                </span>
              </h3>

              <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                আরামদায়ক ফেব্রিক, আকর্ষণীয় ডিজাইন ও সম্পূর্ণ
                ম্যাচিং সেট — ছোট্ট সোনামণির প্রতিদিনের সাজে।
              </p>

              {/* Benefits */}
              <div className="mt-7 space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={16} strokeWidth={2.5} />
                    </span>
                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trust details */}
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2.5">
                  <Truck className="shrink-0 text-primary" size={21} />
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      দেশজুড়ে ডেলিভারি
                    </p>
                    <p className="text-xs text-slate-400">
                      সারা বাংলাদেশে
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <ShieldCheck
                    className="shrink-0 text-primary"
                    size={21}
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      নিরাপদ অর্ডার
                    </p>
                    <p className="text-xs text-slate-400">
                      ক্যাশ অন ডেলিভারি
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pricing panel */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-[#edf7fa] p-6 sm:p-9 lg:p-10">
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-primary/10" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-primary/10" />

              <div className="relative rounded-2xl border border-white bg-white/90 p-5 shadow-sm sm:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-600">
                    আজকের বিশেষ মূল্য
                  </span>
                  <span className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600">
                    SAVE ১০১৳
                  </span>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
                    ৳৩৯৯
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  নিয়মিত মূল্য{" "}
                  <span className="ml-1 line-through">
                    ৳৫০০
                  </span>
                </p>

                <div className="my-6 h-px bg-slate-100" />

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <PackageCheck size={23} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      সম্পূর্ণ বোরকা ও হিজাব সেট
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      একসাথে, একটি বিশেষ মূল্যে
                    </p>
                  </div>
                </div>

                <a
                  href="#order"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  অর্ডার করতে চাই
                  <ArrowRight size={19} />
                </a>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Clock3 size={14} className="text-primary" />
                  <span>ডেলিভারি চার্জ আলাদা</span>
                </div>
              </div>

              <p className="relative mt-5 text-center text-xs leading-6 text-slate-500">
                <ShieldCheck
                  size={14}
                  className="mr-1 inline-block text-primary"
                />
                অর্ডার নিশ্চিত করতে নিচের ফর্মটি পূরণ করুন
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
