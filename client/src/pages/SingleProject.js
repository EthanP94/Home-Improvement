import React from "react";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ONEPROJECT } from "../utils/queries";
import { QUERY_ONECLIENT } from "../utils/queries";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { letterSpacing } from "@mui/system";

const Project = () => {
  const { projectId } = useParams();  

  const { loading, data: projectData } = useQuery(QUERY_ONEPROJECT, {
    variables: { projectId: projectId },
  });

  const project = projectData?.project || {};

  const allempIds = [];

  if (project.assignedEmployees) {
    for (let i = 0; i < project.assignedEmployees.length; i++) {
      allempIds.push(project.assignedEmployees[i].id)
    }
  }

  let clientId = "";

  if (project.client) {
      clientId = project.client[0]  
  }

  const {data: clientData } = useQuery(QUERY_ONECLIENT, {
    variables: { clientId: clientId },
  })

  const client = clientData?.client || {};

  if (loading) {
    <div>Loading...</div>
  }

    return (
        <main>
          <Card sx={{ maxWidth: 850 }} className='project-card'>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" style={{ wordWrap: "break-word" }}>
                  ID: {project.id}
                  <br></br>
                  Estimated Work Time: {project.estimatedWorkTime}
                  <br></br>
                  Price: ${project.price}
                  <br></br>
                  Scope of Work: {project.scopeOfWork}
                  <br></br>
                  {
                    allempIds.length > 0 ? (
                      `
                      Assigned Employees: ${allempIds.join()}
                      `
                    ) : (
                      <></>
                    )
                  }
                  {
                    clientId ? (
                      `
                      Client: ${client.firstName} ${client.lastName}
                      `
                    ) : (
                      <></>
                    )
                  }
              </Typography>
            </CardContent>
          </Card>
        </main>
      );
}  

export default Project;