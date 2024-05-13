import React from 'react'
import type { Props } from 'payload/components/views/Cell'
import { Quantity } from '../payload-types';
//import './index.scss' ?? how to make this work

const baseClass = 'custom-cell'

const QuantityCell: React.FC<Props> = (props) => {
  const { cellData } = props;

  return <span className={baseClass}>{(cellData as Quantity)?.value as number} {(cellData as Quantity)?.unit as string}</span>
}

export default QuantityCell