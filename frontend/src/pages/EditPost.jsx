import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Checkbox from '@mui/material/Checkbox';
import api from '../api';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import updateAccessToken from '../apiUpdateAccess';

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

function EditPost() {
  const navigate = useNavigate();
    const {id} = useParams();
    const username = sessionStorage.getItem('username')
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        is_paid: false,
        currentImage: '',
        files: [],
      });
    useEffect(function(){
        api.get(`/api/post/get/${id}/`)
        .then(res=>{
            // res.data
            console.log(res.data)
            setFormData({
                title: res.data.title,
                body: res.data.body,
                is_paid: res.data.is_paid,
                currentImage: res.data.image,
                files: [],
            })
        })
        .catch(err=>{
          let status_code = err.status;
          if (status_code === 404) {
            navigate("/404/")
            return
          }
          alert (err)
          navigate("/404/")
            return
        })
    }, [])
  
  const formDataObj = new FormData();
  const [postCreated, setPostCreated] = useState(false);
  const [apiError, setApiError] = useState(false);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 1) {
      alert("You can only upload one file.");
    } else {
      setFormData((prev) => ({
        ...prev,
        files: selectedFiles,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы
    console.log('Form Data:', formData);
     
    formDataObj.append('title', formData.title); 
    formDataObj.append('body', formData.body); 
    formDataObj.append('is_paid', formData.is_paid); 
    // Append the file (ensure that image is not null) 
    if (formData.files.length > 0) {
      formDataObj.append('image', formData.files[0]);
    }    
    api.put(`/api/post/edit/${id}/`, formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(function (response) {
      console.log(response);
      setPostCreated(true);
      setTimeout(()=>{
        setPostCreated(false);
        setFormData({
          title: '',
          body: '',
          is_paid: false,
          files: [],
        });
        navigate(`/user/${username}`) 
    }, 1000)
  })
    .catch(async function (error) {
      if (error.response && error.response.status === 401) {
        const updated = await updateAccessToken();
        if (updated) {
          try {
            const secondTry = await api.put(`/api/post/edit/${id}/`, formDataObj, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            })
            setPostCreated(true);
             setTimeout(()=>{
               setPostCreated(false);
               setFormData({
                 title: '',
                 body: '',
                 is_paid: false,
                 files: [],
               });
               navigate(`/user/${username}`) 
           }, 1000)     
          }
          catch (err) {
          console.log(error);
          }}
        else {
          navigate('/login')
        }
      }

      console.log(error);
      setApiError(true);
      setTimeout(()=>{
        setApiError(false);
      }, 3000)
    });
    }

  const handleDelete = ()=>{
    const confirmation = window.confirm("Are you sure?")
    if (confirmation) {
      api.delete(`/api/post/delete/${id}/`)
      .then(res=>{console.log(res.data)})
      .catch(err=>{console.log(err)})
      .finally(navigate(`/user/${username}`))
    }
     
  }
  return (
    <div>
      <form className="post_create" onSubmit={handleSubmit}>
        <TextField
          name="title"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          name="body"
          id="outlined-multiline-basic"
          label="Body"
          variant="outlined"
          multiline
          rows={4}
          value={formData.body}
          onChange={handleInputChange}
        />
        <Button
          disabled={postCreated || apiError}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        {formData.currentImage&&((!formData.files[0])&&<img src={formData.currentImage} width={200} height={200}/>)}
        <div>{formData.files.map((file, index)=>{return <p key={index}>{file.name}</p>})}</div>
        <div>
          <Checkbox
            name="is_paid"
            checked={formData.is_paid}
            onChange={handleInputChange}
          />
          <span>Paid content</span>
        </div>
        <Button color="success" variant="contained" disabled={postCreated || apiError} type="submit" >
          {postCreated?"Editing...":"Edit Post"}
        </Button>
        {postCreated&&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
         Here is a gentle confirmation that your action was successful.
        </Alert>}
        {apiError&&<Alert severity="error">Bad request. Try one more time! Fill out all title and body.</Alert>}
        <Button onClick={handleDelete} color="error" disabled={postCreated || apiError} variant="outlined" startIcon={<DeleteIcon/>}>Delete Post</Button>  
      </form>
    </div>
  );
}

export default EditPost;
