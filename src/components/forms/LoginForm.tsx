import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit?.(email.trim(), password);
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="gap-8">
      <View className="gap-3">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-300">
          Sign in to your account
        </Text>
      </View>

      <View className="gap-4">
        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            className="dark:focus:bg-gray-750 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-5 text-lg text-gray-900 focus:border-blue-500 focus:bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </View>

        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="dark:focus:bg-gray-750 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-5 text-lg text-gray-900 focus:border-blue-500 focus:bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </View>
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={isLoading}
        className={`w-full rounded-xl px-4 py-5 ${
          isLoading
            ? "bg-gray-400 dark:bg-gray-600"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        }`}
      >
        <Text className="text-center text-lg font-semibold text-white">
          {isLoading ? "Signing in..." : "Sign in"}
        </Text>
      </Pressable>

      <View className="gap-4">
        <Pressable>
          <Text className="text-center font-medium text-blue-600 dark:text-blue-400">
            Forgot your password?
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
