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
        categories: 'Categories',
        ingredientList: 'Ingredients',
        quantity: 'Quantity',
        unit: 'Unit',
        value: 'Value',
        description: 'Description',
        short: 'Short',
        author: 'Author',
        stepStatement: 'Steps',
        cookTime: 'Cook time',
        prepTime: 'Preparation time',
        totalTime: 'Total time',
        difficulty: 'Difficulty',
        seasonality: 'Seasonality',
        yieldStatement: 'Yield',
        costCategory: 'Cost',
        nutrientList: 'Nutrients',
        mainImage: 'Main image',
        images: 'Images',
        nutrient: 'Nutrient',
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
        ingredientList: "Ingrédients",
        quantity: 'Quantité',
        unit: 'Unité',
        value: 'Valeur',
        description: 'Description',
        short: 'Court',
        author: 'Auteur',
        stepStatement: 'Instructions',
        cookTime: 'Temps de cuisson',
        prepTime: 'Temps de préparation',
        totalTime: 'Temps total',
        difficulty: 'Difficulté',
        seasonality: 'Saisonnalité',
        yieldStatement: 'Rendement',
        costCategory: 'Coût',
        nutrientList: 'Valeurs nutritionnelles',
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
