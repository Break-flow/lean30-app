import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n';
import { usePurchases } from '@/stores/purchases';
import { layout, radius, spacing } from '@/theme';

type Plan = 'monthly' | 'yearly';

export default function Paywall() {
  const router = useRouter();
  const { t } = useI18n();
  const isPremium = usePurchases((s) => s.isPremium);
  const subscribing = usePurchases((s) => s.subscribing);
  const restoring = usePurchases((s) => s.restoring);
  const error = usePurchases((s) => s.error);
  const subscribe = usePurchases((s) => s.subscribe);
  const restore = usePurchases((s) => s.restore);
  const [plan, setPlan] = useState<Plan>('yearly');

  const perks = (t('paywall.perks') as unknown) as readonly string[];

  const onSubscribe = async () => {
    const ok = await subscribe(plan);
    if (ok) router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
      <View style={styles.top}>
        <View style={styles.topSpacer} />
        <Text variant="eyebrow" color="#C6F135" uppercase>
          {t('common.appName')}
        </Text>
        <Pressable onPress={() => router.back()} style={styles.close}>
          <Ionicons name="chevron-down" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {isPremium ? (
          <View style={styles.premiumActive}>
            <Ionicons name="checkmark-circle" size={56} color="#C6F135" />
            <Text variant="display" center style={{ marginTop: spacing.sm }}>
              {t('profile.premiumActive')}
            </Text>
            <Button
              label={t('profile.manageSub')}
              variant="ghost"
              style={styles.fullBtn}
              onPress={() => router.back()}
            />
          </View>
        ) : (
          <>
            <Text variant="display" center>
              {t('paywall.headline')}
            </Text>
            <Text variant="lead" color="#9AA39A" center style={styles.sub}>
              {t('paywall.subheadline')}
            </Text>

            <View style={styles.perks}>
              {perks.map((perk) => (
                <View key={perk} style={styles.perkRow}>
                  <Ionicons name="checkmark" size={16} color="#C6F135" />
                  <Text variant="body" color="#9AA39A" style={styles.perkText}>
                    {perk}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.plans}>
              <Pressable
                onPress={() => setPlan('monthly')}
                style={[styles.plan, plan === 'monthly' && styles.planActive]}
              >
                <Text variant="caption" color={plan === 'monthly' ? '#0A0F0A' : '#9AA39A'} uppercase>
                  {t('paywall.monthly')}
                </Text>
                <Text variant="title" color={plan === 'monthly' ? '#0A0F0A' : '#FFFFFF'}>
                  {t('paywall.monthlyPrice')}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setPlan('yearly')}
                style={[styles.plan, plan === 'yearly' && styles.planActive]}
              >
                <View style={styles.badge}>
                  <Text variant="caption" color="#0A0F0A" style={styles.badgeText}>
                    {t('paywall.yearlyBadge')}
                  </Text>
                </View>
                <Text variant="caption" color={plan === 'yearly' ? '#0A0F0A' : '#9AA39A'} uppercase>
                  {t('paywall.yearly')}
                </Text>
                <Text variant="title" color={plan === 'yearly' ? '#0A0F0A' : '#FFFFFF'}>
                  {t('paywall.yearlyPrice')}
                </Text>
              </Pressable>
            </View>

            <Text variant="caption" color="#9AA39A" center style={styles.trial}>
              {t('paywall.trialNote', { price: t('paywall.yearlyPrice') })}
            </Text>

            {error ? (
              <Text variant="caption" color="#F87171" center style={styles.error}>
                {error}
              </Text>
            ) : null}

            <Button
              label={t('paywall.subscribeNow')}
              variant="primary"
              onPress={onSubscribe}
              loading={subscribing}
            />
            <Button
              label={t('paywall.restore')}
              variant="ghost"
              onPress={() => restore()}
              loading={restoring}
              style={styles.restore}
            />

            <Text variant="caption" color="#6E766E" center style={styles.legal}>
              {t('paywall.legalLine')}
            </Text>
            <View style={styles.legalRow}>
              <Pressable onPress={() => router.push('/terms')}>
                <Text variant="caption" color="#9AA39A" style={styles.legalLink}>
                  {t('paywall.terms')}
                </Text>
              </Pressable>
              <View style={styles.legalDot} />
              <Pressable onPress={() => router.push('/privacy')}>
                <Text variant="caption" color="#9AA39A" style={styles.legalLink}>
                  {t('paywall.privacy')}
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D0F0D' },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  topSpacer: { width: 44 },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: layout.contentPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  sub: { marginTop: spacing.sm },
  perks: { marginTop: spacing.lg, gap: spacing.sm },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  perkText: { flex: 1 },
  plans: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
  plan: {
    flex: 1,
    gap: 6,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: spacing.md,
    position: 'relative',
  },
  planActive: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  badge: {
    position: 'absolute',
    top: -10,
    right: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: '#C6F135',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 10, fontWeight: '700' },
  trial: { marginTop: spacing.sm },
  error: { marginTop: spacing.sm },
  restore: { marginTop: spacing.md },
  legal: { marginTop: spacing.lg },
  legalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  legalDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#6E766E' },
  legalLink: { textDecorationLine: 'underline' },
  premiumActive: { alignItems: 'center', paddingTop: spacing.xl },
  fullBtn: { alignSelf: 'stretch', marginTop: spacing.xl },
});