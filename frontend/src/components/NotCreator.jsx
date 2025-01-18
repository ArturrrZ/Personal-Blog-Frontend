import React from 'react'

function NotCreator(props) {
    const {username} = props
  return (
    <div className='not_creator'>
      {username} is not a creator
    </div>
  )
}

export default NotCreator
