import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead';

const Sectors: CollectionConfig = {
  slug: 'sectors',
  labels: {
    singular: {
      en: 'Sector',
      fr: 'Filière',
    },
    plural: {
      en: 'Sectors',
      fr: 'Filières',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    hidden: cannotConfigure
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
      filterOptions: () => {
        return {
          type: { in: ["region", "country", "province"] },
        }
      },
    },
  ],
}

export default Sectors
