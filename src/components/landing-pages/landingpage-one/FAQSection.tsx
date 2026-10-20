
"use client";

import { useState } from "react";
import { hindSiliguri } from "@/app/font";
import {
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  Truck,
  Package,
  CreditCard,
} from "lucide-react";

const faqs = [
  {
    question: "কীভাবে অর্ডার করব?",
    answer:
      "অর্ডার করতে নিচের অর্ডার ফর্মে আপনার নাম, মোবাইল নম্বর ও সম্পূর্ণ ঠিকানা লিখে সাবমিট করুন। প্রয়োজনে সরাসরি ফোন বা WhatsApp-এও যোগাযোগ করতে পারেন।",
    icon: Package,
  },
  {
    question: "পণ্যের মূল্য কত এবং ডেলিভারি চার্জ কত?",
    answer:
      "বেবি বোরকা ও হিজাব সেটের অফার মূল্য ৩৯৯ টাকা। ডেলিভারি চার্জ আপনার লোকেশন অনুযায়ী প্রযোজ্য হবে। অর্ডারের আগে বিস্তারিত জেনে নিতে আমাদের সাথে যোগাযোগ করুন।",
    icon: CreditCard,
  },
  {
    question: "সারা বাংলাদেশে কি ডেলিভারি হয়?",
    answer:
      "জি, সারা বাংলাদেশে হোম ডেলিভারির ব্যবস্থা রয়েছে। আপনার এলাকার ডেলিভারি সময় ও চার্জ জানতে আমাদের সাথে যোগাযোগ করুন।",
    icon: Truck,
  },
  {
    question: "ক্যাশ অন ডেলিভারি সুবিধা আছে কি?",
    answer:
      "জি, ক্যাশ অন ডেলিভারি সুবিধা থাকলে পণ্য গ্রহণের সময় মূল্য পরিশোধ করতে পারবেন। অর্ডার নিশ্চিত করার সময় পেমেন্টের বিস্তারিত জেনে নিন।",
    icon: ShieldCheck,
  },
  {
    question: "পণ্যের সাইজ ও কালার কীভাবে জানব?",
    answer:
      "উপলব্ধ সাইজ, কালার ও ডিজাইন সম্পর্কে জানতে অর্ডারের আগে আমাদের সাথে যোগাযোগ করুন। আমরা আপনার পছন্দ অনুযায়ী উপলব্ধ অপশন জানিয়ে দেব।",
    icon: Package,
  },
  {
    question: "অর্ডার করার পর কীভাবে নিশ্চিত হব?",
    answer:
      "অর্ডার সাবমিট করার পর আপনার দেওয়া মোবাইল নম্বর সচল রাখুন। প্রয়োজন হলে অর্ডারের তথ্য নিশ্চিত করতে আপনার সাথে যোগাযোগ করা হবে।",
    icon: MessageCircle,
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className={`${hindSiliguri.className} relative overflow-hidden bg-white px-4 py-16 sm:py-24`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-sky-50 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-4 py-2 text-sm font-semibold text-primary">
            <MessageCircle size={16} />
            FAQ · সাধারণ কিছু জিজ্ঞাসা
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            আপনাদের মনে থাকা <span className="text-primary">
               কিছু সাধারণ প্রশ্ন
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            অর্ডার, পণ্য ও ডেলিভারি সম্পর্কে সচরাচর
            জিজ্ঞাসা করা প্রশ্নগুলোর উত্তর এখানে পাবেন।
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/25 bg-[#f5fafc] shadow-[0_8px_24px_rgba(8,112,145,0.06)]"
                    : "border-slate-200 bg-white hover:border-primary/20"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-5"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-primary/[0.08] text-primary"
                    }`}
                  >
                    <Icon size={19} />
                  </span>

                  <span className="flex-1 text-sm font-bold leading-6 text-slate-800 sm:text-base">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-slate-100 px-4 pb-5 pt-4 pl-[4.25rem] text-sm leading-7 text-slate-600 sm:px-5 sm:pl-[4.75rem] sm:text-[15px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/10 bg-[#f1f8fa] p-5 text-center sm:flex-row sm:px-7 sm:text-left">
          <div>
            <h3 className="font-bold text-slate-900">
              আপনার প্রশ্নের উত্তর পাননি?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              আমাদের সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          <a
            href="#product-info"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <MessageCircle size={17} />
            যোগাযোগ করুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
