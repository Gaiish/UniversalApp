import MultiStepProfileForm from "@/components/forms/MultiStepProfileForm";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <MultiStepProfileForm />
    </SafeAreaView>
  );
}
