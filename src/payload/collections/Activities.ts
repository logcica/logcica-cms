import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import payload from 'payload'
import descriptionField from '../fields/descriptionField'

const Activities: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: {
      en: 'Activity',
      fr: 'Activité',
    },
    plural: {
      en: 'Activities',
      fr: 'Activités',
    },
  },
  admin: {
    useAsTitle: 'title',
    group: 'Structure',
    listSearchableFields: ['name', 'title']
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },
  fields: [
    {
      type: 'row',
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
        }
      ]
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          async ({ data }) => {


            const getOrg = async () => {
              const org = await payload.find({
                collection: 'organisations',
                where: {
                  id: {
                    equals: data.manager?.organisation,
                  },
                },
              })
            
              return org.docs[0]
            }
            
            const orgName = (await getOrg())?.name

            return [orgName, data.name].filter(n => n).join(' > ')
          },
        ],
        afterRead: [
          ({ data }) => {
            return data.title ?? [data.manager?.organisation, data.name].filter(n => n).join(' ')
          },
        ],
      },
    },
    {
      name: 'manager', // required
      type: 'group', // required
      interfaceName: 'Party', // optional
      admin: {
        position: 'sidebar'
      },
      fields: [
        {
          type: 'row',
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
            },
            {
              name: 'activity',
              type: 'relationship',
              relationTo: 'activities',
              hasMany: false,
            }
          ]
        },
      ],
    },
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
    },
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'productionCategories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
        },
        {
          name: 'otherCategories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
        },
      ]
    },
    descriptionField({})
  ],
}

export default Activities
