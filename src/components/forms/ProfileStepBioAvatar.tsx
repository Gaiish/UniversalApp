import Input from "@/components/Input";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

export default function ProfileStepBioAvatar({
  onNext,
  onBack,
  isFirst,
  isLast,
}: {
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger(["bio"]);
    if (valid) onNext();
  };

  return (
    <View className="gap-6 p-6">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        Bio & Avatar
      </Text>
      <Text className="text-base text-gray-600 dark:text-gray-300 mb-2">
        Tell us about yourself and add a profile picture
      </Text>

      {/* Avatar/profile picture upload */}

      <View className="gap-2">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Bio
        </Text>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Tell us about yourself..."
              multiline
              numberOfLines={3}
            />
          )}
        />
        {errors.bio && (
          <Text className="text-sm text-red-500">
            {String(errors.bio.message)}
          </Text>
        )}
      </View>

      <View className="flex-row gap-4 mt-4">
        {!isFirst && (
          <Pressable
            onPress={onBack}
            className="flex-1 rounded-xl bg-gray-200 px-4 py-4 dark:bg-gray-700"
          >
            <Text className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
              Back
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={handleNext}
          className={`flex-1 rounded-xl px-4 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800`}
        >
          <Text className="text-center text-lg font-semibold text-white">
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
