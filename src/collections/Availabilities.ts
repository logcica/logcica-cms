import type { CollectionConfig } from 'payload'
import CustomImageCell from '../fields/CustomImageCell'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

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
    {
      type: 'relationship',
      name: 'season',
      label: getLabelTranslations('season'),
      relationTo: 'season_availabilities',
    },
    {
      type: 'relationship',
      name: 'week',
      label: getLabelTranslations('week'),
      relationTo: 'week_availabilities',
    },
  ],
}

export default Availabilities
