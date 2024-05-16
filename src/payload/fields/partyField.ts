import type { Field } from 'payload/types'
import { useEffect, useState } from 'react'
import deepMerge from '../utilities/deepMerge'
import CustomPartyCell from './CustomPartyCell'
import { Types } from 'mongoose'

type PartyType = (options?: {
  name?: string
  position?: 'sidebar'
  relations?: string[]
  overrides?: Record<string, unknown>
}) => Field

const supportedRelations = [
  {
    singural: 'organisation',
    plural: 'organisations',
  },
  {
    singural: 'partnership',
    plural: 'partnerships',
  },
  {
    singural: 'workspace',
    plural: 'workspaces',
  },
  {
    singural: 'activity',
    plural: 'activities',
  },
  {
    singural: 'person',
    plural: 'persons',
  },
]

const partyField: PartyType = ({ name, position, relations, overrides = {} } = {}) => {
  const partyResult: Field = {
    name: name,
    type: 'group',
    interfaceName: 'Party',
    fields: [
      {
        type: 'row',
        fields: relations.reduce((arr, r) => {
          const name = supportedRelations.find(sr => sr.plural == r).singural
          const relationTo = supportedRelations.find(sr => sr.plural == r).plural

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
          }

          arr.push(foreignKeyField, relationshipField)
          return arr
        }, []),
      },
    ],
    admin: {
      position: position,
      components: {
        Cell: CustomPartyCell,
      },
    },
  }

  return deepMerge(partyResult, overrides)
}

export default partyField
