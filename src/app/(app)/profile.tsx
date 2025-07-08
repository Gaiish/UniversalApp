import MultiStepProfileForm from "@/components/forms/MultiStepProfileForm";


import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <MultiStepProfileForm />
    </View>
  );
}
