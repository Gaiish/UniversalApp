import Spinner from "@/components/Spinner";
import { MaterialIcons } from "@expo/vector-icons";
import { useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import NotificationChip from "./NotificationChip";
type ProfileStepReviewProps = {
  onBack: () => void;
  onSubmit?: () => void;
  isFirst: boolean;
  isLast: boolean;
  loading: boolean;
  onNext?: () => void;
};

export default function ProfileStepReview({
  onBack,
  onSubmit,
  isFirst,
  isLast,
  loading,
}: ProfileStepReviewProps) {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <View className="gap-4 pt-0 pb-0 px-4 sm:p-6">
      <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
        Review your profile
      </Text>
      <Text className="text-lg text-gray-600 dark:text-gray-300 mb-1">
        Please double-check your details before submitting.
      </Text>
      

      {/* Personal Info */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Personal Information
        </Text>
        <View className="flex-row flex-wrap items-center mb-2">
          <Text className="text-lg font-semibold mr-2 text-gray-900 dark:text-white">
            {values.firstName} {values.lastName}
          </Text>
        </View>
        <Text className="text-base text-gray-700 dark:text-gray-200 mb-1">
          Phone: <Text className="font-semibold">{values.phone}</Text>
        </Text>
      </View>

      {/* Bio */}
      {values.bio && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Bio
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-200">
            {values.bio}
          </Text>
        </View>
      )}

      {/* Preferences */}
      {(values.preferences?.currency || values.preferences?.language) && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Preferences
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-1">
            {values.preferences?.currency && (
              <View className="flex-row items-center px-3 py-1 rounded-full bg-blue-100 mr-2 mb-1">
                <MaterialIcons name="attach-money" size={18} color="#2563eb" />
                <Text className="ml-1 text-sm font-medium text-blue-700">
                  {values.preferences.currency}
                </Text>
              </View>
            )}
            {values.preferences?.language && (
              <View className="flex-row items-center px-3 py-1 rounded-full bg-blue-100 mr-2 mb-1">
                <MaterialIcons name="language" size={18} color="#2563eb" />
                <Text className="ml-1 text-sm font-medium text-blue-700">
                  {values.preferences.language}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Notifications */}
      {(values.notifications?.email !== undefined ||
        values.notifications?.push !== undefined ||
        values.notifications?.sms !== undefined) && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Notifications
          </Text>
          <View className="flex-row flex-wrap mb-1">
            <NotificationChip
              label="Email"
              enabled={values.notifications?.email}
            />
            <NotificationChip
              label="Push"
              enabled={values.notifications?.push}
            />
            <NotificationChip label="SMS" enabled={values.notifications?.sms} />
          </View>
        </View>
      )}

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
          onPress={onSubmit}
          disabled={loading}
          className={`flex-1 rounded-xl px-4 py-4 ${loading ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}`}
        >
          {loading ? (
            <Spinner size="small" color="#fff" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              Submit
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
