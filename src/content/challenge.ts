import { menuIndexFor, soupsLabel, shakeOptionLabel, fruitOptionLabel, weekdayNames, type MenuDay } from './menus';
import type { ChallengeDay, DayTask, LangKey, MealSlot, SlotOption, TaskType } from './types';

type MenuRef = [menu: 0 | 1, weekday: number];

type SnackKind =
  | 'gel'
  | 'crepioca'
  | 'tapioca'
  | 'panini'
  | 'paozinho'
  | 'iogurte'
  | 'sanduiche'
  | 'shake-kiwi'
  | 'menu';

interface DayRow {
  bf: MenuRef;
  lunch: [MenuRef, MenuRef];
  dinner: MenuRef;
  snack: SnackKind;
  snackMenu?: MenuRef;
  detox: number;
}

/** Faithful transcription of the original 30-day schedule (cleaned / rebranded). */
const PLAN: DayRow[] = [
  { bf: [0, 0], lunch: [[0, 0], [1, 0]], dinner: [0, 0], snack: 'gel', detox: 4 },
  { bf: [0, 1], lunch: [[0, 1], [1, 1]], dinner: [0, 1], snack: 'menu', snackMenu: [1, 1], detox: 6 },
  { bf: [0, 2], lunch: [[0, 2], [1, 2]], dinner: [0, 2], snack: 'crepioca', detox: 7 },
  { bf: [0, 3], lunch: [[0, 3], [1, 3]], dinner: [0, 3], snack: 'tapioca', detox: 1 },
  { bf: [0, 4], lunch: [[0, 4], [1, 4]], dinner: [0, 4], snack: 'panini', detox: 2 },
  { bf: [0, 5], lunch: [[0, 5], [1, 5]], dinner: [0, 5], snack: 'paozinho', detox: 5 },
  { bf: [0, 6], lunch: [[0, 6], [1, 6]], dinner: [0, 6], snack: 'iogurte', detox: 4 },
  { bf: [1, 0], lunch: [[0, 0], [1, 0]], dinner: [1, 0], snack: 'shake-kiwi', detox: 6 },
  { bf: [1, 1], lunch: [[0, 1], [1, 1]], dinner: [1, 1], snack: 'sanduiche', detox: 8 },
  { bf: [1, 2], lunch: [[0, 2], [1, 2]], dinner: [1, 2], snack: 'paozinho', detox: 9 },
  { bf: [1, 3], lunch: [[0, 3], [1, 3]], dinner: [1, 3], snack: 'tapioca', detox: 7 },
  { bf: [1, 4], lunch: [[0, 4], [1, 4]], dinner: [1, 4], snack: 'tapioca', detox: 10 },
  { bf: [1, 5], lunch: [[0, 5], [1, 1]], dinner: [1, 5], snack: 'menu', snackMenu: [0, 0], detox: 8 },
  { bf: [1, 6], lunch: [[0, 0], [1, 0]], dinner: [0, 0], snack: 'menu', snackMenu: [0, 1], detox: 11 },
  { bf: [0, 0], lunch: [[0, 1], [1, 0]], dinner: [0, 1], snack: 'menu', snackMenu: [0, 1], detox: 5 },
  { bf: [0, 1], lunch: [[0, 2], [1, 0]], dinner: [0, 2], snack: 'menu', snackMenu: [0, 2], detox: 3 },
  { bf: [0, 2], lunch: [[0, 3], [1, 1]], dinner: [0, 3], snack: 'menu', snackMenu: [0, 3], detox: 4 },
  { bf: [0, 3], lunch: [[0, 4], [1, 2]], dinner: [0, 3], snack: 'menu', snackMenu: [0, 4], detox: 5 },
  { bf: [0, 4], lunch: [[0, 5], [1, 3]], dinner: [0, 5], snack: 'menu', snackMenu: [0, 5], detox: 6 },
  { bf: [0, 5], lunch: [[0, 6], [1, 4]], dinner: [0, 6], snack: 'menu', snackMenu: [0, 6], detox: 7 },
  { bf: [1, 0], lunch: [[1, 0], [1, 4]], dinner: [1, 0], snack: 'menu', snackMenu: [1, 0], detox: 8 },
  { bf: [1, 1], lunch: [[1, 1], [1, 5]], dinner: [1, 1], snack: 'menu', snackMenu: [1, 1], detox: 9 },
  { bf: [1, 2], lunch: [[1, 2], [1, 6]], dinner: [1, 2], snack: 'menu', snackMenu: [1, 2], detox: 10 },
  { bf: [1, 3], lunch: [[1, 3], [1, 6]], dinner: [1, 3], snack: 'menu', snackMenu: [1, 3], detox: 10 },
  { bf: [1, 4], lunch: [[1, 4], [0, 1]], dinner: [1, 4], snack: 'menu', snackMenu: [1, 4], detox: 1 },
  { bf: [1, 5], lunch: [[1, 5], [0, 2]], dinner: [1, 5], snack: 'menu', snackMenu: [1, 5], detox: 2 },
  { bf: [1, 6], lunch: [[1, 6], [0, 3]], dinner: [1, 6], snack: 'menu', snackMenu: [1, 6], detox: 3 },
  { bf: [0, 0], lunch: [[0, 0], [0, 4]], dinner: [0, 0], snack: 'menu', snackMenu: [0, 0], detox: 4 },
  { bf: [0, 1], lunch: [[0, 1], [0, 5]], dinner: [0, 1], snack: 'menu', snackMenu: [0, 1], detox: 8 },
  { bf: [0, 2], lunch: [[0, 2], [0, 6]], dinner: [0, 2], snack: 'menu', snackMenu: [0, 2], detox: 7 }
];

