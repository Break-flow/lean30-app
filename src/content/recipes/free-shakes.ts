import type { Recipe } from '../types';

/**
 * Free tier — the 10 signature shakes (from the original sampler e-book).
 * Brand/service-number references have been removed; names and content
 * are our own Lean30-branded versions.
 */
export const freeShakes: Recipe[] = [
  {
    id: 'shake-apple-oats',
    category: 'shakes',
    emoji: '🍎',
    prepMinutes: 5,
    servings: '1',
    kcal: 220,
    tx: {
      en: {
        title: 'Apple & Oat Shake',
        summary: 'A creamy everyday shake that keeps cravings at bay.',
        steps: ['Blend everything until smooth.', 'Serve chilled.']
      },
      es: {
        title: 'Batido de Manzana y Avena',
        summary: 'Un batido cremoso para frenar el antojo del día a día.',
        steps: ['Mezcla todo hasta que quede suave.', 'Sirve bien frío.']
      },
      fr: {
        title: 'Shake pomme & avoine',
        summary: 'Un shake crémeux pour tenir les fringales au quotidien.',
        steps: ['Mixez tous les ingrédients jusqu’à obtenir une texture lisse.', 'Servez bien frais.']
      },
      pt: {
        title: 'Shake de Maçã e Aveia',
        summary: 'Um shake cremoso para segurar o dia a dia sem ataques de fome.',
        steps: ['Bate todos os ingredientes no liquidificador.', 'Serve bem fresco.']
      }
    },
    ingredients: {
      base: [
        { qty: '200 ml', item: 'leite de soja light ou leite desnatado' },
        { qty: '1 un.', item: 'maçã pequena' },
        { qty: '1 c. chá', item: 'sementes de chia' },
        { qty: '1 c. chá', item: 'aveia em flocos' },
        { qty: '1 c. chá', item: 'linhaça' },
        { qty: '1 c. sobremesa', item: 'mel', optional: true }
      ],
      en: [
        { qty: '200 ml', item: 'light soy milk or skimmed milk' },
        { qty: '1', item: 'small apple' },
        { qty: '1 tsp', item: 'chia seeds' },
        { qty: '1 tsp', item: 'rolled oats' },
        { qty: '1 tsp', item: 'flaxseed' },
        { qty: '1 tbsp', item: 'honey', optional: true }
      ],
      es: [
        { qty: '200 ml', item: 'leche de soja light o leche desnatada' },
        { qty: '1', item: 'manzana pequeña' },
        { qty: '1 cdta.', item: 'semillas de chía' },
        { qty: '1 cdta.', item: 'copos de avena' },
        { qty: '1 cdta.', item: 'semillas de lino' },
        { qty: '1 cdita.', item: 'miel', optional: true }
      ],
      fr: [
        { qty: '200 ml', item: 'lait de soja light ou lait écrémé' },
        { qty: '1', item: 'petite pomme' },
        { qty: '1 c. à café', item: 'graines de chia' },
        { qty: '1 c. à café', item: 'flocons d’avoine' },
        { qty: '1 c. à café', item: 'graines de lin' },
        { qty: '1 c. à soupe', item: 'miel', optional: true }
      ]
    }
  },
  {
    id: 'shake-pineapple-mint',
    category: 'shakes',
    emoji: '🍍',
    prepMinutes: 5,
    servings: '1',
    kcal: 190,
    tx: {
      en: {
        title: 'Pineapple & Mint Shake',
        summary: 'Bright, refreshing and packed with flavour.',
        steps: ['Blend all ingredients until smooth.', 'Drink immediately.']
      },
      es: {
        title: 'Batido de Piña y Menta',
        summary: 'Fresco, ligero y lleno de sabor.',
        steps: ['Mezcla todos los ingredientes.', 'Bebe al momento.']
      },
      fr: {
        title: 'Shake ananas & menthe',
        summary: 'Frais, léger et plein de saveur.',
        steps: ['Mixez tous les ingrédients.', 'Buvez sans attendre.']
      },
      pt: {
        title: 'Shake de Ananás e Hortelã',
        summary: 'Fresco, leve e cheio de sabor.',
        steps: ['Bate todos os ingredientes.', 'Bebe de imediato.']
      }
    },
    ingredients: {
      base: [
        { qty: '210 ml', item: 'leite de soja light ou leite desnatado' },
        { qty: '5 fatias', item: 'ananás/abacaxi' },
        { qty: '1 c. sopa', item: 'folhas de hortelã' },
        { qty: '1 c. sobremesa', item: 'linhaça' },
        { qty: '1 c. sobremesa', item: 'mel', optional: true }
      ],
      en: [
        { qty: '210 ml', item: 'light soy milk or skimmed milk' },
        { qty: '5 slices', item: 'pineapple' },
        { qty: '1 tbsp', item: 'fresh mint leaves' },
        { qty: '1 tbsp', item: 'flaxseed' },
        { qty: '1 tbsp', item: 'honey', optional: true }
      ],
      es: [
        { qty: '210 ml', item: 'leche de soja light o leche desnatada' },
        { qty: '5 rodajas', item: 'piña' },
        { qty: '1 cda.', item: 'hojas de menta' },
        { qty: '1 cdita.', item: 'semillas de lino' },
        { qty: '1 cdita.', item: 'miel', optional: true }
      ],
      fr: [
        { qty: '210 ml', item: 'lait de soja light ou lait écrémé' },
        { qty: '5 tranches', item: 'ananas' },
        { qty: '1 c. à soupe', item: 'feuilles de menthe' },
        { qty: '1 c. à soupe', item: 'graines de lin' },
        { qty: '1 c. à soupe', item: 'miel', optional: true }
      ]
    }
  },
  {
    id: 'shake-pear-strawberry',
    category: 'shakes',
    emoji: '🍓',
    prepMinutes: 5,
    servings: '1',
    kcal: 205,
    tx: {
      en: {
        title: 'Pear & Strawberry Power Shake',
        summary: 'A wholesome meal-replacement shake for busy days.',
        steps: ['Blend everything until creamy.', 'Serve cold.']
      },
      es: {
        title: 'Batido Fuerte de Pera y Fresa',
        summary: 'Un batido completo para sustituir una comida.',
        steps: ['Mezcla todo hasta que quede cremoso.', 'Sirve frío.']
      },
      fr: {
        title: 'Shake poire & fraise',
        summary: 'Un shake complet pour remplacer un repas.',
        steps: ['Mixez le tout jusqu’à obtenir une texture crémeuse.', 'Servez frais.']
      },
      pt: {
        title: 'Shake de Pêra e Morango',
        summary: 'Um shake completo para substituir uma refeição.',
        steps: ['Bate tudo até ficar cremoso.', 'Serve fresco.']
      }
    },
    ingredients: {
      base: [
        { qty: '1 un.', item: 'pêra' },
        { qty: '4 un.', item: 'morangos' },
        { qty: '2 c. sopa', item: 'aveia em flocos' },
        { qty: '200 ml', item: 'iogurte natural desnatado' },
        { qty: '1 un.', item: 'castanha-do-pará' },
        { qty: '½ c. sopa', item: 'folhas de hortelã' },
        { qty: '1 sachê', item: 'adoçante em pó', optional: true }
      ],
      en: [
        { qty: '1', item: 'pear' },
        { qty: '4', item: 'strawberries' },
        { qty: '2 tbsp', item: 'rolled oats' },
        { qty: '200 ml', item: 'plain low-fat yogurt' },
        { qty: '1', item: 'Brazil nut' },
        { qty: '½ tbsp', item: 'mint leaves' },
        { qty: '1 sachet', item: 'powdered sweetener', optional: true }
      ],
      es: [
        { qty: '1', item: 'pera' },
        { qty: '4', item: 'fresas' },
        { qty: '2 cdas.', item: 'copos de avena' },
        { qty: '200 ml', item: 'yogur natural desnatado' },
        { qty: '1', item: 'nuez de Brasil' },
        { qty: '½ cda.', item: 'hojas de menta' },
        { qty: '1 sobre', item: 'edulcorante en polvo', optional: true }
      ],
      fr: [
        { qty: '1', item: 'poire' },
        { qty: '4', item: 'fraises' },
        { qty: '2 c. à soupe', item: 'flocons d’avoine' },
        { qty: '200 ml', item: 'yaourt nature allégé' },
        { qty: '1', item: 'noix du Brésil' },
        { qty: '½ c. à soupe', item: 'feuilles de menthe' },
        { qty: '1 sachet', item: 'édulcorant en poudre', optional: true }
      ]
    }
  },
  {
    id: 'shake-breakfast-plum',
    category: 'shakes',
    emoji: '🫐',
    prepMinutes: 5,
    servings: '1',
    kcal: 185,
    tx: {
      en: {
        title: 'Banana Breakfast Shake',
        summary: 'Light, sweet and perfect to replace an early meal.',
        steps: ['Blend until smooth.', 'Enjoy as a quick breakfast.']
      },
      es: {
        title: 'Batido de Plátano para el Desayuno',
        summary: 'Ligero, dulce y perfecto para sustituir la primera comida.',
        steps: ['Mezcla hasta que quede suave.', 'Disfruta como desayuno rápido.']
      },
      fr: {
        title: 'Shake banane du matin',
        summary: 'Léger, doux et parfait pour remplacer un premier repas.',
        steps: ['Mixez jusqu’à obtenir une texture lisse.', 'Dégustez en petit-déjeuner express.']
      },
      pt: {
        title: 'Shake de Banana para o Pequeno-almoço',
        summary: 'Ligeiro, doce e perfeito para substituir a primeira refeição.',
        steps: ['Bate até ficar cremoso.', 'Toma como pequeno-almoço rápido.']
      }
    },
    ingredients: {
      base: [
        { qty: '100 ml', item: 'leite desnatado' },
        { qty: '1 un.', item: 'banana pequena' },
        { qty: '1 un.', item: 'ameixa preta' },
        { qty: '1 c. sobremesa rasa', item: 'mel' }
      ],
      en: [
        { qty: '100 ml', item: 'skimmed milk' },
        { qty: '1', item: 'small banana' },
        { qty: '1', item: 'black plum' },
        { qty: '1 tsp', item: 'honey' }
      ],
      es: [
        { qty: '100 ml', item: 'leche desnatada' },
        { qty: '1', item: 'plátano pequeño' },
        { qty: '1', item: 'ciruela negra' },
        { qty: '1 cdita.', item: 'miel' }
      ],
      fr: [
        { qty: '100 ml', item: 'lait écrémé' },
        { qty: '1', item: 'petite banane' },
        { qty: '1', item: 'prune noire' },
        { qty: '1 c. à café', item: 'miel' }
      ]
    }
  },
  {
    id: 'shake-slimmer-chia',
    category: 'shakes',
    emoji: '🌿',
    prepMinutes: 5,
    servings: '1',
    kcal: 210,
    tx: {
      en: {
        title: 'Chia & Apple Slimmer Shake',
        summary: 'Fibre-rich and filling — your go-to between meals.',
        steps: ['Blend all ingredients together.', 'Serve with ice if you like.']
      },
      es: {
        title: 'Batido Adelgazante de Chía y Manzana',
        summary: 'Rico en fibra y saciante — ideal entre comidas.',
        steps: ['Mezcla todos los ingredientes.', 'Sirve con hielo si quieres.']
      },
      fr: {
        title: 'Shake minceur chia & pomme',
        summary: 'Riche en fibres et rassasiant — parfait entre les repas.',
        steps: ['Mixez tous les ingrédients.', 'Servez avec des glaçons si désiré.']
      },
      pt: {
        title: 'Shake de Chia e Maçã',
        summary: 'Rico em fibra e saciante — ideal entre refeições.',
        steps: ['Bate todos os ingredientes.', 'Serve com gelo, se preferires.']
      }
    },
    ingredients: {
      base: [
        { qty: '200 ml', item: 'leite desnatado' },
        { qty: '1 un.', item: 'maçã com casca' },
        { qty: '1 c. chá', item: 'grãos de chia' },
        { qty: '1 c. chá', item: 'farelo de aveia' },
        { qty: '1 c. chá rasa', item: 'linhaça' },
        { qty: 'a gosto', item: 'adoçante de estévia', optional: true }
      ],
      en: [
        { qty: '200 ml', item: 'skimmed milk' },
        { qty: '1', item: 'apple with skin' },
        { qty: '1 tsp', item: 'chia seeds' },
        { qty: '1 tsp', item: 'oat bran' },
        { qty: '1 tsp', item: 'flaxseed' },
        { qty: 'to taste', item: 'stevia sweetener', optional: true }
      ],
      es: [
        { qty: '200 ml', item: 'leche desnatada' },
        { qty: '1', item: 'manzana con piel' },
        { qty: '1 cdta.', item: 'semillas de chía' },
        { qty: '1 cdta.', item: 'salvado de avena' },
        { qty: '1 cdta.', item: 'semillas de lino' },
        { qty: 'al gusto', item: 'edulcorante de stevia', optional: true }
      ],
      fr: [
        { qty: '200 ml', item: 'lait écrémé' },
        { qty: '1', item: 'pomme avec la peau' },
        { qty: '1 c. à café', item: 'graines de chia' },
        { qty: '1 c. à café', item: 'son d’avoine' },
        { qty: '1 c. à café', item: 'graines de lin' },
        { qty: 'au goût', item: 'édulcorant stévia', optional: true }
      ]
    }
  },
  {
    id: 'shake-strawberry-light',
    category: 'shakes',
    emoji: '🍓',
    prepMinutes: 5,
    servings: '1',
    kcal: 195,
    tx: {
      en: {
        title: 'Strawberry Refresh Shake',
        summary: 'A dessert-like shake that fits your plan.',
        steps: ['Blend all ingredients until smooth.', 'Best served cold.']
      },
      es: {
        title: 'Batido Refrescante de Fresa',
        summary: 'Un batido con sabor a postre que encaja en tu plan.',
        steps: ['Mezcla todos los ingredientes.', 'Mejor servido frío.']
      },
      fr: {
        title: 'Shake fraise rafraîchissant',
        summary: 'Un shake saveur dessert qui s’intègre à ton plan.',
        steps: ['Mixez tous les ingrédients.', 'Servir de préférence froid.']
      },
      pt: {
        title: 'Shake Refrescante de Morango',
        summary: 'Um shake com sabor a sobremesa que cabe no teu plano.',
        steps: ['Bate todos os ingredientes.', 'Melhor servido frio.']
      }
    },
    ingredients: {
      base: [
        { qty: '10 un.', item: 'morangos médios' },
        { qty: '1 c. sopa', item: 'leite em pó desnatado' },
        { qty: '1 c. sopa', item: 'mel' },
        { qty: '1 pote', item: 'gelatina de framboesa light' },
        { qty: '200 ml', item: 'iogurte natural desnatado' }
      ],
      en: [
        { qty: '10', item: 'medium strawberries' },
        { qty: '1 tbsp', item: 'skimmed milk powder' },
        { qty: '1 tbsp', item: 'honey' },
        { qty: '1 pot', item: 'sugar-free raspberry jelly' },
        { qty: '200 ml', item: 'plain low-fat yogurt' }
      ],
      es: [
        { qty: '10', item: 'fresas medianas' },
        { qty: '1 cda.', item: 'leche en polvo desnatada' },
        { qty: '1 cda.', item: 'miel' },
        { qty: '1 tarrina', item: 'gelatina de frambuesa light' },
        { qty: '200 ml', item: 'yogur natural desnatado' }
      ],
      fr: [
        { qty: '10', item: 'fraises moyennes' },
        { qty: '1 c. à soupe', item: 'lait écrémé en poudre' },
        { qty: '1 c. à soupe', item: 'miel' },
        { qty: '1 pot', item: 'gelée de framboise light' },
        { qty: '200 ml', item: 'yaourt nature allégé' }
      ]
    }
  },
  {
    id: 'shake-grains-energy',
    category: 'shakes',
    emoji: '🌾',
    prepMinutes: 5,
    servings: '1',
    kcal: 230,
    tx: {
      en: {
        title: 'Whole-grain Energy Shake',
        summary: 'Slow-burning energy from oats, chia and flax.',
        steps: ['Blend until creamy.', 'Drink right away.']
      },
      es: {
        title: 'Batido Energético de Cereales',
        summary: 'Energía de absorción lenta con avena, chía y lino.',
        steps: ['Mezcla hasta que quede cremoso.', 'Bebe enseguida.']
      },
      fr: {
        title: 'Shake énergie aux grains entiers',
        summary: 'Une énergie à libération lente grâce à l’avoine, chia et lin.',
        steps: ['Mixez jusqu’à obtenir une texture crémeuse.', 'Buvez immédiatement.']
      },
      pt: {
        title: 'Shake Energético de Grãos',
        summary: 'Energia de libertação lenta com aveia, chia e linhaça.',
        steps: ['Bate até ficar cremoso.', 'Bebe de imediato.']
      }
    },
    ingredients: {
      base: [
        { qty: '200 ml', item: 'leite desnatado' },
        { qty: '1 un.', item: 'maçã com casca' },
        { qty: '1 c. sopa', item: 'farelo de aveia' },
        { qty: '1 c. sopa', item: 'grãos de chia' },
        { qty: '1 c. rasa', item: 'linhaça' }
      ],
      en: [
        { qty: '200 ml', item: 'skimmed milk' },
        { qty: '1', item: 'apple with skin' },
        { qty: '1 tbsp', item: 'oat bran' },
        { qty: '1 tbsp', item: 'chia seeds' },
        { qty: '1 tsp', item: 'flaxseed' }
      ],
      es: [
        { qty: '200 ml', item: 'leche desnatada' },
        { qty: '1', item: 'manzana con piel' },
        { qty: '1 cda.', item: 'salvado de avena' },
        { qty: '1 cda.', item: 'semillas de chía' },
        { qty: '1 cdta.', item: 'semillas de lino' }
      ],
      fr: [
        { qty: '200 ml', item: 'lait écrémé' },
        { qty: '1', item: 'pomme avec la peau' },
        { qty: '1 c. à soupe', item: 'son d’avoine' },
        { qty: '1 c. à soupe', item: 'graines de chia' },
        { qty: '1 c. à café', item: 'graines de lin' }
      ]
    }
  },
  {
    id: 'shake-watermelon-fresh',
    category: 'shakes',
    emoji: '🍉',
    prepMinutes: 5,
    servings: '1',
    kcal: 175,
    tx: {
      en: {
        title: 'Watermelon Cooler',
        summary: 'Light and super hydrating with a jelly twist.',
        steps: ['Blend all ingredients.', 'Serve over ice.']
      },
      es: {
        title: 'Batido de Sandía',
        summary: 'Ligero y muy hidratante con un toque de gelatina.',
        steps: ['Mezcla todos los ingredientes.', 'Sirve con hielo.']
      },
      fr: {
        title: 'Shake pastèque fraîcheur',
        summary: 'Léger et ultra hydratant avec une touche de gelée.',
        steps: ['Mixez tous les ingrédients.', 'Servez sur glace.']
      },
      pt: {
        title: 'Shake de Melancia',
        summary: 'Leve e muito hidratante, com um toque de gelatina.',
        steps: ['Bate todos os ingredientes.', 'Serve com gelo.']
      }
    },
    ingredients: {
      base: [
        { qty: '1 fatia grossa', item: 'melancia com sementes' },
        { qty: '1 c. sopa', item: 'leite em pó desnatado' },
        { qty: '100 ml', item: 'iogurte natural desnatado' },
        { qty: '1 pote', item: 'gelatina de framboesa light' },
        { qty: '1 c. sopa', item: 'mel' }
      ],
      en: [
        { qty: '1 thick slice', item: 'watermelon (with seeds)' },
        { qty: '1 tbsp', item: 'skimmed milk powder' },
        { qty: '100 ml', item: 'plain low-fat yogurt' },
        { qty: '1 pot', item: 'sugar-free raspberry jelly' },
        { qty: '1 tbsp', item: 'honey' }
      ],
      es: [
        { qty: '1 rodaja gruesa', item: 'sandía (con semillas)' },
        { qty: '1 cda.', item: 'leche en polvo desnatada' },
        { qty: '100 ml', item: 'yogur natural desnatado' },
        { qty: '1 tarrina', item: 'gelatina de frambuesa light' },
        { qty: '1 cda.', item: 'miel' }
      ],
      fr: [
        { qty: '1 grosse tranche', item: 'pastèque (avec graines)' },
        { qty: '1 c. à soupe', item: 'lait écrémé en poudre' },
        { qty: '100 ml', item: 'yaourt nature allégé' },
        { qty: '1 pot', item: 'gelée de framboise light' },
        { qty: '1 c. à soupe', item: 'miel' }
      ]
    }
  },
  {
    id: 'shake-prune-banana',
    category: 'shakes',
    emoji: '🍌',
    prepMinutes: 5,
    servings: '1',
    kcal: 200,
    tx: {
      en: {
        title: 'Prune & Banana Shake',
        summary: 'Naturally sweet and kind to your digestion.',
        steps: ['Blend until smooth.', 'Serve immediately.']
      },
      es: {
        title: 'Batido de Ciruela y Plátano',
        summary: 'Dulce natural y bueno para la digestión.',
        steps: ['Mezcla hasta que quede suave.', 'Sirve de inmediato.']
      },
      fr: {
        title: 'Shake prune & banane',
        summary: 'Naturellement doux et doux pour la digestion.',
        steps: ['Mixez jusqu’à consistance lisse.', 'Servez aussitôt.']
      },
      pt: {
        title: 'Shake de Ameixa e Banana',
        summary: 'Naturalmente doce e amigo da digestão.',
        steps: ['Bate até ficar liso.', 'Serve de imediato.']
      }
    },
    ingredients: {
      base: [
        { qty: '1 copo', item: 'leite desnatado' },
        { qty: '1 un.', item: 'banana-prata pequena' },
        { qty: '2 un.', item: 'ameixas pretas secas' },
        { qty: '1 c. sopa', item: 'farinha de linhaça dourada' }
      ],
      en: [
        { qty: '1 glass', item: 'skimmed milk' },
        { qty: '1', item: 'small banana' },
        { qty: '2', item: 'dried black plums (prunes)' },
        { qty: '1 tbsp', item: 'golden flax meal' }
      ],
      es: [
        { qty: '1 vaso', item: 'leche desnatada' },
        { qty: '1', item: 'plátano pequeño' },
        { qty: '2', item: 'ciruelas secas' },
        { qty: '1 cda.', item: 'harina de lino dorado' }
      ],
      fr: [
        { qty: '1 verre', item: 'lait écrémé' },
        { qty: '1', item: 'petite banane' },
        { qty: '2', item: 'pruneaux' },
        { qty: '1 c. à soupe', item: 'farine de lin doré' }
      ]
    }
  },
  {
    id: 'shake-acerola-ginger',
    category: 'shakes',
    emoji: '🍊',
    prepMinutes: 5,
    servings: '1',
    kcal: 165,
    tx: {
      en: {
        title: 'Vitamin C Spark Shake',
        summary: 'A bright, zingy shake with a ginger kick.',
        steps: ['Blend everything well.', 'Drink fresh.']
      },
      es: {
        title: 'Batido Vitamina C',
        summary: 'Un batido brillante y picante con un toque de jengibre.',
        steps: ['Mezcla todo muy bien.', 'Bebe recién hecho.']
      },
      fr: {
        title: 'Shake vitamine C',
        summary: 'Un shake éclatant avec une pointe de gingembre.',
        steps: ['Mixez bien le tout.', 'Buvez bien frais.']
      },
      pt: {
        title: 'Shake Vitamina C',
        summary: 'Um shake vibrante com um toque de gengibre.',
        steps: ['Bate bem todos os ingredientes.', 'Bebe fresco.']
      }
    },
    ingredients: {
      base: [
        { qty: '2 chávenas', item: 'acerola' },
        { qty: '1 copo', item: 'leite desnatado' },
        { qty: '2 rodelas', item: 'gengibre' },
        { qty: '½ un.', item: 'cenoura' }
      ],
      en: [
        { qty: '2 cups', item: 'acerola cherries' },
        { qty: '1 glass', item: 'skimmed milk' },
        { qty: '2 slices', item: 'fresh ginger' },
        { qty: '½', item: 'carrot' }
      ],
      es: [
        { qty: '2 tazas', item: 'acerolas' },
        { qty: '1 vaso', item: 'leche desnatada' },
        { qty: '2 rodajas', item: 'jengibre' },
        { qty: '½', item: 'zanahoria' }
      ],
      fr: [
        { qty: '2 tasses', item: 'acérolas' },
        { qty: '1 verre', item: 'lait écrémé' },
        { qty: '2 tranches', item: 'gingembre frais' },
        { qty: '½', item: 'carotte' }
      ]
    }
  }
];