import React from 'react'
import type { Props } from 'payload/components/views/Cell'
//import './index.scss' ?? how to make this work

const baseClass = 'custom-cell'

const CustomLinkCell: React.FC<Props> = props => {
  const { cellData } = props

  return (
    <span className={baseClass}>
      <a href={cellData as string} target="_blank">
        {cellData as string}
      </a>
    </span>
  )
}

export default CustomLinkCell