const snackLabels: Record<Exclude<SnackKind, 'menu'>, Record<LangKey, string>> = {
  gel: {
    en: '1 sugar-free jelly', pt: '1 gelatina sem açúcar', es: '1 gelatina sin azúcar', fr: '1 gelée sans sucre'
  },
  crepioca: {
    en: 'Low-carb crepioca', pt: 'Crepioca low carb', es: 'Crepioca low carb', fr: 'Crepioca low carb'
  },
  tapioca: {
    en: 'Tapioca (any filling)', pt: 'Tapioca (recheio à escolha)', es: 'Tapioca (cualquier relleno)', fr: 'Tapioca (garniture au choix)'
  },
  panini: {
    en: 'Low-carb panini', pt: 'Panini low carb', es: 'Panini low carb', fr: 'Panini low carb'
  },
  paozinho: {
    en: 'Low-carb mini bread', pt: 'Pãozinho low carb', es: 'Panecito low carb', fr: 'Petit pain low carb'
  },
  iogurte: {
    en: 'Natural yogurt with granola', pt: 'Iogurte natural com granola', es: 'Yogur natural con granola', fr: 'Yaourt nature avec granola'
  },
  sanduiche: {
    en: 'Natural sandwich', pt: 'Sanduíche natural', es: 'Sándwich natural', fr: 'Sandwich nature'
  },
  'shake-kiwi': {
    en: 'Lime & kiwi shake', pt: 'Shake de lima e kiwi', es: 'Batido de lima y kiwi', fr: 'Shake citron vert & kiwi'
  }
};

const weekPatterns: Record<number, Array<'A' | 'B' | 'C' | 'D'>> = {
  1: ['A', 'B', 'C', 'D'],
  2: ['A', 'D', 'A', 'D'],
  3: ['B', 'C', 'A', 'B'],
  4: ['C', 'D', 'A', 'C']
};

/**
 * Real detox recipe ids available in the library, in the exact order of the
 * original plan's "detox nº 1..12" list, so each day links its true recipe.
 */
const DETOX_RECIPE_IDS = [
  'detox-lime-cucumber',
  'detox-beet-orange',
  'detox-green-tea-kale',
  'detox-watermelon-mint',
  'detox-carrot-orange',
  'detox-tropical-mango',
  'detox-cucumber-mint',
  'detox-pineapple-mint',
  'detox-papaya-orange',
  'detox-strawberry-lemon',
  'detox-lemon-ginger',
  'detox-pineapple-ginger'
];

function lines(label: { en: string[]; pt: string[] }): Record<LangKey, string> {
  return { en: label.en.join('\n'), pt: label.pt.join('\n'), es: label.en.join('\n'), fr: label.en.join('\n') };
}

function menuLabel(m: MenuDay, meal: 'breakfast' | 'lunch' | 'snack' | 'dinner'): Record<LangKey, string> {
  return lines(m[meal]);
}

