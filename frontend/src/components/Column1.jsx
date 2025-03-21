import React from 'react'
import "../styles/profile.css"
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Post from './Post';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"
import MediaPost from './MediaPost';

function Column1(props) {
    const navigate = useNavigate();
    const {data} = props
    const [value, setValue] = React.useState('1');
     const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='column1'>
      <div className='column1_top_part'>
      <div className='about_creator'>ABOUT THE CREATOR</div>
      <p>{data.profile.first_name} {data.profile.last_name}</p>
      <p>Total posts: {data.profile.posts_total}</p>
      <p>Private content: {data.profile.posts_paid}</p>
      <Divider sx={{margin: "20px 0px"}}/>
      <div>{data.profile.about}</div>
      </div>
      {data.my_page&&<Button onClick={()=>{navigate("/post/create")}} sx={{width:"100%", borderRadius:"10px", marginTop:"20px"}} variant="contained">Create a post</Button>
      }
      <Box sx={{ width: '100%', typography: 'body1', marginTop:"20px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' , backgroundColor: 'white', borderRadius: '15px 15px 0px 0px'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Feed" value="1" />
            <Tab label="Media" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{padding: "0px 0px"}}>{data.profile.posts.map((item)=>{return <Post key={item.id} data={item} myPage={data.my_page}/>})}</TabPanel>
        <TabPanel value="2" sx={{padding: "0px 0px"}}>Media:
        <div className='media'>{data.profile.posts.map((post)=>{return <MediaPost key={post.id} data={post}/>})}</div>
        </TabPanel>
      </TabContext>
      </Box>
      
    </div>
  )
}

export default Column1
