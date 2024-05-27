import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { canManageOrContribute } from './canRead'
import descriptionField from '../fields/descriptionField'

type MyImage = {
  url: string
}

const Profiles: CollectionConfig = {
  slug: 'profiles',
  admin: {
    useAsTitle: 'title',
    group: 'Connexions',
    listSearchableFields: ['key','name','link'],
    defaultColumns: ['title','key','name','type','link','description'],
  },
  access: {
    read: canManageOrContribute({placeInProperty: 'area',tenancyInAnyProperty: ['subject']}) 
  },
  fields: [
    {
      name: 'key',
      type: 'text',
    },
    {
      name: 'localKey',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData['title']
          }
        ],
        afterRead: [
          ({ data }) => {  
            const title = [data.key,data.name,data.link, data.id].filter(n => n)[0]
            return title.replace(/(.{40})..+/, "$1…");
          }
        ],
      },
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        components: {
          Cell: CustomLinkCell,
        },
      },
    },
    {
      name: 'informationSystem',
      type: 'relationship',
      relationTo: 'information_systems'
    },
    {
      name: 'subject', // required
      type: 'group', // required
      interfaceName: 'Party', // optional
      fields: [
        {
          name: 'organisation',
          type: 'relationship',
          relationTo: 'organisations',
          hasMany: false,
        },
        {
          name: 'partnership',
          type: 'relationship',
          relationTo: 'partnerships',
          hasMany: false,
        }
      ],
    },
    {
      name: 'area',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
      filterOptions: () => {
        return {
          type: {
            exists: true
          }
        }
      },
    },
    descriptionField({})
  ],
}

export default Profiles
