import { User } from 'payload/auth'
import { Access } from 'payload/config'

const hasRolesAndIsAdmin = user => {
  if (!user?.tenancyRoles) return false

  const roleTypes = user.tenancyRoles.map(r => r.type)

  if (roleTypes.includes('admin')) return true
}

export const cannotConfigure = (args: { user: User }): boolean => {
  const isAdmin = hasRolesAndIsAdmin(args?.user)
  if (typeof isAdmin == 'boolean') return !isAdmin
  return true
}

export const canManage =
  ({
    tenancyInAnyProperty = [],
    placeInProperty = 'place',
  }: {
    tenancyInAnyProperty?: string[]
    placeInProperty?: string
  }): Access =>
  args => {
    const user = args?.req?.user
    const firstCheck = hasRolesAndIsAdmin(user)

    if (typeof firstCheck == 'boolean') return firstCheck

    const roles = user.tenancyRoles

    const areaManaged = roles
    .filter(r => ['contributor', 'maintainer'].includes(r.type) && r.tenancy?.area?.id)
    .map(r => r.tenancy.area.id)

    const directAreaOrs = areaManaged.map(a => {
      const f = {}
      f[placeInProperty + '.id'] = {
        equals: a,
      }
      return f
    })

    const areaOrs = areaManaged.map(a => {
      const f = {}
      f[placeInProperty + '.within.id'] = {
        equals: a,
      }
      return f
    })

    const organisationsManaged = roles
      .filter(r => r.type == 'manager' && r.tenancy?.organisation?.id)
      .map(r => r.tenancy.organisation.id)

    const tenancyOrs = tenancyInAnyProperty.map(p => {
      const f = {}
      f[p + '.' + 'organisation'] = {
        in: organisationsManaged,
      }
      return f
    })

    tenancyOrs.push({
      id: {
        in: organisationsManaged, // TODO might be a bit touchy, could give unwanted access
      },
    })

    const ors = directAreaOrs.concat(areaOrs.concat(tenancyOrs))
    console.log(ors)

    return {
      or: ors
    }
  }
