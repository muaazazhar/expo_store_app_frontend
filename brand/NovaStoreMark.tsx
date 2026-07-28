import Svg, { Path, Rect } from 'react-native-svg';

import { MARK, type MarkProps } from './markShared';

/**
 * NovaStore mark — shared hex shell + geometric storefront.
 */
export function NovaStoreMark({
  size = 32,
  color = 'currentColor',
  title = 'NovaStore',
  ...rest
}: MarkProps) {
  const hidden = rest['aria-hidden'] === true || rest['aria-hidden'] === 'true';

  return (
    <Svg
      viewBox={MARK.viewBox}
      width={size}
      height={size}
      fill="none"
      accessibilityRole={hidden ? undefined : 'image'}
      accessibilityLabel={hidden ? undefined : title}
      accessible={!hidden}
    >
      <Path
        d={MARK.hexPath}
        stroke={color}
        strokeWidth={MARK.strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Storefront roof / awning */}
      <Path
        d="M10.5 14.25 L16 10.75 L21.5 14.25"
        stroke={color}
        strokeWidth={MARK.strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Building body */}
      <Path
        d="M11.25 14.25 H20.75 V22.5 H11.25 Z"
        stroke={color}
        strokeWidth={MARK.strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Door */}
      <Rect
        x="14.35"
        y="17.75"
        width="3.3"
        height="4.75"
        stroke={color}
        strokeWidth={MARK.strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
