import path from 'path'
import type { CollectionConfig } from 'payload/types'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

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
    {
      type: 'row',
      fields: [
        {
          name: 'profiles',
          type: 'relationship',
          label: getLabelTranslations('profiles'),
          relationTo: 'profiles',
          hasMany: true,
        },
        {
          name: 'authorProfiles',
          type: 'relationship',
          label: getLabelTranslations('authorProfiles'),
          relationTo: 'profiles',
          hasMany: true,
        },
      ],
    },
  ],
}
