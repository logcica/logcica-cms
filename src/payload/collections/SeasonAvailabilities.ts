import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const SeasonAvailabilities: CollectionConfig = {
  slug: 'season_availabilities',
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name','id','key','year'],

  },
  labels: {
    singular: {
      en: 'Seasonal availability',
      fr: 'Disponibilité saisonnière',
    },
    plural: {
      en: 'Seasonal availabilities',
      fr: 'Disponibilités saisonnières',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'year',
      type: 'group',
      fields: [
        {
          name: 'months',
          type: 'select',
          hasMany: true,
          admin: {
            isClearable: true,
          },
          options: [
            {
              label: 'Jan',
              value: 'Jan',
            },
            {
              label: 'Fév',
              value: 'Feb',
            },
            {
              label: 'Mar',
              value: 'Mar',
            },
            {
              label: 'Avr',
              value: 'Apr',
            },
            {
              label: 'Mai',
              value: 'May',
            },
            {
              label: 'Juin',
              value: 'Jun',
            },
            {
              label: 'Juil',
              value: 'Jul',
            },
            {
              label: 'Août',
              value: 'Aug',
            },
            {
              label: 'Sep',
              value: 'Sep',
            },
            {
              label: 'Oct',
              value: 'Oct',
            },
            {
              label: 'Nov',
              value: 'Nov',
            },
            {
              label: 'Déc',
              value: 'Dec',
            },
          ],
        }
      ]
    }
  ],
}

export default SeasonAvailabilities
