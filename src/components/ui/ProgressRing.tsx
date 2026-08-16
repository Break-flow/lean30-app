import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useAppTheme } from '@/theme';
import { fonts } from '@/theme';

interface Props {
  progress: number; // 0..1
  size?: number;
  strokeWidth?: number;
  gradient?: readonly [string, string];
  center?: React.ReactNode;
}

export function ProgressRing({ progress, size = 120, strokeWidth = 12, gradient, center }: Props) {
  const theme = useAppTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const g = gradient ?? theme.primaryGradient;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.ringTrack}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Defs>
          <SvgGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={g[0]} />
            <Stop offset="100%" stopColor={g[1]} />
          </SvgGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ring-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference * (1 - clamped)}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {center != null && <View style={styles.center}>{center}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function RingCenterLabel({ value, unit }: { value: string; unit?: string }) {
  const theme = useAppTheme();
  return (
    <View style={stylesCenter.row}>
      <Text style={[stylesCenter.value, { color: theme.text, fontFamily: fonts.display }]}>{value}</Text>
      {unit ? <Text style={[stylesCenter.unit, { color: theme.textSecondary }]}>{unit}</Text> : null}
    </View>
  );
}

const stylesCenter = StyleSheet.create({
  row: { alignItems: 'baseline', flexDirection: 'row' },
  value: { fontSize: 26, lineHeight: 30 },
  unit: { fontSize: 13, marginLeft: 2 },
});