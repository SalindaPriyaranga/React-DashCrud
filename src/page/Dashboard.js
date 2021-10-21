import React from "react";
import { useEffect, useState } from "react";
import { TableHead, TableContainer, TableCell, TableRow, TableBody, Table, Avatar, Grid, Paper, TextField, Modal, Box, Typography, Button, FormControlLabel, RadioGroup, FormLabel, Radio } from "@material-ui/core";
import { getUser, getToken, removeUserSession } from "../Utils/Common";
import axios from "axios";
import { pink } from "@material-ui/core/colors";
import { Title } from "@material-ui/icons";





const Dashboard = (props) => {
    // const user = getUser();
    // const token = getToken();
    const [rolename, setRolename] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [roles, setRole] = useState([]);
    const paperStyle = { paddig: 10, width: 340, }
    const tablecss = { padding: 20, width: 750, margin: "auto", align: "center" }
    const handleLogout = () => {
        removeUserSession();
        props.history.push('./login');

    }


    const editData = (data) => {
        //console.log(data);
        handleOpen(data);
        setRolename(data.rolename);
        setStatus(''+data.status);
       
        console.log(data.status);
        props.history.push('/');
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = (data) => setOpen(true);
    const handleClose = () => setOpen(false);



    const deleRole = async (id_no) => {
        // console.log(token);

        const url = 'http://localhost:3003/role/' + id_no;

        axios.put(url)
            .then(response => {
                console.log(response);

                props.history.push('/');
                getData();

            }).catch(error => {


                console.log(error);
                console.error('something went wrong . Please try again.!', error);
            });



    }

    const handleAddNew = () => {
        // props.history.push('./home');
        // console.log(username);


        setError(null);
        // setLoading(true);
        axios.post('http://localhost:3003/role/', {
            rolename: rolename,
            status: status,



        }).then(response => {

            // setUserSession(response.data.access_token , response.data.username);
            props.history.push('/');
            getData();
            // console.log(response.data.access_token);
        }).catch(error => {

            if (error.response.status === 401 || error.response.status === 400 || error.response.status === 402) {
                setError(error.response.data.message);
            } else {
                setError("something went wrong . Please try again.");
            }
            // console.error('response >>>', error);
        });
    }







    const getData = async () => {


        axios.get('http://localhost:3003/role')
            .then(response => {
                console.log(response.data);
                // this.setState({
                //     items: res.data,  /*set response data in items array*/
                //     isLoaded: true,
                //     redirectToReferrer: false
                // Crud(response.data);
                setRole(response.data);

            }).catch(error => {

                if (error.response.status === 401 || error.response.status === 400 || error.response.status === 402) {
                    setError(error.response.data.message);
                } else {
                    setError("something went wrong . Please try again.");
                }
                console.error('response >>>', error);
            });
    }

    return (
        <div>

            <div>
                <input type="button" onClick={handleLogout} value="Logout" /> &nbsp;
                <input type="button" value="Dispaly Role info" onClick={getData} />

                <div>

                    <Button onClick={handleOpen}>Add New</Button>
                </div>
            </div >
            <TableContainer component={Paper} style={tablecss}>

                <Table sx={{ maxWidth: 300 }} size="small" aria-label="simple table" >
                    <TableHead>
                        <h6 size="large">ROLE INFO</h6>
                        <TableRow>
                            <TableCell><strong>Role ID</strong></TableCell>
                            <TableCell align="right"><strong>Role Name</strong></TableCell>
                            <TableCell align="right"><strong>Status</strong></TableCell>
                            <TableCell align="right"><strong>Created At</strong></TableCell>
                            <TableCell align="right"><strong>Updated At</strong></TableCell>
                            <TableCell align="right"><strong>Action</strong></TableCell>
                            {/* <TableCell align="right"><strong>Delete</strong></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow
                                key={role.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {role.id} </TableCell>
                                <TableCell align="right">{role.rolename}</TableCell>
                                <TableCell align="right">{'' + role.status}</TableCell>
                                <TableCell align="right">{role.createdAt}</TableCell>
                                <TableCell align="right">{role.updatedAt}</TableCell>
                                <TableCell align="right">
                                    <button onClick={() => editData(role)}>Update</button></TableCell>
                                <TableCell align="right"><button id="del" name="del" type="button"
                                    onClick={() => deleRole(role.id)}>Delete</button> </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Add New Role
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 4 }}>

                            <TextField id="outlined-basic" label="Role Name" variant="outlined" value={rolename} onChange={e => setRolename(e.target.value)} />

                            <Grid>
                                <FormLabel >Status</FormLabel>
                                <RadioGroup id="ra" value={status} onChange={e => setStatus(e.target.value)}
                                    aria-label="Active"
                                    defaultValue="Inactive"
                                    name="radio-buttons-group"

                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Active" />
                                    <FormControlLabel value="false" control={<Radio color="default" />} label="Inactive" />

                                </RadioGroup>
                            </Grid>
                            <div> <Button variant="contained" onClick={handleAddNew} >Submit</Button> </div>

                        </Typography>
                    </Box>
                </Modal>
            </div>



        </div >
    );
}




export default Dashboard;


