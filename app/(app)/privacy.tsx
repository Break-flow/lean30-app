import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { useI18n } from '@/i18n';
import { layout, spacing } from '@/theme';

export default function Privacy() {
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
          {t('profile.privacyPolicy')}
        </Text>

        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('privacy.intro')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('privacy.dataCollected')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('privacy.dataCollectedBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('privacy.localStorage')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('privacy.localStorageBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('privacy.photos')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('privacy.photosBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('privacy.thirdParty')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('privacy.thirdPartyBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('privacy.yourRights')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('privacy.yourRightsBody')}
        </Text>

        <Text variant="title" color="#FFFFFF" style={styles.sectionTitle}>
          {t('privacy.contact')}
        </Text>
        <Text variant="body" color="#9AA39A" style={styles.paragraph}>
          {t('privacy.contactBody')}
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
  sectionTitle: { marginTop: spacing.xl, marginBottom: spacing.sm },
  paragraph: { lineHeight: 24 },
});