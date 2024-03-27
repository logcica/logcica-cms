import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesFields'
import { useEffect, useState } from 'react'
import ownerPartyField from '../fields/ownerPartyField'
import producerPartyField from '../fields/producerPartyField'
import quantityField from '../fields/quantityField'

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      en: 'Product',
      fr: 'Produit',
    },
    plural: {
      en: 'Products',
      fr: 'Produits',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    ownerPartyField,
    producerPartyField,
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
    {
        name: 'dimensions',
        type: 'group',
        fields: [
          {
            type: 'collapsible',
            label: (data) => [data.data?.length?.value, data?.data?.width?.value, data?.data?.height?.value].filter(d => d).join(" x "),
            fields: [
              quantityField({name: 'length'}),
              quantityField({name: 'width'}),
              quantityField({name: 'height'}),
              quantityField({name: 'volume'}),
            ]
          }
        ]
    },
    categoriesField,
    {
      name: 'allergenList',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index, path }) => {
            const [label, setLabel] = useState(`Allergène ${String(index).padStart(2, '0')}`)

            useEffect(() => {
              const url = `${process.env.PAYLOAD_PUBLIC_API}/codes/${data.allergen}`
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
              name: 'containmentLevel',
              type: 'relationship',
              relationTo: 'codes',
              filterOptions: () => {
                return {
                  list: { equals: '64e61fda2b00ce4a7ee277ff' },
                }
              },
            },
            {
              name: 'allergen',
              type: 'relationship',
              relationTo: 'codes',
              filterOptions: () => {
                return {
                  list: { equals: '64e61fda2b00ce4a7ee277fe' },
                }
              },
            },
          ],
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
                  list: { equals: '6526666e9d5853a8e8048efe' },
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
                      type: 'number'
                    },
                    {
                      name: 'unit',
                      type: 'relationship',
                      relationTo: 'units',
                    }
                  ]
                }
              ]
            },
          ],
        },
      ],
    },
  ],
}

export default Products
