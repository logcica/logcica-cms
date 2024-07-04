import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const SeasonAvailabilities: CollectionConfig = {
  slug: 'season_availabilities',
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name','id','key','year'],

  },
  labels: getCollectionLabelsTranslations('season_availabilities'),
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
      name: 'year',
      type: 'group',
      label: getLabelTranslations('year'),
      fields: [
        {
          name: 'months',
          type: 'select',
          label: getLabelTranslations('months'),
          hasMany: true,
          admin: {
            isClearable: true,
          },
          options: [
            {
              label: getLabelTranslations('Jan'),
              value: 'Jan',
            },
            {
              label: getLabelTranslations('Feb'),
              value: 'Feb',
            },
            {
              label: getLabelTranslations('Mar'),
              value: 'Mar',
            },
            {
              label: getLabelTranslations('Apr'),
              value: 'Apr',
            },
            {
              label: getLabelTranslations('May'),
              value: 'May',
            },
            {
              label: getLabelTranslations('Jun'),
              value: 'Jun',
            },
            {
              label: getLabelTranslations('Jul'),
              value: 'Jul',
            },
            {
              label: getLabelTranslations('Aug'),
              value: 'Aug',
            },
            {
              label: getLabelTranslations('Sep'),
              value: 'Sep',
            },
            {
              label: getLabelTranslations('Oct'),
              value: 'Oct',
            },
            {
              label: getLabelTranslations('Nov'),
              value: 'Nov',
            },
            {
              label: getLabelTranslations('Dec'),
              value: 'Dec',
            },
          ],
        }
      ]
    }
  ],
}

export default SeasonAvailabilities
