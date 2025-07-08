import { View, Text, ActivityIndicator } from 'react-native'

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        {message}
      </Text>
    </View>
  )
}