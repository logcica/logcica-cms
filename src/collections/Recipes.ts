import { useEffect, useState } from 'react'
import type { CollectionConfig } from 'payload/types'

import descriptionField from '../fields/descriptionField'
import stepsField from '../fields/stepsField'
import partyField from '../fields/partyField'
import quantityField from '../fields/quantityField'
import durationField from '../fields/durationField'
import { getCollectionLabelsTranslations, getLabelTranslations, getPlaceholderTranslations } from '../utilities/translate'
import { canManageOrContribute } from './canRead'
import productCategoriesField from "../fields/productCategoriesField";
import nutrientListField from "../fields/nutrientListField";
import allergenListField from "../fields/allergenListField";
import uploadImagesField from "../fields/imageField";
import nameField from "../fields/nameField";

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
        nameField,
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
        {
          type: 'row',
          fields: [
            nameField,
            quantityField({ name: 'quantity' }),
          ]
        }
      ],
    },
    stepsField({name: 'stepStatement'}),
    ...uploadImagesField,
    allergenListField,
    nutrientListField,
  ],
}

export default Recipes
