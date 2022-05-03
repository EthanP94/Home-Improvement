import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList'
import { QUERY_ALLPROJECTS } from '../utils/queries';
import { ADD_PROJECT } from '../utils/mutations';

import Auth from '../utils/auth';

const Projects = () => {
    const { loading, data } = useQuery(QUERY_ALLPROJECTS);
    const projects = data?.projects || [];

    return (
        <main>
            <ProjectList />
        </main>
    );
};

const addProject = () => {
    
    const [formState, setFormState] = useState({
        scopeOfWork: '',
        estimatedWorkTime: '',
        price: '',
      });
    
    const [addProject, { error, data }] = useMutation(ADD_PROJECT);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);

      try {
        const { data } = await addProject({
          variables: { ...formState },
        });

        Auth.login(data.addProject.token);
      } catch (e) {
        console.error(e);
      }
    };

    return (
        <main>

        </main>
    );
};

export default addProject;
