import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Checkbox from '@mui/material/Checkbox';
import api from '../api';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import updateAccessToken from '../apiUpdateAccess'

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

function EditPost3() {
  const navigate = useNavigate();
  const { id } = useParams();
  const username = sessionStorage.getItem('username');

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    is_paid: false,
    currentImage: '',
    files: [],
  });

  const [postCreated, setPostCreated] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/post/get/${id}/`);
        setFormData({
          title: res.data.title,
          body: res.data.body,
          is_paid: res.data.is_paid,
          currentImage: res.data.image,
          files: [],
        });
      } catch (err) {
        if (err.response?.status === 404) {
          navigate('/404/');
        } else {
          alert(err);
          navigate('/404/');
        }
      }
    };
    fetchPost();
  }, [id, navigate]);

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
      alert('You can only upload one file.');
    } else {
      setFormData((prev) => ({
        ...prev,
        files: selectedFiles,
      }));
    }
  };

  const resetForm = () => {
    setPostCreated(false);
    setFormData({
      title: '',
      body: '',
      is_paid: false,
      files: [],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('body', formData.body);
    formDataObj.append('is_paid', formData.is_paid);
    if (formData.files.length > 0) {
      formDataObj.append('image', formData.files[0]);
    }

    try {
      await sendPostData(formDataObj);
      setPostCreated(true);
      setTimeout(() => {
        resetForm();
        console.log('EDITED')
        navigate(`/user/${username}`);
      }, 1000);
    } catch (error) {
      handleApiError(error, formDataObj);
    }
  };

  const sendPostData = async (formDataObj) => {
    return await api.put(`/api/post/edit/${id}/`, formDataObj, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const handleApiError = async (error, formDataObj) => {
    if (error.response && error.response.status === 401) {
      const updated = await updateAccessToken();
      if (updated) {
        try {
          await sendPostData(formDataObj);
          setPostCreated(true);
          setTimeout(() => {
            resetForm();
            navigate(`/user/${username}`);
          }, 1000);
        } catch (err) {
          console.error(err);
        }
      } else {
        navigate('/login');
      }
    } else {
      console.error(error);
      setApiError(true);
      setTimeout(() => setApiError(false), 3000);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/api/post/delete/${id}/`);
        navigate(`/user/${username}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <form className="post_create" onSubmit={handleSubmit}>
        <TextField name="title" label="Title" variant="outlined" value={formData.title} onChange={handleInputChange} />
        <TextField name="body" label="Body" variant="outlined" multiline rows={4} value={formData.body} onChange={handleInputChange} />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload files
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        {formData.currentImage && !formData.files[0] && <img src={formData.currentImage} width={200} height={200} alt="Current" />}
        {formData.files.map((file, index) => <p key={index}>{file.name}</p>)}
        <div>
          <Checkbox name="is_paid" checked={formData.is_paid} onChange={handleInputChange} />
          <span>Paid content</span>
        </div>
        <Button color="success" variant="contained" disabled={postCreated || apiError} type="submit">
          {postCreated ? 'Editing...' : 'Edit Post'}
        </Button>
        {postCreated && <Alert icon={<CheckIcon />} severity="success">Post successfully edited!</Alert>}
        {apiError && <Alert severity="error">An error occurred. Please try again.</Alert>}
        <Button onClick={handleDelete} color="error" variant="outlined" startIcon={<DeleteIcon />}>Delete Post</Button>
      </form>
    </div>
  );
}

export default EditPost3;
