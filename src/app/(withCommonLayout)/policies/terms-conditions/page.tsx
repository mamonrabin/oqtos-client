import { getPolicyByType } from "@/services/policy.api";
import { Calendar, ShieldCheck } from "lucide-react";
import React from "react";

const page = async () => {
  const { data } = await getPolicyByType("condition");
  const policy = data?.[0];

  if (!policy) {
    return (
      <main className="min-h-[60vh] bg-gray-50/70">
        <div className="Container flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-xl font-semibold text-gray-900">
              Policy not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              The requested policy is currently unavailable.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/70">
      {/* =========================
          HEADER
      ========================== */}
      <section className="border-b bg-white">
        <div className="Container py-10 sm:py-14">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            {/* Title */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                {policy.type}
              </p>

              <h1 className="mt-0.5 text-2xl font-bold capitalize tracking-tight text-gray-900 sm:text-3xl">
                {policy.title}
              </h1>
            </div>
          </div>

          {/* =========================
              META INFORMATION
          ========================== */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            {/* Updated */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />

              <span>
                Updated{" "}
                {new Date(policy.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Divider */}
            <span className="hidden h-4 w-px bg-gray-200 sm:block" />

            {/* Status */}
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  policy.status === "Active"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />

              <span>{policy.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          POLICY CONTENT
      ========================== */}
      <section className="Container">
        <div className="mx-auto max-w-5xl py-10 sm:py-14">
          <article
            className="
              max-w-none

              [&_h1]:mt-0
              [&_h1]:mb-5
              [&_h1]:text-3xl
              [&_h1]:font-bold
              [&_h1]:leading-tight
              [&_h1]:text-gray-900

              [&_h2]:mt-10
              [&_h2]:mb-4
              [&_h2]:text-xl
              [&_h2]:font-semibold
              [&_h2]:leading-tight
              [&_h2]:text-gray-900

              [&_h3]:mt-8
              [&_h3]:mb-3
              [&_h3]:text-lg
              [&_h3]:font-semibold
              [&_h3]:leading-tight
              [&_h3]:text-gray-900

              [&_p]:mb-4
              [&_p]:text-[15px]
              [&_p]:leading-7
              [&_p]:text-gray-600

              [&_ul]:my-4
              [&_ul]:list-disc
              [&_ul]:space-y-2
              [&_ul]:pl-6

              [&_ol]:my-4
              [&_ol]:list-decimal
              [&_ol]:space-y-2
              [&_ol]:pl-6

              [&_li]:text-[15px]
              [&_li]:leading-7
              [&_li]:text-gray-600

              [&_strong]:font-semibold
              [&_strong]:text-gray-900

              [&_a]:font-medium
              [&_a]:text-primary
              [&_a]:underline
              [&_a]:underline-offset-2

              [&_blockquote]:my-6
              [&_blockquote]:border-l-4
              [&_blockquote]:border-primary
              [&_blockquote]:bg-primary/5
              [&_blockquote]:px-5
              [&_blockquote]:py-3
              [&_blockquote]:text-gray-600

              [&_hr]:my-8
              [&_hr]:border-gray-200
            "
            dangerouslySetInnerHTML={{
              __html: policy.description || "",
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default page;