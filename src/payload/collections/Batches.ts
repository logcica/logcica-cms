import type { CollectionConfig } from 'payload/types'
import sellerPartyField from '../fields/sellerParty'
import customerPartyField from '../fields/customerParty'
import brokerPartyField from '../fields/broker'
import { canManage } from './canRead';
import operatorPartyField from '../fields/operatorParty'
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
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['operator']}),
  },
  fields: [
    {
      name: 'number',
      type: 'text',
    },
    partyField({ name: 'operator', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
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
