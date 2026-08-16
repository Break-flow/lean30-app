import type { Recipe } from '../types';

/**
 * Premium library — curated, representative set across all departments
 * of the original 30-day program. Brand/marketing copy has been rewritten
 * for Lean30. ES/FR fall back to EN (fallback chain: lang -> en -> pt).
 * Remaining recipes follow the exact same data model and are content-filling.
 */
export const premiumRecipes: Recipe[] = [
  // ── DETOX ─────────────────────────────────────────────────────────────
  {
    id: 'detox-lime-cucumber',
    category: 'detox',
    emoji: '🥒',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Lime & Cucumber Detox',
        summary: 'Cooling, hydrating and gently de-bloating.',
        steps: ['Blend the cucumber with the water.', 'Add the lime juice and blend briefly.', 'Strain if you prefer a smoother drink.']
      },
      pt: {
        title: 'Detox de Lima e Pepino',
        summary: 'Fresco, hidratante e ligeiramente desinchante.',
        steps: ['Bate o pepino com a água.', 'Junta o sumo de lima e bate mais um pouco.', 'Coe, se preferires uma bebida mais suave.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água ou água de coco' },
        { qty: '½ un.', item: 'pepino japonês sem casca' },
        { qty: '2 un.', item: 'limões (sumo puro)' }
      ],
      en: [
        { qty: '250 ml', item: 'water or coconut water' },
        { qty: '½', item: 'Japanese cucumber, peeled' },
        { qty: '2', item: 'limes (fresh juice)' }
      ]
    }
  },
  {
    id: 'detox-green-tea-kale',
    category: 'detox',
    emoji: '🍵',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Green Tea & Kale Detox',
        summary: 'Antioxidant-rich and deeply refreshing.',
        steps: ['Make 250 ml of green tea and let it cool.', 'Blend with cucumber and kale until smooth.']
      },
      pt: {
        title: 'Detox de Chá Verde e Couve',
        summary: 'Rico em antioxidantes e muito refrescante.',
        steps: ['Prepara 250 ml de chá verde e deixa arrefecer.', 'Bate com o pepino e a couve até ficar homogéneo.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'chá verde pronto' },
        { qty: '1 un.', item: 'pepino picado sem casca' },
        { qty: '1 folha', item: 'couve' }
      ],
      en: [
        { qty: '250 ml', item: 'brewed green tea' },
        { qty: '1', item: 'cucumber, chopped and peeled' },
        { qty: '1 leaf', item: 'kale' }
      ]
    }
  },
  {
    id: 'detox-beet-melon',
    category: 'detox',
    emoji: '🍉',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Beet & Watermelon Detox',
        summary: 'A vibrant pink drink packed with nutrients.',
        steps: ['Blend the beetroot with the water.', 'Add the watermelon and blend until smooth.']
      },
      pt: {
        title: 'Detox de Beterraba e Melancia',
        summary: 'Uma bebida cor-de-rosa cheia de nutrientes.',
        steps: ['Bate a beterraba com a água.', 'Junta a melancia e bate até ficar homogéneo.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água' }, { qty: '½ un.', item: 'beterraba sem casca' },
        { qty: '3 fatias', item: 'melancia' }
      ],
      en: [
        { qty: '250 ml', item: 'water' }, { qty: '½', item: 'beetroot, peeled' },
        { qty: '3 slices', item: 'watermelon' }
      ]
    }
  },
  {
    id: 'detox-carrot-orange',
    category: 'detox',
    emoji: '🥕',
    prepMinutes: 10,
    servings: '1',
    tx: {
      en: {
        title: 'Carrot, Orange & Ginger Detox',
        summary: 'A zingy immune-boosting classic.',
        steps: ['Juice or blend the carrots with the orange juice.', 'Add ginger, lime and water, then blend.', 'Serve over ice.']
      },
      pt: {
        title: 'Detox de Cenoura, Laranja e Gengibre',
        summary: 'Um clássico refrescante para a imunidade.',
        steps: ['Bate as cenouras com o sumo de laranja.', 'Junta o gengibre, a lima e a água, e bate.', 'Serve com gelo.']
      }
    },
    ingredients: {
      base: [
        { qty: '4 un.', item: 'cenouras' }, { qty: '1 un.', item: 'maçã' },
        { qty: '1 un.', item: 'limão (sumo)' }, { qty: '2 un.', item: 'laranjas' },
        { qty: '1 pedaço', item: 'gengibre' }, { qty: '125 ml', item: 'água ou água de coco' }
      ],
      en: [
        { qty: '4', item: 'carrots' }, { qty: '1', item: 'apple' },
        { qty: '1', item: 'lemon (juice)' }, { qty: '2', item: 'oranges' },
        { qty: '1 piece', item: 'fresh ginger' }, { qty: '125 ml', item: 'water or coconut water' }
      ]
    }
  },
  {
    id: 'detox-beet-orange',
    category: 'detox',
    emoji: '🧃',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Beet & Orange Detox',
        summary: 'Earthy, sweet and full of iron.',
        steps: ['Blend the beet with the water.', 'Add the orange juice and blend until smooth.']
      },
      pt: {
        title: 'Detox de Beterraba e Laranja',
        summary: 'Terroso, doce e rico em ferro.',
        steps: ['Bate a beterraba com a água.', 'Junta o sumo de laranja e bate até ficar homogéneo.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água' },
        { qty: '1 un.', item: 'beterraba sem casca' },
        { qty: '2 un.', item: 'laranjas (sumo puro)' }
      ],
      en: [
        { qty: '250 ml', item: 'water' },
        { qty: '1', item: 'beet, peeled' },
        { qty: '2', item: 'oranges (fresh juice)' }
      ]
    }
  },
  {
    id: 'detox-watermelon-mint',
    category: 'detox',
    emoji: '🍉',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Watermelon & Mint Detox',
        summary: 'Super hydrating with a fresh minty kick.',
        steps: ['Blend the watermelon with water or coconut water.', 'Add the mint, honey and ice, and blend briefly.']
      },
      pt: {
        title: 'Detox de Melancia e Hortelã',
        summary: 'Muito hidratante, com um toque fresco de hortelã.',
        steps: ['Bate a melancia com água ou água de coco.', 'Junta a hortelã, o mel e o gelo, e bate rapidamente.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água ou água de coco' },
        { qty: '2 fatias grossas', item: 'melancia' },
        { qty: '1 c. (sobremesa)', item: 'chia' },
        { qty: '3 folhas', item: 'hortelã (opcional)' }
      ],
      en: [
        { qty: '250 ml', item: 'water or coconut water' },
        { qty: '2 thick slices', item: 'watermelon' },
        { qty: '1 tsp', item: 'chia seeds' },
        { qty: '3 leaves', item: 'fresh mint (optional)' }
      ]
    }
  },
  {
    id: 'detox-tropical-mango',
    category: 'detox',
    emoji: '🥭',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Tropical Mango Detox',
        summary: 'Creamy, sunshine-sweet and packed with vitamin C.',
        steps: ['Blend mango, orange juice and ginger with coconut water.', 'Pour over ice and enjoy cold.']
      },
      pt: {
        title: 'Detox Tropical de Manga',
        summary: 'Cremoso, doce e cheio de vitamina C.',
        steps: ['Bate a manga, o sumo de laranja e o gengibre com a água de coco.', 'Serve com gelo e bebe bem fresco.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água de coco' },
        { qty: '1 un.', item: 'manga madura' },
        { qty: '1 un.', item: 'laranja (sumo)' },
        { qty: '1 pedaço', item: 'gengibre' }
      ],
      en: [
        { qty: '250 ml', item: 'coconut water' },
        { qty: '1', item: 'ripe mango' },
        { qty: '1', item: 'orange (juice)' },
        { qty: '1 piece', item: 'fresh ginger' }
      ]
    }
  },
  {
    id: 'detox-cucumber-mint',
    category: 'detox',
    emoji: '🌱',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Cucumber & Mint Detox',
        summary: 'Crisp, cooling and naturally de-bloating.',
        steps: ['Blend cucumber, mint and lime with cold water.', 'Strain for a lighter drink, or keep it chunky.']
      },
      pt: {
        title: 'Detox de Pepino e Hortelã',
        summary: 'Crocante, fresco e naturalmente desinchante.',
        steps: ['Bate o pepino, a hortelã e a lima com água fria.', 'Coe para uma bebida mais leve ou mantém grosso.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água' },
        { qty: '1 un.', item: 'pepino sem casca' },
        { qty: '5 folhas', item: 'hortelã' },
        { qty: '½ un.', item: 'limão (sumo)' }
      ],
      en: [
        { qty: '250 ml', item: 'water' },
        { qty: '1', item: 'cucumber, peeled' },
        { qty: '5 leaves', item: 'fresh mint' },
        { qty: '½', item: 'lime (juice)' }
      ]
    }
  },
  {
    id: 'detox-pineapple-mint',
    category: 'detox',
    emoji: '🍍',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Pineapple & Mint Detox',
        summary: 'Tropical and naturally sweet.',
        steps: ['Blend pineapple with the water.', 'Add mint and blend briefly. Drink immediately.']
      },
      pt: {
        title: 'Detox de Ananás e Hortelã',
        summary: 'Tropical e naturalmente doce.',
        steps: ['Bate o ananás com a água.', 'Junta a hortelã e bate rapidamente. Bebe de imediato.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água' },
        { qty: '3 fatias grossas', item: 'ananás' },
        { qty: '5 folhas', item: 'hortelã' }
      ],
      en: [
        { qty: '250 ml', item: 'water' },
        { qty: '3 thick slices', item: 'pineapple' },
        { qty: '5 leaves', item: 'fresh mint' }
      ]
    }
  },
  {
    id: 'detox-papaya-orange',
    category: 'detox',
    emoji: '🧡',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Papaya & Orange Detox',
        summary: 'Soft, creamy and great for digestion.',
        steps: ['Scoop the papaya into the blender.', 'Add orange juice and blend until creamy.']
      },
      pt: {
        title: 'Detox de Mamão e Laranja',
        summary: 'Suave, cremoso e ótimo para a digestão.',
        steps: ['Coloca o mamão no liquidificador.', 'Junta o sumo de laranja e bate até ficar cremoso.']
      }
    },
    ingredients: {
      base: [
        { qty: '1 fatia', item: 'mamão' },
        { qty: '2 un.', item: 'laranjas (sumo puro)' },
        { qty: '100 ml', item: 'água' }
      ],
      en: [
        { qty: '1 slice', item: 'papaya' },
        { qty: '2', item: 'oranges (fresh juice)' },
        { qty: '100 ml', item: 'water' }
      ]
    }
  },
  {
    id: 'detox-strawberry-lemon',
    category: 'detox',
    emoji: '🍓',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Strawberry & Lemon Detox',
        summary: 'Bright, fruity and full of antioxidants.',
        steps: ['Blend strawberries with the water.', 'Add lemon juice and blend until smooth.']
      },
      pt: {
        title: 'Detox de Morango e Limão',
        summary: 'Frutado, vivo e repleto de antioxidantes.',
        steps: ['Bate os morangos com a água.', 'Junta o sumo de limão e bate até ficar homogéneo.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água' },
        { qty: '10 un.', item: 'morangos picados' },
        { qty: '1 un.', item: 'limão (sumo puro)' }
      ],
      en: [
        { qty: '250 ml', item: 'water' },
        { qty: '10', item: 'strawberries, chopped' },
        { qty: '1', item: 'lemon (fresh juice)' }
      ]
    }
  },
  {
    id: 'detox-lemon-ginger',
    category: 'detox',
    emoji: '🍋',
    prepMinutes: 5,
    servings: '1',
    tx: {
      en: {
        title: 'Lemon & Ginger Detox',
        summary: 'A warming, metabolism-friendly brew.',
        steps: ['Steep the ginger in warm water.', 'Add lemon juice and honey, then blend or stir well.']
      },
      pt: {
        title: 'Detox de Limão e Gengibre',
        summary: 'Uma bebida quente e amiga do metabolismo.',
        steps: ['Deixa o gengibre em infusão na água morna.', 'Junta o sumo de limão e o mel, e mistura bem.']
      }
    },
    ingredients: {
      base: [
        { qty: '250 ml', item: 'água morna' },
        { qty: '1 un.', item: 'limão (sumo puro)' },
        { qty: '1 pedaço', item: 'gengibre' },
        { qty: '1 c. (chá)', item: 'mel (opcional)' }
      ],
      en: [
        { qty: '250 ml', item: 'warm water' },
        { qty: '1', item: 'lemon (fresh juice)' },
        { qty: '1 piece', item: 'fresh ginger' },
        { qty: '1 tsp', item: 'honey (optional)' }
      ]
    }
  },
  {
    id: 'detox-pineapple-ginger',
    category: 'detox',
    emoji: '✨',
    prepMinutes: 6,
    servings: '1',
    tx: {
      en: {
        title: 'Pineapple & Ginger Detox',
        summary: 'Zesty, bright and gently anti-inflammatory.',
        steps: ['Blend pineapple, ginger and coconut water.', 'Add lemon juice and serve over ice.']
      },
      pt: {
        title: 'Detox de Ananás e Gengibre',
        summary: 'Vivo, fresco e ligeiramente anti-inflamatório.',
        steps: ['Bate o ananás, o gengibre e a água de coco.', 'Junta o sumo de limão e serve com gelo.']
      }
    },
    ingredients: {
      base: [
        { qty: '3 fatias grossas', item: 'ananás' },
        { qty: '1 pedaço', item: 'gengibre' },
        { qty: '200 ml', item: 'água de coco' },
        { qty: '½ un.', item: 'limão (sumo)' }
      ],
      en: [
        { qty: '3 thick slices', item: 'pineapple' },
        { qty: '1 piece', item: 'fresh ginger' },
        { qty: '200 ml', item: 'coconut water' },
        { qty: '½', item: 'lemon (juice)' }
      ]
    }
  },

  // ── SOUPS ────────────────────────────────────────────────────────────
  {
    id: 'soup-veggie-fit',
    category: 'sopas',
    emoji: '🥣',
    prepMinutes: 40,
    servings: '4',
    tx: {
      en: {
        title: 'Fit Vegetable Soup',
        summary: 'A hearty one-pot meal perfect for a light dinner.',
        steps: ['Soften onion, garlic and herbs with a drizzle of oil.', 'Add all the vegetables and stir briefly.', 'Cover with water, season lightly and cook for about 20 minutes.', 'Finish with fresh herbs and serve warm.']
      },
      pt: {
        title: 'Sopa de Legumes Fit',
        summary: 'Uma sopa completa para um jantar leve.',
        steps: ['Refoga a cebola, o alho e as ervas com um fio de azeite.', 'Junta todos os legumes e mexe ligeiramente.', 'Cobre com água, tempera pouco e cozinha cerca de 20 minutos.', 'Termina com ervas frescas e serve quente.']
      }
    },
    ingredients: {
      base: [
        { qty: '1', item: 'cebola média em fatias' }, { qty: '4 dentes', item: 'alho' },
        { qty: '1', item: 'inhame em cubos' }, { qty: '1', item: 'cenoura pequena em cubos' },
        { qty: '1', item: 'batata-doce pequena em cubos' }, { qty: '1', item: 'chuchu em cubos' },
        { qty: '1', item: 'pimento vermelho em fatias' }, { qty: '1', item: 'abobrinha em cubos' },
        { qty: '3 talos', item: 'aipo em cubos' }, { qty: 'a gosto', item: 'sal e ervas frescas' }
      ],
      en: [
        { qty: '1', item: 'medium onion, sliced' }, { qty: '4 cloves', item: 'garlic' },
        { qty: '1', item: 'yam, cubed' }, { qty: '1', item: 'small carrot, cubed' },
        { qty: '1', item: 'small sweet potato, cubed' }, { qty: '1', item: 'chayote, cubed' },
        { qty: '1', item: 'red pepper, sliced' }, { qty: '1', item: 'zucchini, cubed' },
        { qty: '3 stalks', item: 'celery, cubed' }, { qty: 'to taste', item: 'salt and fresh herbs' }
      ]
    }
  },
  {
    id: 'soup-cabbage-fit',
    category: 'sopas',
    emoji: '🥬',
    prepMinutes: 45,
    servings: '6',
    tx: {
      en: {
        title: 'Comfort Cabbage Soup',
        summary: 'A filling, low-calorie classic for dinner.',
        steps: ['Chop all the vegetables.', 'Sauté the onions in a little oil.', 'Add remaining vegetables and cover with water or vegetable cocktail.', 'Simmer until soft, 30–45 minutes.']
      },
      pt: {
        title: 'Sopa de Couve Conforto',
        summary: 'Uma sopa clássica, saciante e pouco calórica.',
        steps: ['Pica todos os legumes.', 'Refoga as cebolas em pouco óleo.', 'Junta os legumes restantes e cobre com água ou coquetel de legumes.', 'Deixa ferver em lume brando 30–45 minutos.']
      }
    },
    ingredients: {
      base: [
        { qty: '2', item: 'cebolas grandes' }, { qty: '2', item: 'pimentos verdes' },
        { qty: '1', item: 'repolho' }, { qty: '3', item: 'cenouras' },
        { qty: '1 pacote', item: 'cogumelos' }, { qty: '2 latas', item: 'tomate' },
        { qty: '1 ramo', item: 'aipo' }, { qty: '6-8 chávenas', item: 'água ou coquetel de vegetais' }
      ],
      en: [
        { qty: '2', item: 'large onions' }, { qty: '2', item: 'green peppers' },
        { qty: '1', item: 'cabbage' }, { qty: '3', item: 'carrots' },
        { qty: '1 pack', item: 'mushrooms' }, { qty: '2 cans', item: 'tomatoes' },
        { qty: '1 stalk', item: 'celery' }, { qty: '6-8 cups', item: 'water or vegetable cocktail' }
      ]
    }
  },
  {
    id: 'soup-tomato-fit',
    category: 'sopas',
    emoji: '🍅',
    prepMinutes: 60,
    servings: '4',
    kcal: 169,
    tx: {
      en: {
        title: 'Smooth Tomato Soup',
        summary: 'Velvety, silky and restaurant-worthy.',
        steps: ['Halve the tomatoes and quarter the onion.', 'Simmer with salt and water for 20 minutes.', 'Blend until smooth, then strain.', 'Reheat and finish with Worcestershire sauce.']
      },
      pt: {
        title: 'Sopa de Tomate Cremosa',
        summary: 'Aveludada e digna de um restaurante.',
        steps: ['Corta os tomates ao meio e a cebola em quatro.', 'Ferve com sal e água durante 20 minutos.', 'Bate até ficar homogénea e coa.', 'Aquece de novo e finaliza com molho inglês.']
      }
    },
    ingredients: {
      base: [
        { qty: '1 kg', item: 'tomate maduro' }, { qty: '1', item: 'cebola grande' },
        { qty: '½ c. chá', item: 'sal' }, { qty: '500 ml', item: 'água' },
        { qty: '1 c. sopa', item: 'molho inglês' }, { qty: '4 talos', item: 'aipo para servir' }
      ],
      en: [
        { qty: '1 kg', item: 'ripe tomatoes' }, { qty: '1', item: 'large onion' },
        { qty: '½ tsp', item: 'salt' }, { qty: '500 ml', item: 'water' },
        { qty: '1 tbsp', item: 'Worcestershire sauce' }, { qty: '4 stalks', item: 'celery, to serve' }
      ]
    }
  },

  // ── TEAS ─────────────────────────────────────────────────────────────
  {
    id: 'tea-herbal-cleanse',
    category: 'chas',
    emoji: '🍵',
    prepMinutes: 20,
    servings: '1 L',
    tx: {
      en: {
        title: 'Signature Herbal Cleanse',
        summary: 'The signature herbal blend of our 30-day program. Drink 1 L daily, before 5 pm.',
        tip: 'Not suitable for pregnant or breastfeeding women. Stop if you feel unwell for more than four days.',
        steps: ['Boil 1 litre of water.', 'Add a small piece of garcinia.', 'Add 1 tablespoon of each herb.', 'Turn off the heat, cover and infuse for 20 minutes.', 'Strain. Drink 1 cup, 5 times a day, for 30 days.']
      },
      pt: {
        title: 'Mistura de Ervas Signature',
        summary: 'A mistura de ervas emblemática do nosso programa de 30 dias. Bebe 1 L por dia, antes das 17h.',
        tip: 'Não indicado para grávidas ou mulheres a amamentar. Suspende se o mal-estar durar mais de quatro dias.',
        steps: ['Ferve 1 litro de água.', 'Adiciona um pequeno pedaço de garcínia.', 'Adiciona 1 colher de sopa de cada erva.', 'Desliga o lume, tapa e deixa em infusão 20 minutos.', 'Coe. Toma 1 chávena, 5 vezes ao dia, durante 30 dias.']
      }
    },
    ingredients: {
      base: [
        { qty: '1 un.', item: 'pedaço de garcínia cambogia' },
        { qty: '1 c. sopa', item: 'hibisco' },
        { qty: '1 c. sopa', item: 'mulungu' },
        { qty: '1 c. sopa', item: 'passiflora' },
        { qty: '1 c. sopa', item: 'dente-de-leão' },
        { qty: '1 c. sopa', item: 'hipericão (erva de São João)' },
        { qty: '1 c. sopa', item: 'erva-java (substituível por canela em pau)' },
        { qty: '1 L', item: 'água' }
      ],
      en: [
        { qty: '1 piece', item: 'garcinia cambogia' },
        { qty: '1 tbsp', item: 'hibiscus' },
        { qty: '1 tbsp', item: 'erythrina (mulungu)' },
        { qty: '1 tbsp', item: 'passionflower' },
        { qty: '1 tbsp', item: 'dandelion' },
        { qty: '1 tbsp', item: 'St. John’s wort' },
        { qty: '1 tbsp', item: 'java herb (or a piece of cinnamon bark)' },
        { qty: '1 L', item: 'water' }
      ]
    }
  },
  {
    id: 'tea-hibiscus-belly',
    category: 'chas',
    emoji: '🌺',
    prepMinutes: 10,
    servings: '1 L',
    tx: {
      en: {
        title: 'Citrus Belly Tea',
        summary: 'Light, citrusy and easy to sip all day long.',
        steps: ['Boil 1 litre of water.', 'Add the herbal blend, cover and infuse for 10 minutes.', 'Stir in the ginger powder and serve throughout the day.']
      },
      pt: {
        title: 'Chá Barriga Leve',
        summary: 'Leve, cítrico e fácil de beber durante o dia.',
        steps: ['Ferve 1 litro de água.', 'Junta a mistura de ervas, tapa e deixa em infusão 10 minutos.', 'Adiciona o gengibre em pó, mistura e bebe ao longo do dia.']
      }
    },
    ingredients: {
      base: [
        { qty: '1 chávena', item: 'chá verde' }, { qty: '1/3 chávena', item: 'hibisco' },
        { qty: '1/3 chávena', item: 'erva-cidreira' }, { qty: '1/3 chávena', item: 'carqueja' },
        { qty: '½ c. chá', item: 'gengibre em pó' }, { qty: '1 L', item: 'água' }
      ],
      en: [
        { qty: '1 cup', item: 'green tea' }, { qty: '⅓ cup', item: 'hibiscus' },
        { qty: '⅓ cup', item: 'lemon balm' }, { qty: '⅓ cup', item: 'carqueja (or boldo)' },
        { qty: '½ tsp', item: 'ground ginger' }, { qty: '1 L', item: 'water' }
      ]
    }
  },
  {
    id: 'tea-indian-chai',
    category: 'chas',
    emoji: '☕',
    prepMinutes: 15,
    servings: '2',
    tx: {
      en: {
        title: 'Homemade Spiced Chai',
        summary: 'A warm, comforting treat for a slower morning.',
        steps: ['Combine water, milk, black tea and the spices.', 'Bring to a gentle simmer for 5–10 minutes.', 'Sweeten to taste, strain and enjoy warm.']
      },
      pt: {
        title: 'Chai Especiado Caseiro',
        summary: 'Uma bebida quente e reconfortante para manhãs mais lentas.',
        steps: ['Junta a água, o leite, o chá preto e as especiarias.', 'Deixa levantar fervura branda durante 5–10 minutos.', 'Adoça a gosto, coa e aproveita.']
      }
    },
    ingredients: {
      base: [
        { qty: '2 chávenas', item: 'água' }, { qty: '1 chávena', item: 'leite' },
        { qty: '1 pau', item: 'canela' }, { qty: '3', item: 'cravos-da-índia' },
        { qty: '1 c. chá', item: 'gengibre ralado' }, { qty: '2 c. chá', item: 'chá preto' }
      ],
      en: [
        { qty: '2 cups', item: 'water' }, { qty: '1 cup', item: 'milk' },
        { qty: '1 stick', item: 'cinnamon' }, { qty: '3', item: 'cloves' },
        { qty: '1 tsp', item: 'grated ginger' }, { qty: '2 tsp', item: 'black tea' }
      ]
    }
  },

  // ── LIGHT SWEETS ─────────────────────────────────────────────────────
  {
    id: 'sweet-nutella-light',
    category: 'doces',
    emoji: '🍫',
    prepMinutes: 15,
    servings: '1 jar',
    tx: {
      en: {
        title: 'Homemade Light Nut Spread',
        summary: 'A creamy chocolate-hazelnut spread without the guilt.',
        steps: ['Toast the almonds and hazelnuts in the oven at 180 °C — they burn fast.', 'Simmer milk, milk powder, honey and salt, then turn off and cover.', 'Rub the hazelnuts in a towel to remove the skins.', 'Blend to a fine flour, add the warm milk and chocolate, then blend.', 'Chill for at least 3 hours. Strain for extra smoothness.']
      },
      pt: {
        title: 'Creme de Aveleiras Leve',
        summary: 'Um creme de chocolate e aveleiras sem culpa.',
        steps: ['Tosta amêndoas e aveleiras no forno a 180 °C — queimam depressa.', 'Ferve o leite, o leite em pó, o mel e o sal; desliga e tapa.', 'Elimina a casca das aveleiras com um pano enquanto quentes.', 'Tritura até obter farinha, junta o leite quente e o chocolate, e bate.', 'Leva ao frio pelo menos 3 horas. Coa para ficar mais liso.']
      }
    },
    ingredients: {
      base: [
        { qty: '40 g', item: 'amêndoas sem pele' }, { qty: '160 g', item: 'aveleiras' },
        { qty: '400 g', item: 'leite magro' }, { qty: '60 g', item: 'leite em pó magro' },
        { qty: '40 g', item: 'mel' }, { qty: '170 g', item: 'chocolate meio amargo' },
        { qty: '140 g', item: 'chocolate ao leite diet (sem açúcar)' }
      ],
      en: [
        { qty: '40 g', item: 'skinned almonds' }, { qty: '160 g', item: 'hazelnuts' },
        { qty: '400 g', item: 'skimmed milk' }, { qty: '60 g', item: 'skimmed milk powder' },
        { qty: '40 g', item: 'honey' }, { qty: '170 g', item: 'dark chocolate' },
        { qty: '140 g', item: 'sugar-free milk chocolate' }
      ]
    }
  },
  {
    id: 'sweet-carrot-cake',
    category: 'doces',
    emoji: '🥕',
    prepMinutes: 40,
    servings: '8',
    tx: {
      en: {
        title: 'Fit Carrot Cake',
        summary: 'Fluffy, moist and naturally sweetened.',
        steps: ['Blend eggs, milk, carrots, oat bran, corn starch, milk powder, honey and sweetener.', 'Stir in the baking powder gently.', 'Bake in a greased loaf tin at medium heat until golden, about 25 minutes.', 'Cool briefly, unmould and serve.']
      },
      pt: {
        title: 'Bolo de Cenoura Fit',
        summary: 'Fofo, húmido e adoçado naturalmente.',
        steps: ['Bate ovos, leite, cenouras, farelo de aveia, amido, leite em pó, mel e adoçante.', 'Junta o fermento e mexe delicadamente.', 'Vai ao forno médio numa forma untada até dourar, cerca de 25 minutos.', 'Deixa arrefecer, desenforma e serve.']
      }
    },
    ingredients: {
      base: [
        { qty: '3', item: 'ovos' }, { qty: '½ chávena', item: 'leite magro' },
        { qty: '2', item: 'cenouras médias raladas' }, { qty: '8 c. sopa', item: 'farelo de aveia' },
        { qty: '2 c. sopa', item: 'amido de milho' }, { qty: '6 c. sopa', item: 'leite em pó magro' },
        { qty: '2 c. sopa', item: 'mel' }, { qty: '1 c. sopa', item: 'fermento em pó' }
      ],
      en: [
        { qty: '3', item: 'eggs' }, { qty: '½ cup', item: 'skimmed milk' },
        { qty: '2', item: 'medium carrots, grated' }, { qty: '8 tbsp', item: 'oat bran' },
        { qty: '2 tbsp', item: 'corn starch' }, { qty: '6 tbsp', item: 'skimmed milk powder' },
        { qty: '2 tbsp', item: 'honey' }, { qty: '1 tbsp', item: 'baking powder' }
      ]
    }
  },

  // ── LOW CARB ─────────────────────────────────────────────────────────
  {
    id: 'lowcarb-crepioca',
    category: 'lowcarb',
    emoji: '🥞',
    prepMinutes: 8,
    servings: '1',
    kcal: 150,
    tx: {
      en: {
        title: 'Low-carb Crepioca',
        summary: 'A 2-minute flatbread for sweet or savoury fillings.',
        steps: ['Whisk the egg with the flour and baking powder.', 'Add a pinch of salt.', 'Cook in a greased pan over low heat until golden on both sides.', 'Fill with whatever you love.']
      },
      pt: {
        title: 'Crepioca Low Carb',
        summary: 'Uma panqueca fininha de 2 minutos, para recheios doces ou salgados.',
        steps: ['Bate o ovo com a farinha e o fermento.', 'Junta uma pitada de sal.', 'Frita numa frigideira untada, em lume baixo, até dourar dos dois lados.', 'Recheia como preferires.']
      }
    },
    ingredients: {
      base: [
        { qty: '1', item: 'ovo' }, { qty: '1-2 c. sopa', item: 'farinha de amêndoa (ou linhaça)' },
        { qty: '1 c. café', item: 'fermento químico' }, { qty: 'a gosto', item: 'sal ou adoçante' }
      ],
      en: [
        { qty: '1', item: 'egg' }, { qty: '1-2 tbsp', item: 'almond flour (or flax)' },
        { qty: '1 pinch', item: 'baking powder' }, { qty: 'to taste', item: 'salt or sweetener' }
      ]
    }
  },
  {
    id: 'lowcarb-omelette-zucchini',
    category: 'lowcarb',
    emoji: '🍳',
    prepMinutes: 10,
    servings: '1',
    tx: {
      en: {
        title: 'Zucchini Low-carb Omelette',
        summary: 'A soft, cheesy omelette with grated zucchini.',
        steps: ['Beat the eggs, then add the zucchini, seasoning and salt.', 'Softly fry the onion in butter over low heat.', 'Pour in the eggs, cover with cheese and cook both sides.', 'Serve rolled.']
      },
      pt: {
        title: 'Omelete Low Carb de Abobrinha',
        summary: 'Uma omelete macia e com queijo, com abobrinha ralada.',
        steps: ['Bate os ovos e junta a abobrinha, os temperos e o sal.', 'Refoga a cebola na manteiga, em lume baixo.', 'Despeja os ovos, cobre com queijo e doura dos dois lados.', 'Serve enrolado.']
      }
    },
    ingredients: {
      base: [
        { qty: '2', item: 'ovos' }, { qty: '½', item: 'abobrinha ralada' },
        { qty: '2 fatias', item: 'queijo' }, { qty: 'a gosto', item: 'cebola, sal e temperos' }
      ],
      en: [
        { qty: '2', item: 'eggs' }, { qty: '½', item: 'zucchini, grated' },
        { qty: '2 slices', item: 'cheese' }, { qty: 'to taste', item: 'onion, salt and spices' }
      ]
    }
  },
  {
    id: 'lowcarb-cheese-bread',
    category: 'lowcarb',
    emoji: '🧀',
    prepMinutes: 15,
    servings: '6',
    tx: {
      en: {
        title: 'Low-carb Cheese Puffs',
        summary: 'Golden, chewy and dangerously simple.',
        steps: ['Mix the egg with both cheeses until well combined.', 'Shape into small balls in silicone moulds.', 'Bake at 180 °C until golden, about 15 minutes.', 'Serve right away.']
      },
      pt: {
        title: 'Bolinhas de Queijo Low Carb',
        summary: 'Douradas, elásticas e perigosamente simples.',
        steps: ['Mistura o ovo com os dois queijos até incorporar bem.', 'Modela bolinhas em formas de silicone.', 'Vai ao forno a 180 °C até dourar, cerca de 15 minutos.', 'Serve de imediato.']
      }
    },
    ingredients: {
      base: [
        { qty: '1', item: 'ovo' }, { qty: '150 g', item: 'queijo mussarela' },
        { qty: '50 g', item: 'parmesão' }
      ],
      en: [
        { qty: '1', item: 'egg' }, { qty: '150 g', item: 'mozzarella' },
        { qty: '50 g', item: 'parmesan' }
      ]
    }
  },

  // ── LIQUID BOOSTERS ──────────────────────────────────────────────────
  {
    id: 'booster-lemon-chia',
    category: 'bombas',
    emoji: '🍋',
    prepMinutes: 10,
    servings: '1',
    tx: {
      en: {
        title: 'Lemon & Chia Booster',
        summary: 'A warm evening ritual to support the plan. 2 weeks on, 1 week off.',
        steps: ['Warm the water and pour into a glass.', 'Stir in the chia and rest for 5 minutes.', 'Add the lemon juice and honey.', 'Drink in large sips, 2 hours after dinner, while still warm.']
      },
      pt: {
        title: 'Booster de Limão e Chia',
        summary: 'Um ritual quente para o fim do dia. 2 semanas seguidas, 1 de pausa.',
        steps: ['Aquece a água e coloca num copo.', 'Junta a chia e deixa descansar 5 minutos.', 'Adiciona o sumo de limão e o mel.', 'Bebe em golos grandes, 2 horas após o jantar, ainda morno.']
      }
    },
    ingredients: {
      base: [
        { qty: '200 ml', item: 'água' }, { qty: '½', item: 'limão' },
        { qty: '1 c. sopa', item: 'sementes de chia' }, { qty: '1 c. sopa', item: 'mel', optional: true }
      ],
      en: [
        { qty: '200 ml', item: 'water' }, { qty: '½', item: 'lemon' },
        { qty: '1 tbsp', item: 'chia seeds' }, { qty: '1 tbsp', item: 'honey', optional: true }
      ]
    }
  },
  {
    id: 'booster-oats-flax',
    category: 'bombas',
    emoji: '🥣',
    prepMinutes: 65,
    servings: '2',
    tx: {
      en: {
        title: 'Oats & Flax Cream',
        summary: 'A creamy nightly shake — hydrate first, blend second.',
        steps: ['Soak the flax seeds and oats in the coconut water for at least 30 minutes (ideally 1 h).', 'Blend for 5 minutes until as smooth as possible.', 'Sweeten with the sweetener and vanilla to taste.', 'Drink 2 hours after dinner.']
      },
      pt: {
        title: 'Creme de Aveia e Linhaça',
        summary: 'Um shake noturno cremoso — primeiro hidrata, depois bate.',
        steps: ['Deixa a linhaça e a aveia hidratar na água de coco durante pelo menos 30 minutos (ideal: 1 h).', 'Bate 5 minutos, até ficar o mais homogéneo possível.', 'Adoça com adoçante e baunilha a gosto.', 'Bebe 2 horas após o jantar.']
      }
    },
    ingredients: {
      base: [
        { qty: '4 c. sopa', item: 'aveia em flocos' }, { qty: '2 c. sopa', item: 'sementes de linhaça' },
        { qty: '2 copos', item: 'água de coco' }, { qty: '1 envelope', item: 'adoçante' },
        { qty: '1 gota', item: 'essência de baunilha', optional: true }
      ],
      en: [
        { qty: '4 tbsp', item: 'rolled oats' }, { qty: '2 tbsp', item: 'flax seeds' },
        { qty: '2 cups', item: 'coconut water' }, { qty: '1 sachet', item: 'sweetener' },
        { qty: '1 drop', item: 'vanilla essence', optional: true }
      ]
    }
  },
  {
    id: 'booster-ginger-lemon',
    category: 'bombas',
    emoji: '🫚',
    prepMinutes: 10,
    servings: '2',
    tx: {
      en: {
        title: 'Ginger & Lemon Wake-up',
        summary: 'A quick morning boost — drink one or two cups a day.',
        steps: ['Heat the water and turn off just before it boils.', 'Add the grated ginger and keep covered for 5 minutes.', 'Strain, blend with the lemon and drink quickly to avoid bitterness.']
      },
      pt: {
        title: 'Desperta Gengibre e Limão',
        summary: 'Um reforço rápido de manhã — toma 1 a 2 chávenas por dia.',
        steps: ['Aquece a água e desliga antes de ferver.', 'Junta o gengibre ralado e mantém abafado 5 minutos.', 'Coe, bate com o limão e bebe depressa para não amargar.']
      }
    },
    ingredients: {
      base: [
        { qty: '500 ml', item: 'água' }, { qty: '2 c. sopa', item: 'gengibre ralado' },
        { qty: '½', item: 'limão com casca' }
      ],
      en: [
        { qty: '500 ml', item: 'water' }, { qty: '2 tbsp', item: 'grated ginger' },
        { qty: '½', item: 'lemon with rind' }
      ]
    }
  }
];