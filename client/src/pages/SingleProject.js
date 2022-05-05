import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ONEPROJECT } from '../utils/queries'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const singleProject = () => {
    const { loading, data } = useQuery(QUERY_ONEPROJECT);

    const project = data?.projects || [];

    return (
        <main>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
          )}
        </main>
      );
}  

export default singleProject;