import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const WeekAvailabilities: CollectionConfig = {
  slug: 'week_availabilities',
  admin: {
    useAsTitle: 'name'
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
    }
  ],
}

export default WeekAvailabilities
