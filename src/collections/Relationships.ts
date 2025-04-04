import type { CollectionConfig } from 'payload'
import { canManage } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

const Relationships: CollectionConfig = {
  slug: 'relationships',
  admin: {
    useAsTitle: 'name',
    group: 'Connexions',
    defaultColumns: ['name', 'id', 'type', 'contacts'],
  },
  labels: getCollectionLabelsTranslations('relationships'),
  access: {
    read: canManage({ tenancyInAnyProperty: ['holder'] }),
  },
  fields: [
    nameField,
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
    },
    {
      name: 'contacts',
      type: 'relationship',
      label: getLabelTranslations('contacts'),
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'holder', // required
      type: 'group', // required
      label: getLabelTranslations('holder'),
      interfaceName: 'Party', // optional
      fields: [
        {
          name: 'organisation',
          type: 'relationship',
          label: getLabelTranslations('organisation'),
          relationTo: 'organisations',
          hasMany: false,
        },
        {
          name: 'partnership',
          type: 'relationship',
          label: getLabelTranslations('partnership'),
          relationTo: 'partnerships',
          hasMany: false,
        },
      ],
    },
  ],
}

export default Relationships
