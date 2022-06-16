import React from 'react'
import Button from '@mui/material/Button';
import loginStyles from './login.module.css';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Login() {
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
                    <TextField id="filled-basic" label="Usuario" variant="filled" />
                    <TextField id="filled-basic" label="Contraseña" variant="filled" />
                    <Button variant="contained" href="/store" className={loginStyles.button}>
                        Iniciar Sesión
                    </Button>
                    <Button variant="text" href="/register">
                        Registrarse
                    </Button>
                </Stack>
            </Stack>
        </div>
    )
}

export default Login