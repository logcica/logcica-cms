import { User } from 'payload'
import { Access } from 'payload'
import Places from './Places'
import { Organisation, Place } from '@/payload-types'

const hasRolesAndIsAdmin = (user: any) => {
  if (!user?.tenancyRoles) return false

  const roleTypes = user.tenancyRoles.map((r: any) => r.type)

  if (roleTypes.includes('admin')) return true
}

export const cannotConfigure = (args: { user: User }): boolean => {
  const isAdmin = hasRolesAndIsAdmin(args?.user)
  if (typeof isAdmin == 'boolean') return !isAdmin
  return true
}

export const canManageOrContribute =
  ({
    tenancyInAnyProperty = [],
    placeInProperty = 'place',
  }: {
    tenancyInAnyProperty?: string[]
    placeInProperty?: string
  }): Access =>
  (args) => {
    const user = args?.req?.user
    if (!user) return false
    const firstCheck = hasRolesAndIsAdmin(user)

    if (typeof firstCheck == 'boolean') return firstCheck

    const roles = user.tenancyRoles
    if (!roles) return false
    let ors = [] as any[]

    const areaManaged = roles
      .filter(
        (r) => ['contributor', 'maintainer'].includes(r.type) && (r.tenancy?.area as Place)?.id,
      )
      .map((r) => (r.tenancy?.area as Place)?.id)

    const placeInPropertyPrefix = placeInProperty == '' ? '' : placeInProperty + '.'

    const directAreaOrs = areaManaged.map((a) => {
      const f: Record<string, any> = {}
      f[placeInPropertyPrefix + 'id'] = {
        equals: a,
      }
      return f
    })

    ors = ors.concat(directAreaOrs)

    const areaOrs = areaManaged.map((a) => {
      const f: Record<string, any> = {}
      f[placeInPropertyPrefix + 'within.id'] = {
        equals: a,
      }
      return f
    })

    ors = ors.concat(areaOrs)

    const organisationsManaged = roles
      .filter((r) => r.type == 'manager' && (r.tenancy?.organisation as Organisation)?.id)
      .map((r) => (r.tenancy?.organisation as Organisation).id)

    if (organisationsManaged.length > 0) {
      const tenancyOrs = tenancyInAnyProperty.map((p) => {
        const f: Record<string, any> = {}
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

      ors = ors.concat(tenancyOrs)
    }

    return {
      or: ors,
    }
  }

// TODO : copy paste
export const canManage =
  ({ tenancyInAnyProperty = [] }: { tenancyInAnyProperty?: string[] }): Access =>
  (args) => {
    const user = args?.req?.user
    if (!user) return false

    const firstCheck = hasRolesAndIsAdmin(user)

    if (typeof firstCheck == 'boolean') return firstCheck

    const roles = user.tenancyRoles
    if (!roles) return false
    let ors = [] as any[]

    const organisationsManaged = roles
      .filter((r) => r.type == 'manager' && (r.tenancy?.organisation as Organisation)?.id)
      .map((r) => (r.tenancy?.organisation as Organisation)?.id)

    if (organisationsManaged.length > 0) {
      const tenancyOrs = tenancyInAnyProperty.map((p) => {
        const f: Record<string, any> = {}
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

      ors = ors.concat(tenancyOrs)
    }

    if (ors.length == 0) return false

    return {
      or: ors,
    }
  }
