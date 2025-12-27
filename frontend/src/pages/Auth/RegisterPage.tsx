import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { register } from "@/services/authService";
import {
  UserRole,
  Gender,
  University,
  StudyLevel,
  AvailabilityType,
  DisabilityType,
} from "@/types/enums";
import { UserProfilePayload } from "@/types/registration";

// --- STYLING CONSTANTS ---
const LABEL_CLASSES =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100";

// Matches standard inputs exactly
const SELECT_CLASSES =
  "w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 pr-10 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-humanova-olive focus:ring-2 focus:ring-humanova-olive/20 dark:border-gray-600 dark:bg-black/40 dark:text-white dark:focus:border-humanova-gold dark:focus:ring-humanova-gold/20";

const OPTION_CLASSES =
  "bg-white text-gray-900 dark:bg-gray-800 dark:text-white";

// Helper: Convert Numeric Enum to Options for Select Dropdowns
const getEnumOptions = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // Filter out reverse mappings
    .map((key) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(), // Format CamelCase to Text
      value: enumObj[key as keyof typeof enumObj],
    }));
};

const ROLE_DESCRIPTIONS: Record<string, string> = {
  [UserRole.Student]: "Find internships and volunteering opportunities.",
  [UserRole.Volunteer]: "Help students with disabilities on campus.",
  [UserRole.Charity]: "Recruit volunteers for your initiatives.",
  [UserRole.Company]: "Post internships and find student talent.",
  [UserRole.University]: "Manage student participation and approve activities.",
  [UserRole.DisabledStudent]: "Request assistance from campus volunteers.",
};

