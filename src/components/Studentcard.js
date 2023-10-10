import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import styled from '@emotion/styled';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import supabase from '../config/supabase';

const StyleCard = styled(Card)({
  minWidth: 150,
  background: '#2d2d2d',
  borderRadius: 5,
  '&:hover': {
    boxShadow: '0px 1px 5px 0px #6dcc93',
    elevation: 20,
  },
});
const Studentcard = ({ student, deleteStudent }) => {
  const handleDelete = async (id) => {
    const {data,error} = await supabase.from('Student').delete().eq('id',id)

    if (error) {
      console.log(error)
    }
    if (!data) {
      deleteStudent(id)
    }
  };

  return (
    <StyleCard raised={true} elevation={1}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant='h5' color='#3cb371'>
            {student.name}
          </Typography>

          <Typography variant='body2'>{student.comments}</Typography>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Rating
              name='read-only'
              value={student.cgpa}
              readOnly
              sx={{ color: '#3cb371' }}
            />
            <Stack direction='row'>
              <Link to={`/${student.id}`}>
                <IconButton aria-label='Edit' color='secondary'>
                  <Edit />
                </IconButton>
              </Link>
              <IconButton
                aria-label='delete'
                color='secondary'
                onClick={() => handleDelete(student.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </StyleCard>
  );
};

export default Studentcard;
