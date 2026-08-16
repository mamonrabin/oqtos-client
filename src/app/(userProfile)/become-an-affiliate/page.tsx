import { getAffiliate } from "@/services/affiliate.api";
import { CheckCircle2, CircleDollarSign, Gift, Link2, ShieldCheck } from "lucide-react";

const page = async () => {
  const { data } = await getAffiliate();

  const affiliate = data?.[0];

  console.log(
    "------------------getAffiliate-------------------",
    affiliate
  );

  return (
    <main className="min-h-screen bg-gray-50/70">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="Container py-10 sm:py-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Affiliate Program
              </p>

              <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Become an Affiliate
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-500 sm:text-base">
            Join our affiliate program, share products with your audience, and
            earn commissions from qualifying purchases made through your
            referral links and coupon codes.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="Container">
        <div className="mx-auto max-w-5xl py-10 sm:py-14">
          <article
            className="
              rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8

              [&_p]:mb-4
              [&_p]:text-[15px]
              [&_p]:leading-7
              [&_p]:text-gray-600

              [&_h2]:mb-4
              [&_h2]:mt-10
              [&_h2]:text-xl
              [&_h2]:font-bold
              [&_h2]:leading-tight
              [&_h2]:text-gray-900

              [&_h3]:mb-3
              [&_h3]:mt-7
              [&_h3]:text-lg
              [&_h3]:font-semibold
              [&_h3]:text-gray-900

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

              [&_table]:my-6
              [&_table]:w-full
              [&_table]:border-collapse

              [&_th]:border
              [&_th]:border-gray-200
              [&_th]:bg-gray-50
              [&_th]:px-4
              [&_th]:py-3
              [&_th]:text-left
              [&_th]:text-sm
              [&_th]:font-semibold
              [&_th]:text-gray-900

              [&_td]:border
              [&_td]:border-gray-200
              [&_td]:px-4
              [&_td]:py-3
              [&_td]:text-sm
              [&_td]:text-gray-600

              [&_hr]:my-8
              [&_hr]:border-gray-200
            "
          >
         

            {/* Dynamic Affiliate Content */}
            <div
              dangerouslySetInnerHTML={{
                __html: affiliate?.description || "",
              }}
            />

            {/* Final */}
            <div className="mt-10 flex items-start gap-3 rounded-xl bg-primary/5 p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <p className="!mb-0 text-sm">
                By joining the affiliate program, you confirm that you have
                read, understood, and agreed to these affiliate terms and
                conditions.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default page;