
import { Star } from "lucide-react";
import React from "react";

type RatingSummaryProps = {
  StarRating: React.ComponentType<{
    rating: number;
    size?: number;
  }>;
  setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>;
  selectedRating: number | null;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  rating: number;
  totalReviews: number;
  ratingData: {
    star: number;
    count: number;
  }[];
};

const RatingSummary = ({
  StarRating,
  setSelectedRating,
  selectedRating,
  showForm,
  setShowForm,
  rating,
  totalReviews,
  ratingData,
}: RatingSummaryProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-8">
      <div className="grid gap-8 md:grid-cols-[180px_1fr_auto] md:items-center">
        {/* Overall Rating */}
        <div className="text-center md:border-r md:border-gray-200 md:pr-8">
          <div className="text-5xl font-semibold text-gray-900">
            {rating.toFixed(1)}
          </div>

          <div className="mt-2 flex justify-center">
            <StarRating rating={rating} size={19} />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {ratingData.map((item) => {
            const percentage =
              totalReviews > 0
                ? (item.count / totalReviews) * 100
                : 0;

            return (
              <button
                key={item.star}
                type="button"
                onClick={() =>
                  setSelectedRating(
                    selectedRating === item.star ? null : item.star,
                  )
                }
                className={`flex w-full items-center gap-3 text-sm ${
                  selectedRating === item.star
                    ? "opacity-100"
                    : "opacity-90"
                }`}
              >
                <span className="flex w-8 items-center gap-1 text-gray-600">
                  {item.star}

                  <Star
                    size={13}
                    className="fill-[#087096] text-[#087096]"
                  />
                </span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#087096] transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <span className="w-7 text-right text-xs text-gray-500">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Write Review */}
        <div className="md:pl-4">
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="w-full rounded-lg bg-[#087096] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#075d7a] md:w-auto"
          >
            {showForm ? "Close Review" : "Write a Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;


