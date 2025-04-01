import React from 'react'

const CoverLetter = async({params}) =>  {

    const id = await params.id
  return ( <div>{id}</div>
  )
}

export default CoverLetter