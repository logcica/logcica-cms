import type { Field } from 'payload'

import deepMerge from '../utilities/deepMerge'
import { getLabelTranslations } from '../utilities/translate'

type QuantityType = (options?: { name?: string; overrides?: Record<string, unknown> }) => Field

const quantityField: QuantityType = ({ name, overrides = {} } = {}) => {
  if (!name) throw new Error('name is empty')
  const linkResult: Field = {
    name: name,
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Quantity',
    admin: {
      components: {
        Cell: 'src/fields/QuantityCell',
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
