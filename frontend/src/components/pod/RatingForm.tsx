import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star, MessageSquare, CheckCircle, User, Calendar } from "lucide-react";

// --- MOCK DATA ---
const COMPLETED_SESSIONS = [
  {
    id: 1,
    service: "Note Taking",
    course: "Calculus I (MATH101)",
    volunteerName: "Sarah Jenkins",
    date: "2023-10-15",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 2,
    service: "Campus Navigation",
    course: "Library to Building B",
    volunteerName: "Michael Chen",
    date: "2023-10-12",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 3,
    service: "Exam Scribe",
    course: "Physics 101 Midterm",
    volunteerName: "Emily Davis",
    date: "2023-10-05",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
  },
];

export const RateAssistancePage: React.FC = () => {
  // State to track ratings and feedback for each session
  // Key = session ID, Value = { rating: number, comment: string, submitted: boolean }
  const [reviews, setReviews] = useState<
    Record<number, { rating: number; comment: string; submitted: boolean }>
  >({});

  const handleRating = (id: number, rating: number) => {
    setReviews((prev) => ({
      ...prev,
      [id]: { ...prev[id], rating, submitted: false },
    }));
  };

  const handleComment = (id: number, comment: string) => {
    setReviews((prev) => ({
      ...prev,
      [id]: { ...prev[id], comment, submitted: false },
    }));
  };

  const handleSubmit = (id: number) => {
    // Mock API Call
    console.log(`Submitting review for ${id}:`, reviews[id]);

    // Set 'submitted' to true to show success state
    setReviews((prev) => ({
      ...prev,
      [id]: { ...prev[id], submitted: true },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600">
          <Star size={24} fill="currentColor" className="opacity-80" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Rate Your Experience
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your feedback helps us recognize great volunteers and improve the
            community.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {COMPLETED_SESSIONS.map((session) => {
          const review = reviews[session.id] || {
            rating: 0,
            comment: "",
            submitted: false,
          };
          const isSubmitted = review.submitted;

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className="p-6 border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Session Info */}
                  <div className="flex-shrink-0 flex md:flex-col items-center gap-4 md:w-48 text-center md:border-r border-gray-100 dark:border-gray-800 md:pr-6">
                    <img
                      src={session.avatar}
                      alt={session.volunteerName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="text-left md:text-center">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {session.volunteerName}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center md:justify-center gap-1 mt-1">
                        <Calendar size={12} /> {session.date}
                      </p>
                    </div>
                  </div>

                  {/* Rating Form */}
                  <div className="flex-grow space-y-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                        {session.service}
                      </h4>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {session.course}
                      </p>
                    </div>

                    {isSubmitted ? (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 flex flex-col items-center justify-center text-center py-8 animate-fade-in">
                        <CheckCircle
                          size={32}
                          className="text-green-500 mb-2"
                        />
                        <h5 className="font-bold text-green-700 dark:text-green-400">
                          Thank you for your feedback!
                        </h5>
                        <p className="text-sm text-green-600 dark:text-green-500">
                          Your review has been submitted successfully.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Star Rating */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                            How was the help provided?
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => handleRating(session.id, star)}
                                className="transition-transform hover:scale-110 focus:outline-none"
                              >
                                <Star
                                  size={28}
                                  className={`${
                                    review.rating >= star
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Comment Box */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                            Add a comment (Optional)
                          </label>
                          <div className="relative">
                            <MessageSquare
                              className="absolute top-3 left-3 text-gray-400"
                              size={18}
                            />
                            <textarea
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 pl-10 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white min-h-[80px]"
                              placeholder="e.g. Sarah was incredibly helpful and patient..."
                              value={review.comment}
                              onChange={(e) =>
                                handleComment(session.id, e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <Button
                            onClick={() => handleSubmit(session.id)}
                            disabled={review.rating === 0}
                            className="px-6"
                          >
                            Submit Review
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}

        {COMPLETED_SESSIONS.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No completed sessions to rate yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateAssistancePage;
