import type { CollectionConfig } from 'payload/types'

const Partnerships: CollectionConfig = {
  slug: 'partnerships',
  labels: {
    singular: {
      en: 'Partnership',
      fr: 'Partenariat',
    },
    plural: {
      en: 'Partnerships',
      fr: 'Partenariats',
    },
  },
  admin: {
    useAsTitle: 'name',
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
    
  ],
}

export default Partnerships
