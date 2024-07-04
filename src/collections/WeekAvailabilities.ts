import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const WeekAvailabilities: CollectionConfig = {
  slug: 'week_availabilities',
  labels: getCollectionLabelsTranslations('week_availabilities'),
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name','id','key','days'],
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
          label: getLabelTranslations('name'),
        },
        {
          name: 'days',
          type: 'select',
          label: getLabelTranslations('days'),
          hasMany: true,
          admin: {
            isClearable: true,
          },
          options: [
            {
              label: getLabelTranslations('Mo'),
              value: 'Mo',
            },
            {
              label: getLabelTranslations('Tu'),
              value: 'Tu',
            },
            {
              label: getLabelTranslations('We'),
              value: 'We',
            },
            {
              label: getLabelTranslations('Th'),
              value: 'Th',
            },
            {
              label: getLabelTranslations('Fr'),
              value: 'Fr',
            },
            {
              label: getLabelTranslations('Sa'),
              value: 'Sa',
            },
            {
              label: getLabelTranslations('Su'),
              value: 'Su',
            },
          ],
        },
      ]
    },
    {
      name: 'timeRange',
      type: 'group',
      label: getLabelTranslations('timeRange'),
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
              label: getLabelTranslations('from'),
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
              label: getLabelTranslations('to'),
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
