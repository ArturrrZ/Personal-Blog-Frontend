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
import updateRefreshToken from '../apiUpdateRefresh';
import EditPost from './EditPost';

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

  // Fetch post data on component load
  useEffect(() => {
    api.get(`/api/post/get/${id}/`)
      .then((res) => {
        setFormData({
          title: res.data.title,
          body: res.data.body,
          is_paid: res.data.is_paid,
          currentImage: res.data.image,
          files: [],
        });
      })
      .catch((err) => {
        const statusCode = err.response?.status;
        if (statusCode === 404) {
          navigate("/404/");
        } else {
          console.error(err);
          alert("An error occurred while fetching the post.");
          navigate("/404/");
        }
      });
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
      alert("You can only upload one file.");
    } else {
      setFormData((prev) => ({
        ...prev,
        files: selectedFiles,
      }));
    }
  };

  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure?");
    if (confirmation) {
      api.delete(`/api/post/delete/${id}/`)
        .then(() => navigate(`/user/${username}`))
        .catch((err) => console.error(err));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('body', formData.body);
    formDataObj.append('is_paid', formData.is_paid);
    if (formData.files.length > 0) {
      formDataObj.append('image', formData.files[0]);
    }

    try {
      await sendRequest(formDataObj);
    } catch (error) {
      console.error(error);
      setApiError(true);
      setTimeout(() => setApiError(false), 3000);
    }
  };

  const sendRequest = async (formDataObj) => {
    try {
      await api.put(`/api/post/edit/${id}/`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handlePostSuccess();
    } catch (error) {
      if (error.response?.status === 401) {
        const updated = await updateRefreshToken();
        if (updated) {
          try {
            await api.put(`/api/post/edit/${id}/`, formDataObj, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            handlePostSuccess();
          } catch (err) {
            console.error(err);
            setApiError(true);
            setTimeout(() => setApiError(false), 3000); // Re-added this part here
          }
        } else {
          navigate('/login');
        }
      } else {
        console.error(error);
        setApiError(true);
        setTimeout(() => setApiError(false), 3000); // Re-added this part here
      }
    }

  const handlePostSuccess = () => {
    setPostCreated(true);
    setTimeout(() => {
      setPostCreated(false);
      setFormData({
        title: '',
        body: '',
        is_paid: false,
        files: [],
      });
      navigate(`/user/${username}`);
    }, 1000);
  };

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
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        {formData.currentImage && !formData.files.length && (
          <img src={formData.currentImage} alt="Current" width={200} height={200} />
        )}
        <div>
          {formData.files.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
        </div>
        <div>
          <Checkbox
            name="is_paid"
            checked={formData.is_paid}
            onChange={handleInputChange}
          />
          <span>Paid content</span>
        </div>
        <Button
          color="success"
          variant="contained"
          disabled={postCreated || apiError}
          type="submit"
        >
          {postCreated ? "Editing..." : "Edit Post"}
        </Button>
        {postCreated && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Your post has been successfully edited!
          </Alert>
        )}
        {apiError && <Alert severity="error">An error occurred. Please try again.</Alert>}
        <Button
          onClick={handleDelete}
          color="error"
          disabled={postCreated || apiError}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete Post
        </Button>
      </form>
    </div>
  );
}
}
export default EditPost;
