import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead';
import nameField from "../fields/nameField";

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
    nameField,
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
