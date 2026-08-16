import type { LangKey } from './types';

export interface MenuDay {
  id: string;
  weekday: number; // 0 = Monday … 6 = Sunday
  /** [language] -> lines per meal */
  breakfast: { en: string[]; pt: string[] };
  lunch: { en: string[]; pt: string[] };
  snack: { en: string[]; pt: string[] };
  dinner: { en: string[]; pt: string[] };
}

export const weekdayNames: Record<number, { en: string; pt: string; es: string; fr: string }> = {
  0: { en: 'Monday', pt: 'Segunda-feira', es: 'Lunes', fr: 'Lundi' },
  1: { en: 'Tuesday', pt: 'Terça-feira', es: 'Martes', fr: 'Mardi' },
  2: { en: 'Wednesday', pt: 'Quarta-feira', es: 'Miércoles', fr: 'Mercredi' },
  3: { en: 'Thursday', pt: 'Quinta-feira', es: 'Jueves', fr: 'Jeudi' },
  4: { en: 'Friday', pt: 'Sexta-feira', es: 'Viernes', fr: 'Vendredi' },
  5: { en: 'Saturday', pt: 'Sábado', es: 'Sábado', fr: 'Samedi' },
  6: { en: 'Sunday', pt: 'Domingo', es: 'Domingo', fr: 'Dimanche' }
};

