import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Rect, Stop, Text as SvgText } from 'react-native-svg';
import { Text } from '@/components/ui/Text';
import { radius } from '@/theme';

interface Point {
  label: string;
  value: number;
}

export function WeightChart({ points }: { points: Point[] }) {
  if (points.length === 0) {
    return (
      <View style={styles.empty}>
        <Text variant="body" color="#9AA39A" center>
          No data yet
        </Text>
      </View>
    );
  }

  const min = Math.min(...points.map((p) => p.value)) - 1;
  const max = Math.max(...points.map((p) => p.value)) + 1;
  const range = Math.max(1, max - min);
  const width = 320;
  const height = 140;
  const pad = 8;
  const innerH = height - 30;
  const barW = Math.min(28, (width - pad * 2) / points.length - 6);

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <SvgGradient id="bar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#C6F135" />
            <Stop offset="100%" stopColor="#5BA829" stopOpacity={0.6} />
          </SvgGradient>
        </Defs>
        {points.map((p, i) => {
          const h = ((p.value - min) / range) * innerH;
          const x = pad + i * ((width - pad * 2) / points.length) + ((width - pad * 2) / points.length - barW) / 2;
          const y = height - 26 - h;
          return (
            <React.Fragment key={i}>
              <Rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(3, h)}
                rx={4}
                fill="url(#bar-grad)"
              />
              <SvgText
                x={x + barW / 2}
                y={height - 8}
                fontSize={9}
                fill="#9AA39A"
                fontFamily="Manrope_500Medium"
                textAnchor="middle"
              >
                {p.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { paddingVertical: 40, alignItems: 'center' },
});