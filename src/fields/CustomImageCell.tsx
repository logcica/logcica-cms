import React from 'react'
import type { Props } from 'payload/components/views/Cell'
//import './index.scss' ?? how to make this work

const baseClass = 'custom-cell'

type MyImage = {
  url: string
}

const CustomImageCell: React.FC<Props> = props => {
  const { cellData } = props

  return (
    <span className={baseClass}>
      <img src={(cellData as MyImage).url} style={{ height: 50, width: 50 }}></img>
    </span>
  )
}

export default CustomImageCell
