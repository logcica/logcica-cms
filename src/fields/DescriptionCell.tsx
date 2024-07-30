import React from 'react'
import type { Props } from 'payload/components/views/Cell'
import { Description } from '../payload-types'
//import './index.scss' ?? how to make this work

const baseClass = 'custom-cell'

const DescriptionCell: React.FC<Props> = props => {
  const { cellData } = props

  return <span className={baseClass}>{(cellData as Description)?.short?.markdown as string}</span>
}

export default DescriptionCell
