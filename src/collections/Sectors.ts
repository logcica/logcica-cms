import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead';
import nameField from "../fields/nameField";
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Sectors: CollectionConfig = {
  slug: 'sectors',
  labels: getCollectionLabelsTranslations('sectors'),
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
      label: getLabelTranslations('place'),
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