const STEPS = ["Account", "Role", "Profile Details"];

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // --- Form State ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.Student);

  // Dynamic Profile State
  const [profileData, setProfileData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (error: Error) => {
      setErrors((prev) => ({ ...prev, global: error.message }));
    },
  });

  const updateProfile = (field: string, value: any) => {
    setProfileData((prev: any) => ({ ...prev, [field]: value }));
  };

  // --- Validation ---
  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    // Step 0: Account
    if (step === 0) {
      if (!fullName.trim()) nextErrors.name = "Full Name is required";
      if (!email.trim()) nextErrors.email = "Email is required";
      if (!password) nextErrors.password = "Password is required";
    }

    // Step 2: Profile (Role Specific)
    if (step === 2) {
      if (role === UserRole.Student) {
        if (!profileData.universityId)
          nextErrors.universityId = "University is required";
        if (!profileData.major) nextErrors.major = "Major is required";
        if (!profileData.universityNumber)
          nextErrors.universityNumber = "Uni ID is required";
      } else if (role === UserRole.Company) {
        if (!profileData.companyName)
          nextErrors.companyName = "Company Name is required";
        if (!profileData.commercialRegistrationNumber)
          nextErrors.crn = "CRN is required";
      } else if (role === UserRole.Volunteer) {
        if (!profileData.age) nextErrors.age = "Age is required";
        if (profileData.gender === undefined || profileData.gender === "")
          nextErrors.gender = "Gender is required";
        if (!profileData.phoneNumber)
          nextErrors.phoneNumber = "Phone is required";
        if (!profileData.location) nextErrors.location = "Location is required";
      } else if (role === UserRole.DisabledStudent) {
        if (!profileData.universityId)
          nextErrors.universityId = "University is required";
        if (!profileData.major) nextErrors.major = "Major is required";
        if (
          profileData.disabilityType === undefined ||
          profileData.disabilityType === ""
        )
          nextErrors.disabilityType = "Disability Type is required";
        if (!profileData.conditionSummary)
          nextErrors.conditionSummary = "Condition Summary is required";
      } else if (role === UserRole.University) {
        if (!profileData.universityId)
          nextErrors.universityId = "Select the University you represent";
        if (!profileData.contactPhone)
          nextErrors.contactPhone = "Contact Phone is required";
      } else if (role === UserRole.Charity) {
        if (!profileData.charityName)
          nextErrors.charityName = "Charity Name is required";
        if (!profileData.mission)
          nextErrors.mission = "Mission Statement is required";
        if (!profileData.location) nextErrors.location = "Location is required";
        if (!profileData.phoneNumber)
          nextErrors.phoneNumber = "Phone is required";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrors({});
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) return;

    if (step < STEPS.length - 1) {
      handleNext();
      return;
    }

    // --- Payload Mapping ---
    let finalProfile: UserProfilePayload = {} as any;

    if (role === UserRole.Student) {
      finalProfile = {
        universityId: Number(profileData.universityId),
        major: profileData.major,
        studyLevel: Number(profileData.studyLevel) || StudyLevel.Year1,
        universityNumber: profileData.universityNumber,
        phoneNumber: profileData.phoneNumber || "0000000000",
        universityEmail: profileData.universityEmail || email,
        skills: [],
      };
    } else if (role === UserRole.Company) {
      finalProfile = {
        companyName: profileData.companyName,
        commercialRegistrationNumber: profileData.commercialRegistrationNumber,
        companyAddress: profileData.companyAddress || "Amman",
        industry: profileData.industry || "General",
        contactPersonName: fullName,
        contactPersonEmail: email,
        contactPersonJobLevel: "Manager",
        contactPersonPhone: profileData.contactPhone || "0000000000",
      };
    } else if (role === UserRole.Volunteer) {
      finalProfile = {
        age: Number(profileData.age),
        gender: Number(profileData.gender),
        availability:
          Number(profileData.availability) || AvailabilityType.PartTime,
        governorate: "Amman",
        location: profileData.location,
        phoneNumber: profileData.phoneNumber,
        skills: [],
      };
    } else if (role === UserRole.DisabledStudent) {
      // Based on your previous error logs
      finalProfile = {
        universityId: Number(profileData.universityId),
        major: profileData.major,
        phoneNumber: profileData.phoneNumber || "0000000000",
        email: email,
        disabilityType: Number(profileData.disabilityType),
        conditionSummary: profileData.conditionSummary,
        preferredTime: "Anytime",
        assistanceNeeds: [],
      };
    } else if (role === UserRole.University) {
      // Based on your previous error logs
      finalProfile = {
        universityId: Number(profileData.universityId),
        contactName: fullName,
        contactEmail: email,
        contactPhone: profileData.contactPhone,
        jobTitle: profileData.jobTitle || "Administrator",
      };
    } else if (role === UserRole.Charity) {
      // GUESSED FIELDS - Please verify with backend DTO if these fail
      finalProfile = {
        charityName: profileData.charityName,
        missionStatement: profileData.mission,
        location: profileData.location,
        phoneNumber: profileData.phoneNumber,
        licenseNumber: profileData.licenseNumber || "PENDING",
        websiteUrl: profileData.websiteUrl || "",
      };
    }

    mutation.mutate({
      fullName,
      email,
      password,
      role,
      profile: finalProfile,
    });
  };

  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-10">
      <motion.div
        className="glass-panel w-full max-w-xl rounded-3xl p-8 shadow-xl border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Join Humanova
        </h1>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Create your account to start making an impact.
        </p>

        <Stepper steps={STEPS} activeIndex={step} />

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <AnimatePresence mode="wait">
            {/* STEP 0: Account Info */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
              </motion.div>
            )}

            {/* STEP 1: Role Selection */}
            {step === 1 && (
              <motion.div
                key="step-role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {getEnumOptions(UserRole).map((opt) => {
                  const active = role === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={`rounded-2xl border px-3 py-3 text-left text-xs transition ${
                        active
                          ? "border-humanova-olive bg-humanova-cream/70 shadow-md dark:border-humanova-gold dark:bg-humanova-oliveDark/70"
                          : "border-gray-300 bg-white/70 hover:border-humanova-olive/70 dark:border-gray-600 dark:bg-black/40 dark:hover:border-humanova-gold/60"
                      }`}
                    >
                      <div className="font-semibold text-gray-900 dark:text-gray-50">
                        {opt.label}
                      </div>
                      <div className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
                        {ROLE_DESCRIPTIONS[opt.value]}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* STEP 2: Profile Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {/* 1. STUDENT FORM */}
                {role === UserRole.Student && (
                  <>
                    <div className="space-y-1">
                      <label className={LABEL_CLASSES}>University</label>
                      <select
                        className={SELECT_CLASSES}
                        onChange={(e) =>
                          updateProfile("universityId", e.target.value)
                        }
                        value={profileData.universityId || ""}
                      >
                        <option value="" className={OPTION_CLASSES}>
                          Select University...
                        </option>
                        {getEnumOptions(University).map((u) => (
                          <option
                            key={u.value}
                            value={u.value}
                            className={OPTION_CLASSES}
                          >
                            {u.label}
                          </option>
                        ))}
                      </select>
                      {errors.universityId && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.universityId}
                        </p>
                      )}
                    </div>
                    <Input
                      label="Major"
                      value={profileData.major || ""}
                      onChange={(e) => updateProfile("major", e.target.value)}
                      error={errors.major}
                    />
                    <div className="space-y-1">
                      <label className={LABEL_CLASSES}>Study Level</label>
                      <select
                        className={SELECT_CLASSES}
                        onChange={(e) =>
                          updateProfile("studyLevel", e.target.value)
                        }
                        value={profileData.studyLevel || ""}
                      >
                        <option value="" className={OPTION_CLASSES}>
                          Select Level...
                        </option>
                        {getEnumOptions(StudyLevel).map((s) => (
                          <option
                            key={s.value}
                            value={s.value}
                            className={OPTION_CLASSES}
                          >
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="University ID Number"
                      value={profileData.universityNumber || ""}
                      onChange={(e) =>
                        updateProfile("universityNumber", e.target.value)
                      }
                      error={errors.universityNumber}
                    />
                    <Input
                      label="Phone Number"
                      value={profileData.phoneNumber || ""}
                      onChange={(e) =>
                        updateProfile("phoneNumber", e.target.value)
                      }
                    />
                  </>
                )}

                {/* 2. COMPANY FORM */}
                {role === UserRole.Company && (
                  <>
                    <Input
                      label="Company Name"
                      value={profileData.companyName || ""}
                      onChange={(e) =>
                        updateProfile("companyName", e.target.value)
                      }
                      error={errors.companyName}
                    />
                    <Input
                      label="Commercial Registration No."
                      value={profileData.commercialRegistrationNumber || ""}
                      onChange={(e) =>
                        updateProfile(
                          "commercialRegistrationNumber",
                          e.target.value
                        )
                      }
                      error={errors.crn}
                    />
                    <Input
                      label="Industry"
                      value={profileData.industry || ""}
                      onChange={(e) =>
                        updateProfile("industry", e.target.value)
                      }
                    />
                    <Input
                      label="Address"
                      value={profileData.companyAddress || ""}
                      onChange={(e) =>
                        updateProfile("companyAddress", e.target.value)
                      }
                    />
                    <Input
                      label="Contact Phone"
                      value={profileData.contactPhone || ""}
                      onChange={(e) =>
                        updateProfile("contactPhone", e.target.value)
                      }
                    />
                  </>
                )}

                {/* 3. VOLUNTEER FORM */}
                {role === UserRole.Volunteer && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        label="Age"
                        value={profileData.age || ""}
                        onChange={(e) => updateProfile("age", e.target.value)}
                        error={errors.age}
                      />
                      <div>
                        <label className={LABEL_CLASSES}>Gender</label>
                        <select
                          className={SELECT_CLASSES}
                          onChange={(e) =>
                            updateProfile("gender", e.target.value)
                          }
                          value={
                            profileData.gender !== undefined
                              ? profileData.gender
                              : ""
                          }
                        >
                          <option value="" className={OPTION_CLASSES}>
                            Select Gender...
                          </option>
                          {getEnumOptions(Gender).map((g) => (
                            <option
                              key={g.value}
                              value={g.value}
                              className={OPTION_CLASSES}
                            >
                              {g.label}
                            </option>
                          ))}
                        </select>
                        {errors.gender && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.gender}
                          </p>
                        )}
                      </div>
                    </div>
                    <Input
                      label="Phone Number"
                      value={profileData.phoneNumber || ""}
                      onChange={(e) =>
                        updateProfile("phoneNumber", e.target.value)
                      }
                      error={errors.phoneNumber}
                    />
                    <Input
                      label="City / Location"
                      value={profileData.location || ""}
                      onChange={(e) =>
                        updateProfile("location", e.target.value)
                      }
                      error={errors.location}
                    />
                  </>
                )}

                {/* 4. DISABLED STUDENT FORM */}
                {role === UserRole.DisabledStudent && (
                  <>
                    <div className="space-y-1">
                      <label className={LABEL_CLASSES}>University</label>
                      <select
                        className={SELECT_CLASSES}
                        onChange={(e) =>
                          updateProfile("universityId", e.target.value)
                        }
                        value={profileData.universityId || ""}
                      >
                        <option value="" className={OPTION_CLASSES}>
                          Select University...
                        </option>
                        {getEnumOptions(University).map((u) => (
                          <option
                            key={u.value}
                            value={u.value}
                            className={OPTION_CLASSES}
                          >
                            {u.label}
                          </option>
                        ))}
                      </select>
                      {errors.universityId && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.universityId}
                        </p>
                      )}
                    </div>

                    <Input
                      label="Major"
                      value={profileData.major || ""}
                      onChange={(e) => updateProfile("major", e.target.value)}
                      error={errors.major}
                    />

                    <div className="space-y-1">
                      <label className={LABEL_CLASSES}>Disability Type</label>
                      <select
                        className={SELECT_CLASSES}
                        onChange={(e) =>
                          updateProfile("disabilityType", e.target.value)
                        }
                        value={
                          profileData.disabilityType !== undefined
                            ? profileData.disabilityType
                            : ""
                        }
                      >
                        <option value="" className={OPTION_CLASSES}>
                          Select Type...
                        </option>
                        {getEnumOptions(DisabilityType).map((d) => (
                          <option
                            key={d.value}
                            value={d.value}
                            className={OPTION_CLASSES}
                          >
                            {d.label}
                          </option>
                        ))}
                      </select>
                      {errors.disabilityType && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.disabilityType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className={LABEL_CLASSES}>Condition Summary</label>
                      <textarea
                        className={`${SELECT_CLASSES} min-h-[80px]`}
                        placeholder="Briefly describe your condition..."
                        value={profileData.conditionSummary || ""}
                        onChange={(e) =>
                          updateProfile("conditionSummary", e.target.value)
                        }
                      />
                      {errors.conditionSummary && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.conditionSummary}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* 5. UNIVERSITY REP FORM */}
                {role === UserRole.University && (
                  <>
                    <div className="space-y-1">
                      <label className={LABEL_CLASSES}>
                        Select Your University
                      </label>
                      <select
                        className={SELECT_CLASSES}
                        onChange={(e) =>
                          updateProfile("universityId", e.target.value)
                        }
                        value={profileData.universityId || ""}
                      >
                        <option value="" className={OPTION_CLASSES}>
                          Select University...
                        </option>
                        {getEnumOptions(University).map((u) => (
                          <option
                            key={u.value}
                            value={u.value}
                            className={OPTION_CLASSES}
                          >
                            {u.label}
                          </option>
                        ))}
                      </select>
                      {errors.universityId && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.universityId}
                        </p>
                      )}
                    </div>
                    <Input
                      label="Official Contact Phone"
                      value={profileData.contactPhone || ""}
                      onChange={(e) =>
                        updateProfile("contactPhone", e.target.value)
                      }
                      error={errors.contactPhone}
                    />
                    <Input
                      label="Your Job Title"
                      value={profileData.jobTitle || ""}
                      onChange={(e) =>
                        updateProfile("jobTitle", e.target.value)
                      }
                    />
                  </>
                )}

                {/* 6. CHARITY FORM */}
                {role === UserRole.Charity && (
                  <>
                    <Input
                      label="Charity Name"
                      value={profileData.charityName || ""}
                      onChange={(e) =>
                        updateProfile("charityName", e.target.value)
                      }
                      error={errors.charityName}
                    />
                    <div className="space-y-1">
                      <label className={LABEL_CLASSES}>Mission Statement</label>
                      <textarea
                        className={`${SELECT_CLASSES} min-h-[80px]`}
                        value={profileData.mission || ""}
                        onChange={(e) =>
                          updateProfile("mission", e.target.value)
                        }
                      />
                      {errors.mission && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.mission}
                        </p>
                      )}
                    </div>
                    <Input
                      label="Location / City"
                      value={profileData.location || ""}
                      onChange={(e) =>
                        updateProfile("location", e.target.value)
                      }
                      error={errors.location}
                    />
                    <Input
                      label="Official Phone"
                      value={profileData.phoneNumber || ""}
                      onChange={(e) =>
                        updateProfile("phoneNumber", e.target.value)
                      }
                      error={errors.phoneNumber}
                    />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Global Error Message */}
          {errors.global && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg text-center">
              {errors.global}
            </p>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <Button
              type="button"
              variant="ghost"
              onClick={step === 0 ? () => navigate("/auth/login") : handlePrev}
            >
              {step === 0 ? "Log in instead" : "Back"}
            </Button>

            {step < STEPS.length - 1 ? (
              <Button type="submit">Next Step</Button>
            ) : (
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="min-w-[120px]"
              >
                {mutation.isPending ? "Creating..." : "Create Account"}
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
