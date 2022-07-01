import React, { useState } from 'react'
import Button from '@mui/material/Button';
import loginStyles from './login.module.css';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert, Snackbar } from '@mui/material';
import { submitLogin } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    var navigate = useNavigate()
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [wrongCredentials, setWrongCredentials] = useState({ wrongData: false, infoText: '', })
    const handleLogin = e => {
        const tempData = { ...loginData }
        tempData[e.target.id] = e.target.value
        setLoginData(tempData)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setWrongCredentials(false);
    };

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
                    <Button
                        variant="contained"
                        className={loginStyles.button}
                        onClick={() => submitLogin({ loginData, setWrongCredentials, navigate })}>
                        Iniciar Sesión
                    </Button>
                    <Button variant="text" href="/register" >
                        Registrarse
                    </Button>
                    <Snackbar open={wrongCredentials.wrongData} autoHideDuration={3000} onClose={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                        <Alert onClose={handleClose} severity="error" a sx={{ width: '100%' }}>
                        {wrongCredentials.infoText}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Stack>
        </div>
    )
}

export default Login