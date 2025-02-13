import React from 'react'
import "../styles/profile.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Column1 from './Column1';
import Column0 from './Column0';
import api from '../api';


function ProfileSubscribed(props) {
    const {data} = props
    console.log(data)
    function handleCancel(){
      if (window.confirm("Do you really want to cancel subscription?"))
      {
        api.post("/api/subscription/cancel/", {
          creator_username: data.profile.username
        })
        .then(res=>{
          console.log("Unsubscribed")
          setTimeout(()=>{location.reload()}, 3000)
        })
        .catch(err=>{console.log(err)})
      }
    }
    // data is an object that has fields:
  return (
    <div>
      <div className='profile-main-grid'>
      <Column0 data={data}/>
      <Column1 data={data}/>
      <div className=''>
        <Button variant='outlined' color='error' onClick={handleCancel}>Cancel subscription</Button>
      </div>
      </div>
    </div>
  )
}

export default ProfileSubscribed
