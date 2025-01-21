import React from 'react'
import Column0 from './Column0'
import Column1 from './Column1'
function Creator(props) {
    const {data} = props
    // data is an object that has fields:
  return (
    <div>
      <div className='profile-main-grid'>
      <Column0 data={data}/>
      <Column1 data={data}/>
      <div className=''></div>
      </div>
    </div>
  )
}

export default Creator
