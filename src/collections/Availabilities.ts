import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Availabilities: CollectionConfig = {
  slug: 'availabilities',
  labels: getCollectionLabelsTranslations('availabilities'),
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'place'],
    group: 'Gestion',
  },
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
    },
    nameField,
    ...logcicaRelationshipField({
      name: 'season',
      relationTo: 'season_availabilities',
    }),
    ...logcicaRelationshipField({
      name: 'week',
      relationTo: 'week_availabilities',
    }),
  ],
}

export default Availabilities
