import React from "react";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ONECLIENT } from '../utils/queries'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Client = () => {
    const { clientId } = useParams();

    const { loading, data } = useQuery(QUERY_ONECLIENT, {
        variables: { clientId: clientId},
    });

    console.log(data)
    const client =  data?.client || {};
    console.log(client)

    if (loading) {
        return <div>Loading...</div>
    }
        return (
            <main>
                <Card sx={{ maxWidth: 800}} className='project-card'>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Name: {client.firstName} {client.lastName}
                            <br></br>
                            Home Address: {client.homeAddress}
                            <br></br>
                            Email: {client.email}
                            <br></br>
                            Phone Number: {client.phoneNumber}
                        </Typography>
                    </CardContent>
                </Card>
            </main>
        );
};

export default Client;