import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Studentcard from '../components/Studentcard';
import supabase from '../config/supabase';
import Loader from '../components/Loader';

const Home = () => {
  const [students, setStudents] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [ isFetching, setIsFetching] = useState(false)


  const deleteStudent = (id) => {
    setStudents((prevStudents) => {
      return prevStudents.filter((student) => student.id !== id);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      const { data, error } = await supabase.from('Student').select().order('id',{ ascending:false});

      if (error) {
        setFetchError('Something went wrong');
        setStudents(null);
        console.log(error);
      }
      if (data) {
        setStudents(data);
        setFetchError(null);
        console.log(data);
      }
      setIsFetching(false)
    };
    fetchData();
  }, []);

  if (isFetching){
      return <Loader/>
  }

  return (
    <Grid container spacing={2}>
      {students &&
        students.map((student) => {
          return (
            <Grid item lg={4} xl={4} md={4} sm={6} xs={12} key={student.id}>
              <Studentcard student={student} deleteStudent={deleteStudent} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Home;
