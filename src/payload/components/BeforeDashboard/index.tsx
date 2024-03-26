import React from 'react'
import { Banner } from 'payload/components'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenu sur le CMS de logCiCa!</h4>
      </Banner>
    </div>
  )
}

export default BeforeDashboard
