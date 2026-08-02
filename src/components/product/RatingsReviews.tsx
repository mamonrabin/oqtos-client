// components/RatingsReviews.tsx
'use client';

import { useState } from 'react';
import { Star, ChartBar, Pen, Eye, EyeOff, Calendar, MessageCircle } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
}

interface RatingsReviewsProps {
  product: {
    totalReviews: number;
    averageRating: number;
    starDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  reviews: Review[];
}

export default function RatingsReviews({ product}: RatingsReviewsProps) {
  const [showNoReviews, setShowNoReviews] = useState(false);

  const totalReviews = product.totalReviews || 0;
  const avgRating = product.averageRating || 0;

  // Calculate percentages for star distribution
  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  const starData = [
    { stars: 5, count: product.starDistribution?.[5] || 0 },
    { stars: 4, count: product.starDistribution?.[4] || 0 },
    { stars: 3, count: product.starDistribution?.[3] || 0 },
    { stars: 2, count: product.starDistribution?.[2] || 0 },
    { stars: 1, count: product.starDistribution?.[1] || 0 },
  ];

  // Render star icons
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Render large star display
  const renderLargeStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400 text-2xl">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400 w-6 h-6" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="text-gray-300 w-6 h-6" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="fill-yellow-400 text-yellow-400 w-6 h-6" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="text-gray-300 w-6 h-6" />
        ))}
      </div>
    );
  };

  const toggleNoReviews = () => {
    setShowNoReviews(!showNoReviews);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Ratings & Reviews</h2>
          <p className="text-gray-500 mt-1">
            {showNoReviews ? '0 Reviews' : `${totalReviews} Reviews`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-primary">
            {showNoReviews ? '0.0' : avgRating.toFixed(1)}
          </p>
          <div className="flex justify-end mt-1">
            {showNoReviews ? (
              <div className="text-gray-300 text-2xl">☆☆☆☆☆</div>
            ) : (
              renderLargeStars(avgRating)
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left (breakdown) + Right (reviews) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
        {/* Left Column - Star Distribution */}
        <div className="lg:col-span-2 space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <ChartBar className="w-5 h-5 text-amber-400" />
            Star breakdown
          </h3>

          {starData.map(({ stars, count }) => {
            const percentage = getPercentage(count);
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-12 text-sm font-medium text-gray-700">
                  {stars} ★
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                    style={{ width: showNoReviews ? '0%' : `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-10 text-right">
                  {showNoReviews ? '0%' : `${percentage}%`}
                </span>
              </div>
            );
          })}

          <div className="pt-3 mt-2 border-t border-gray-200 text-sm text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              Total reviews
            </span>
            <span className="font-medium text-gray-700">
              {showNoReviews ? '0' : totalReviews}
            </span>
          </div>
        </div>

        {/* Right Column - Reviews List */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              <Pen className="w-5 h-5 text-amber-400" />
              Customer reviews
            </h3>
            <span className="text-sm text-gray-400">most recent</span>
          </div>

          {/* Reviews Container
          <div className="space-y-4">
            {showNoReviews ? (
              // No Reviews State
              <div className="text-center py-12">
                <div className="text-6xl mb-3">⭐</div>
                <h3 className="text-xl font-semibold text-gray-800">No Reviews Yet</h3>
                <p className="text-gray-500 mt-2">
                  Be the first customer to review this product.
                </p>
              </div>
            ) : reviews.length > 0 ? (
              // Reviews List
              reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={index < reviews.length - 1 ? 'border-b border-gray-100 pb-4' : ''}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full ${review.avatarColor} flex items-center justify-center text-sm font-medium`}
                    >
                      {review.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-medium text-gray-800">{review.author}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {review.date}
                        </span>
                      </div>
                      <div className="mt-0.5">{renderStars(review.rating)}</div>
                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No reviews yet (but not in "showNoReviews" mode)
              <div className="text-center py-12">
                <div className="text-6xl mb-3">⭐</div>
                <h3 className="text-xl font-semibold text-gray-800">No Reviews Yet</h3>
                <p className="text-gray-500 mt-2">
                  Be the first customer to review this product.
                </p>
              </div>
            )}

            {!showNoReviews && reviews.length > 0 && (
              <div className="mt-4 text-center text-sm text-amber-500 hover:text-amber-600 cursor-pointer transition-colors">
                <span className="flex items-center justify-center gap-1">
                  ↓ Load more reviews
                </span>
              </div>
            )}
          </div> */}
        </div>
      </div>

      {/* Demo Toggle Button */}
      <div className="mt-8 text-center border-t border-gray-200 pt-4">
        <button
          onClick={toggleNoReviews}
          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors"
        >
          {showNoReviews ? (
            <>
              <Eye className="w-4 h-4" />
              Show reviews
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              Show &quot;No Reviews&quot; state
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Example usage in a page:
/*
import RatingsReviews from '@/components/RatingsReviews';

export default function ProductPage() {
  const product = {
    totalReviews: 124,
    averageRating: 4.7,
    starDistribution: {
      5: 89,
      4: 22,
      3: 7,
      2: 4,
      1: 2,
    },
  };

  const reviews = [
    {
      id: '1',
      author: 'John D.',
      initials: 'JD',
      avatarColor: 'bg-amber-100 text-amber-700',
      rating: 5,
      date: 'May 12, 2026',
      comment: 'Absolutely love this product! Exceeded my expectations in every way.',
    },
    {
      id: '2',
      author: 'Sarah M.',
      initials: 'SM',
      avatarColor: 'bg-blue-100 text-blue-700',
      rating: 4,
      date: 'May 8, 2026',
      comment: 'Great quality, fast shipping. Only minor issue with the packaging.',
    },
    {
      id: '3',
      author: 'Alex R.',
      initials: 'AR',
      avatarColor: 'bg-green-100 text-green-700',
      rating: 5,
      date: 'Apr 28, 2026',
      comment: 'Perfect for my daily use. Highly recommend to others.',
    },
    {
      id: '4',
      author: 'Taylor W.',
      initials: 'TW',
      avatarColor: 'bg-purple-100 text-purple-700',
      rating: 3,
      date: 'Apr 15, 2026',
      comment: 'Decent product, but not quite what I expected. Still good value.',
    },
  ];

  return <RatingsReviews product={product} reviews={reviews} />;
}
*/