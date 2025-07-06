import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../../global.css";

import { SCREENS } from "@/constants/Routes";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name={SCREENS.INDEX} options={{ headerShown: false }} />
        <Stack.Screen
          name={SCREENS.LOGIN}
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen
          name={SCREENS.SIGNUP}
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <Stack.Screen name={SCREENS.NOT_FOUND} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
