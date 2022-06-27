import React, { useState } from 'react'
import Button from '@mui/material/Button';
import loginStyles from './login.module.css';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import axios from 'axios';

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [send, setSend] = useState(false)
    var navigate = useNavigate()

    const login = () => {
        axios.post('http://localhost:8090/auth/login', loginData, { withCredentials: true })
            .then(response => console.log(response.data.message))
            .catch(error => {
                setSend(true)
                console.log(error.response.data.message);
            })
    }

    const handleLogin = e => {
        const tempData = { ...loginData }
        tempData[e.target.id] = e.target.value
        setLoginData(tempData)
    }

    return (
        <div className={loginStyles.container}>
            <Stack spacing={2} className={loginStyles.card} alignItems="center" justifyContent="space-evenly">
                <Stack spacing={0} alignItems="center" justifyContent="center" direction="column">
                    <BubbleChartSharpIcon sx={{ fontSize: 100 }} color="primary" />
                    <Typography variant="h4" fontWeight={700} component="div" >
                        Bienvenido
                    </Typography>
                </Stack>
                <Stack spacing={2} alignItems="center" justifyContent="center">
                    <TextField id="email" label="Email" variant="filled" value={loginData.email}
                        onChange={e => handleLogin(e)} />
                    <TextField id="password" type='password' label="Contraseña" variant="filled" value={loginData.password}
                        onChange={e => handleLogin(e)} />
                    <Button variant="contained" className={loginStyles.button} onClick={login}>
                        Iniciar Sesión
                    </Button>
                    <Button variant="text" href="/register" >
                        Registrarse
                    </Button>
                    {send ? <Alert severity="error">Revise sus crendenciales!</Alert> : null}
                </Stack>
            </Stack>
        </div>
    )
}

export default Login