export function buildChallenge(): ChallengeDay[] {
  const byTask: Record<TaskType, Record<LangKey, string>> = {
    tea: { en: '1 L of herbal tea', pt: '1 L de chá de ervas', es: '1 L de té de hierbas', fr: '1 L de tisane' },
    detox: { en: 'Detox juice of the day', pt: 'Sumo detox do dia', es: 'Zumo detox del día', fr: 'Jus detox du jour' },
    booster: { en: 'Daily booster drink', pt: 'Bebida booster diária', es: 'Bebida booster diaria', fr: 'Booster quotidien' },
    workout: { en: 'Circuit workout', pt: 'Treino em circuito', es: 'Entrenamiento en circuito', fr: 'Circuit d’entraînement' },
    water: { en: 'Hit your water goal', pt: 'Cumprires o objetivo de água', es: 'Cumplir tu objetivo de agua', fr: 'Atteindre ton objectif eau' }
  };

  const days: ChallengeDay[] = [];
  const weekSessionCount: Record<number, number> = {};

  PLAN.forEach((row, i) => {
    const day = i + 1;
    const week = Math.floor((day - 1) / 7) + 1;
    const bfMenu = menuIndexFor(row.bf[0], row.bf[1]);
    const lu1 = menuIndexFor(row.lunch[0][0], row.lunch[0][1]);
    const lu2 = menuIndexFor(row.lunch[1][0], row.lunch[1][1]);
    const diMenu = menuIndexFor(row.dinner[0], row.dinner[1]);

    const meals: MealSlot[] = [
      {
        period: 'breakfast',
        options: [
          { label: menuLabel(bfMenu, 'breakfast'), recipeId: undefined, note: weekdayName(bfMenu.weekday) },
          { label: shakeOptionLabel, category: 'shakes' }
        ]
      },
      {
        period: 'lunch',
        options: [
          { label: menuLabel(lu1, 'lunch') },
          { label: menuLabel(lu2, 'lunch'), note: weekdayName(lu2.weekday) }
        ]
      },
      {
        period: 'snack',
        options: snackOptions(row, week, day)
      },
      {
        period: 'dinner',
        options: [
          { label: menuLabel(diMenu, 'dinner') },
          { label: soupsLabel, category: 'sopas' }
        ]
      }
    ];

    const session = (weekSessionCount[week] = (weekSessionCount[week] ?? 0) + 1);
    const circuit = weekPatterns[Math.min(week, 4)][(session - 1) % 4];

    const tasks: DayTask[] = [
      { type: 'tea', label: byTask.tea },
      { type: 'detox', label: { ...byTask.detox, pt: `${byTask.detox.pt} · nº ${row.detox}` }, refId: DETOX_RECIPE_IDS[(row.detox - 1) % DETOX_RECIPE_IDS.length] },
      { type: 'booster', label: byTask.booster },
      { type: 'workout', label: { ...byTask.workout, pt: `${byTask.workout.pt} · circuito ${circuit}` }, refId: `workout-${circuit.toLowerCase()}` },
      { type: 'water', label: byTask.water }
    ];

    days.push({ day, week, meals, tasks });
  });

  return days;
}

function weekdayName(wd: number): Record<LangKey, string> {
  return { en: weekdayNames[wd].en, pt: weekdayNames[wd].pt, es: weekdayNames[wd].es, fr: weekdayNames[wd].fr };
}

function snackOptions(row: DayRow, _week: number, _day: number): SlotOption[] {
  const options: SlotOption[] = [{ label: shakeOptionLabel, category: 'shakes' }];
  if (row.snack === 'menu' && row.snackMenu) {
    options.push({ label: menuLabel(menuIndexFor(row.snackMenu[0], row.snackMenu[1]), 'snack'), note: weekdayName(row.snackMenu[1]) });
  } else if (row.snack !== 'menu') {
    options.push({ label: snackLabels[row.snack] });
  }
  options.push({ label: fruitOptionLabel });
  return options;
}

export const weekMilestones: Record<number, Record<LangKey, string>> = {
  1: {
    en: 'Your body starts to de-bloat this week. Stay consistent.',
    pt: 'Esta semana o teu corpo começa a desinchar. Mantém-te consistente.',
    es: 'Tu cuerpo empieza a deshincharse esta semana. Mantente constante.',
    fr: 'Ton corps commence à se dégonfler cette semaine. Reste constant.'
  },
  2: {
    en: 'Differences are becoming noticeable — your clothes feel looser.',
    pt: 'As diferenças já se notam — a roupa fica mais folgada.',
    es: 'Las diferencias ya se notan: la ropa te queda más holgada.',
    fr: 'Les différences se voient déjà — tes vêtements sont plus amples.'
  },
  3: {
    en: 'The scale keeps moving down. Keep going.',
    pt: 'A balança continua a descer. Não pares.',
    es: 'La báscula sigue bajando. No pares.',
    fr: 'La balance continue de descendre. Continue.'
  },
  4: {
    en: 'Final stretch — finish strong. Results vary per person.',
    pt: 'Última reta — termina em força. Os resultados variam de pessoa para pessoa.',
    es: 'Recta final: termina con fuerza. Los resultados varían según la persona.',
    fr: 'Dernière ligne droite — finis en force. Les résultats varient d’une personne à l’autre.'
  }
};