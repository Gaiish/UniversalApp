import Spinner from "@/components/Spinner";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    try {
      const { error } = await signOut();
      if (error) {
        showToast({
          type: "error",
          title: "Sign Out Failed",
          message: error.message || "Failed to sign out. Please try again.",
        });
      }
    } catch {
      showToast({
        type: "error",
        title: "Error",
        message: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md gap-8">
          <View className="gap-4 text-center">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to Dashboard
            </Text>
            <Text className="text-lg text-gray-600 dark:text-gray-300">
              {user?.email}
            </Text>
          </View>
          <View className="gap-4">
            <Link href="/(app)/profile" asChild>
              <Pressable className="w-full rounded-xl bg-blue-600 px-4 py-4 hover:bg-blue-700 active:bg-blue-800">
                <Text className="text-center text-lg font-semibold text-white">
                  Profile Settings
                </Text>
              </Pressable>
            </Link>

            <Pressable
              onPress={handleSignOut}
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-4 py-4 dark:border-gray-600"
            >
              {loading ? (
                <Spinner size="small" color="#fff" />
              ) : (
                <Text className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Sign Out
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
