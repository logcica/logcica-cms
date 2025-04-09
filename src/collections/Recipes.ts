import type { CollectionConfig } from 'payload'
import ObjectID from 'bson-objectid'

import descriptionField from '../fields/descriptionField'
import partyField from '../fields/partyField'
import quantityField from '../fields/quantityField'
import durationField from '../fields/durationField'
import {
  getCollectionLabelsTranslations,
  getLabelTranslations,
  getPlaceholderTranslations,
} from '../utilities/translate'
import { canManageOrContribute } from './canRead'
import nutrientListField from '../fields/nutrientListField'
import allergenListField from '../fields/allergenListField'
import uploadImagesField from '../fields/imageField'
import nameField from '../fields/nameField'

const Recipes: CollectionConfig = {
  slug: 'recipes',
  labels: getCollectionLabelsTranslations('recipes'),
  versions: {
    drafts: false,
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name', 'seasonality', 'difficulty', 'costCategory'],
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'area', tenancyInAnyProperty: ['author'] }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        nameField,
        {
          type: 'relationship',
          name: 'area',
          label: getLabelTranslations('area'),
          relationTo: 'places',
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    {
      type: 'relationship',
      name: 'categories',
      label: getLabelTranslations('categories'),
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      filterOptions: () => {
        return {
          classification: { equals: new ObjectID('668267f39f105cb961f55831').toHexString() },
        }
      },
    },
    ...partyField({
      name: 'author',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'persons'],
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'yieldStatement',
          type: 'text',
          label: getLabelTranslations('yieldStatement'),
          admin: {
            placeholder: getPlaceholderTranslations('recipeYieldStatement'),
          },
        },
        {
          type: 'relationship',
          name: 'costCategory',
          label: getLabelTranslations('costCategory'),
          relationTo: 'categories',
          filterOptions: () => {
            return {
              classification: { equals: new ObjectID('6682a6309f105cb961f55862').toHexString() },
            }
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'difficulty',
          label: getLabelTranslations('difficulty'),
          relationTo: 'categories',
          filterOptions: () => {
            return {
              classification: { equals: new ObjectID('66828eed9f105cb961f55844').toHexString() },
            }
          },
        },
        {
          type: 'relationship',
          name: 'seasonality',
          label: getLabelTranslations('seasonality'),
          relationTo: 'categories',
          filterOptions: () => {
            return {
              classification: { equals: new ObjectID('668279309f105cb961f5583c').toHexString() },
            }
          },
        },
      ],
    },

    descriptionField({}),

    {
      type: 'relationship',
      name: 'profiles',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
    },
    {
      type: 'row',
      fields: [
        durationField({ name: 'cookTime' }),
        durationField({ name: 'prepTime' }),
        durationField({ name: 'totalTime' }),
      ],
    },
    {
      name: 'ingredientList',
      type: 'array',
      label: getLabelTranslations('ingredientList'),
      /* TODO
      admin: {
        components: {
          RowLabel: ({ data, index, path }: any) => {
            const [label, setLabel] = useState(`Ingrédient ${String(index).padStart(2, '0')}`)

            async function fetchUnit(id: string) {
              if (id == null) return
              try {
                const response = await fetch(
                  `${process.env.PAYLOAD_PUBLIC_API}/units/${data.quantity.unit}`,
                )
                return await response.json()
              } catch (e) {
                return null
              }
            }

            useEffectAsync(async () => {
              if (data.title) {
                setLabel(data.title)
                return
              }

              if (data.quantity?.unit == null) {
                setLabel([data.quantity?.value, data.name].filter((p) => p != null).join(' '))
                return
              }

              const unitName = (await fetchUnit(data.quantity?.unit))?.name

              setLabel(data.name + ' - ' + data.quantity?.value + ' ' + unitName)
            }, [data.title, data.name, data.quantity.value, data.quantity.unit])

            return label
          },
        },
      },*/

      fields: [
        {
          type: 'row',
          fields: [nameField, quantityField({ name: 'quantity' })],
        },
        {
          name: 'title',
          label: getLabelTranslations('title'),
          type: 'text',
        },
      ],
    },

    descriptionField({
      name: 'stepStatement',
      fields: ['long'],
      features: ['BoldText', 'OrderedList', 'ItalicText', 'InlineToolbarFeature'],
    }),

    ...uploadImagesField,
    allergenListField,
    nutrientListField,
  ],
}

export default Recipes
