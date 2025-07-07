import LoginForm from "@/components/forms/LoginForm";
import AuthNavbar from "@/components/ui/AuthNavbar";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <AuthNavbar />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12 lg:px-8">
          <View className="mx-auto w-full max-w-md">
            <LoginForm />

            <View className="mt-8 flex-row justify-center border-t border-gray-200 pt-6 dark:border-gray-700">
              <Text className="text-center text-gray-600 dark:text-gray-300">
                {"Don't have an account? "}
              </Text>
              <Link href="/signup" replace asChild>
                <Pressable>
                  <Text className="font-medium text-blue-600 dark:text-blue-400">
                    Sign up
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
