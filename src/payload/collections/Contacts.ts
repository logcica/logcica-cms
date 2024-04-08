import { SlugField, TelephoneField } from '@nouance/payload-better-fields-plugin'
import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead';

const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'mainPhoneNumber',
    group: 'Connexions'
  },
  access: {
    read: canManageOrContribute({placeInProperty: 'area', tenancyInAnyProperty: ['holder']}),
  },
  hooks: {
    beforeValidate: [
      (args) => {
        const data = args.data
        if(data.type == 'person')
          data.name = undefined //[data.givenName, data.familyName].join(' ').trim()
        if(data.type == 'organisation'){
          data.givenName = undefined
          data.familyName = undefined
        }
        console.log(JSON.stringify(data))
        return data
      }
    ]
  },
  fields: [
    {
      name: 'type', // required
      type: 'radio', // required
      options: [
        // required
        {
          label: 'Personne',
          value: 'person',
        },
        {
          label: 'Organisation',
          value: 'organisation',
        },
      ],
      defaultValue: 'person', // The first value in options.
      admin: {
        layout: 'horizontal',
        readOnly: true
      },
      hooks: {
        beforeChange: [({ siblingData, value }) => {
          if(value == 'person')
            delete siblingData.name;
          
          if(value == 'organisation'){
            delete siblingData.givenName;
            delete siblingData.familyName;
          }
        }],
      }
    },
    {
      type: 'row',
      fields: [
        {
          
          name: 'givenName',
          type: 'text',
        },
        {
          name: 'familyName',
          type: 'text',
        },
      ],
      admin: {
        condition: (data, siblingData, { user }) => data.type == "person",
      },
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        condition: (data, siblingData, { user }) => data.type == "organisation",
      },
    },
    ...TelephoneField({
      name: 'mainPhoneNumber',
      admin: {
        placeholder: '099 99 99 99',
      },
    },{
      international: false,
      defaultCountry: 'BE'
    }),
    ...SlugField(
      {
        name: 'slug',
        admin: {
          position: 'sidebar',
        },
      },
      {
        useFields: ['name','givenName','familyName'],
      },
      {
        enable: false
      },
    ),
    {
      name: 'holder', // required
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
    },
    //categoriesField
  ],
}

export default Contacts
