import { useEffect, useState } from 'react'
import type { Field } from 'payload/types'

import { getLabelTranslations } from '../utilities/translate'

const nutrientListField: Field = {
  name: 'nutrientList',
  type: 'array',
  label: getLabelTranslations('nutrientList'),
  admin: {
    components: {
      RowLabel: ({ data, index, path }) => {
        const [label, setLabel] = useState(`Nutriment ${String(index).padStart(2, '0')}`)

        useEffect(() => {
          const url = `${process.env.PAYLOAD_PUBLIC_API}/codes/${data.nutrient}`
          /*console.log(url)*/
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
}

export default nutrientListField
