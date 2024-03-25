import type { CollectionConfig } from 'payload/types'
import { ownerPartyField, producerPartyField } from '../fields/CustomFields'
import categoriesField from '../fields/CategoriesFields'

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
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'containmentLevelKey',
              type: 'text',
            },
            {
              name: 'allergenKey',
              type: 'text',
            }
          ]
        }
      ]
    }
  ],
}

export default Products
