import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import QuantityCell from './QuantityCell'

type QuantityType = (options?: {
  name?: string
  overrides?: Record<string, unknown>
}) => Field

const quantityField: QuantityType = ({ name, overrides = {} } = {}) => {
  const linkResult: Field = 
  {
    name: name,
    type: 'group',
    interfaceName: 'Quantity',
    admin: {
      components: {
        Cell: QuantityCell
      },
    },
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
