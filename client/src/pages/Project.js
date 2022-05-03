import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PROJECT } from '../utils/mutations';
import { removeProjectId } from '../utils/localStorage';

import Auth from '../utils/auth';

const Projects = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteProject = async (projectId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeProject({
        variables: { projectId },
      });

      // upon success, remove Project's id from localStorage
      removeProjectId(projectId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {clientData.username}'s Projects!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {clientData.savedBooks?.length
            ? `Viewing ${clientData.savedBooks.length} saved ${
                clientData.savedBooks.length === 1 ? 'project' : 'projects'
              }:`
            : 'You have no saved projects!'}
        </h2>
        <CardColumns>
          {clientData.savedProjects?.map((project) => {
            return (
              <Card key={project.projectId} border="dark">
                {project.image ? (
                  <Card.Img
                    src={project.image}
                    alt={`${project.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Employees: {project.employees}</p>
                  <Card.Text>{project.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteProject(project.projectId)}
                  >
                    Delete this Project!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};


export default Project;
