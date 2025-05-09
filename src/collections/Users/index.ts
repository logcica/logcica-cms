import type { CollectionConfig, Field } from 'payload'

import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { useState, useEffect } from 'react'
import { cannotConfigure } from '../canRead'

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
        name: 'sector',
        type: 'relationship',
        relationTo: 'sectors',
        hasMany: false,
      },
    ],
  },
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
    label: 'Responsable',
    value: 'maintainer',
  },
  {
    label: 'Contributeur',
    value: 'contributor',
  },
]

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      fr: 'Utilisateur',
    },
    plural: {
      en: 'Users',
      fr: 'Utilisateurs',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
    group: 'Admin',
    hidden: cannotConfigure,
  },
  auth: {
    useAPIKey: true,
  },
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: adminsAndUser,
    admin: ({ req: { user } }: any) => checkRole(['admin', 'contributor'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'tenancyRoles',
      type: 'array',
      /* TODO
      admin: {
        components: {
          RowLabel: ({ data, index, path }): string => {
            const getTypeLabel = (type) => {
              if (!type) return 'Role ' + index
              return roleTypeOptions.find((o) => o.value == type)?.label
            }

            const [label, setLabel] = useState(getTypeLabel(data.type))

            useEffect(() => {
              if (!data?.tenancy) {
                setLabel(getTypeLabel(data.type))
                return
              }

              if (data.tenancy.area) {
                const url = `${process.env.PAYLOAD_PUBLIC_API}/places/${data?.tenancy?.area}`
                fetch(url).then(async (res) => {
                  setLabel(getTypeLabel(data.type) + ' -> ' + (await res.json()).name)
                })
              }

              if (data.tenancy.sector) {
                const url = `${process.env.PAYLOAD_PUBLIC_API}/sectors/${data?.tenancy?.sector}`
                fetch(url).then(async (res) => {
                  setLabel(getTypeLabel(data.type) + ' -> ' + (await res.json()).name)
                })
              }

              if (data.tenancy.organisation) {
                const url = `${process.env.PAYLOAD_PUBLIC_API}/organisations/${data?.tenancy?.organisation}`
                fetch(url).then(async (res) => {
                  setLabel(getTypeLabel(data.type) + ' -> ' + (await res.json()).name)
                })
              }
            }, [data.tenancy.area, data.tenancy.sector, data.tenancy.organisation, data.type])

            return label
          },
        },
      },
      */
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
    },
  ],
  timestamps: true,
}

export default Users
