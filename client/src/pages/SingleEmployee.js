import React from "react";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ONEEMPLOYEE } from '../utils/queries'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Employee = () => {
  const { employeeId } = useParams();  

  const { loading, data } = useQuery(QUERY_ONEEMPLOYEE, {
    variables: { employeeId: employeeId },
  });
  console.log(data)
  const employee = data?.project || {};
  console.log(employee);

  if (loading) {
    return <div>Loading...</div>;
  }
    return (
        <main>
          <Card sx={{ maxWidth: 800 }} className='project-card'>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                  Name: {employee.firstName} {employee.lastName}
                  <br></br>
                  Expertise: {employee.expertise}
                  <br></br>
                  Email: {employee.email}
                  <br></br>
                  Phone Number: {employee.phoneNumber}
              </Typography>
            </CardContent>
          </Card>
        </main>
      );
}  

export default Employee;