import React, { useState } from 'react'
import Button from '@mui/material/Button';
import loginStyles from './login.module.css';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert, Snackbar } from '@mui/material';
import { submitLogin } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [wrongCredentials, setWrongCredentials] = useState({ wrongData: false, infoText: '', })
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const handleLogin = e => {
        const tempData = { ...loginData }
        tempData[e.target.id] = e.target.value
        setLoginData(tempData)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={loginStyles.container}>
            <Stack spacing={2} className={loginStyles.card} alignItems="center" justifyContent="space-evenly">
                <Stack spacing={0} alignItems="center" justifyContent="center" direction="column">
                    <LocalMallIcon sx={{ fontSize: 100 }} color="primary" />
                    <Typography variant="h4" fontWeight={700} component="div" >
                        Bienvenido
                    </Typography>
                </Stack>
                <Stack spacing={2} alignItems="center" justifyContent="center">
                    <TextField id="email" label="Email" variant="filled" value={loginData.email}
                        onChange={e => handleLogin(e)} />
                    <TextField id="password" type='password' label="Contraseña" variant="filled" value={loginData.password}
                        onChange={e => handleLogin(e)} />
                    {loading ? <LoadingButton loading variant="contained">
                        Iniciar Sesión
                    </LoadingButton> :
                        <Button
                            variant="contained"
                            className={loginStyles.button}
                            onClick={() => submitLogin({ loginData, setWrongCredentials, navigate, setLoading, setOpen })}>
                            Iniciar Sesión
                        </Button>
                    }
                    <Button variant="text" href="/register" >
                        Registrarse
                    </Button>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {wrongCredentials.infoText}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Stack>
        </div>
    )
}

export default Login