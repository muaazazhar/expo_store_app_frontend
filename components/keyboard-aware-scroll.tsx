import { useCallback, type ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type DismissKeyboardAreaProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Tap-outside dismisses the keyboard on native.
 * On web, a Pressable wrapper steals TextInput focus (focus then immediate blur).
 */
export function DismissKeyboardArea({ children, style }: DismissKeyboardAreaProps) {
  if (Platform.OS === 'web') {
    return <View style={style}>{children}</View>;
  }

  return (
    <Pressable style={style} onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </Pressable>
  );
}

type KeyboardAwareScrollProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  footer?: ReactNode;
  keyboardVerticalOffset?: number;
} & Omit<ScrollViewProps, 'contentContainerStyle' | 'children'>;

/**
 * Scrollable form layout: avoids keyboard covering inputs/buttons and allows dismiss on tap or drag.
 */
export function KeyboardAwareScroll({
  children,
  contentContainerStyle,
  footer,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 8 : 0,
  ...scrollProps
}: KeyboardAwareScrollProps) {
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <ScrollView
        {...scrollProps}
        style={[styles.flex, scrollProps.style]}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={scrollProps.showsVerticalScrollIndicator ?? false}>
        {Platform.OS === 'web' ? (
          <View style={styles.tapToDismiss}>{children}</View>
        ) : (
          <Pressable style={styles.tapToDismiss} onPress={dismissKeyboard} accessible={false}>
            {children}
          </Pressable>
        )}
      </ScrollView>
      {footer}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  tapToDismiss: {
    flexGrow: 1,
    gap: 12,
  },
});
