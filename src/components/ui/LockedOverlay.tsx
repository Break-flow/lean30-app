import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n';
import { spacing } from '@/theme';

interface Props {
  visible: boolean;
  onClose?: () => void;
  onUnlock: () => void;
  title?: string;
  body?: string;
  cta?: string;
}

export function LockedOverlay({ visible, onClose, onUnlock, title, body, cta }: Props) {
  const { t } = useI18n();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.iconWrap}>
            <Ionicons name="lock-closed" size={30} color="#C6F135" />
          </View>
          <Text variant="heading" center>
            {title ?? t('common.locked')}
          </Text>
          <Text variant="body" color="#9AA39A" center style={styles.body}>
            {body ?? t('recipe.lockedBody')}
          </Text>
          <Button label={cta ?? t('onboarding.goPremium')} onPress={onUnlock} style={styles.cta} />
          {onClose ? (
            <Pressable onPress={onClose} style={styles.later}>
              <Text variant="body" color="#9AA39A">
                {t('common.close')}
              </Text>
            </Pressable>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5,8,6,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  sheet: {
    alignSelf: 'stretch',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(198,241,53,0.25)',
    backgroundColor: '#0D0F0D',
    padding: spacing.xl,
    alignItems: 'center',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(198,241,53,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  body: { marginTop: spacing.sm },
  cta: { alignSelf: 'stretch', marginTop: spacing.xl },
  later: { marginTop: spacing.md, padding: 8 },
});
