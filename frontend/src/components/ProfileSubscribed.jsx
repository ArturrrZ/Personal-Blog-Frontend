import React from 'react'
import "../styles/profile.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Column1 from './Column1';
import Column0 from './Column0';

function ProfileSubscribed(props) {
    const {data} = props
    console.log(data)
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

export default ProfileSubscribed
