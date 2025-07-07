import React from "react";
import { TextInput, TextInputProps } from "react-native";

const Input = React.forwardRef<
  TextInput,
  TextInputProps & { className?: string }
>(
  (
    {
      className = "w-full h-16 sm:h-12 px-4 py-0 text-base bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:text-gray-900",
      style,
      ...props
    },
    ref
  ) => (
    <TextInput
      ref={ref}
      placeholderTextColor="#9CA3AF"
      textAlignVertical="center"
      style={[{ lineHeight: 16 }, style]}
      className={className}
      {...props}
    />
  )
);

Input.displayName = "Input";

export default Input;
