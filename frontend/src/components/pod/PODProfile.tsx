import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getPODProfile, updatePODProfile } from '@/services/podService';
import { PODProfile as PODProfileType } from '@/types/pod';

const profileSchema = z.object({
  disabilityType: z.string().min(1, 'Disability type is required'),
  needs: z.array(z.string()).min(1, 'At least one need is required'),
  university: z.string().min(1, 'University is required'),
  major: z.string().min(1, 'Major is required'),
});

export const PODProfile: React.FC = () => {
  const [profile, setProfile] = useState<PODProfileType | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PODProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      disabilityType: '',
      needs: [],
      university: '',
      major: '',
    },
  });

  useEffect(() => {
    // Fetch profile data - using a placeholder for user ID
    getPODProfile('current-user').then((data) => {
      setProfile(data);
      reset(data);
    });
  }, [reset]);

  const onSubmit = async (data: PODProfileType) => {
    if (profile) {
      const updatedProfile = await updatePODProfile({ ...profile, ...data });
      setProfile(updatedProfile);
      reset(updatedProfile);
      alert('Profile updated successfully!');
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="disabilityType">Disability Type</label>
        <Controller
          name="disabilityType"
          control={control}
          render={({ field }) => <Input {...field} id="disabilityType" />}
        />
        {errors.disabilityType && <p className="text-red-500">{errors.disabilityType.message}</p>}
      </div>
      <div>
        <label>Needs</label>
        <div className="flex flex-wrap gap-4">
          {['Accompaniment', 'Note-taking', 'Transportation', 'Academic Support'].map((need) => (
            <Controller
              key={need}
              name="needs"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value.includes(need)}
                    onChange={(e) => {
                      const newNeeds = e.target.checked
                        ? [...field.value, need]
                        : field.value.filter((n) => n !== need);
                      field.onChange(newNeeds);
                    }}
                  />
                  {need}
                </label>
              )}
            />
          ))}
        </div>
        {errors.needs && <p className="text-red-500">{errors.needs.message}</p>}
      </div>
      <div>
        <label htmlFor="university">University</label>
        <Controller
          name="university"
          control={control}
          render={({ field }) => <Input {...field} id="university" />}
        />
        {errors.university && <p className="text-red-500">{errors.university.message}</p>}
      </div>
      <div>
        <label htmlFor="major">Major</label>
        <Controller
          name="major"
          control={control}
          render={({ field }) => <Input {...field} id="major" />}
        />
        {errors.major && <p className="text-red-500">{errors.major.message}</p>}
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};
