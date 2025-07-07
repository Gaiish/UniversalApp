import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/contexts/AuthContext";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setFormError(null);
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setFormError(error.message || "Login failed. Please try again.");
    }
    setIsLoading(false);
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
            <Text className="text-sm text-red-500">{errors.email.message}</Text>
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
                placeholder="Enter your password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
          {errors.password && (
            <Text className="text-sm text-red-500">
              {errors.password.message}
            </Text>
          )}
        </View>
      </View>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        className={`w-full rounded-xl px-4 py-5 ${
          isLoading
            ? "bg-gray-400 dark:bg-gray-600"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        }`}
      >
        {isLoading ? (
          <Spinner size="small" color="#fff" />
        ) : (
          <Text className="text-center text-lg font-semibold text-white">
            Sign in
          </Text>
        )}
      </Pressable>
      {formError && (
        <Text className="text-center text-red-500 mt-2">{formError}</Text>
      )}
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
