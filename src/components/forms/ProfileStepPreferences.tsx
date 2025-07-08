import { useFormContext, Controller } from "react-hook-form";
import { View, Text, Pressable, Switch } from "react-native";

const CURRENCY_OPTIONS = [
  { label: "USD ($)", value: "USD" },
  { label: "EUR (€)", value: "EUR" },
  { label: "GBP (£)", value: "GBP" },
  { label: "CAD ($)", value: "CAD" },
];

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
];

type ProfileStepPreferencesProps = {
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmit?: () => void;
  loading?: boolean;
};

export default function ProfileStepPreferences({ onNext, onBack, isFirst, isLast }: ProfileStepPreferencesProps) {
  const { control, formState: { errors }, trigger } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger([
      "preferences.currency",
      "preferences.language",
      "notifications.email",
      "notifications.push",
      "notifications.sms"
    ]);
    if (valid) onNext();
  };

  return (
    <View className="gap-4 pt-0 pb-0 px-4 sm:p-6">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">Preferences</Text>
      <Text className="text-base text-gray-600 dark:text-gray-300 mb-1">Set your preferences and notifications</Text>
      

      {/* Currency */}
      <View className="gap-2">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">Preferred Currency</Text>
        <Controller
          control={control}
          name="preferences.currency"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap gap-2">
              {CURRENCY_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  className={`px-3 py-2 rounded-lg border ${value === opt.value ? 'bg-blue-600 border-blue-700' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                  onPress={() => onChange(opt.value)}
                >
                  <Text className={`font-medium ${value === opt.value ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>{opt.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        />
        {errors.preferences && typeof errors.preferences === "object" && "currency" in errors.preferences && (
          <Text className="text-sm text-red-500">{String((errors.preferences as any).currency?.message)}</Text>
        )}
      </View>

      {/* Language */}
      <View className="gap-2">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">Language</Text>
        <Controller
          control={control}
          name="preferences.language"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  className={`px-3 py-2 rounded-lg border ${value === opt.value ? 'bg-blue-600 border-blue-700' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                  onPress={() => onChange(opt.value)}
                >
                  <Text className={`font-medium ${value === opt.value ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>{opt.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        />
        {errors.preferences && typeof errors.preferences === "object" && "language" in errors.preferences && (
          <Text className="text-sm text-red-500">{String((errors.preferences as any).language?.message)}</Text>
        )}
      </View>

      {/* Notifications */}
      <View className="gap-4 mt-4">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</Text>
        <Controller
          control={control}
          name="notifications.email"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 dark:text-gray-200">Email notifications</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
          )}
        />
        <Controller
          control={control}
          name="notifications.push"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 dark:text-gray-200">Push notifications</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
          )}
        />
        <Controller
          control={control}
          name="notifications.sms"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 dark:text-gray-200">SMS notifications</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
          )}
        />
      </View>

      <View className="flex-row gap-4 mt-4">
        {!isFirst && (
          <Pressable onPress={onBack} className="flex-1 rounded-xl bg-gray-200 px-4 py-4 dark:bg-gray-700">
            <Text className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">Back</Text>
          </Pressable>
        )}
        <Pressable
          onPress={handleNext}
          className={`flex-1 rounded-xl px-4 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800`}
        >
          <Text className="text-center text-lg font-semibold text-white">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
