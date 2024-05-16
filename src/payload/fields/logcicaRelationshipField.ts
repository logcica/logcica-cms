import type { Field } from 'payload/types'
import deepMerge from '../utilities/deepMerge'
import { Types } from 'mongoose'


type LogcicaRelationshipType = (options?: {
  name?: string
  relationTo?: string
  position?: 'sidebar'
  overrides?: Record<string, unknown>
}) => Field[]

const logcicaRelationshipField: LogcicaRelationshipType = ({
  name,
  relationTo,
  position,
  overrides = {},
} = {}) => {

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

  const relationshipField: Field = {
    name: name,
    type: 'relationship',
    relationTo: relationTo,
    admin: {
      position: position
    }
  }

  return [deepMerge(foreignKeyField, overrides),deepMerge(relationshipField, overrides)]
}

export default logcicaRelationshipField
