import { useAuth } from "@/contexts/AuthContext";
import { useProfileData } from "@/hooks/useProfileData";
import { ProfileFormData, profileSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Spinner from "../Spinner";
import ProfileStepBioAvatar from "./ProfileStepBioAvatar";
import ProfileStepPersonalInfo from "./ProfileStepPersonalInfo";
import ProfileStepPreferences from "./ProfileStepPreferences";
import ProfileStepReview from "./ProfileStepReview";

const steps = [
  ProfileStepPersonalInfo,
  ProfileStepBioAvatar,
  ProfileStepPreferences,
  ProfileStepReview,
];

export default function MultiStepProfileForm({
  defaultValues,
}: {
  defaultValues?: Partial<ProfileFormData>;
}) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [success, setSuccess] = useState(false); // Only define once at the top
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    upsertProfile,
  } = useProfileData(user?.id);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultValues || undefined,
    mode: "onChange",
  });

  // Reset form when profile loads
  useEffect(() => {
    if (profile) {
      methods.reset({
        ...methods.getValues(),
        ...profile,
      });
    }
  }, [methods, profile]);

  const router = useRouter();

  const handleFinalSubmit = async (values: ProfileFormData) => {
    setSubmitLoading(true);
    setError(null);
    if (!user) {
      setError("You must be logged in to update your profile.");
      setSubmitLoading(false);
      return;
    }
    try {
      await upsertProfile(values, user.id);
      setSuccess(true);
      router.replace("/(app)");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Failed to update profile");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const StepComponent = steps[currentStep];
  const isReviewStep = currentStep === steps.length - 1;

  if (profileLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner size="large" color="#2563eb" />
        {profileError && (
          <Text className="mt-4 text-red-500">{profileError}</Text>
        )}
      </View>
    );
  }

  return (
    <View className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black py-8 px-2">
      {/* Web/Desktop Card Container */}
      <View className="hidden md:block w-full max-w-xl rounded-xl shadow-lg bg-white dark:bg-gray-900 p-4 sm:p-8 mx-auto">
        <FormProvider {...methods}>
          {isReviewStep ? (
            <ProfileStepReview
              onBack={() => setCurrentStep((s) => s - 1)}
              onSubmit={methods.handleSubmit(handleFinalSubmit)}
              isFirst={currentStep === 0}
              isLast={true}
              loading={submitLoading}
            />
          ) : (
            <StepComponent
              onNext={() => setCurrentStep((s) => s + 1)}
              onBack={() => setCurrentStep((s) => s - 1)}
              isFirst={currentStep === 0}
              isLast={currentStep === steps.length - 1}
              loading={submitLoading}
            />
          )}
          {(error || profileError) && (
            <Text className="text-center text-red-500 mt-2">
              {error || profileError}
            </Text>
          )}
          {success && (
            <Text className="text-center text-green-600 mt-2">
              Profile updated! Redirecting…
            </Text>
          )}
        </FormProvider>
      </View>
      {/* Mobile/Tablet Full-Width Container */}
      <View className="block md:hidden w-full">
        <FormProvider {...methods}>
          {isReviewStep ? (
            <ProfileStepReview
              onBack={() => setCurrentStep((s) => s - 1)}
              onSubmit={methods.handleSubmit(handleFinalSubmit)}
              isFirst={currentStep === 0}
              isLast={true}
              loading={submitLoading}
            />
          ) : (
            <StepComponent
              onNext={() => setCurrentStep((s) => s + 1)}
              onBack={() => setCurrentStep((s) => s - 1)}
              isFirst={currentStep === 0}
              isLast={currentStep === steps.length - 1}
              loading={submitLoading}
            />
          )}
          {(error || profileError) && (
            <Text className="text-center text-red-500 mt-2">
              {error || profileError}
            </Text>
          )}
          {success && (
            <Text className="text-center text-green-600 mt-2">
              Profile updated! Redirecting…
            </Text>
          )}
        </FormProvider>
      </View>
    </View>
  );
}
