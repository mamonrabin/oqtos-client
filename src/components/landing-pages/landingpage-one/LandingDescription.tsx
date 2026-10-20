import { hindSiliguri } from "@/app/font";
import {
  ArrowRight,
  Headphones,
  Leaf,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";

const LandingDescription = () => {
  return (
    <div className={`${hindSiliguri.className}`}>
      {/* top badge */}
      <div className="mt-5 inline-flex items-center gap-2 rounded border border-primary/15 bg-primary/[0.06] px-4 py-2 text-sm font-semibold text-primary">
        <Sparkles size={16} />
        স্টাইল • কমফোর্ট • কোয়ালিটি
      </div>

      {/* title */}
      <h1 className="md:max-w-2xl mt-5 text-4xl font-bold leading-[1.25] text-slate-900 sm:text-4xl lg:text-5xl">
        🧥 প্রিমিয়াম স্টাইলিশ  +
        <span className="block text-primary">
          জ্যাকেট কালেকশন</span>
      </h1>

      {/* description */}
      <p className="mt-5 max-w-xl text-[15px] font-medium leading-8 text-slate-600 md:text-base">
        100% প্রিমিয়াম সফট কটন এবং নিখুঁত ফিনিশিং। অরিজিনাল দুবাই চেরি ফেব্রিক
        দিয়ে তৈরি — যাতে আপনার আদরের মেয়েটা থাকে আরামে, পর্দায় ও
        আত্মবিশ্বাসে।
      </p>

      {/* features */}
      <div className="mt-7 grid max-w-xl grid-cols-2 md:gap-3 gap-1 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded border border-primary/10 bg-white/70 p-4 shadow-xs backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Leaf size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-primary md:text-base text-xs">
              100% চেরি ফেব্রিক
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">নরম ও আরামদায়ক</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded border border-primary/10 bg-white/70 p-4 shadow-xs backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-primary md:text-base text-xs">
              ফুল কভারেজ
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">বোরকা + হিজাব সেট</p>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="mt-7 flex md:flex-row flex-col  items-center gap-5">
        <a
          href="#order"
          className="group md:inline-flex flex items-center md:justify-evenly justify-center gap-3 rounded bg-primary md:px-7 md:w-auto w-full  py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
        >
          <ShoppingCart size={19} />
          এখনই অর্ডার করুন
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>

        <a
          href="#collection"
          className="group inline-flex items-center gap-2 font-semibold text-primary text-sm"
        >
          সারা বাংলাদেশে ডেলিভারি
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>

      {/* service info */}
      <div className="md:mt-9 mt-4 grid grid-cols-2 gap-2 border-slate-200 pt-7 md:grid-cols-4 md:gap-0 md:border-t">
        <Service
          icon={<Truck size={22} />}
          title="সারা দেশে ডেলিভারি"
          subtitle="দ্রুত ও নিরাপদ"
        />

        <Service
          icon={<ShieldCheck size={22} />}
          title="ক্যাশ অন ডেলিভারি"
          subtitle="বিশ্বাসের সাথে"
        />

        <Service
          icon={<RotateCcw size={22} />}
          title="সহজ রিটার্ন"
          subtitle="৭ দিনের মধ্যে"
        />

        <Service
          icon={<Headphones size={22} />}
          title="২৪/৭ সাপোর্ট"
          subtitle="আপনার পাশে"
        />
      </div>
    </div>
  );
};

const Service = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded border border-primary/10 px-2 py-4 md:items-start md:rounded-none md:border-0 md:border-r md:border-slate-200 md:py-0 md:pl-4 md:first:pl-0 md:last:border-r-0">
      <div className="mb-1 text-primary md:mb-2">{icon}</div>

      <p className="text-center text-xs font-semibold text-slate-800 md:text-left md:text-sm">
        {title}
      </p>

      <p className="mt-1 text-center text-[11px] text-slate-400 md:text-left">
        {subtitle}
      </p>
    </div>
  );
};

export default LandingDescription;
