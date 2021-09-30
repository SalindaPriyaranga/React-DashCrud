import React, { useState } from "react";
import { Avatar, Grid, Paper, TextField } from "@material-ui/core";
import LockSharpIcon from '@material-ui/icons/LockSharp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import { setUserSession } from "../Utils/Common";


const Login = (props) => {
    // return (
    //     <div> 
    //         Welcome to Login Page !
    //     </div>
    const paperStyle = { paddig: 10, height: '55vh', width: 340, margin: "20px auto" }
    const avatarStyle = { backgroundColor: 'green' }
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        // props.history.push('./home');
        // console.log(username);
        setError(null);
        setLoading(true);
        axios.post( 'http://localhost:3003/auth/signin/' , {
            username: username,
            password: password,
            
            

        }).then(response => {
            setLoading(false);
            setUserSession(response.data.access_token , response.data.username);
            props.history.push('/home');
            // console.log(response.data.access_token);
        }).catch(error => {
            setLoading(false);
            if(error.response.status === 401 || error.response.status === 400 || error.response.status === 402){
                setError(error.response.data.message);
            }else{
                setError("something went wrong . Please try again.");
            }
            // console.error('response >>>', error);
        });
    }

    return (

        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center" >
                    <Avatar style={avatarStyle}><LockSharpIcon /></Avatar>
                    <h2>LOG IN</h2>
                </Grid>

                <Grid align="center" >

                    <TextField id="standard-basic" label="User Name" value={username} onChange={e => setUserName(e.target.value)} />
                    <TextField id="standard-basic" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {error && <p className="error">{error}</p>}
                    <Grid  >
                        <FormControlLabel
                            control={
                                <Checkbox

                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember Me"
                        />

                    </Grid>
                    <input type='button' value={loading ? "Loading ..." : "Login"} onClick={handleLogin} 
                    disabled={loading} />
               
                </Grid>
            </Paper>
        </Grid>
    )


}
export default Login;