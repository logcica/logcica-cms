import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead';
import partyField from '../fields/partyField'
import numberField from "../fields/numberField";

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
    numberField,
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
