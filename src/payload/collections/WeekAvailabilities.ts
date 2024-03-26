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
    }
  ],
}

export default WeekAvailabilities
