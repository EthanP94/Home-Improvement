import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import ProjectList from "../components/ProjectList";
import { QUERY_ALLPROJECTS } from "../utils/queries";
import { ADD_PROJECT } from "../utils/mutations";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// import Auth from "../utils/auth";

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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <Button variant="contained" onClick={handleModalOpen} className="project-btn">
            Add Project
          </Button>
          <ProjectList openModal={handleModalOpen} projects={projects} />
          {isModalVisible && <Modal close={handleModalClose} />}
        </Box>
      )}
    </main>
  );
};

// modal component =======================================================

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Modal = ({ open, close }) => {
  const [formState, setFormState] = useState({
    estimatedWorkTime: "",
    price: "",
    scopeOfWork: "",
  });

  const [addProject, { error }] = useMutation(ADD_PROJECT);

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

      // Auth.login(data.addProject.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main>
        <Box sx={style}
          onSubmit={handleFormSubmit}>
          <button onClick={close}>X</button>
          <br></br>
          <TextField
            id="standard-basic"
            label="EstimatedWorkTime"
            variant="standard"
            onChange={handleChange}
            name= "estimatedWorkTime"
            value={formState.estimatedWorkTime}
          />
          <br></br>
          <TextField 
            id="standard-basic" 
            label="Price" 
            variant="standard" 
            onChange={handleChange}
            name="price"
            value={formState.price}
          />
          <br></br>
          <br></br>
          <br></br>
          <TextField
            id="outlined-multiline-static"
            label="ScopeOfWork"
            multiline
            rows={4}
            onChange={handleChange}
            name="scopeOfWork"
            value={formState.scopeOfWork}
          />
          <br></br>
          <br></br>
          <Button  
            variant="contained" 
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </main>
    </>
  );
};

export default Project;
