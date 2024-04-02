import { User } from 'payload/auth'
import { Access } from 'payload/config'

const hasRolesAndIsAdmin = user => {
  if (!user?.tenancyRoles) return false

  const roleTypes = user.tenancyRoles.map(r => r.type)

  if (roleTypes.includes('admin')) return true
}

export const hideConfiguration = (args: {user: User}) : boolean => {
  const isAdmin = hasRolesAndIsAdmin(args?.user)
  console.log(isAdmin)
  if (typeof isAdmin == 'boolean') return !isAdmin
  return true
}

export const canRead =
  ({ tenancyInAnyProperty = [] }: { tenancyInAnyProperty?: string[] }): Access =>
  args => {
    const user = args?.req?.user
    const firstCheck = hasRolesAndIsAdmin(user)

    if (typeof firstCheck == 'boolean') return firstCheck

    const roles = user.tenancyRoles

    const organisationsManaged = roles
      .filter(r => r.type == 'manager' && r.tenancy?.organisation?.id)
      .map(r => r.tenancy.organisation.id)

    const ors = tenancyInAnyProperty.map(p => {
      const f = {}
      f[p + '.' + 'organisation'] = {
        in: organisationsManaged,
      }
      return f
    })

    ors.push({
      id: {
        in: organisationsManaged, // TODO might be a bit touchy, could give unwanted access
      },
    })

    console.log(JSON.stringify(ors))

    // If there is a user, return a query constraint
    // that only allows users to perform actions against
    // documents where the owner is equal to their user ID

    if (user) {
      return {
        or: ors,
      }
    }

    return false
  }
