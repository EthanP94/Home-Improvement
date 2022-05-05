import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../../images/project-cards.jpg'

const BasicCard = ({
    id = 0, openModal, projects
}) => {
    return (
        projects.map(project => (
            <div>
            <Card sx={{ maxWidth: 500 }} className='project-card'>
                <CardContent>
                <CardMedia
                component="img"
                image= {image}
                alt="home remodeling tools"
                />
                <Typography variant="h5" component="div">
                    {project.id} {project.scopeOfWork}
                </Typography>
                </CardContent>
            </Card>
        </div>
        ))
    );
}

export default BasicCard