import React, { Suspense } from 'react'
import {BarLoader } from 'react-spinners';

function Layout({children}) {
  return (
    <div className='px-5'>
  
   <Suspense fallback={<BarLoader    speedMultiplier={2} // 2x faster
   className='mt-4' width={"100%"} color='gray'
    /> }>  {children} </Suspense>
    
    </div>
  )
}

export default Layout