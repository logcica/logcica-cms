import { useEffect, useState } from 'react'
import type { CollectionConfig } from 'payload/types'

import descriptionField from '../fields/descriptionField'
import partyField from '../fields/partyField'
import quantityField from '../fields/quantityField'
import durationField from '../fields/durationField'
import { getCollectionLabelsTranslations, getLabelTranslations, getPlaceholderTranslations } from '../utilities/translate'
import { canManageOrContribute } from './canRead'
import productCategoriesField from "../fields/productCategoriesField";

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
    defaultColumns: ['name', 'seasonality', 'difficulty', 'costs'],
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'area', tenancyInAnyProperty: ['author'] }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: getLabelTranslations('name'),
        },
        {
          name: 'area',
          type: 'relationship',
          label: getLabelTranslations('area'),
          relationTo: 'places',
          hasMany: false,
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      label: getLabelTranslations('categories'),
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: () => {
        return {
          classification: { equals: '668267f39f105cb961f55831' },
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
          }
        },
        {
          name: 'costCategory',
          type: 'relationship',
          label: getLabelTranslations('costCategory'),
          relationTo: 'categories',
          hasMany: false,
          filterOptions: () => {
            return {
              classification: { equals: '6682a6309f105cb961f55862' },
            }
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'difficulty',
          type: 'relationship',
          label: getLabelTranslations('difficulty'),
          relationTo: 'categories',
          hasMany: false,
          filterOptions: () => {
            return {
              classification: { equals: '66828eed9f105cb961f55844' },
            }
          },
        },
        {
          name: 'seasonality',
          type: 'relationship',
          label: getLabelTranslations('seasonality'),
          relationTo: 'categories',
          hasMany: false,
          filterOptions: () => {
            return {
              classification: { equals: '668279309f105cb961f5583c' },
            }
          },
        },
      ],
    },
    descriptionField({ name: 'description' }),
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
      fields: [
        // Représente les champs qui seront présents pour chaque ingrédients
        {
          name: 'name',
          type: 'text',
          label: getLabelTranslations('name'),
        },
        quantityField({ name: 'quantity' }),
      ],
    },
    descriptionField({ name: 'stepStatement' }),
    {
      name: 'mainImage', // required
      type: 'upload', // required
      label: getLabelTranslations('mainImage'),
      relationTo: 'media', // required
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },

    {
      name: 'images', // required
      type: 'relationship', // required
      label: getLabelTranslations('images'),
      hasMany: true,
      relationTo: 'media', // required
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'nutrientList',
      type: 'array',
      label: getLabelTranslations('nutrientList'),
      admin: {
        components: {
          RowLabel: ({ data, index, path }) => {
            const [label, setLabel] = useState(`Nutriment ${String(index).padStart(2, '0')}`)

            useEffect(() => {
              const url = `${process.env.PAYLOAD_PUBLIC_API}/codes/${data.nutrient}`
              console.log(url)
              fetch(url).then(async res => {
                setLabel((await res.json()).name)
              })
            }, [data.name])

            return label
          },
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'nutrient',
              type: 'relationship',
              label: getLabelTranslations('nutrient'),
              relationTo: 'codes',
              filterOptions: () => {
                return {
                  list: { equals: '651d94b094bcb52b76132eaa' },
                }
              },
            },
            {
              name: 'quantity',
              type: 'group',
              label: getLabelTranslations('quantity'),
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'number',
                      label: getLabelTranslations('value'),
                    },
                    {
                      name: 'unit',
                      type: 'relationship',
                      label: getLabelTranslations('unit'),
                      relationTo: 'units',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Recipes
