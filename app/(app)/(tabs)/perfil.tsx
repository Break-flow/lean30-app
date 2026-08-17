import { useMemo, useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Switch, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { WeightChart } from '@/components/progress/WeightChart';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { useI18n } from '@/i18n';
import { useSettings, AppLanguage, AppMode } from '@/stores/settings';
import { useProfile } from '@/stores/profile';
import { useChallenge } from '@/stores/challenge';
import { usePurchases } from '@/stores/purchases';
import { usePhotos } from '@/stores/photos';
import { todayKey, currentStreak } from '@/lib/dates';
import { spacing } from '@/theme';

const LANG_OPTIONS: Array<{ code: AppLanguage; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
];

export default function Perfil() {
  const { t } = useI18n();
  const router = useRouter();
  const language = useSettings((s) => s.language);
  const mode = useSettings((s) => s.mode);
  const reminders = useSettings((s) => s.reminders);
  const setLanguage = useSettings((s) => s.setLanguage);
  const setMode = useSettings((s) => s.setMode);
  const setReminders = useSettings((s) => s.setReminders);
  const name = useProfile((s) => s.name);
  const setName = useProfile((s) => s.setName);
  const resetProfile = useProfile((s) => s.reset);
  const isPremium = usePurchases((s) => s.isPremium);
  const setMockPremium = usePurchases((s) => s.setMockPremium);
  const [naming, setNaming] = useState(name);

  const targetWeight = useProfile((s) => s.targetWeight);
  const trackingMode = useProfile((s) => s.trackingMode);
  const weights = useProfile((s) => s.weights);
  const measurements = useProfile((s) => s.measurements);
  const logWeight = useProfile((s) => s.logWeight);
  const logMeasurements = useProfile((s) => s.logMeasurements);
  const planStartDate = useProfile((s) => s.planStartDate);
  const progress = useChallenge((s) => s.progress);
  const doneCount = useChallenge((s) => s.doneCount);

  const [wi, setWi] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');

  const entries = useMemo(
    () =>
      Object.entries(weights)
        .sort(([a], [b]) => (a < b ? -1 : 1))
        .map(([date, value]) => ({ date, value })),
    [weights],
  );

  const first = entries[0];
  const last = entries[entries.length - 1];
  const loss = first && last ? +(first.value - last.value).toFixed(1) : null;

  const chartPoints = useMemo(
    () =>
      entries
        .slice(-12)
        .map((e) => ({ label: e.date.slice(5).replace('-', '/'), value: e.value, date: e.date })),
    [entries],
  );

  const streak = useMemo(() => currentStreak(progress, planStartDate), [progress, planStartDate]);
  const latestWaist = measurements[todayKey()]?.waist;

  const photos = usePhotos((s) => s.photos);
  const addPhoto = usePhotos((s) => s.add);
  const removePhoto = usePhotos((s) => s.remove);
  const [photoLock, setPhotoLock] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const pickPhoto = async () => {
    if (!isPremium) {
      setPhotoLock(true);
      return;
    }
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(t('profile.data'), t('profile.remindersUnavailable'));
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!res.canceled && res.assets?.[0]) {
      addPhoto({ date: todayKey(), uri: res.assets[0].uri });
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="heading">{t('tabs.perfil')}</Text>
        <Text variant="caption" color="#9AA39A">
          {t('home.progressNote')}
        </Text>
      </View>

      <Card elevated style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={styles.subInfo}>
            <Ionicons
              name={isPremium ? 'diamond' : 'lock-open-outline'}
              size={20}
              color={isPremium ? '#C6F135' : '#9AA39A'}
            />
            <Text variant="title" color={isPremium ? '#C6F135' : '#FFFFFF'}>
              {isPremium ? t('profile.premiumActive') : t('profile.freeTier')}
            </Text>
          </View>
          {!isPremium && (
            <Pressable onPress={() => router.push('/paywall')}>
              <Text variant="body" color="#C6F135">
                {t('onboarding.goPremium')}
              </Text>
            </Pressable>
          )}
        </View>
        {isPremium && __DEV__ && (
          <Pressable onPress={() => setMockPremium(false)} style={{ marginTop: spacing.sm }}>
            <Text variant="caption" color="#6E766E">
              dev: reset premium
            </Text>
          </Pressable>
        )}
      </Card>

      <Card style={styles.card}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text variant="caption" color="#9AA39A">{t('progress.start')}</Text>
            <Text variant="display" color="#FFFFFF">{first ? first.value : '--'} kg</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text variant="caption" color="#9AA39A">{t('progress.current')}</Text>
            <Text variant="display" color="#C6F135">{last ? last.value : '--'} kg</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text variant="caption" color="#9AA39A">{t('progress.target')}</Text>
            <Text variant="display" color="#C6F135">{targetWeight ?? '--'} kg</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text variant="caption" color="#9AA39A">{t('challenge.completed')}</Text>
            <Text variant="display" color="#C6F135">{doneCount}/30</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text variant="caption" color="#9AA39A">{t('home.streak')}</Text>
            <View style={styles.streakStat}>
              <Ionicons name="flame" size={20} color="#C6F135" />
              <Text variant="display" color="#C6F135">{streak}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text variant="caption" color="#9AA39A">{t('home.days')}</Text>
            <Text variant="display" color="#C6F135">{loss != null ? Math.abs(loss) : '--'}</Text>
          </View>
        </View>
      </Card>

      {entries.length > 0 && (
        <Card style={styles.card}>
          <Text variant="title" style={styles.sectionTitle}>
            {t('progress.trend')}
          </Text>
          <WeightChart points={chartPoints} />
        </Card>
      )}

      <Card style={styles.card}>
        <Text variant="eyebrow" color="#9AA39A" uppercase>
          {t('progress.savePhoto')}
        </Text>
        <Text variant="caption" color="#9AA39A" style={{ marginTop: spacing.sm }}>
          {t('challenge.subtitleFree')}
        </Text>
        {photos.length === 0 ? (
          <Pressable style={styles.photoEmpty} onPress={pickPhoto}>
            <Ionicons name={isPremium ? 'camera-outline' : 'lock-closed'} size={26} color="#C6F135" />
            <Text variant="body" color="#9AA39A" center style={{ marginTop: spacing.sm }}>
              {isPremium ? t('progress.savePhoto') : t('recipes.lockedCta')}
            </Text>
          </Pressable>
        ) : (
          <>
            <View style={styles.photoGrid}>
              {photos.map((p) => (
                <Pressable key={p.id} style={styles.photoCell} onPress={() => setPreview(p.uri)}>
                  <Image source={{ uri: p.uri }} style={styles.photoImg} />
                  <Pressable style={styles.photoDelete} onPress={() => removePhoto(p.id)}>
                    <Ionicons name="close" size={12} color="#FFFFFF" />
                  </Pressable>
                </Pressable>
              ))}
              <Pressable style={[styles.photoCell, styles.photoAdd]} onPress={pickPhoto}>
                <Ionicons name="camera-outline" size={26} color="#C6F135" />
              </Pressable>
            </View>
            <Text variant="caption" color="#9AA39A" style={{ marginTop: spacing.sm }}>
              {photos.length} {t('home.days')}
            </Text>
          </>
        )}
      </Card>

      <Modal visible={preview != null} transparent animationType="fade" onRequestClose={() => setPreview(null)}>
        <Pressable style={styles.previewWrap} onPress={() => setPreview(null)}>
          {preview ? <Image source={{ uri: preview }} style={styles.previewImg} /> : null}
        </Pressable>
      </Modal>

      <LockedOverlay
        visible={photoLock}
        onClose={() => setPhotoLock(false)}
        onUnlock={() => {
          setPhotoLock(false);
          router.push('/paywall');
        }}
        title={t('common.locked')}
        body={t('recipe.lockedBody')}
      />

      <Card style={styles.card}>
        <Text variant="title" style={styles.sectionTitle}>
          {t('progress.logWeight')}
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="kg"
            placeholderTextColor="#6E766E"
            value={wi}
            onChangeText={setWi}
          />
          <Button
            label={t('common.save')}
            style={{ height: 48, paddingHorizontal: spacing.lg, flex: 0 }}
            onPress={() => {
              const v = parseFloat(wi);
              if (v && v > 20 && v < 400) {
                logWeight(todayKey(), v);
                setWi('');
              }
            }}
          />
        </View>
        <Text variant="caption" color="#9AA39A" style={{ marginTop: spacing.sm }}>
          {latestWaist ? `${t('progress.waist')}: ${latestWaist} cm` : t('progress.emptyLog')}
        </Text>
      </Card>

      {trackingMode === 'full' && (
        <Card style={styles.card}>
          <Text variant="title" style={styles.sectionTitle}>
            {t('progress.measures')}
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`${t('progress.waist')} cm`}
              placeholderTextColor="#6E766E"
              value={waist}
              onChangeText={setWaist}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`${t('progress.hips')} cm`}
              placeholderTextColor="#6E766E"
              value={hips}
              onChangeText={setHips}
            />
            <Pressable
              style={styles.saveIcon}
              onPress={() => {
                const m = { waist: parseFloat(waist) || undefined, hips: parseFloat(hips) || undefined };
                if (m.waist || m.hips) {
                  logMeasurements(todayKey(), m);
                  setWaist('');
                  setHips('');
                }
              }}
            >
              <Ionicons name="checkmark" size={18} color="#0A0F0A" />
            </Pressable>
          </View>
        </Card>
      )}

      <Card style={styles.card}>
        <Text variant="eyebrow" color="#9AA39A" uppercase>
          {t('profile.account')}
        </Text>
        <View style={styles.rowBetween}>
          <Text variant="body" color="#FFFFFF" style={{ flex: 1 }}>
            {naming || t('profile.aboutTitle')}
          </Text>
          <Pressable
            onPress={() => {
              const next = naming?.trim() ?? '';
              setName(next);
            }}
          >
            <Text variant="body" color="#C6F135">
              {t('common.save')}
            </Text>
          </Pressable>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text variant="eyebrow" color="#9AA39A" uppercase>
          {t('profile.language')}
        </Text>
        <View style={styles.chips}>
          {LANG_OPTIONS.map((o) => (
            <Pressable
              key={o.code}
              onPress={() => setLanguage(o.code as AppLanguage)}
              style={[styles.chip, language === o.code && styles.chipActive]}
            >
              <Text variant="body" style={language === o.code ? { color: '#0A0F0A' } : undefined}>
                {o.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card style={styles.card}>
        <Text variant="eyebrow" color="#9AA39A" uppercase>
          {t('profile.settings')}
        </Text>
        <View style={styles.switchRow}>
          <View style={styles.switchLabel}>
            <Text variant="body" color="#FFFFFF">
              {t('profile.notifications')}
            </Text>
            <Text variant="caption" color="#9AA39A">
              {t('profile.remindersEnabled')}
            </Text>
          </View>
          <Switch
            value={reminders}
            onValueChange={(v) => {
              setReminders(v)
                .then((ok) => {
                  if (v && !ok) {
                    Alert.alert(t('profile.notifications'), t('profile.remindersUnavailable'));
                  }
                })
                .catch(() => {});
            }}
            trackColor={{ false: '#2A2E29', true: '#C6F135' }}
            thumbColor="#0D0F0D"
          />
        </View>
        <View style={styles.switchRow}>
          <Text variant="body" color="#FFFFFF" style={{ flex: 1 }}>
            {t('profile.theme')}
          </Text>
          <Pressable
            onPress={() => setMode(mode === 'dark' ? ('light' as AppMode) : ('dark' as AppMode))}
            style={styles.chip}
          >
            <Text variant="body">{mode === 'dark' ? t('profile.dark') : t('profile.light')}</Text>
          </Pressable>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text variant="eyebrow" color="#9AA39A" uppercase>
          {t('profile.legal')}
        </Text>
        <Pressable onPress={() => router.push('/privacy')} style={styles.legalItem}>
          <Text variant="body" color="#FFFFFF" style={{ flex: 1 }}>
            {t('profile.privacyPolicy')}
          </Text>
          <Ionicons name="chevron-forward-outline" size={18} color="#9AA39A" />
        </Pressable>
        <Pressable onPress={() => router.push('/terms')} style={styles.legalItem}>
          <Text variant="body" color="#FFFFFF" style={{ flex: 1 }}>
            {t('profile.terms')}
          </Text>
          <Ionicons name="chevron-forward-outline" size={18} color="#9AA39A" />
        </Pressable>
        <Pressable onPress={() => router.push('/disclaimer')} style={styles.legalItem}>
          <Text variant="body" color="#FFFFFF" style={{ flex: 1 }}>
            {t('profile.disclaimer')}
          </Text>
          <Ionicons name="chevron-forward-outline" size={18} color="#9AA39A" />
        </Pressable>
      </Card>

      <Card style={styles.card}>
        <Text variant="eyebrow" color="#9AA39A" uppercase>
          {t('profile.data')}
        </Text>
        <Pressable
          onPress={() =>
            Alert.alert(t('profile.data'), t('profile.sync'), [
              { text: t('common.cancel'), style: 'cancel' },
              {
                text: t('common.remove'),
                style: 'destructive',
                onPress: () => {
                  resetProfile();
                  setNaming('');
                },
              },
            ])
          }
        >
          <Text variant="body" color="#F87171" style={{ marginTop: spacing.sm }}>
            {t('profile.logout')}
          </Text>
        </Pressable>
      </Card>

      <Card style={styles.card}>
        <Text variant="caption" color="#9AA39A">
          {t('profile.disclaimer')}
        </Text>
        <Text variant="caption" color="#6E766E" style={{ marginTop: spacing.sm }}>
          {t('profile.aboutBody')}
        </Text>
        <Text variant="caption" color="#6E766E" style={{ marginTop: spacing.sm }}>
          {t('profile.version')}
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 220 },
  header: { paddingTop: spacing.lg, gap: 4 },
  card: { marginTop: spacing.lg },
  rowBetween: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm },
  subInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statItem: { gap: 4, flex: 1, alignItems: 'center' },
  divider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.08)' },
  streakStat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { marginBottom: spacing.md },
  inputRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  input: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: '#FFFFFF',
    fontFamily: 'Manrope_600SemiBold',
  },
  saveIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#C6F135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  switchLabel: { flex: 1 },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 40,
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  photoEmpty: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(198,241,53,0.3)',
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
  },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  photoCell: {
    width: 92,
    height: 92,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  photoImg: { width: '100%', height: '100%' },
  photoAdd: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(198,241,53,0.3)' },
  photoDelete: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', alignItems: 'center', justifyContent: 'center' },
  previewImg: { width: '92%', height: '80%', borderRadius: 20 },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
});