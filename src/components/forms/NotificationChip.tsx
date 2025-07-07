import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function NotificationChip({ label, enabled }: { label: string; enabled?: boolean }) {
  return (
    <View className={`flex-row items-center px-2 py-1 rounded-full mr-2 mb-1 ${enabled ? 'bg-blue-100' : 'bg-gray-200 dark:bg-gray-700'}`}>
      <MaterialIcons name={enabled ? 'check-circle' : 'cancel'} size={18} color={enabled ? '#2563eb' : '#aaa'} />
      <Text className={`ml-1 text-sm font-medium ${enabled ? 'text-blue-700' : 'text-gray-500 dark:text-gray-300'}`}>{label}</Text>
    </View>
  );
}
