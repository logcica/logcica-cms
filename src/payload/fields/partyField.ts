import type { Field } from 'payload/types'
import { useEffect, useState } from 'react'
import deepMerge from '../utilities/deepMerge'
import CustomPartyCell from './CustomPartyCell'

type PartyType = (options?: {
  name?: string
  position?: 'sidebar';
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
        fields: relations.map(r => {
          const f: Field = {
            name: supportedRelations.find(sr => sr.plural == r).singural,
            type: 'relationship',
            relationTo: supportedRelations.find(sr => sr.plural == r).plural,
          }
          return f
        }),
      },
    ],
    admin: {
      position: position,
      components: {
        Cell: CustomPartyCell
      },
    },
  }

  return deepMerge(partyResult, overrides)
}

export default partyField
