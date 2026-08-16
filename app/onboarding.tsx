import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useI18n, g } from '@/i18n';
import { useProfile } from '@/stores/profile';
import { Button } from '@/components/ui/Button';
import { Text as AppText } from '@/components/ui/Text';
import { layout, radius, spacing } from '@/theme';
import { nextMonday, todayKey, tomorrowKey } from '@/lib/dates';

const FEATURES: Array<{ icon: string; colors: [string, string]; key: string }> = [
  { icon: 'calendar', colors: ['#5BA829', '#C6F135'], key: 'slide1' },
  { icon: 'restaurant', colors: ['#B83AA0', '#F04FD1'], key: 'slide2' },
  { icon: 'trending-up', colors: ['#C6F135', '#F04FD1'], key: 'slide3' },
];

export default function Onboarding() {
  const router = useRouter();
  const { t } = useI18n();
  const completeOnboarding = useProfile((s) => s.completeOnboarding);
  const [startWeight, setStartWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [tracking, setTracking] = useState<'weight' | 'full'>('weight');
  const [startKey, setStartKey] = useState<'today' | 'tomorrow' | 'monday'>('today');
  const [submitting, setSubmitting] = useState(false);

  const startDateFor = (k: string) => {
    if (k === 'tomorrow') return tomorrowKey();
    if (k === 'monday') return nextMonday();
    return todayKey();
  };

  const start = async () => {
    const w = parseFloat(startWeight);
    if (!w || Number.isNaN(w) || w < 30 || w > 300) {
      Alert.alert(g('errors.generic'));
      return;
    }
    setSubmitting(true);
    await completeOnboarding({
      startWeight: w,
      targetWeight: parseFloat(targetWeight) || undefined,
      trackingMode: tracking,
      planStartDate: startDateFor(startKey),
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    router.replace('/(app)');
    setSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
      <LinearGradient
        colors={['rgba(16,58,44,0.95)', 'rgba(8,12,10,0.0)']}
        style={styles.glow}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppText variant="eyebrow" color="#C6F135" uppercase center>
          {g('common.appName')}
        </AppText>
        <AppText variant="display" center>
          {t('onboarding.greeting')}
        </AppText>
        <AppText variant="lead" color="#9AA39A" center>
          {t('onboarding.subtitle')}
        </AppText>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.key} style={styles.feature}>
              <LinearGradient colors={f.colors} style={styles.featureIcon}>
                <Ionicons name={f.icon as never} size={24} color="#FFFFFF" />
              </LinearGradient>
              <AppText variant="caption" color="#9AA39A" center>
                {t(`onboarding.${f.key}Title`)}
              </AppText>
            </View>
          ))}
        </View>

        <AppText variant="title" style={styles.sectionTitle}>
          {t('auth.howToMeasure')}
        </AppText>
        <View style={styles.chipRow}>
          {(['weight', 'full'] as const).map((m) => (
            <Pressable
              key={m}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setTracking(m);
              }}
              style={[styles.chip, tracking === m && styles.chipActive]}
            >
              <AppText variant="body" style={tracking === m ? { color: '#0A0F0A' } : undefined}>
                {m === 'weight' ? t('auth.byWeight') : t('auth.byWeightAndMeasures')}
              </AppText>
            </Pressable>
          ))}
        </View>

        <View style={styles.grid2}>
          <View style={styles.field}>
            <AppText variant="caption" color="#9AA39A">
              {t('auth.startWeight')}
            </AppText>
            <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#6E766E"
              value={startWeight}
              onChangeText={setStartWeight}
            />
          </View>
          <View style={styles.field}>
            <AppText variant="caption" color="#9AA39A">
              {t('auth.targetWeight')}
            </AppText>
            <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#6E766E"
              value={targetWeight}
              onChangeText={setTargetWeight}
            />
          </View>
        </View>

        <AppText variant="title" style={styles.sectionTitle}>
          {t('auth.startDateTitle')}
        </AppText>
        <View style={styles.chipRow}>
          {(['today', 'tomorrow', 'monday'] as const).map((k) => (
            <Pressable
              key={k}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setStartKey(k);
              }}
              style={[styles.chip, startKey === k && styles.chipActive]}
            >
              <AppText variant="body" style={startKey === k ? { color: '#0A0F0A' } : undefined}>
                {k === 'today' ? t('auth.today') : k === 'tomorrow' ? t('auth.tomorrow') : t('auth.thisMonday')}
              </AppText>
            </Pressable>
          ))}
        </View>

        <AppText variant="caption" color="#6E766E" center style={styles.disclaimer}>
          {t('onboarding.disclaimer')}
        </AppText>

        <Button label={t('auth.ready')} onPress={start} loading={submitting} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0F0D' },
  content: { paddingHorizontal: layout.contentPadding, paddingTop: 32, paddingBottom: 40 },
  glow: { position: 'absolute', top: 0, left: 0, right: 0, height: 420 },
  features: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  feature: { flex: 1, alignItems: 'center', gap: spacing.sm },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: { marginTop: spacing.xl, marginBottom: spacing.md },
  chipRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  chipActive: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  grid2: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  field: { flex: 1 },
  input: {
    marginTop: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    fontFamily: 'Manrope_600SemiBold',
  },
  disclaimer: { marginTop: spacing.xl, marginBottom: spacing.lg },
});