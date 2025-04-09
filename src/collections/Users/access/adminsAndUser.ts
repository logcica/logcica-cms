import type { Access } from 'payload'

import { checkRole } from '../checkRole'
import { User } from '@/payload-types'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user as User)) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}

export default adminsAndUser
