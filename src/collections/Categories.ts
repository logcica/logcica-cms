import type { CollectionConfig } from 'payload/types'
import { anyone } from '../access/anyone'
import { cannotConfigure } from './canRead'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: getCollectionLabelsTranslations('categories'),
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    hidden: cannotConfigure
  },
  access: {
    read: () => true,
    update: anyone
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
      admin: {
        position: 'sidebar',
        disableBulkEdit: true
      }
    },
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
      admin: {
        disableBulkEdit: true
      }
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
    }
  ],
}

export default Categories
