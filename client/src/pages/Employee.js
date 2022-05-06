import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import EmployeeList from "../components/EmployeeList";
import { QUERY_ALLEMPLOYEES } from "../utils/queries";
import { ADD_EMPLOYEE } from "../utils/mutations";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Employee = () => {
    const { loading, data } = useQuery(QUERY_ALLEMPLOYEES);
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const employees = data?.employees || [];

    console.log(employees)

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
                Add Employee
              </Button>
              <EmployeeList openModal={handleModalOpen} employees={employees} />
              {isModalVisible && <Modal close={handleModalClose} />}
            </Box>
          )}
        </main>
      );
}

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
    
    const skills = [{name:"Carpentry"}, {name:"Electrical"}, {name: "HVAC"}, {name:"Landscaping"}, {name:"Maintenance"}, {name:"Masonry"}, {name:"Plumbing"}, {name:"Roofing"}]

    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        expertise: "",
        email: "",
        phoneNumber: "",
    })

    const [addEmployee, { error }] = useMutation(ADD_EMPLOYEE);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        console.log(formState);

        try {
          const { data } = await addEmployee({
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
                    label="firstName"
                    variant="standard"
                    onChange={handleChange}
                    name= "firstName"
                    value={formState.firstName}
                />
                <TextField
                    id="standard-basic"
                    label="lastName"
                    variant="standard"
                    onChange={handleChange}
                    name= "lastName"
                    value={formState.lastName}
                />
                 <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Expertise</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formState.expertise}
                    label="expertise"
                    onChange={handleChange}
                    >
                    {skills.map((skill) => {
                        return <MenuItem key={skill.name}>{skill.name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
                <TextField
                    id="standard-basic"
                    label="email"
                    variant="standard"
                    onChange={handleChange}
                    name= "email"
                    value={formState.email}
                />
                <TextField
                    id="standard-basic"
                    label="phoneNumber"
                    variant="standard"
                    onChange={handleChange}
                    name= "phoneNumber"
                    value={formState.phoneNumber}
                />
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


export default Employee;
