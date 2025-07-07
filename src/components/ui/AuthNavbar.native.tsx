import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";

interface AuthNavbarProps {
  backText?: string;
}

const AuthNavbar: FC<AuthNavbarProps> = ({ backText = "Back" }) => (
  <View className="flex-row items-center px-4 py-2">
    <Pressable
      onPress={() => router.back()}
      className="flex-row items-center gap-2"
      accessibilityLabel="Go back"
      accessibilityRole="button"
    >
      <Ionicons
        name="arrow-back"
        size={24}
        className="text-gray-600 dark:text-gray-300"
      />
      <Text className="text-gray-600 dark:text-gray-300">{backText}</Text>
    </Pressable>
  </View>
);

export default AuthNavbar;
