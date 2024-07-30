import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { canManageOrContribute } from './canRead'
import descriptionField from '../fields/descriptionField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

type MyImage = {
  url: string
}

const Profiles: CollectionConfig = {
  slug: 'profiles',
  labels: getCollectionLabelsTranslations('profiles'),
  admin: {
    useAsTitle: 'title',
    group: 'Connexions',
    listSearchableFields: ['key', 'name', 'link'],
    defaultColumns: ['title', 'key', 'name', 'type', 'link', 'description'],
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'area', tenancyInAnyProperty: ['subject'] }),
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
    },
    {
      name: 'localKey',
      type: 'text',
      label: getLabelTranslations('localKey'),
    },
    {
      name: 'title',
      type: 'text',
      label: getLabelTranslations('title'),
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData['title']
          },
        ],
        afterRead: [
          ({ data }) => {
            const title = [data.key, data.name, data.link, data.id].filter(n => n)[0]
            return title.replace(/(.{40})..+/, '$1…')
          },
        ],
      },
    },
    nameField,
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
    },
    {
      name: 'link',
      type: 'text',
      label: getLabelTranslations('link'),
      admin: {
        components: {
          Cell: CustomLinkCell,
        },
      },
    },
    {
      name: 'informationSystem',
      type: 'relationship',
      label: getLabelTranslations('informationSystem'),
      relationTo: 'information_systems',
    },
    {
      name: 'subject', // required
      type: 'group', // required
      label: getLabelTranslations('subject'),
      interfaceName: 'Party', // optional
      fields: [
        {
          name: 'organisation',
          type: 'relationship',
          label: getLabelTranslations('organisation'),
          relationTo: 'organisations',
          hasMany: false,
        },
        {
          name: 'partnership',
          type: 'relationship',
          label: getLabelTranslations('partnership'),
          relationTo: 'partnerships',
          hasMany: false,
        },
      ],
    },
    {
      name: 'area',
      type: 'relationship',
      label: getLabelTranslations('area'),
      relationTo: 'places',
      hasMany: false,
      filterOptions: () => {
        return {
          type: {
            exists: true,
          },
        }
      },
    },
    descriptionField({}),
  ],
}

export default Profiles
