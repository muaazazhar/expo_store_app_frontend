import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { ACTIVE_PRODUCT, PRODUCTS, type ProductId } from './identity';
import { NovaStoreMark } from './NovaStoreMark';
import type { MarkProps } from './markShared';

export interface BrandLogoProps extends MarkProps {
  product?: ProductId;
  /** Show product wordmark beside the mark */
  withWordmark?: boolean;
  /** Optional secondary line under the wordmark */
  withCompany?: boolean;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  wordmarkStyle?: StyleProp<TextStyle>;
  companyStyle?: StyleProp<TextStyle>;
}

export function BrandLogo({
  product = ACTIVE_PRODUCT,
  withWordmark = false,
  withCompany = false,
  size = 28,
  color = '#0F172A',
  gap = 10,
  style,
  wordmarkStyle,
  companyStyle,
  ...markProps
}: BrandLogoProps) {
  const identity = PRODUCTS[product] ?? PRODUCTS.novastore;
  const markSize = typeof size === 'number' ? size : 28;

  if (!withWordmark) {
    return <NovaStoreMark size={markSize} color={color} title={identity.name} {...markProps} />;
  }

  return (
    <View style={[styles.row, { gap }, style]} accessibilityRole="image" accessibilityLabel={identity.name}>
      <NovaStoreMark size={markSize} color={color} title={identity.name} aria-hidden />
      <View style={styles.copy}>
        <Text
          style={[
            styles.wordmark,
            {
              color,
              fontSize: Math.max(14, markSize * 0.55),
            },
            wordmarkStyle,
          ]}
        >
          {identity.name}
        </Text>
        {withCompany && product !== 'novalith' ? (
          <Text
            style={[
              styles.company,
              { fontSize: Math.max(10, markSize * 0.32) },
              companyStyle,
            ]}
          >
            by Novalith Labs
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy: {
    flexDirection: 'column',
  },
  wordmark: {
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  company: {
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
});
