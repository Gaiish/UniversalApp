import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center bg-white px-6 dark:bg-gray-900">
      <View className="items-center gap-6">
        <Text className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Universal App
        </Text>

        <View className="w-full max-w-xs gap-4 sm:max-w-sm">
          <Link href="/login" asChild>
            <Pressable className="min-h-[56px] w-full justify-center rounded-xl bg-blue-600 px-6 py-4">
              <Text className="text-center text-lg font-semibold text-white">
                Login
              </Text>
            </Pressable>
          </Link>

          <Link href="/signup" asChild>
            <Pressable className="min-h-[56px] w-full justify-center rounded-xl bg-gray-600 px-6 py-4">
              <Text className="text-center text-lg font-semibold text-white">
                Sign Up
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
