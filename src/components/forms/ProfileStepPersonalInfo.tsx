import Input from "@/components/Input";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type ProfileStepPersonalInfoProps = {
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  onBack?: () => void;
  onSubmit?: () => void;
  loading?: boolean;
};

export default function ProfileStepPersonalInfo({
  onNext,
  isFirst,
  isLast,
}: ProfileStepPersonalInfoProps) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger(["firstName", "lastName", "phone"]);
    if (valid) onNext();
  };

  return (
    <View className="gap-4 pt-0 pb-0 px-4 sm:p-6">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        Personal Information
      </Text>
      <Text className="text-base text-gray-600 dark:text-gray-300 mb-1">
        Let us know who you are
      </Text>
      
      <View className="flex-row gap-3">
        <View className="flex-1 gap-2">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">
            First Name
          </Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="John"
              />
            )}
          />
          {errors.firstName && (
            <Text className="text-sm text-red-500">
              {String(errors.firstName.message)}
            </Text>
          )}
        </View>
        <View className="flex-1 gap-2">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Last Name
          </Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Doe"
              />
            )}
          />
          {errors.lastName && (
            <Text className="text-sm text-red-500">
              {String(errors.lastName.message)}
            </Text>
          )}
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Phone Number
        </Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="+1 (555) 123-4567"
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.phone && (
          <Text className="text-sm text-red-500">
            {String(errors.phone.message)}
          </Text>
        )}
      </View>
      <Pressable
        onPress={handleNext}
        className={`w-full rounded-xl px-4 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800`}
      >
        <Text className="text-center text-lg font-semibold text-white">
          Next
        </Text>
      </Pressable>
    </View>
  );
}
