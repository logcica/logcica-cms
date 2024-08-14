import { useEffect, useState } from 'react'
import type { CollectionConfig } from 'payload/types'

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
import productCategoriesField from '../fields/productCategoriesField'
import nutrientListField from '../fields/nutrientListField'
import allergenListField from '../fields/allergenListField'
import uploadImagesField from '../fields/imageField'
import nameField from '../fields/nameField'
import useEffectAsync from '../utilities/useEffectAsync'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

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
        ...logcicaRelationshipField({
          name: 'area',
          relationTo: 'places',
          position: 'sidebar',
        }),
      ],
    },
    ...logcicaRelationshipField({
      name: 'categories',
      relationTo: 'categories',
      position: 'sidebar',
      hasMany: true,
      nameSingular: 'category',
      filterOptions: () => {
        return {
          classification: { equals: '668267f39f105cb961f55831' },
        }
      },
    }),
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
        ...logcicaRelationshipField({
          name: 'costCategory',
          relationTo: 'categories',
          filterOptions: () => {
            return {
              classification: { equals: '6682a6309f105cb961f55862' },
            }
          },
        }),
      ],
    },

    {
      type: 'row',
      fields: [
        ...logcicaRelationshipField({
          name: 'difficulty',
          relationTo: 'categories',
          filterOptions: () => {
            return {
              classification: { equals: '66828eed9f105cb961f55844' },
            }
          },
        }),
        ...logcicaRelationshipField({
          name: 'seasonality',
          relationTo: 'categories',
          filterOptions: () => {
            return {
              classification: { equals: '668279309f105cb961f5583c' },
            }
          },
        }),
      ],
    },
    descriptionField({}),
    ...logcicaRelationshipField({
      name: 'profiles',
      nameSingular: 'profile',
      relationTo: 'profiles',
      hasMany: true,
    }),
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
      admin: {
        components: {
          RowLabel: ({ data, index, path }) => {
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
                setLabel([data.quantity?.value, data.name].filter(p => p != null).join(' '))
                return
              }

              const unitName = (await fetchUnit(data.quantity?.unit))?.name

              setLabel(data.name + ' - ' + data.quantity?.value + ' ' + unitName)
            }, [data.title, data.name, data.quantity.value, data.quantity.unit])

            return label
          },
        },
      },
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
      features: ['BoldText', 'OrderedList'],
    }),
    ...uploadImagesField,
    allergenListField,
    nutrientListField,
  ],
}

export default Recipes
