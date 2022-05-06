import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import ClientList from "../components/ProjectList";
import { QUERY_ALLCLIENTS} from "../utils/queries";
import { ADD_CLIENT } from "../utils/mutations";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from '@mui/material';

const Client = () => {
    const { loading, data } = useQuery(QUERY_ALLCLIENTS);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const clients = data?.clients || [];

    console.log(clients)

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
                Add Client
              </Button>
              <ClientList openModal={handleModalOpen} clients={clients} />
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
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        homeAddress: "",
        email: "",
        phoneNumber: "",
    })

    const [addClient, { error }] = useMutation(ADD_CLIENT);

    const handleChange = (event) => {
        const { name, value} = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        console.log(formState);

        try {
          const { data } = await addClient({
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
                <TextField
                    id="standard-basic"
                    label="homeAddress"
                    variant="standard"
                    onChange={handleChange}
                    name= "homeAddress"
                    value={formState.homeAddress}
                />
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


export default Client;

