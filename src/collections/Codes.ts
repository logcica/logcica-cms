import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Codes: CollectionConfig = {
  slug: 'codes',
  labels: getCollectionLabelsTranslations('codes'),
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    hidden: cannotConfigure,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: getLabelTranslations('id'),
    },
    nameField,
    {
      name: 'code',
      type: 'text',
      label: getLabelTranslations('code'),
    },
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
    },
    {
      name: 'rank',
      type: 'number',
      label: getLabelTranslations('rank'),
    },
    {
      name: 'skip',
      type: 'checkbox',
      label: getLabelTranslations('skip'),
    },
    ...logcicaRelationshipField({
      name: 'list',
      relationTo: 'code_lists',
    }),
  ],
}

export default Codes
