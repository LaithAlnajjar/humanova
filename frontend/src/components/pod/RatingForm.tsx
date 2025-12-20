import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { submitRating } from '@/services/podService';
import { Star } from 'lucide-react';

const ratingSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

interface RatingFormProps {
  interactionId: string; // To associate the rating with a specific interaction/volunteer
}

export const RatingForm: React.FC<RatingFormProps> = ({ interactionId }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: z.infer<typeof ratingSchema>) => {
    try {
      await submitRating({
        id: interactionId,
        volunteerId: 'volunteer-1', // This would be dynamic
        ...data,
      });
      alert('Rating submitted successfully!');
    } catch (error) {
      alert('Failed to submit rating.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Rating</label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${
                    star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => field.onChange(star)}
                />
              ))}
            </div>
          )}
        />
        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
      </div>
      <div>
        <label htmlFor="comment">Comment (Optional)</label>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="comment"
              rows={4}
              className="w-full p-2 border rounded"
            />
          )}
        />
      </div>
      <Button type="submit">Submit Rating</Button>
    </form>
  );
};
