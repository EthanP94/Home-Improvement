import React from "react";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ONEPROJECT } from '../utils/queries'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Project = () => {
  const { projectId } = useParams();  

  const { loading, data } = useQuery(QUERY_ONEPROJECT, {
    variables: { projectId: projectId },
  });
  console.log(data)
  const project = data?.project || {};
  console.log(project);

  if (loading) {
    return <div>Loading...</div>;
  }
    return (
        <main>
          <Card sx={{ maxWidth: 800 }} className='project-card'>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                  ID: {project.id}
                  <br></br>
                  Estimated Work Time: {project.estimatedWorkTime}
                  <br></br>
                  Price: ${project.price}
                  <br></br>
                  Scope of Work: {project.scopeOfWork}
              </Typography>
            </CardContent>
          </Card>
        </main>
      );
}  

export default Project;