/** Cardápio 1 — base weekly menu (weekdays 0..6) */
export const menuCardapio1: MenuDay[] = [
  {
    id: 'c1-mon', weekday: 0,
    breakfast: {
      en: ['Omelette with 2 eggs and a slice of lean ham', '1 whole-grain toast', 'Green tea or coffee with skimmed milk'],
      pt: ['Omelete com 2 ovos e uma fatia de fiambre magro', '1 torrada integral', 'Chá verde ou café com leite magro']
    },
    lunch: {
      en: ['3 tbsp steamed cauliflower', '1 grilled chicken fillet', '4 boiled baby potatoes', 'Salad, as much as you like'],
      pt: ['3 colheres de couve-flor no vapor', '1 filete de frango grelhado', '4 batatas novas cozidas', 'Salada à vontade']
    },
    snack: {
      en: ['Light soft cheese with boiled eggs'],
      pt: ['Queijo fresco leve com ovos cozidos']
    },
    dinner: {
      en: ['Green-leaf salad', 'Mixed vegetables with chilli', 'Olive oil drizzle', '2 small baked tilapia fillets with tomato and basil'],
      pt: ['Salada de folhas verdes', 'Legumes com pimenta', 'Fio de azeite', '2 filetes pequenos de tilápia assada com tomate e manjericão']
    }
  },
  {
    id: 'c1-tue', weekday: 1,
    breakfast: {
      en: ['30 g whole-grain rice crackers', 'Omelette with spinach and mustard leaves', 'Green tea with ginger'],
      pt: ['30 g de bolachas de arroz integral', 'Omelete com espinafres e mostarda', 'Chá verde com gengibre']
    },
    lunch: {
      en: ['Steamed mixed vegetables (cauliflower, broccoli, zucchini)', '2 medium slices of roast meat', '1 ladle of beans', '2 tbsp brown rice', 'Salad, as much as you like'],
      pt: ['Legumes variados no vapor', '2 fatias médias de carne assada', '1 concha de feijão', '2 colheres de arroz integral', 'Salada à vontade']
    },
    snack: {
      en: ['1 thick slice of melon (or any fruit)'],
      pt: ['1 fatia grossa de melão (ou outra fruta)']
    },
    dinner: {
      en: ['1 boiled plantain', '2 boiled eggs', 'Fresh salad, as much as you like'],
      pt: ['1 banana-da-terra cozida', '2 ovos cozidos', 'Salada crua à vontade']
    }
  },
  {
    id: 'c1-wed', weekday: 2,
    breakfast: {
      en: ['2 scrambled eggs', '1 whole-grain bread with lean ham', 'Large glass of maté tea with 1 tsp flax and juice of ½ lemon'],
      pt: ['2 ovos mexidos', '1 pão integral com fiambre magro', 'Chá-mate grande com 1 c. de linhaça e ½ limão']
    },
    lunch: {
      en: ['Green-leaf salad', 'Steamed broccoli with raw tomato', '7 g slivered almonds', 'Black rice with leek', 'Great grilled tilapia fillet with rosemary'],
      pt: ['Salada de folhas verdes', 'Brócolis no vapor com tomate cru', 'Amêndoas laminadas', 'Arroz negro com alho-francês', '1 filete grande de tilápia grelhada com alecrim']
    },
    snack: {
      en: ['1 sugar-free jelly'],
      pt: ['1 gelatina sem açúcar']
    },
    dinner: {
      en: ['1 fish fillet', 'Lettuce and watercress salad with corn, red pepper and onion', 'Cottage cheese and 4 boiled quail eggs'],
      pt: ['1 filete de peixe', 'Salada de alface e agrião com milho, pimento e cebola', 'Queijo cottage e 4 ovos de codorna cozidos']
    }
  },
  {
    id: 'c1-thu', weekday: 3,
    breakfast: {
      en: ['Light yogurt blended with ½ strawberry and 1 tbsp oats', '1 slice of Minas cheese', '1 whole-grain toast', 'Coffee or green tea'],
      pt: ['Iogurte light batido com ½ morango e aveia', '1 fatia de queijo minas', '1 torrada integral', 'Café ou chá verde']
    },
    lunch: {
      en: ['1 piece of baked fish', 'Salad, as much as you like', '4 tbsp sweet potato mash'],
      pt: ['1 pedaço de peixe assado', 'Salada à vontade', '4 colheres de puré de batata-doce']
    },
    snack: {
      en: ['1 pear (or pineapple)'],
      pt: ['1 pêra (ou ananás)']
    },
    dinner: {
      en: ['Green-leaf salad', 'Steamed pumpkin with parsley', 'Olive oil drizzle', 'Cooked egg whites with tomato and spinach'],
      pt: ['Salada de folhas verdes', 'Abóbora no vapor com salsa', 'Fio de azeite', 'Claras cozidas com tomate e espinafres']
    }
  },
  {
    id: 'c1-fri', weekday: 4,
    breakfast: {
      en: ['70 g cooked or roasted sweet potato', 'Shredded chicken with curry', 'Glass of water with lemon'],
      pt: ['70 g de batata-doce cozida ou assada', 'Frango desfiado com caril', 'Copo de água com limão']
    },
    lunch: {
      en: ['1 grilled steak', '2 tbsp brown rice', '1 ladle of black beans', '3 tbsp sautéed kale', 'Salad, as much as you like'],
      pt: ['1 bife grelhado', '2 colheres de arroz integral', '1 concha de feijão preto', '3 colheres de couve salteada', 'Salada à vontade']
    },
    snack: {
      en: ['1 guava'],
      pt: ['1 goiaba']
    },
    dinner: {
      en: ['2 ladles of pea soup', 'Lettuce and rocket salad with raw beet, cherry tomatoes and buffalo mozzarella'],
      pt: ['2 conchas de sopa de ervilhas', 'Salada de alface e rúcula com beterraba, tomate-cereja e mussarela de búfala']
    }
  },
  {
    id: 'c1-sat', weekday: 5,
    breakfast: {
      en: ['1 whole-grain bread with mozzarella and turkey breast', 'Large glass of unsweetened maté tea'],
      pt: ['1 pão integral com queijo mussarela e peito de peru', 'Chá-mate grande sem açúcar']
    },
    lunch: {
      en: ['2 pieces of home-style chicken', '1 ladle of beans', '1 tbsp quinoa', '3 tbsp cooked broccoli', 'Salad, as much as you like'],
      pt: ['2 pedaços de frango caseiro', '1 concha de feijão', '1 colher de quinoa', '3 colheres de brócolis cozido', 'Salada à vontade']
    },
    snack: {
      en: ['Light yogurt blended with ½ apple'],
      pt: ['Iogurte light batido com ½ maçã']
    },
    dinner: {
      en: ['2 ladles of vegetable soup', 'Green salad with tomato, radish, cucumber, olives and quail eggs'],
      pt: ['2 conchas de sopa de legumes', 'Salada verde com tomate, rabanete, pepino, azeitonas e ovos de codorna']
    }
  },
  {
    id: 'c1-sun', weekday: 6,
    breakfast: {
      en: ['1 slice of melted Minas cheese', '1 whole-grain toast', 'Green tea or coffee with skimmed milk'],
      pt: ['1 fatia de queijo minas derretido', '1 torrada integral', 'Chá verde ou café com leite magro']
    },
    lunch: {
      en: ['Baked fish fillet in tomato sauce with onion', '½ cooked corn cob', '3 tbsp pumpkin mash', 'Green-leaf salad'],
      pt: ['Filete de peixe assado em molho de tomate', '½ espiga de milho cozida', '3 colheres de puré de abóbora', 'Salada de folhas verdes']
    },
    snack: {
      en: ['3 Brazil nuts + glass of coconut water'],
      pt: ['3 castanhas-do-pará + água de coco']
    },
    dinner: {
      en: ['2 ladles of chicken soup with rice, carrot and fresh herbs', '2 pieces of chicken from the soup', '4 tbsp sautéed watercress'],
      pt: ['2 conchas de canja de galinha com arroz e cenoura', '2 pedaços de frango da canja', '4 colheres de agrião salteado']
    }
  }
];

