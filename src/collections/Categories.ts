import type { CollectionConfig } from 'payload/types'
import { anyone } from '../access/anyone'
import { cannotConfigure } from './canRead'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import { Classification, InformationSystem } from 'payload/generated-types'

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
    update: anyone,
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
      name: 'classification',
      type: 'relationship',
      label: getLabelTranslations('classification'),
      relationTo: 'classifications',
      hasMany: false,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        disableBulkEdit: true,
      },
      hooks: {
        afterRead: [
          async ({ data, req }) => {
            if (!data.classification) return data.name

            const classification: Classification = await req.payload.findByID({
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
