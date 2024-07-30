import type { Field } from 'payload/types'
import { useEffect, useState } from 'react'
import deepMerge from '../utilities/deepMerge'
import CustomPartyCell from './CustomPartyCell'
import { getLabelTranslations } from '../utilities/translate'

type SubjectType = (options?: {
  name?: string
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
  {
    singural: 'counter',
    plural: 'counters',
  },
  {
    singural: 'product',
    plural: 'products',
  },
]

const subjectField: SubjectType = ({ name = 'subject', relations, overrides = {} } = {}) => {
  const partyResult: Field = {
    name: name,
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Subject',
    fields: [
      {
        type: 'row',
        fields: relations.map(r => {
          const f: Field = {
            name: supportedRelations.find(sr => sr.plural == r).singural,
            type: 'relationship',
            label: getLabelTranslations(r),
            relationTo: supportedRelations.find(sr => sr.plural == r).plural,
          }
          return f
        }),
      },
    ],
    admin: {
      components: {
        Cell: CustomPartyCell,
      },
    },
  }

  return deepMerge(partyResult, overrides)
}

export default subjectField
