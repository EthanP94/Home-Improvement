import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import ProjectList from "../components/ProjectList";
import { QUERY_ALLPROJECTS } from "../utils/queries";
import { ADD_PROJECT } from "../utils/mutations";
import Button from '@mui/material/Button';

import Auth from "../utils/auth";

const Project = () => {
  const { loading, data } = useQuery(QUERY_ALLPROJECTS);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const projects = data?.projects || [];


  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  return (
    <main>
      <Button variant="contained">Add Project</Button>
      <ProjectList openModal={handleModalOpen} projects={projects}/>
      {isModalVisible && <Modal close={handleModalClose} />}
    </main>
  );
};

// modal component =======================================================

const Modal = ({ open, close }) => {
  const [formState, setFormState] = useState({
    scopeOfWork: "",
    estimatedWorkTime: "",
    price: "",
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
    <>
      <main>
        Show modal
        <button onClick={close}></button>
      </main>
    </>
  );
};

export default Project;
