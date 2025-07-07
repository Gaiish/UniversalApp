import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/contexts/AuthContext";
import { SignupFormData, signupSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

export default function SignupForm() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setFormError(null);
    setIsLoading(true);
    const { error } = await signUp(data.email, data.password);
    if (error) {
      setFormError(error.message || "Sign up failed. Please try again.");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      router.replace("/");
    }
  };

  return (
    <View className="gap-8">
      <View className="gap-3">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">
          Create account
        </Text>
        <Text className="text-gray-600 dark:text-gray-300 text-base">
          Sign up to get started
        </Text>
      </View>

      <View className="gap-4">
        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Password
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Create a password (min. 6 characters)"
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        <View className="gap-3">
          <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
            Confirm Password
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Confirm your password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
      </View>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        className={`w-full py-5 px-4 rounded-xl ${
          isLoading
            ? "bg-gray-400 dark:bg-gray-600"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        }`}
      >
        {isLoading ? (
          <Spinner size="small" color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold text-lg">
            Create account
          </Text>
        )}
      </Pressable>
      {formError && (
        <Text className="text-center text-red-500 mt-2">{formError}</Text>
      )}

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
