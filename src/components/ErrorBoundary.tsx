import React, { Component, ErrorInfo, ReactNode } from 'react'
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
          <View className="flex-1 items-center justify-center px-6">
            <View className="w-full max-w-md gap-6 text-center">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                Something went wrong
              </Text>
              <Text className="text-base text-gray-600 dark:text-gray-300">
                We&apos;re sorry, but something unexpected happened. Please try again.
              </Text>
              
              {__DEV__ && this.state.error && (
                <View className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                  <Text className="text-sm text-red-600 dark:text-red-400">
                    {this.state.error.message}
                  </Text>
                </View>
              )}

              <Pressable
                onPress={this.handleReset}
                className="w-full rounded-xl bg-blue-600 px-4 py-4 hover:bg-blue-700 active:bg-blue-800"
              >
                <Text className="text-center text-lg font-semibold text-white">
                  Try Again
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      )
    }

    return this.props.children
  }
}