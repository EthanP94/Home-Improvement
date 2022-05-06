import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import ProjectList from "../components/ProjectList";
import { QUERY_ALLPROJECTS } from "../utils/queries";
import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_ALLEMPLOYEES } from "../utils/queries";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// import Auth from "../utils/auth";

const Project = () => {
  const { loading, data } = useQuery(QUERY_ALLPROJECTS);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const projects = data?.projects || [];
  console.log(projects)
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

// styling for the cards
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  

  const [personName, setPersonName] = useState([]);

  const { data } = useQuery(QUERY_ALLEMPLOYEES)

  const employees = data?.employees || [];

  const fullName = employees.map(employee => employee.firstName.concat(" ", employee.lastName))

  const handleNameChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleFormSubmit = async (event) => {
    console.log(formState);

    formState.price = parseInt(formState.price)
  
    try {
      const { data } = await addProject({
        variables: { ...formState },
      });
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <Box sx={style}>
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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Employees</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleNameChange}
            input={<OutlinedInput label="Employees" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            name="assignedEmployees"
          >
            {fullName.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <Button  
          variant="contained" 
          type="submit"
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </Box>
    </main>
  );
};

export default Project;
