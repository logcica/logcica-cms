import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'

type QuantityType = (options?: {
  name?: string
  overrides?: Record<string, unknown>
}) => Field

const quantityField: QuantityType = ({ name, overrides = {} } = {}) => {
  const linkResult: Field = 
  {
    name: name,
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
  }

  return deepMerge(linkResult, overrides)
}

export default quantityField
