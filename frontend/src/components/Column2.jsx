import React from 'react'
import { Button } from '@mui/material'


function Column2() {
  return (
    <div className='column2'>
        <h3>Subscription:</h3>
        <p>Price: 1$</p>
        <Button sx={{marginTop:'50px'}} variant='contained' color="success">Subscribe</Button>
    </div>
  )
}

export default Column2
