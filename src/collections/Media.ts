import path from 'path'
import type { CollectionConfig } from 'payload/types'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'
import partyField from '../fields/partyField'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: getCollectionLabelsTranslations('media'),
  admin: {
    group: 'Gestion',
    defaultColumns: ['name', 'id', 'alt', 'updatedAt', 'createdAt'],
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: getLabelTranslations('alt'),
    },
    ...logcicaRelationshipField({
      name: 'source',
      relationTo: 'knowledge_element',
    }),
    ...partyField({ name: 'author', relations: ['persons', 'profiles', 'organisations'] }),
    {
      name: 'license',
      type: 'relationship',
      label: getLabelTranslations('license'),
      relationTo: 'codes',
      hasMany: false,
      filterOptions: () => {
        return {
          list: { equals: '66bf056a197a3ff36f0e1a88' },
        }
      },
    },
  ],
}
