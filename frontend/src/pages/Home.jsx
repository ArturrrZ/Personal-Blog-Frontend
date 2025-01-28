import React, {useState, useEffect} from 'react';
import { Avatar, Typography, Card, CardContent, Box } from '@mui/material';
import api from '../api'
import {useNavigate} from 'react-router-dom';

// const profiles = [
//   { id: 1, name: 'John Doe', image: 'https://via.placeholder.com/150', description: 'Software Engineer' },
//   { id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/150', description: 'UI/UX Designer' },
//   { id: 3, name: 'Alice Johnson', image: 'https://via.placeholder.com/150', description: 'Product Manager' },
// ];

function ProfileList() {
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000/';
  const [subscriptions, setSubscription] = useState([]);
  useEffect(()=>{
      api.get("/api/subscriptions/")
      .then(res=>{
        console.log(res.data)
        setSubscription(res.data);
        // setLoading
      })
      .catch(err=>console.log(err))
  }, [])
  function handleProfileClick(username){navigate(`/user/${username}/`)}
  return (
    <div>
    <h2 className='home_h3'>Your Subscriptions:</h2>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 3,
        padding: 3,
      }}
    >
      {subscriptions.map((sub) => (
        <Card
          key={sub.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            textAlign: 'center',
            background: 'linear-gradient(135deg,rgb(101, 203, 246) 0%,rgb(151, 133, 253) 100%)',
            borderRadius: 3,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <Avatar
            src={`${baseURL}${sub.creator.profile_picture}`}
            alt={sub.creator.username}
            onClick={()=>{handleProfileClick(sub.creator.username)}}
            sx={{
              width: 80,
              height: 80,
              marginBottom: 2,
              border: '2px solid white',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              '&:hover': {
  cursor: 'pointer',}
            }}
          />
          <CardContent>
          <Typography 
          onClick={()=>{handleProfileClick(sub.creator.username)}}
          variant="h6" sx={{ fontWeight: 'bold', color: '#fff', '&:hover': {
          cursor: 'pointer',} }}>
              @{sub.creator.username}
            </Typography>
            <Typography 
            onClick={()=>{handleProfileClick(sub.creator.username)}}
            variant="h6" sx={{ fontWeight: 'bold', color: '#fff', '&:hover': {
            cursor: 'pointer',} }}>
              {sub.creator.first_name} {sub.creator.last_name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box></div>
  );
}

export default ProfileList;