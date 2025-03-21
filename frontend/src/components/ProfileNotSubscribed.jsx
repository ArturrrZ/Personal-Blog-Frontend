import React from 'react'
import Column0 from './Column0';
import Column1 from './Column1';
import Column2 from './Column2';


function ProfileNotSubscribed(props) {
  const {data} = props;
  // console.log(data);
  return (
    <div>
      <div className='profile-main-grid'>
      <Column0 data={data}/>
      <Column1 data={data}/>
      <Column2 data={data}/>
      </div>
    </div>
  )
}

export default ProfileNotSubscribed
