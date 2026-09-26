
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Star,
  ThumbsUp,
} from "lucide-react";


import RatingSummary from "./RatingSummary";
import { getAllReviews } from "@/services/review.api";
import Image from "next/image";
import { apiBaseUrl } from "@/config";
import { RatingForm } from "./RatingForm";

type RatingsReviewsProps = {
  productId: string;
  userId: string;
};

type Review = {
  _id: string;
  userID?: {
    _id: string;
    name: string;
    email: string;
  };
  productID?: {
    _id: string;
    title: string;
  };
  rating: number;
  comment: string;
  images: string[];
  status: string;
  createdAt: string;
};

const StarRating = ({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? "fill-[#087096] text-[#087096]"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

export default function RatingsReviews({
  productId,
  userId,
}: RatingsReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const response = await getAllReviews();

        // Adjust this depending on your API response structure
        const reviewData = response?.data || response?.reviews || response;

        const productReviews = Array.isArray(reviewData)
          ? reviewData.filter(
              (review: Review) => review.productID?._id === productId,
            )
          : [];

        setReviews(productReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const filteredReviews =
    selectedRating !== null
      ? reviews.filter((review) => review.rating === selectedRating)
      : reviews;

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        totalReviews
      : 0;

  const ratingData = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }));

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Customer Reviews
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            See what our customers are saying about this product.
          </p>
        </div>

        {/* Rating Summary */}
        <RatingSummary
          StarRating={StarRating}
          setSelectedRating={setSelectedRating}
          selectedRating={selectedRating}
          showForm={showForm}
          setShowForm={setShowForm}
          rating={averageRating}
          totalReviews={totalReviews}
          ratingData={ratingData}
        />

        {/* Review Form */}
        {showForm && (
          <RatingForm
            productId={productId}
            userId={userId}
            setShowForm={setShowForm}
          />
        )}

        {/* Reviews Header */}
        <div className="mt-10 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>

            {selectedRating !== null && (
              <button
                type="button"
                onClick={() => setSelectedRating(null)}
                className="mt-1 text-sm text-[#087096]"
              >
                Clear filter
              </button>
            )}
          </div>

          <button
            type="button"
            className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600"
          >
            Most Recent
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Rating Filters */}
        <div className="flex flex-wrap gap-2 py-5">
          <button
            type="button"
            onClick={() => setSelectedRating(null)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedRating === null
                ? "bg-[#087096] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Reviews
          </button>

          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              type="button"
              key={rating}
              onClick={() =>
                setSelectedRating(
                  selectedRating === rating ? null : rating,
                )
              }
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm transition ${
                selectedRating === rating
                  ? "bg-[#087096] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {rating}
              <Star size={13} className="fill-current" />
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">Loading reviews...</p>
          </div>
        )}

        {/* Reviews */}
        {!loading && (
          <div className="divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <article key={review._id} className="py-7">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#087096]/10 text-sm font-semibold text-[#087096]">
                    {review.userID?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* User */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {review.userID?.name || "Anonymous"}
                      </h4>

                      {review.status === "Approved" && (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 size={13} />
                          Verified Purchase
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <StarRating rating={review.rating} size={15} />

                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>

                    {/* Comment */}
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                      {review.comment}
                    </p>

                    {/* Review Images */}
                    {review?.images?.length > 0 && (
                      <div className="mt-4 flex gap-2">
                        {review?.images?.map((image, index) => (
                          <div
                            key={index}
                            className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100"
                          >
                            <Image
                              src={apiBaseUrl + image}
                              alt={`Review image ${index + 1}`}
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Helpful */}
                    <button
                      type="button"
                      className="mt-4 flex items-center gap-2 text-xs text-gray-500 transition hover:text-[#087096]"
                    >
                      <ThumbsUp size={15} />
                      Helpful
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredReviews.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500">
              {selectedRating !== null
                ? "No reviews found for this rating."
                : "No reviews yet for this product."}
            </p>
          </div>
        )}

        {/* Load More */}
        {!loading && filteredReviews.length > 0 && (
          <div className="mt-6 text-center">
            <button
              type="button"
              className="rounded-lg border border-[#087096] px-6 py-2.5 text-sm font-medium text-[#087096] transition hover:bg-[#087096] hover:text-white"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


