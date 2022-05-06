import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Landscaping from "../../images/work/Landscaping.jpg"
import Carpentry from "../../images/work/Carpentry.jpg"
import Electrical from "../../images/work/Electrical.jpg"
import HVAC from "../../images/work/HVAC.jpg"
import Maintenance from "../../images/work/Maintenance.jpg"
import Masonry  from "../../images/work/Masonry.jpg"
import Plumbing  from "../../images/work/Plumbing.jpeg"
import Roofing  from "../../images/work/Roofing.jpeg"

const BasicCard = ({
    id = 0, openModal, employees
}) => {
    const renderImage = (type) => {
        if (type === "Landscaping") {
            return Landscaping
        } else if (type === "Carpentry") {
            return Carpentry
        } else if (type === "Electrical") {
            return Electrical
        } else if (type === "HVAC") {
            return HVAC
        } else if (type === "Maintenance") {
            return Maintenance
        } else if (type === "Masonry") {
            return Masonry
        } else if (type === "Plumbing") {
            return Plumbing
        } else if (type === "Roofing") {
            return Roofing
        }
    }
    return (
        employees.map(employee => (
            <div>
                <Link to={`/employee/${employee.id}`}  style={{ textDecoration: 'none' }}>
                    <Card sx={{ maxWidth: 500}} className='project-card'>
                        <CardContent>
                        <CardMedia
                        component="img"
                        image= {renderImage (employee.expertise)}
                        alt="home remodeling tools"
                        />
                        <Typography variant="h5" component="div" style={{ marginTop: '20px' }}>
                            Name: {employee.firstName} {employee.lastName}
                            <br></br>
                            Expertise: {employee.expertise}
                        </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        ))
    );
}

export default BasicCard