import { getPolicyByType } from "@/services/policy.api";
import { Calendar, ShieldCheck } from "lucide-react";
import React from "react";

const page = async () => {
  const { data } = await getPolicyByType("privacy");
  const policy = data?.[0];

  if (!policy) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Privacy Policy not found
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            The requested policy is currently unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/70 Container">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto   py-10 sm:px-6 sm:py-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                {policy.type}
              </p>

              <h1 className="mt-0.5 text-2xl font-bold capitalize tracking-tight text-gray-900 sm:text-3xl">
                {policy.title}
              </h1>
            </div>
          </div>

          {/* Meta information */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
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

            <span className="hidden h-4 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  policy.status === "Active" ? "bg-green-500" : "bg-gray-400"
                }`}
              />

              <span>{policy.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="mx-auto ">
        <article
  className="
    mt-8
    max-w-none

    [&_p]:mb-4
    [&_p]:leading-6
    [&_p]:text-gray-600

    [&_h2]:mt-8
    [&_h2]:mb-4
    [&_h2]:text-xl
    [&_h2]:font-semibold
    [&_h2]:text-gray-900

    [&_h3]:mt-6
    [&_h3]:mb-3
    [&_h3]:text-lg
    [&_h3]:font-semibold

    [&_ul]:my-2
    [&_ul]:space-y-2
    [&_ul]:list-disc
    [&_ul]:pl-6

    [&_li]:text-gray-600
    [&_li]:leading-6

    [&_strong]:font-semibold
    [&_strong]:text-gray-900

    [&_a]:text-primary
    [&_a]:underline
  "
  dangerouslySetInnerHTML={{
    __html: policy.description || "",
  }}
/>
      </section>
    </main>
  );
};

export default page;
