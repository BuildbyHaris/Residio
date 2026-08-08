import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api.js";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const reviewsPerPage = 3;

  // ==============================
  // Fetch Latest Reviews
  // ==============================
  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const response = await api.get("/reviews/latest?limit=6");

        if (response.data.success) {
          setReviews(response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch latest reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, []);

  // ==============================
  // Pagination
  // ==============================
  const totalPages = Math.ceil(
    reviews.length / reviewsPerPage
  );

  const visibleReviews = reviews.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages - 1)
    );
  };

  return (
    <section className="py-16 bg-[#FFF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==============================
            Header
        ============================== */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-900">
              What Students Say
            </h2>
          </div>

          <button
            onClick={() => navigate("/reviews")}
            className="text-sm font-semibold text-brand-orange hover:underline"
          >
            View All
          </button>
        </div>

        {/* ==============================
            Loading
        ============================== */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 bg-gray-100 rounded-xl2 animate-pulse"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          /* ==============================
             Empty State
          ============================== */
          <div className="text-center py-10 text-sm text-ink-500">
            No reviews yet.
          </div>
        ) : (
          /* ==============================
             Reviews
          ============================== */
          <div className="relative">

            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              aria-label="Previous reviews"
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-brand-peachLight transition-colors cursor-pointer hidden md:flex disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-ink-700" />
            </button>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleReviews.map((review) => (
                <TestimonialCard
                  key={review._id}
                  quote={review.comment}
                  name={review.user?.name || "Student"}
                  college={review.user?.college || ""}
                  avatar={review.user?.profileImage}
                  rating={review.rating}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next reviews"
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-brand-peachLight transition-colors cursor-pointer hidden md:flex disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-ink-700" />
            </button>
          </div>
        )}

        {/* ==============================
            Pagination Dots
        ============================== */}
        {!loading && reviews.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to review page ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentPage === index
                    ? "bg-brand-orange"
                    : "bg-border-light"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Testimonials;