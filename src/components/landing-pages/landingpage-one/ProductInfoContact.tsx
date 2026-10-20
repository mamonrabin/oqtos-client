
import { hindSiliguri } from "@/app/font";
import {
  ArrowRight,
  CheckCircle2,
  Headset,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

const PRODUCT = {
  name: "প্রিমিয়াম স্টাইলিশ জ্যাকেট কালেকশন",
  price: "৩৯৯",
  regularPrice: "৫০০",
  phone: "01XXXXXXXXX",
  whatsapp: "8801XXXXXXXXX",
  facebook: "https://facebook.com/your-page",
};

const ProductInfoContact = () => {
  const whatsappLink = `https://wa.me/${PRODUCT.whatsapp}?text=${encodeURIComponent(
    `আসসালামু আলাইকুম, ${PRODUCT.name} অর্ডার করতে চাই।`
  )}`;

  return (
    <section
      id="product-info"
      className={`${hindSiliguri.className} relative overflow-hidden bg-[#f3f9fb] px-4 py-16 sm:py-24`}
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section title */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary">
            <Headset size={17} />
            আপনার পাশে আছি আমরা
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            পণ্য সম্পর্কে জানুন,
            <span className="text-primary">
              সরাসরি যোগাযোগ করুন
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            অর্ডার দেওয়ার আগে যেকোনো প্রশ্নের উত্তর পেতে
            আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Product information */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Package size={25} />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Product Information
                </span>

                <h3 className="mt-1 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                  {PRODUCT.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  ছোট্ট সোনামণির জন্য আরামদায়ক ও আকর্ষণীয়
                  পোশাকের একটি সম্পূর্ণ সেট।
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              {/* Price summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#f0f8fa] p-4 sm:p-5">
                <div>
                  <p className="text-sm text-slate-500">
                    অফার মূল্য
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-primary">
                      ৳{PRODUCT.price}
                    </span>

                    <span className="text-base text-slate-400 line-through">
                      ৳{PRODUCT.regularPrice}
                    </span>
                  </div>
                </div>

                <span className="rounded-full bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600">
                  ২০% ছাড়
                </span>
              </div>

              {/* Product features */}
              <h4 className="mt-6 font-bold text-slate-900">
                এই সেটে যা থাকছে
              </h4>

              <div className="mt-4 space-y-3">
                {[
                  "প্রিমিয়াম সফট ফেব্রিক",
                  "বোরকা ও ম্যাচিং হিজাব সেট",
                  "সুন্দর ও আরামদায়ক ডিজাইন",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-primary"
                    />
                    {item}
                  </div>
                ))}
              </div>

              {/* Delivery */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 p-3">
                  <Truck size={21} className="text-primary" />
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    সারা বাংলাদেশে
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    হোম ডেলিভারি
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3">
                  <ShieldCheck size={21} className="text-primary" />
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    ক্যাশ অন ডেলিভারি
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    পণ্য বুঝে মূল্য দিন
                  </p>
                </div>
              </div>

              <a
                href="#order"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-bold text-white transition hover:brightness-95"
              >
                অর্ডার করুন
                <ArrowRight size={19} />
              </a>
            </div>
          </div>

          {/* Contact information */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-[#087895] p-6 text-white shadow-lg shadow-primary/15 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <MessageCircle size={25} />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">
                কোনো প্রশ্ন আছে?
              </h3>

              <p className="mt-2 text-sm leading-7 text-white/80">
                সাইজ, ফেব্রিক, ডেলিভারি বা অর্ডার সম্পর্কে
                জানতে সরাসরি আমাদের মেসেজ করুন।
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 font-bold text-[#087b48] transition hover:bg-emerald-50"
              >
                <MessageCircle size={22} />
                WhatsApp-এ যোগাযোগ করুন
                <ArrowRight size={18} />
              </a>

              <p className="mt-3 text-center text-xs text-white/70">
                দ্রুত যোগাযোগের জন্য WhatsApp ব্যবহার করুন
              </p>
            </div>

            {/* Contact cards */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-bold text-slate-900">
                আমাদের সাথে যোগাযোগ
              </h3>

              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${PRODUCT.phone}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-primary/30 hover:bg-slate-50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-primary">
                    <Phone size={21} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-slate-500">
                      সরাসরি ফোন করুন
                    </span>
                    <span className="mt-1 block font-bold text-slate-800">
                      {PRODUCT.phone}
                    </span>
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition group-hover:text-primary"
                  />
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageCircle size={21} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-slate-500">
                      WhatsApp নম্বর
                    </span>
                    <span className="mt-1 block font-bold text-slate-800">
                      {PRODUCT.phone}
                    </span>
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                </a>

                <a
                  href={PRODUCT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    f
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-slate-500">
                      আমাদের Facebook পেজ
                    </span>
                    <span className="mt-1 block font-bold text-slate-800">
                      পেজ দেখুন ও মেসেজ দিন
                    </span>
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition group-hover:text-blue-600"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoContact;
