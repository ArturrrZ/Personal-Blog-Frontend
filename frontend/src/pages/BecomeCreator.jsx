import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/creator.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import api from '../api'


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function BecomeCreator(props) {
    const {setCreator} = props
    const navigate = useNavigate();
    const is_creator = sessionStorage.getItem("is_creator");
    const username = sessionStorage.getItem("username");
    useEffect(() => { 
        if (is_creator === 'true') { 
            navigate(`/user/${username}`); 
        } },
        []);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        instagram: '',
        youtube: '',
        about: '',
        files: [],
        previewUrl: null,
    })
    const formDataObj = new FormData();  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
             ...prevFormData, 
             [name]: value
             })); };
    const handleFileChange = (e) => {
         const files = Array.from(e.target.files);
         const previewUrl = URL.createObjectURL(files[0]);
          setFormData(prevFormData => ({ 
            ...prevFormData, 
            files: files,
            previewUrl: previewUrl,
        })); };
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      console.log(formData); // Log the current state
      formDataObj.append('first_name', formData.first_name)
      formDataObj.append('last_name', formData.last_name)
      formDataObj.append('instagram', formData.instagram)
      formDataObj.append('youtube', formData.youtube)
      formDataObj.append('about', formData.about)
      if (formData.files.length > 0) {
        formDataObj.append('profile_picture', formData.files[0])
      }
      api.put("/api/user/creator/", formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(res=>{
        console.log(res.data)
        setCreator(true)
        navigate(`/user/${username}`)
      })
      .catch(err=>{console.log(err)})
    };
                      
  return (
    <div>
        <form className='creator_change' onSubmit={handleSubmit}>
            <TextField
              name="first_name"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <TextField
              name="last_name"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={formData.last_name}
              onChange={handleInputChange}
            />
            <TextField
              name="instagram"
              id="outlined-basic"
              label="Instagram Full URL"
              variant="outlined"
              value={formData.instagram}
              onChange={handleInputChange}
            />
            <TextField
              name="youtube"
              id="outlined-basic"
              label="Youtube Full URL"
              variant="outlined"
              value={formData.youtube}
              onChange={handleInputChange}
            />
            <TextField
              name="about"
              id="outlined-basic"
              label="About Creator"
              variant="outlined"
              multiline
              minRows={4}
              value={formData.about}
              onChange={handleInputChange}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput type="file" 
                onChange={handleFileChange}    
                />
            </Button>
            {formData.previewUrl && <img src={formData.previewUrl} alt="Preview" height={200} width={200}/>}            <Button type="submit" variant="outlined" >
                Submit
            </Button>
        </form>
    </div>
  )
}

export default BecomeCreator
