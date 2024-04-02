import type { CollectionConfig, Field } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { useState, useEffect } from 'react'

const tenancyFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'area',
        type: 'relationship',
        relationTo: 'places',
        hasMany: false,
      },
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
      },
    ],
  },
]

const roleTypeOptions = [
  {
    label: 'Administrateur',
    value: 'admin',
  },
  {
    label: 'Gestionnaire',
    value: 'manager',
  },
  {
    label: 'Responsable territoire',
    value: 'maintainer',
  },
  {
    label: 'Contributeur',
    value: 'contributor',
  },
]

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
    group: 'Admin',
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin', 'contributor'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'tenancyRoles',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index, path }): string => {
            const getTypeLabel = type =>{
              if(!type)
                return 'Role ' + index
              return roleTypeOptions.find(o => o.value == type)?.label
            }

            const [label, setLabel] = useState(getTypeLabel(data.type))

            useEffect(() => {
              if (!data?.tenancy){
                setLabel(getTypeLabel(data.type))
                return
              }

              if (data.tenancy.area) {
                const url = `${process.env.PAYLOAD_PUBLIC_API}/places/${data?.tenancy?.area}`
                fetch(url).then(async res => {
                  setLabel(getTypeLabel(data.type) + ' -> ' + (await res.json()).name)
                })
              }

              if (data.tenancy.organisation) {
                const url = `${process.env.PAYLOAD_PUBLIC_API}/organisations/${data?.tenancy?.organisation}`
                fetch(url).then(async res => {
                  setLabel(getTypeLabel(data.type) + ' -> ' + (await res.json()).name)
                })
              }

            }, [data.tenancy.area, data.tenancy.organisation, data.type])

            return label
          },
        },
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          hasMany: false,
          required: true,
          options: roleTypeOptions,
        },
        {
          name: 'tenancy',
          type: 'group',
          fields: [...tenancyFields],
        },
      ],
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
        {
          label: 'contributor',
          value: 'contributor',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
}

export default Users
