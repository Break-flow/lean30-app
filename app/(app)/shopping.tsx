import { useMemo, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n';
import { useSettings } from '@/stores/settings';
import { useProfile } from '@/stores/profile';
import { useShopping, customKey, generatedKey } from '@/stores/shopping';
import { challengeDayNumber } from '@/lib/dates';
import { weeklyShoppingItems, weekOfDay } from '@/lib/shopping';
import { radius, spacing } from '@/theme';
import type { AppLanguage } from '@/stores/settings';

export default function ShoppingModal() {
  const router = useRouter();
  const { t } = useI18n();
  const lang = useSettings((s) => s.language) as AppLanguage;
  const planStartDate = useProfile((s) => s.planStartDate);
  const custom = useShopping((s) => s.custom);
  const hidden = useShopping((s) => s.hidden);
  const checked = useShopping((s) => s.checked);
  const addCustom = useShopping((s) => s.addCustom);
  const removeCustom = useShopping((s) => s.removeCustom);
  const toggle = useShopping((s) => s.toggle);
  const clearChecked = useShopping((s) => s.clearChecked);
  const [draft, setDraft] = useState('');

  const currentDay = useMemo(() => challengeDayNumber(planStartDate), [planStartDate]);
  const week = currentDay ? weekOfDay(currentDay) : 1;

  const generated = useMemo(
    () => (currentDay ? weeklyShoppingItems(currentDay, lang) : []),
    [currentDay, lang],
  );

  const generatedKeys = useMemo(
    () => generated.map((text) => generatedKey(week, text)),
    [generated, week],
  );

  const visibleGenerated = useMemo(
    () => generated.filter((_, i) => !hidden.includes(generatedKeys[i])),
    [generated, generatedKeys, hidden],
  );

  const allKeys = useMemo(
    () => [
      ...visibleGenerated.map((text) => generatedKey(week, text)),
      ...custom.map((text) => customKey(text)),
    ],
    [visibleGenerated, custom, week],
  );

  const doneCount = allKeys.filter((k) => checked[k]).length;

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    addCustom(text);
    setDraft('');
  };

  return (
    <Screen scroll contentContainerStyle={{ paddingBottom: 48 }}>
      <View style={styles.top}>
        <Pressable onPress={() => router.back()} style={styles.roundBtn}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </Pressable>
        <Text variant="heading">{t('shopping.title')}</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.addRow}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder={t('shopping.placeholder')}
          placeholderTextColor="#7C8680"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={submit}
        />
        <Pressable
          onPress={submit}
          style={[styles.addBtn, !draft.trim() && styles.addBtnDisabled]}
        >
          <Ionicons name="add" size={22} color="#0A0F0A" />
        </Pressable>
      </View>

      {allKeys.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={40} color="#6E766E" />
          <Text variant="body" color="#9AA39A" center>
            {t('shopping.empty')}
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {visibleGenerated.length > 0 && (
            <Text variant="eyebrow" color="#C6F135" uppercase style={styles.sectionLabel}>
              {t('shopping.generated')}
            </Text>
          )}
          {visibleGenerated.map((text) => {
            const key = generatedKey(week, text);
            const done = Boolean(checked[key]);
            return (
              <Row
                key={key}
                text={text}
                done={done}
                onToggle={() => toggle(key)}
                onRemove={null}
              />
            );
          })}

          {custom.length > 0 && (
            <Text variant="eyebrow" color="#C6F135" uppercase style={styles.sectionLabel}>
              {t('shopping.addCustom')}
            </Text>
          )}
          {custom.map((text) => {
            const key = customKey(text);
            const done = Boolean(checked[key]);
            return (
              <Row
                key={key}
                text={text}
                done={done}
                onToggle={() => toggle(key)}
                onRemove={() => removeCustom(text)}
              />
            );
          })}
        </View>
      )}

      {doneCount > 0 && (
        <Button
          label={t('shopping.clearChecked')}
          variant="ghost"
          style={styles.clearBtn}
          onPress={() => clearChecked(generatedKeys)}
        />
      )}
    </Screen>
  );
}

function Row({
  text,
  done,
  onToggle,
  onRemove,
}: {
  text: string;
  done: boolean;
  onToggle: () => void;
  onRemove: (() => void) | null;
}) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <View style={[styles.check, done && styles.checkDone]}>
        <Ionicons name="checkmark" size={14} color={done ? '#0A0F0A' : 'transparent'} />
      </View>
      <Text
        variant="body"
        color={done ? '#6E766E' : '#FFFFFF'}
        style={done ? [styles.rowText, styles.rowTextDone] : styles.rowText}
      >
        {text}
      </Text>
      {onRemove ? (
        <Pressable onPress={() => { Keyboard.dismiss(); onRemove(); }} hitSlop={8} style={styles.remove}>
          <Ionicons name="close" size={16} color="#6E766E" />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  input: {
    flex: 1,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: spacing.md,
    color: '#FFFFFF',
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
  },
  addBtn: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: '#C6F135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnDisabled: { opacity: 0.4 },
  empty: { alignItems: 'center', gap: spacing.md, marginTop: 60, paddingHorizontal: spacing.xl },
  list: { gap: 2 },
  sectionLabel: { marginTop: spacing.md, marginBottom: spacing.xs },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: { backgroundColor: '#C6F135', borderColor: '#C6F135' },
  rowText: { flex: 1 },
  rowTextDone: { textDecorationLine: 'line-through' },
  remove: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  clearBtn: { marginTop: spacing.lg },
});