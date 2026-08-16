import Constants from 'expo-constants';
import { Platform } from 'react-native';
import type * as NotificationsModule from 'expo-notifications';

export const notificationsUnsupported =
  Platform.OS === 'android' && Constants.executionEnvironment === 'storeClient';

let configured = false;

function loadNotifications() {
  return require('expo-notifications') as typeof NotificationsModule;
}

export async function configureNotifications() {
  if (notificationsUnsupported) return false;
  if (configured) return false;
  configured = true;

  const Notifications = loadNotifications();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily', {
      name: 'Daily reminders',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  const { status } = await Notifications.getPermissionsAsync();
  return status === 'granted';
}

export async function requestNotifications(): Promise<boolean> {
  if (notificationsUnsupported) return false;
  const Notifications = loadNotifications();
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

async function schedule(title: string, body: string, weekday: number, hour: number, minute: number, id: string) {
  const Notifications = loadNotifications();
  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: { title, body, sound: false },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: weekday + 1, // expo weekday: 1..7 (1=Sunday)
      hour,
      minute,
      channelId: 'daily',
    },
  });
}

export async function scheduleDailyReminders(opts: {
  waterGoal: number;
  waterLabel: string;
  mealLabel: (meal: string) => string;
}) {
  await configureNotifications();
  if (notificationsUnsupported) return false;
  const accepted = await requestNotifications();
  if (!accepted) return false;

  const Notifications = loadNotifications();
  await Notifications.cancelAllScheduledNotificationsAsync();

  const { waterGoal, waterLabel, mealLabel } = opts;
  // Water 3×
  for (const [i, h] of [9, 13, 17].entries()) {
    for (let d = 0; d < 7; d++) {
      await schedule(waterLabel, `Water goal today: ${waterGoal} ml`, d, h, 0, `water-${d}-${i}`);
    }
  }
  // Meals 3× (Mon–Sun)
  const meals = ['breakfast', 'lunch', 'dinner'];
  for (const [i, m] of meals.entries()) {
    const hour = 8 + i * 5;
    for (let d = 0; d < 7; d++) {
      await schedule(mealLabel(m), 'Keep the streak going.', d, hour, 0, `meal-${d}-${i}`);
    }
  }
  return true;
}

export async function clearAllReminders() {
  if (notificationsUnsupported) return;
  const granted = await configureNotifications();
  if (granted) await loadNotifications().cancelAllScheduledNotificationsAsync();
}