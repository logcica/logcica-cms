import { useEffect, useState } from 'react'
import type { Field } from 'payload/types'

import { getLabelTranslations } from '../utilities/translate'

const allergenListField: Field = {
  name: 'allergenList',
  type: 'array',
  label: getLabelTranslations('allergenList'),
  admin: {
    components: {
      RowLabel: ({ data, index, path }) => {
        const [label, setLabel] = useState(`Allergène ${String(index).padStart(2, '0')}`)

        console.log(data)
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
