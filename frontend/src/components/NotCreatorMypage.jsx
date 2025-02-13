import React from 'react'
import {useNavigate} from "react-router-dom"
import { Button } from '@mui/material';

function NotCreatorMypage() {
  const navigate = useNavigate();
  const handelClick = ()=>{
    navigate("/creator/subscription_plan/")
  }
  return (
    <div className='not_creator'>
      <h3>You are not a creator</h3>
      <p>⬇️ If you want to become a creator, click the button below ⬇️</p>
      <Button variant='contained' onClick={handelClick}>
        Become the creator
      </Button>
    </div>
  )
}

export default NotCreatorMypage
