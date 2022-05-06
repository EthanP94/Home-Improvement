import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../../images/project-cards.jpg'
import { Link } from 'react-router-dom';

const BasicCard = ({
    id = 0, openModal, clients
}) => {
    return (
        clients.map(client => (
            <div>
                <Link to={`/client/${client.id}`}  style={{ textDecoration: 'none' }}>
                    <Card sx={{ maxWidth: 500}} className='project-card'>
                        <CardContent>
                        <CardMedia
                        component="img"
                        image= {image}
                        alt="home remodeling tools"
                        />
                        <Typography variant="h5" component="div" style={{ marginTop: '20px' }}>
                            Name: {client.firstName} {client.lastName}
                            <br></br>
                            Expertise: {client.expertise}
                        </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        ))
    );
}

export default BasicCard