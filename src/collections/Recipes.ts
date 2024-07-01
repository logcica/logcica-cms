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

    descriptionField({ name: 'stepStatement' }),

    {
      type: 'row',
      fields: [

        {
          name: "cookTime",
          type: "number",
          admin: {
            placeholder: "Entrez la durée en minute (ex: 30)",
            step: 5,
          },
          min: 5,
          max: 720,
        },

        {
          name: "prepTime",
          type: "number",
          admin: {
            placeholder: "Entrez la durée en minute (ex: 30)",
            step: 5,
          },
          min: 5,
          max: 720,
        },
        {
          name: "totalTime",
          type: "number",
          admin: {
            placeholder: "Entrez la durée en minute (ex: 30)",
            step: 5,
          },
          min: 5,
          max: 720,
        }

      ],
    },

    {
      type: 'row',
      fields: [

        {
          name: 'seasonality',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: false,
          filterOptions: () => {
            return {
              classification: { equals: '668279309f105cb961f5583c' },
            };
          },
        },

        {
          name: 'difficulty',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: false,
          filterOptions: () => {
            return {
              classification: { equals: '66828eed9f105cb961f55844' },
            };
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [

        {
          type: 'row',
          fields: [
            {
              name: 'yieldStatement',
              type: 'text',
            },
          ],
        },

        {
          name: 'costCategory',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: false,
          filterOptions: () => {
            return {
              classification: { equals: '6682a6309f105cb961f55862' },
            };
          },
        },

      ],
    },

    {
      name: 'nutrientList',
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
