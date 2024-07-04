import { SlugField, TelephoneField } from '@nouance/payload-better-fields-plugin'
import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead';
import partyField from '../fields/partyField';
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: getCollectionLabelsTranslations('contacts'),
  admin: {
    useAsTitle: 'title',
    group: 'Connexions',
    listSearchableFields: ['name', 'givenName', 'familyName','mainPhoneNumber','mainEmail'],
    defaultColumns: ['title','id','type','givenName','holder'],
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
      label: getLabelTranslations('type'),
      options: [
        // required
        {
          value: 'person',
          label: getLabelTranslations('person'),
        },
        {
          value: 'organisation',
          label: getLabelTranslations('organisation'),
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
          label: getLabelTranslations('givenName'),
        },
        {
          name: 'familyName',
          type: 'text',
          label: getLabelTranslations('familyName'),
        },
      ],
      admin: {
        condition: (data, siblingData, { user }) => data.type == "person",
      },
    },
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
      admin: {
        condition: (data, siblingData, { user }) => data.type == "organisation",
      },
    },
    {
      name: 'title',
      type: 'text',
      label: getLabelTranslations('title'),
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
            const list = [data.mainPhoneNumber,data.mainEmail]
            if(list.every(n => !n)) return data.name ?? data.id
            return list.filter(n => n).join(" | ")
          }
        ],
      },
    },
    ...TelephoneField({
      name: 'mainPhoneNumber',
      label: getLabelTranslations('mainPhoneNumber'),
      admin: {
        placeholder: '099 99 99 99',
      },
    },{
      international: false,
      defaultCountry: 'BE'
    }),
    {
      name: 'mainEmail',
      type: 'email',
      label: getLabelTranslations('mainEmail'),
    },
    ...partyField({ name: 'holder', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      name: 'area',
      type: 'relationship',
      label: getLabelTranslations('area'),
      relationTo: 'places',
      hasMany: false,
    },
    //categoriesField
  ],
}

export default Contacts
