import styled from '@emotion/styled';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import supabase from '../config/supabase';
import { useNavigate } from 'react-router-dom';

export const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  flexDirection: 'column',
});

export const StyledFormControl = styled(FormControl)({
  backgroundColor: '#2d2d2d',
  margin: '20px 10px',
  borderRadius: 5,
  minWidth: 500,
  maxWidth: 900,
});
export const StyledTextField = styled(TextField)({
  margin: '30px 20px',
});

export const StyledButton = styled(Button)({
  margin: '20px 40%',
  background: '#3cb371',
});

const Create = () => {
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [cgpa, setCgpa] = useState(2);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comments || cgpa === 0) {
      setFormError('All fields are required');
      return;
    }
    setFormError(null);

    const { data, error } = await supabase
      .from('Student')
      .insert({ name, comments, cgpa });

    if (error) {
      console.error(error);
      setFormError('Error inserting data');
    }
    if (!data) {
      console.log(data, 'data');
      setFormError(null);
      navigate('/');
    }
  };
  return (
    <StyledBox component='form'>
      <StyledFormControl>
        <StyledTextField
          color='secondary'
          id='name'
          label='Name'
          variant='outlined'
          value={name}
          InputLabelProps={{
            sx: {
              color: {
                color: '#a0a0a0',
              },
            },
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledTextField
          color='secondary'
          id='comments'
          label='Comments'
          variant='outlined'
          value={comments}
          multiline={true}
          rows={3}
          InputLabelProps={{
            sx: {
              color: {
                color: '#a0a0a0',
              },
            },
          }}
          onChange={(e) => setComments(e.target.value)}
        />
        <Rating
          name='simple-controlled'
          value={cgpa}
          onChange={(e) => {
            setCgpa(parseInt(e.target.value));
          }}
          sx={{ color: '#3cd371', margin: '10px 30px' }}
        />
        {formError && (
          <Typography
            color='error'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {formError}
          </Typography>
        )}
        <StyledButton variant='contained' onClick={handleSubmit}>
          Submit
        </StyledButton>
      </StyledFormControl>
    </StyledBox>
  );
};

export default Create;
