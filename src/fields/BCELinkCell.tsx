import React from 'react'
import type { Props } from 'payload/components/views/Cell'

const baseClass = 'custom-cell'

const BCELinkCell: React.FC<Props> = (props) => {
  const { cellData } = props;

  if(!cellData)
    return <span></span>

  const number = (cellData as string).replace(/\D/g,'')
  const linkBase = "https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer=" 

  return <span className={baseClass}><a 
    href={linkBase + number} 
    target='_blank'>{cellData as string}</a></span>
}

export default BCELinkCell