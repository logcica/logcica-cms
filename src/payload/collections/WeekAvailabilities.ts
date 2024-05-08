import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const WeekAvailabilities: CollectionConfig = {
  slug: 'week_availabilities',
  labels: {
    singular: {
      en: 'Weekly availability',
      fr: 'Disponibilité hebdo.',
    },
    plural: {
      en: 'Weekly availabilities',
      fr: 'Disponibilités hebdo.',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gestion'
  },
  access: {
    read: () => true,
  },
  
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'days',
          type: 'select',
          hasMany: true,
          admin: {
            isClearable: true,
          },
          options: [
            {
              label: 'Lu',
              value: 'Mo',
            },
            {
              label: 'Ma',
              value: 'Tu',
            },
            {
              label: 'Me',
              value: 'We',
            },
            {
              label: 'Je',
              value: 'Th',
            },
            {
              label: 'Ve',
              value: 'Fr',
            },
            {
              label: 'Sa',
              value: 'Sa',
            },
            {
              label: 'Di',
              value: 'Su',
            },
          ],
        },
      ]
    },
    {
      name: 'timeRange',
      type: 'group',
      admin: {
        hideGutter: true
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'from',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                },
              },
            },
            {
              name: 'to',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                },
              },
            },
          ]
        }
      ]
    }
  ],
}

export default WeekAvailabilities
