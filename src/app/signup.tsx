import SignupForm from "@/components/forms/SignupForm";
import AuthNavbar from "@/components/ui/AuthNavbar";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const handleSignup = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    // TODO: Connect to Supabase auth
    console.log("Signup:", { email, password, fullName });
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <AuthNavbar />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-12 lg:px-8">
          <View className="mx-auto w-full max-w-md">
            <SignupForm onSubmit={handleSignup} />

            <View className="mt-8 flex-row justify-center border-t border-gray-200 pt-6 dark:border-gray-700">
              <Text className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
              </Text>
              <Link href="/login" replace asChild>
                <Pressable>
                  <Text className="font-medium text-blue-600 dark:text-blue-400">
                    Sign in
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
