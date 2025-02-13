import React from 'react'
import { Button } from '@mui/material'
import api from '../api'

function Column2(props) {
  const {data} = props
  function handleClick(){
    api.post("/api/subscribe_stripe/", {
      username: data.profile.username
    })
    .then(res=>{
      console.log(res.data)
      window.open(res.data.checkout_url, "_blank");
    })
    .catch(err=>{console.log(err)})
  }
  return (
    <div className='column2'>
        <h3>Subscription:</h3>
        <p>Price: {data.profile.price}$</p>
        <Button sx={{marginTop:'50px'}} variant='contained' color="success" onClick={handleClick}>Subscribe</Button>
    </div>
  )
}

export default Column2
