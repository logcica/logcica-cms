import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'
import partyField from '../fields/partyField'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const References: CollectionConfig = {
  slug: 'references',
  labels: getCollectionLabelsTranslations('references'),
  admin: {
    useAsTitle: 'number',
    group: 'Référencement',
    hidden: cannotConfigure,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: getLabelTranslations('number'),
        },
        nameField,
      ],
    },
    ...logcicaRelationshipField({
      name: 'system',
      relationTo: 'information_systems',
    }),
    {
      name: 'tags',
      type: 'text',
      label: getLabelTranslations('tags'),
      hasMany: true,
    },
    {
      name: 'target',
      type: 'text',
      label: getLabelTranslations('target'),
    },
    ...partyField({
      name: 'holder',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'persons'],
    }),
    {
      name: 'targetType',
      type: 'text',
      label: getLabelTranslations('targetType'),
    },
    {
      name: 'targetCollection',
      type: 'text',
      label: getLabelTranslations('targetCollection'),
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

export default References
