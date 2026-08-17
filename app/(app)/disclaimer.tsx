import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { useI18n } from '@/i18n';
import { layout, spacing } from '@/theme';

export default function Disclaimer() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'top']}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.close}>
          <Ionicons name="chevron-down" size={22} color="#FFFFFF" />
        </Pressable>
        <Text variant="eyebrow" color="#C6F135" uppercase>
          {t('common.appName')}
        </Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="display" center style={{ marginBottom: spacing.lg }}>
          {t('profile.disclaimer')}
        </Text>

        <View style={styles.warningBox}>
          <Text variant="title" color="#F04FD1" center style={styles.warningTitle}>
            {t('disclaimer.title')}
          </Text>
          <Text variant="body" color="#FFFFFF" center style={styles.warningBody}>
            {t('onboarding.disclaimer')}
          </Text>
        </View>

        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('disclaimer.intro')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('disclaimer.notMedical')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('disclaimer.notMedicalBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('disclaimer.individualResults')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('disclaimer.individualResultsBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('disclaimer.consultProfessional')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('disclaimer.consultProfessionalBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('disclaimer.noGuarantee')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('disclaimer.noGuaranteeBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('disclaimer.emergency')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('disclaimer.emergencyBody')}
        </Text>
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
    paddingHorizontal: layout.contentPadding,
    paddingTop: spacing.lg,
  },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: { width: 44 },
  content: {
    paddingHorizontal: layout.contentPadding,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  warningBox: {
    backgroundColor: 'rgba(240,79,209,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(240,79,209,0.3)',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  warningTitle: { marginBottom: spacing.sm },
  warningBody: { lineHeight: 24 },
  sectionTitle: { marginTop: spacing.xl, marginBottom: spacing.sm },
  paragraph: { lineHeight: 24 },
});