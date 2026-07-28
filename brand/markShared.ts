/** Shared geometric language for all Novalith product marks */
export const MARK = {
  viewBox: '0 0 32 32',
  strokeWidth: 1.75,
  /** Outer rounded hexagon — identical across every product mark */
  hexPath: 'M16 3.25 L26.75 9.4 V22.6 L16 28.75 L5.25 22.6 V9.4 Z',
} as const;

export interface MarkProps {
  size?: number;
  color?: string;
  title?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}
