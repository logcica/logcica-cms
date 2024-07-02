// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getLabelTranslations(fieldName: string) {
  return {
    en: translations.en.logcica.fields[fieldName] ?? fieldName,
    fr: translations.fr.logcica.fields[fieldName] ?? fieldName,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getCollectionLabelsTranslations(collectionSlug: string) {
  return {
    singular: {
      en: translations.en.logcica.collections[collectionSlug + '_one'] ?? collectionSlug,
      fr: translations.fr.logcica.collections[collectionSlug + '_one'] ?? collectionSlug,
    },
    plural: {
      en: translations.en.logcica.collections[collectionSlug + '_other'] ?? collectionSlug,
      fr: translations.fr.logcica.collections[collectionSlug + '_other'] ?? collectionSlug,
    },
  }
}

// this follows i18next structure
const translations = {
  en: {
    logcica: {
      fields: {
        name: 'Name',
        area: 'Area',
        categories: 'categories',
        ingredientList: 'ingredientList',
        quantity: 'quantity',
        unit: 'unit',
        value: 'value',
        description: 'description',
        short: 'short',
        author: 'author',
        stepStatement: 'stepStatement',
        cookTime: 'cookTime',
        prepTime: 'prepTime',
        totalTime: 'totalTime',
        difficulty: 'difficulty',
        seasonality: 'seasonality',
        yieldStatement: 'yieldStatement',
        costCategory: 'costCategory',
        nutrientList: 'nutrientList',
        mainImage: 'mainImage',
        images: 'images',
        nutrient: 'nutrient',
      },
      collections: {
        recipes_one: 'Recipe',
        recipes_other: 'Recipes',
        persons_one: 'Person',
        persons_other: 'Persons',
        organisations_one: 'Organisation',
        organisations_other: 'Organisations',
        partnerships_one: 'Partnership',
        partnerships_other: 'Partnerships',
      },
    },
  },
  fr: {
    logcica: {
      fields: {
        name: 'Nom',
        area: 'Territoire',
        categories: 'Catégories',
        ingredientList: "Liste d'ingrédients",
        quantity: 'Quantité',
        unit: 'Unité',
        value: 'Valeur',
        description: 'Description',
        short: 'Court',
        author: 'Auteur',
        stepStatement: 'Instruction par étape',
        cookTime: 'Temps de cuisson',
        prepTime: 'Temps de préparation',
        totalTime: 'Temps total',
        difficulty: 'Difficulté',
        seasonality: 'Saisonnalité',
        yieldStatement: 'Rendement',
        costCategory: 'Catégorie de coût',
        nutrientList: 'Liste des éléments nutritifs',
        mainImage: 'Image principale',
        images: 'Images',
        nutrient: 'Nutriment',
      },
      collections: {
        recipes_one: 'Recette',
        recipes_other: 'Recettes',
        persons_one: 'Personne',
        persons_other: 'Personnes',
        organisations_one: 'Organisation',
        organisations_other: 'Organisations',
        partnerships_one: 'Partenariat',
        partnerships_other: 'Partenariats',
      },
    },
  },
}
