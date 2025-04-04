import type { CollectionConfig } from 'payload'
import { canManage } from './canRead'
import partyField from '../fields/partyField'
import numberField from '../fields/numberField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

const Batches: CollectionConfig = {
  slug: 'batches',
  labels: getCollectionLabelsTranslations('batches'),
  admin: {
    useAsTitle: 'number',
    group: 'Gestion',
    defaultColumns: ['number', 'id', 'operator', 'workspace'],
  },
  access: {
    read: canManage({ tenancyInAnyProperty: ['operator'] }),
  },
  fields: [
    numberField,
    ...partyField({
      name: 'operator',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    {
      type: 'relationship',
      name: 'workspace',
      label: getLabelTranslations('workspace'),
      relationTo: 'workspaces',
    },
    {
      type: 'relationship',
      name: 'session',
      label: getLabelTranslations('session'),
      relationTo: 'sessions',
    },
  ],
}

export default Batches
