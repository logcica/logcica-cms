import type { CollectionConfig } from 'payload/types'
import { canManage, canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import subjectField from '../fields/subjectField'
import descriptionField from '../fields/descriptionField'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Contributions: CollectionConfig = {
  slug: 'contributions',
  labels: getCollectionLabelsTranslations('contributions'),
  admin: {
    useAsTitle: 'id',
    group: 'Connexions',
    defaultColumns: ['id','roles','contributor','subject'],
    listSearchableFields: [
      'id',
      'contributor.organisation.name',
      'contributor.partnership.name',
      'contributor.activity.name',
      'contributor.person.givenName',
      'contributor.person.familyName',
      'subject.organisation.name',
      'subject.partnership.name',
      'subject.activity.name',
      'subject.counter.name'
    ],
  },
  access: {
    read: canManageOrContribute({
      placeInProperty: 'area',
      tenancyInAnyProperty: ['contributor', 'subject'],
    }),
  },
  fields: [
    {
      name: 'roles',
      type: 'text',
      label: getLabelTranslations('roles'),
      hasMany: true,
    },
    ...partyField({
      name: 'contributor',
      relations: ['organisations', 'partnerships', 'activities', 'persons'],
    }),
    subjectField({relations: ['organisations', 'partnerships', 'activities', 'counters', 'products']}),
    {
      name: 'area',
      type: 'relationship',
      label: getLabelTranslations('area'),
      relationTo: 'places',
      hasMany: false,
    },
    descriptionField({}),
  ],
}

export default Contributions
