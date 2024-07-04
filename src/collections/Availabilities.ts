import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Availabilities: CollectionConfig = {
  slug: 'availabilities',
  labels: getCollectionLabelsTranslations('availabilities'),
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "place"],
    group: 'Gestion'
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
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
    },
    {
      name: 'season',
      type: 'relationship',
      label: getLabelTranslations('season'),
      relationTo: 'season_availabilities',
      hasMany: false,
    },
    {
      name: 'week',
      type: 'relationship',
      label: getLabelTranslations('week'),
      relationTo: 'week_availabilities',
      hasMany: false,
    }
  ],
}

export default Availabilities
