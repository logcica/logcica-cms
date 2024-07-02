export function getLabelTranslations(fieldName: string){
    return {
        en: translations.en.logcica.fields[fieldName] ?? fieldName,
        fr: translations.fr.logcica.fields[fieldName] ?? fieldName
    }
}

export function getCollectionLabelsTranslations(collectionSlug: string){
    return {
        singular: {
            en: translations.en.logcica.collections[collectionSlug+"_one"] ?? collectionSlug,
            fr: translations.fr.logcica.collections[collectionSlug+"_one"] ?? collectionSlug,
        },
        plural: {

            en: translations.en.logcica.collections[collectionSlug+"_other"] ?? collectionSlug,
            fr: translations.fr.logcica.collections[collectionSlug+"_other"] ?? collectionSlug,
        }
    }
}

// this follows i18next structure
const translations = {
    en: {
        logcica: {
            fields: {
                name: "Name",
                area: "Area"
            },
            collections: {
                recipes_one: "Recipe",
                recipes_other: "Recipes"
            }
        }
    },
    fr: {
        logcica: {
            fields: {
                name: "Nom",
                area: "Territoire"
            },
            collections: {
                recipes_one: "Recette",
                recipes_other: "Recettes"
            }
        }
    },
}