import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import { useEffect, useState } from 'react'
import ownerPartyField from '../fields/ownerPartyField'
import producerPartyField from '../fields/producerPartyField'
import quantityField from '../fields/quantityField'
import { canManageOrContribute } from './canRead'
import descriptionField from '../fields/descriptionField'
import partyField from '../fields/partyField'

const Recipes: CollectionConfig = {
  slug: 'recipes',
  labels: {
    singular: {
      en: 'Recipe',
      fr: 'Recette',
    },
    plural: {
      en: 'Recipes',
      fr: 'Recettes',
    },
  },
  versions: {
    drafts: false,
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name'],
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
        },
        {
          name: 'area',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    descriptionField({ name: 'description' }),
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: () => {
        return {
          classification: { equals: '668267f39f105cb961f55831' },
        };
      },
    },
    ...partyField({
      name: 'author',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'persons'],
    }),
    {
      name: 'ingredientList',
      type: 'array',
      fields: [
        // Représente les champs qui seront présents pour chaque ingrédients
        {
          name: 'name',
          type: 'text',
        },
        quantityField({ name: 'quantity' }),
      ],
    },

    {
      name: 'Informations',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'Yield',
              type: 'text',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'Instructions',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'CookTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm',
        },
      },
    },
    {
      name: 'nutritions',
      type: 'array',
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
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'number',
                    },
                    {
                      name: 'unit',
                      type: 'relationship',
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
    {
      name: 'mainImage', // required
      type: 'upload', // required
      relationTo: 'media', // required
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },

    {
      name: 'images', // required
      type: 'relationship', // required
      hasMany: true,
      relationTo: 'media', // required
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
}

export default Recipes
