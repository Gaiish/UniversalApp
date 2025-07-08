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

import ErrorBoundary from "@/components/ErrorBoundary";
import { SCREENS } from "@/constants/Routes";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
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
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <RootNavigator />
            <StatusBar style="auto" />
          </ThemeProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const RootNavigator = () => {
  const { session } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name={SCREENS.DASHBOARD}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.PROFILE}
          options={{
            headerShown: true,
            title: "Profile Settings",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
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
      </Stack.Protected>
    </Stack>
  );
};
