import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const BasicCard = ({
    _id = 0, openModal, projects
}) => {
    return (
        projects.map(project => (
            <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <CardMedia
                component="img"
                height="140"
                image="/static/images/project-cards.jpg"
                alt="home remodeling tools"
                />
                <Typography variant="h5" component="div">
                    {project._id}
                </Typography>
                </CardContent>
            </Card>
        </div>
        ))
    );
}

export default BasicCard