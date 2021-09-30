import { Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { TableHead, TableContainer, TableCell, TableRow, TableBody, Table, Avatar, Grid, Paper, TextField } from "@material-ui/core";
import { getUser, getToken, removeUserSession } from "../Utils/Common";
import axios from "axios";




const Home = (props) => {

    const user = getUser();
    const token = getToken();
    const [error, setError] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const paperStyle = { paddig: 10, width: 340, }
    const tablecss = { padding: 20, width: 750, margin: "auto", align: "center" }
    const handleLogout = () => {
        removeUserSession();
        props.history.push('./login');

    }

    const editData = (data) => {
        //console.log(data);

       
        props.history.push('/home');
    }


    const deleveh = async (id_no) => {
        // console.log(token);

        const url = 'http://localhost:3003/vehicle/' + id_no;

        axios.put(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                console.log(response);
               
                props.history.push('/home');

            }).catch(error => {

               
                console.log(error);
                console.error('something went wrong . Please try again.!', error);
            });

    }
    const getData = async () => {


        axios.get('http://localhost:3003/vehicle', { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                console.log(response.data);
                // this.setState({
                //     items: res.data,  /*set response data in items array*/
                //     isLoaded: true,
                //     redirectToReferrer: false
                // Crud(response.data);
                setVehicles(response.data);

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
                <input type="button" value="Logout" onClick={handleLogout} /> &nbsp;
                <input type="button" value="Dispaly Vehicle info" onClick={getData} />
            </div >
            <TableContainer component={Paper} style={tablecss}>
                <Table sx={{ maxWidth: 300 }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Vehicle ID</strong></TableCell>
                            <TableCell align="right"><strong>Vehicle Type</strong></TableCell>
                            <TableCell align="right"><strong>Status</strong></TableCell>
                            <TableCell align="right"><strong>Created At</strong></TableCell>
                            <TableCell align="right"><strong>Updated At</strong></TableCell>
                            <TableCell align="right"><strong>Action</strong></TableCell>
                            {/* <TableCell align="right"><strong>Delete</strong></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow
                                key={vehicle.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {vehicle.id} </TableCell>
                                <TableCell align="right">{vehicle.vehicletype}</TableCell>
                                <TableCell align="right">{'' + vehicle.status}</TableCell>
                                <TableCell align="right">{vehicle.createdAt}</TableCell>
                                <TableCell align="right">{vehicle.updatedAt}</TableCell>
                                <TableCell align="right">
                                    <button onClick={() => editData(vehicle)}>Update</button></TableCell>
                                <TableCell align="right"><button id="del" name="del" type="button"
                                    onClick={() => deleveh(vehicle.id)}>Delete</button> </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}



export default Home;