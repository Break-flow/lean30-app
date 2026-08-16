import type { AppLanguage } from '@/stores/settings';

export type CategoryId =
  | 'shakes'
  | 'detox'
  | 'cardapio'
  | 'doces'
  | 'sopas'
  | 'chas'
  | 'lowcarb'
  | 'bombas';

export type LangKey = AppLanguage;

export interface RecipeTx {
  title: string;
  summary: string;
  steps: string[];
  tip?: string;
}

export interface Ingredient {
  qty?: string;
  item: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  category: CategoryId;
  emoji: string;
  prepMinutes?: number;
  servings?: string;
  kcal?: number;
  /** translations keyed by language; missing languages fall back automatically */
  tx: Partial<Record<LangKey, RecipeTx>>;
  /** base is the source-of-truth list; languages fall back via getIngredients */
  ingredients: Partial<Record<LangKey, Ingredient[]>> & { base: Ingredient[] };
}

export type MealPeriod = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface SlotOption {
  /** localized label */
  label: Record<LangKey, string>;
  /** optional linked recipe id */
  recipeId?: string;
  /** optional category to open in the recipe library (instead of a specific recipe) */
  category?: CategoryId;
  note?: Record<LangKey, string>;
}

export interface MealSlot {
  period: MealPeriod;
  /** 1-3 options; the first is the "main" = cardápio of the day */
  options: SlotOption[];
}

export type TaskType = 'tea' | 'detox' | 'booster' | 'workout' | 'water';

export interface DayTask {
  type: TaskType;
  refId?: string;
  label: Record<LangKey, string>;
}

export interface ChallengeDay {
  day: number;
  week: number;
  meals: MealSlot[];
  tasks: DayTask[];
}

export interface WorkoutExerciseTx {
  name: string;
  instructions: string;
}

export interface WorkoutExercise {
  id: string;
  /** duration in seconds for time-based, or repetitions for rep-based */
  mode: 'time' | 'reps';
  target: { min: number; max: number };
  restSec: number;
  tx: Partial<Record<LangKey, WorkoutExerciseTx>>;
}

export interface WorkoutCircuit {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  /** number of rounds */
  passes: { min: number; max: number };
  restBetweenExercisesSec: number;
  restBetweenPassesSec: string;
  exercises: WorkoutExercise[];
}

export interface RecipeLibrary {
  recipesById: Record<string, Recipe>;
  categories: CategoryId[];
  challengeDays: ChallengeDay[];
  workouts: WorkoutCircuit[];
}