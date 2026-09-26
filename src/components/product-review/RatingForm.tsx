
"use client";

import { ImageIcon, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createReview } from "@/services/review.api";
import Image from "next/image";

type ReviewFormData = {
  rating: number;
  comment: string;
};

type RatingsReviewsProps = {
  productId: string;
  userId: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RatingForm = ({
  productId,
  userId,
  setShowForm,
}: RatingsReviewsProps) => {
  const [loading, setLoading] = useState(false);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  // Get current rating from React Hook Form
  const selectedRating = watch("rating");

  // Create image previews
  useEffect(() => {
    const previews = selectedImages.map((file) =>
      URL.createObjectURL(file),
    );

    setPreviewImages(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

  // Select images
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    // Optional: maximum 5 images
    const newImages = [...selectedImages, ...files].slice(0, 5);

    setSelectedImages(newImages);

    // Allow selecting the same file again
    event.target.value = "";
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  const onSubmit = async (data: ReviewFormData) => {
  if (!userId) {
    toast.error("Please login to submit a review");
    return;
  }

  if (!productId) {
    toast.error("Product information is missing");
    return;
  }

  if (!data.rating || data.rating < 1) {
    toast.error("Please select a rating");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("userID", userId);
    formData.append("productID", productId);
    formData.append("rating", String(data.rating));
    formData.append("comment", data.comment);

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    await createReview(formData);

    toast.success("Review submitted successfully!");

    reset({
      rating: 0,
      comment: "",
    });

    setSelectedImages([]);
    setShowForm(false);
  } catch (error) {
    console.error("Review submit error:", error);
    toast.error("Failed to submit review. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 rounded-2xl border border-gray-200 p-5 md:p-7"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Write a Review
        </h3>

        {/* Rating */}
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Your Rating
          </p>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setValue("rating", star, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className="rounded-md p-1"
              >
                <Star
                  size={25}
                  className={
                    star <= selectedRating
                      ? "fill-[#087096] text-[#087096]"
                      : "text-gray-300 transition hover:fill-[#087096] hover:text-[#087096]"
                  }
                />
              </button>
            ))}
          </div>

          {selectedRating > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              You rated this product {selectedRating}{" "}
              {selectedRating === 1 ? "star" : "stars"}.
            </p>
          )}

          {errors.rating && (
            <p className="mt-1 text-xs text-red-500">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Review */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Review
          </label>

          <textarea
            rows={4}
            placeholder="Share your experience with this product..."
            {...register("comment", {
              required: "Please write your review",
              minLength: {
                value: 10,
                message: "Review must be at least 10 characters",
              },
              maxLength: {
                value: 500,
                message: "Review cannot exceed 500 characters",
              },
            })}
            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#087096] focus:ring-1 focus:ring-[#087096]"
          />

          {errors.comment && (
            <p className="mt-1 text-xs text-red-500">
              {errors.comment.message}
            </p>
          )}
        </div>

        {/* Photos */}
        <div className="mt-5">
          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50">
            <ImageIcon size={18} />

            Add Photos

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <p className="mt-1 text-xs text-gray-400">
            You can upload up to 5 images.
          </p>

          {/* Image Preview */}
          {previewImages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {previewImages.map((image, index) => (
                <div
                  key={image}
                  className="group relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200"
                >
                  <Image
                    src={image}
                    alt={`Review preview ${index + 1}`}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                    unoptimized
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#087096] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#075d7a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

