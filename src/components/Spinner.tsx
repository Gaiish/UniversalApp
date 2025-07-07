import React, { FC } from "react";
import { ActivityIndicator, View } from "react-native";

interface SpinnerProps {
  size?: "small" | "large" | number;
  color?: string;
  style?: object;
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({
  size = "large",
  color,
  style = {},
  className = "h-8 w-8 dark:focus:bg-white dark:focus:text-gray-900",
}) => {
  const spinnerColor = color ?? "#2563eb";

  return (
    <View
      className={"flex items-center justify-center " + className}
      style={style}
    >
      <ActivityIndicator
        size={size}
        color={spinnerColor}
        accessibilityLabel="Loading"
      />
    </View>
  );
};

export default Spinner;
