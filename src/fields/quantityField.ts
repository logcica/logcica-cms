import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import QuantityCell from './QuantityCell'
import { getLabelTranslations } from '../utilities/translate'

type QuantityType = (options?: { name?: string; overrides?: Record<string, unknown> }) => Field

const quantityField: QuantityType = ({ name, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: name,
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Quantity',
    admin: {
      components: {
        Cell: QuantityCell,
      },
    },
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
  }

  return deepMerge(linkResult, overrides)
}

export default quantityField
