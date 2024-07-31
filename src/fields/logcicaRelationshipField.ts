import type { Field } from 'payload/types'
import deepMerge from '../utilities/deepMerge'
import { Types } from 'mongoose'
import { getLabelTranslations } from '../utilities/translate'

type LogcicaRelationshipType = (options?: {
  name?: string
  relationTo?: string
  position?: 'sidebar'
  overrides?: Record<string, unknown>
}) => Field[]

export function newForeignKeyField(name: string): Field {
  const foreignKeyField: Field = {
    name: name + 'Id',
    type: 'richText',
    hooks: {
      beforeChange: [
        ({ siblingData }) => {
          if (!siblingData[name]) return siblingData[name]
          return new Types.ObjectId(siblingData[name])
        },
      ],
    },
    admin: {
      hidden: true,
    },
  }

  return foreignKeyField
}

const logcicaRelationshipField: LogcicaRelationshipType = ({
  name,
  relationTo,
  position,
  overrides = {},
} = {}) => {
  const foreignKeyField = newForeignKeyField(name)

  const relationshipField: Field = {
    name: name,
    type: 'relationship',
    label: getLabelTranslations(name),
    relationTo: relationTo,
    admin: {
      position: position,
    },
  }

  return [deepMerge(foreignKeyField, overrides), deepMerge(relationshipField, overrides)]
}

export default logcicaRelationshipField
