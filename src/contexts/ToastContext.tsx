import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Animated, View, Text, Pressable } from 'react-native'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])

    const duration = toast.duration || 4000
    setTimeout(() => {
      hideToast(id)
    }, duration)
  }

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const getToastColors = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 dark:bg-green-600'
      case 'error':
        return 'bg-red-500 dark:bg-red-600'
      case 'warning':
        return 'bg-yellow-500 dark:bg-yellow-600'
      case 'info':
      default:
        return 'bg-blue-500 dark:bg-blue-600'
    }
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {toasts.length > 0 && (
        <View className="absolute top-12 left-4 right-4 z-50">
          {toasts.map(toast => (
            <Animated.View
              key={toast.id}
              className={`mb-2 rounded-lg p-4 shadow-lg ${getToastColors(toast.type)}`}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-white">
                    {toast.title}
                  </Text>
                  {toast.message && (
                    <Text className="mt-1 text-sm text-white/90">
                      {toast.message}
                    </Text>
                  )}
                </View>
                
                <Pressable
                  onPress={() => hideToast(toast.id)}
                  className="ml-4 rounded p-1"
                >
                  <Text className="text-lg text-white">×</Text>
                </Pressable>
              </View>
            </Animated.View>
          ))}
        </View>
      )}
    </ToastContext.Provider>
  )
}