import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { canManage, canManageOrContribute } from './canRead'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

const Actions: CollectionConfig = {
  slug: 'actions',
  labels: getCollectionLabelsTranslations('actions'),
  admin: {
    useAsTitle: 'key',
    group: 'Connexions',
    defaultColumns: ['key', 'id', 'name', 'type'],
  },
  access: {
    read: canManageOrContribute({ tenancyInAnyProperty: ['subject'], placeInProperty: 'area' }),
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
    },
    nameField,
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
    },
    {
      name: 'link',
      type: 'text',
      label: getLabelTranslations('link'),
      admin: {
        components: {
          Cell: CustomLinkCell,
        },
      },
    },
    {
      name: 'subject', // required
      type: 'group', // required
      label: getLabelTranslations('subject'),
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
        {
          name: 'counter',
          type: 'relationship',
          label: getLabelTranslations('counter'),
          relationTo: 'counters',
          hasMany: false,
        },
      ],
    },
    {
      name: 'area',
      type: 'relationship',
      label: getLabelTranslations('area'),
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default Actions
