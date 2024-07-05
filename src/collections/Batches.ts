import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead';
import partyField from '../fields/partyField'

const Batches: CollectionConfig = {
  slug: 'batches',
  labels: {
    singular: {
      en: 'Batch',
      fr: 'Lot',
    },
    plural: {
      en: 'Batches',
      fr: 'Lots',
    },
  },
  admin: {
    useAsTitle: 'number',
    group: 'Gestion',
    defaultColumns: ['number','id','operator','workspace'],

  },
  access: {
    read: canManage({tenancyInAnyProperty: ['operator']}),
  },
  fields: [
    {
      name: 'number',
      type: 'text',
    },
    ...partyField({ name: 'operator', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      name: 'workspace',
      type: 'relationship',
      relationTo: 'workspaces'
    },
    {
      name: 'session',
      type: 'relationship',
      relationTo: 'sessions'
    },
  ],
}

export default Batches