/** Cardápio 2 — alternate weekly menu */
export const menuCardapio2: MenuDay[] = [
  {
    id: 'c2-mon', weekday: 0,
    breakfast: {
      en: ['Buttered omelette with cheese, ham and tomato'],
      pt: ['Omelete com queijo, fiambre e tomate']
    },
    lunch: {
      en: ['Milanese-style steak coated in flax', '1 ladle of light beans', '2 tbsp brown rice', 'Salad, as much as you like'],
      pt: ['Bife à milanesa com linhaça', '1 concha de feijão light', '2 colheres de arroz integral', 'Salada à vontade']
    },
    snack: {
      en: ['Light soft cheese with boiled eggs'],
      pt: ['Queijo fresco leve com ovos cozidos']
    },
    dinner: {
      en: ['Green-leaf salad', 'Mixed vegetables with chilli', 'Olive oil drizzle', '2 small baked tilapia fillets'],
      pt: ['Salada de folhas verdes', 'Legumes com pimenta', 'Fio de azeite', '2 filetes pequenos de tilápia assada']
    }
  },
  {
    id: 'c2-tue', weekday: 1,
    breakfast: {
      en: ['Banana pancake with peanut butter and honey'],
      pt: ['Panqueca de banana com pasta de amendoim e mel']
    },
    lunch: {
      en: ['Fit beef stroganoff', 'Steamed vegetables', '3 tbsp brown rice pilaf', 'Salad, as much as you like'],
      pt: ['Strogonoff de carne fit', 'Legumes no vapor', '3 colheres de arroz integral à grega', 'Salada à vontade']
    },
    snack: {
      en: ['Tapioca with chicken and cheese'],
      pt: ['Tapioca com frango e queijo']
    },
    dinner: {
      en: ['Zucchini-noodle spaghetti with shiitake + 1 grilled chicken fillet'],
      pt: ['Esparguete de legumes com shitake + 1 filete de frango grelhado']
    }
  },
  {
    id: 'c2-wed', weekday: 2,
    breakfast: {
      en: ['Spinach & ricotta omelette'],
      pt: ['Omelete de espinafres e ricota']
    },
    lunch: {
      en: ['Chicken roulade with ricotta and spinach', '1 ladle of light beans', '3 tbsp brown rice', 'Salad, as much as you like'],
      pt: ['Frango à rolê com ricota e espinafres', '1 concha de feijão light', '3 colheres de arroz integral', 'Salada à vontade']
    },
    snack: {
      en: ['Natural sandwich of your choice'],
      pt: ['Sanduíche natural à escolha']
    },
    dinner: {
      en: ['Whole-grain penne with roasted tomato + 1 grilled chicken fillet'],
      pt: ['Penne integral com tomate assado + 1 filete de frango grelhado']
    }
  },
  {
    id: 'c2-thu', weekday: 3,
    breakfast: {
      en: ['Creamy eggs with light cream cheese'],
      pt: ['Ovos cremosos com requeijão light']
    },
    lunch: {
      en: ['Fit breaded fish fillet', '1 ladle of light beans', '3 tbsp brown rice', 'Salad, as much as you like'],
      pt: ['Peixe empanado fit', '1 concha de feijão light', '3 colheres de arroz integral', 'Salada à vontade']
    },
    snack: {
      en: ['Tapioca with cheese'],
      pt: ['Tapioca com queijo']
    },
    dinner: {
      en: ['Fit guava jelly portion + salad, as much as you like'],
      pt: ['Goiabada fit + salada à vontade']
    }
  },
  {
    id: 'c2-fri', weekday: 4,
    breakfast: {
      en: ['Whole-grain French toast'],
      pt: ['Torrada francesa integral']
    },
    lunch: {
      en: ['Whole-grain spaghetti with vegetables', '1 grilled chicken fillet', 'Salad, as much as you like'],
      pt: ['Esparguete integral com legumes', '1 filete de frango grelhado', 'Salada à vontade']
    },
    snack: {
      en: ['Minas cheese sandwich with turkey breast'],
      pt: ['Sanduíche de queijo minas com peito de peru']
    },
    dinner: {
      en: ['Lettuce wrap with chicken'],
      pt: ['Wrap de alface com frango']
    }
  },
  {
    id: 'c2-sat', weekday: 5,
    breakfast: {
      en: ['Oat porridge with chocolate'],
      pt: ['Mingau de aveia com chocolate']
    },
    lunch: {
      en: ['Parmigiana steak with ricotta cream', 'Black beans', 'Salad, as much as you like'],
      pt: ['Bife à parmigiana com creme de ricota', 'Feijão preto', 'Salada à vontade']
    },
    snack: {
      en: ['Tapioca, any flavour'],
      pt: ['Tapioca, sabor à escolha']
    },
    dinner: {
      en: ['4 light chicken meatballs in tomato sauce + salad'],
      pt: ['4 almôndegas de frango light ao sugo + salada']
    }
  },
  {
    id: 'c2-sun', weekday: 6,
    breakfast: {
      en: ['Whole-grain tuna pie portion'],
      pt: ['Torta integral de atum']
    },
    lunch: {
      en: ['Minced beef with light cream cheese', '2 tbsp brown rice pilaf', 'Salad, as much as you like'],
      pt: ['Carne moída com cream cheese light', '2 colheres de arroz integral à grega', 'Salada à vontade']
    },
    snack: {
      en: ['Natural sandwich of your choice'],
      pt: ['Sanduíche natural à escolha']
    },
    dinner: {
      en: ['Fish with vegetable spaghetti'],
      pt: ['Peixe com esparguete de legumes']
    }
  }
];

export function menuIndexFor(menu: 0 | 1, weekday: number): MenuDay {
  const list = menu === 0 ? menuCardapio1 : menuCardapio2;
  return list.find((m) => m.weekday === weekday) ?? list[weekday % list.length];
}

export const soupsLabel: Record<LangKey, string> = {
  en: 'Soup of your choice',
  pt: 'Sopa à tua escolha',
  es: 'Sopa a tu elección',
  fr: 'Soupe de ton choix'
};

export const shakeOptionLabel: Record<LangKey, string> = {
  en: 'Any shake from the recipe library',
  pt: 'Qualquer shake da biblioteca de receitas',
  es: 'Cualquier batido de la biblioteca',
  fr: 'N’importe quel shake de la bibliothèque'
};

export const fruitOptionLabel: Record<LangKey, string> = {
  en: 'Any fruit of your choice',
  pt: 'Fruta à tua escolha',
  es: 'Cualquier fruta',
  fr: 'Un fruit de ton choix'
};