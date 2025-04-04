import type { CollectionSlug, Field } from 'payload'
import { useEffect, useState } from 'react'
import deepMerge from '../utilities/deepMerge'
import CustomPartyCell from './CustomPartyCell'
import { getLabelTranslations } from '../utilities/translate'

type SubjectType = (options?: {
  name?: string
  relations?: string[]
  overrides?: Record<string, unknown>
}) => Field

type SupportedRelations = {
  singural: string
  plural: string
}

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
  if (!name) throw new Error('name is empty')
  if (!relations) throw new Error('relations is empty')

  const partyResult: Field = {
    name: name,
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Subject',
    fields: [
      {
        type: 'row',
        fields: relations.map((r) => {
          const f: Field = {
            name: supportedRelations.find((sr) => sr.plural == r)?.singural as CollectionSlug,
            type: 'relationship',
            label: getLabelTranslations(r),
            relationTo: supportedRelations.find((sr) => sr.plural == r)?.plural as CollectionSlug,
          }
          return f
        }),
      },
    ],
    admin: {
      components: {
        Cell: 'src/fields/CustomPartyCell',
      },
    },
  }

  return deepMerge(partyResult, overrides)
}

export default subjectField
