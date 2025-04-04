import { useEffect, useState } from 'react'
import type { Field } from 'payload'

import { getLabelTranslations } from '../utilities/translate'

const nutrientListField: Field = {
  name: 'nutrientList',
  type: 'array',
  label: getLabelTranslations('nutrientList'),
  admin: {
    components: {
      RowLabel: 'src/fields/NutrientRowLabel',
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
}

export default nutrientListField
