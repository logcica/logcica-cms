import { useEffect, useState } from 'react'
import type { Field } from 'payload'

import { getLabelTranslations } from '../utilities/translate'

const allergenListField: Field = {
  name: 'allergenList',
  type: 'array',
  label: getLabelTranslations('allergenList'),

  admin: {
    components: {
      RowLabel: 'src/fields/AllergenRowLabel',
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'containmentLevel',
          label: getLabelTranslations('containmentLevel'),
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
          label: getLabelTranslations('allergen'),
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
}

export default allergenListField
