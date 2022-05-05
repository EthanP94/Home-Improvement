import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ONEPROJECT } from '../utils/queries'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Project = () => {
    const { loading, data } = useQuery(QUERY_ONEPROJECT);

    const project = data?.projects || [];

    return (
        <main>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Card sx={{ maxWidth: 800 }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                  ID: {project.id}
                  Estimated Work Time: {project.estimatedWorkTime}
                  Price: {project.price}
                  Scope of Work: {project.scopeOfWork}
              </Typography>
            </CardContent>
          </Card>
          )}
        </main>
      );
}  

export default Project;