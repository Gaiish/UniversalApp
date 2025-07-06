import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

interface SignupFormProps {
  onSubmit?: (email: string, password: string, fullName: string) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit?.(email.trim(), password, fullName.trim());
    } catch (error) {
      Alert.alert("Error", "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="gap-8">
      {/* Header */}
      <View className="gap-3">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">
          Create account
        </Text>
        <Text className="text-gray-600 dark:text-gray-300 text-base">
          Sign up to get started
        </Text>
      </View>

      {/* Form Fields */}
      <View className="gap-4">
        {/* Full Name Field */}
        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Full Name
          </Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            className="w-full px-4 py-5 text-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-750"
          />
        </View>

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
            className="w-full px-4 py-5 text-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-750"
          />
        </View>

        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password (min. 6 characters)"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="w-full px-4 py-5 text-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-750"
          />
        </View>

        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Confirm Password
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="w-full px-4 py-5 text-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-750"
          />
        </View>
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={isLoading}
        className={`w-full py-5 px-4 rounded-xl ${
          isLoading
            ? "bg-gray-400 dark:bg-gray-600"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {isLoading ? "Creating account..." : "Create account"}
        </Text>
      </Pressable>

      <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
        By creating an account, you agree to our{" "}
        <Text className="text-blue-600 dark:text-blue-400">
          Terms of Service
        </Text>{" "}
        and{" "}
        <Text className="text-blue-600 dark:text-blue-400">Privacy Policy</Text>
      </Text>
    </View>
  );
}
