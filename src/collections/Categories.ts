import type { CollectionConfig } from 'payload'
import { cannotConfigure } from './canRead'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import { InformationSystem } from '@/payload-types'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: getCollectionLabelsTranslations('categories'),
  admin: {
    useAsTitle: 'title',
    group: 'Configuration',
    hidden: cannotConfigure,
    defaultColumns: ['name', 'key', 'classification', 'subject'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
      admin: {
        position: 'sidebar',
        disableBulkEdit: true,
      },
    },
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
      admin: {
        disableBulkEdit: true,
      },
    },
    {
      name: 'subject',
      type: 'text',
      label: getLabelTranslations('subject'),
    },
    {
      type: 'relationship',
      name: 'classification',
      label: getLabelTranslations('classification'),
      relationTo: 'classifications',
    },
    {
      name: 'color',
      type: 'text',
      label: getLabelTranslations('color'),
    },
    {
      name: 'icon',
      type: 'group',
      label: getLabelTranslations('icon'),
      fields: [
        {
          name: 'fa',
          type: 'text',
          label: getLabelTranslations('font_awesome'),
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        disableBulkEdit: true,
      },
      hooks: {
        afterRead: [
          async ({ data, req }: any) => {
            if (!data.classification) return data.name

            const classification = await req.payload.findByID({
              collection: 'classifications',
              id: data.classification,
            })

            if (!classification?.system) return data.name

            return data.name + ' (' + (classification.system as InformationSystem).name + ')'
          },
        ],
      },
    },
  ],
}

export default Categories
