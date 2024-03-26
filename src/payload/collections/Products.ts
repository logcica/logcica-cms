import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesFields'
import { useEffect, useState } from 'react'
import ownerPartyField from '../fields/ownerPartyField'
import producerPartyField from '../fields/producerPartyField'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
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
              fetch(url).then(async (res) => {
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
            },
            {
              name: 'allergen',
              type: 'relationship',
              relationTo: 'codes',
            },
          ]
        }
      ]
    }
  ],
}

export default Products
