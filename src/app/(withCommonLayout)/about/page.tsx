import { getAbout } from "@/services/about.api";
import { Calendar, Info } from "lucide-react";
import React from "react";

const Page = async () => {
  const { data } = await getAbout();
  const about = data?.[0];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* =========================
          HERO
      ========================== */}
      <section className="border-b border-gray-200 bg-white">
        <div className="Container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Info className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                ABOUT US
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                About Us
              </h1>
            </div>
          </div>

          {/* Updated Date */}
          {about?.updatedAt && (
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />

              <span>
                Updated{" "}
                {new Date(about.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================== */}
      <section className="Container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <article
          className="
            text-gray-600

            [&_h1]:mb-6
            [&_h1]:text-2xl
            [&_h1]:font-bold
            [&_h1]:tracking-tight
            [&_h1]:text-gray-900

            [&_h2]:mb-4
            [&_h2]:mt-8
            [&_h2]:text-lg
            [&_h2]:font-bold
            [&_h2]:tracking-tight
            [&_h2]:text-gray-900

            [&_h3]:mb-3
            [&_h3]:mt-7
            [&_h3]:text-base
            [&_h3]:font-bold
            [&_h3]:text-gray-900

            [&_p]:mb-4
            [&_p]:text-sm
            [&_p]:leading-6
            sm:[&_p]:text-[15px]
            sm:[&_p]:leading-7

            [&_ul]:mb-5
            [&_ul]:list-disc
            [&_ul]:space-y-2
            [&_ul]:pl-5

            [&_ol]:mb-5
            [&_ol]:list-decimal
            [&_ol]:space-y-2
            [&_ol]:pl-5

            [&_li]:text-sm
            [&_li]:leading-6
            sm:[&_li]:text-[15px]

            [&_strong]:font-semibold
            [&_strong]:text-gray-800

            [&_a]:text-primary
            [&_a]:no-underline
            hover:[&_a]:underline

            [&_blockquote]:my-5
            [&_blockquote]:border-l-4
            [&_blockquote]:border-primary
            [&_blockquote]:bg-primary/5
            [&_blockquote]:px-4
            [&_blockquote]:py-3
            [&_blockquote]:text-gray-600
          "
          dangerouslySetInnerHTML={{
            __html: about?.description || "",
          }}
        />
      </section>
    </main>
  );
};

export default Page;