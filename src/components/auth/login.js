import React from 'react'
import Button from '@mui/material/Button';
import loginStyles from './login.module.css';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userName,setUserName]=React.useState("")
    const [password,setPassword]=React.useState("")
    var navigate=useNavigate()
    const verifyAuth=()=>{
        if (userName===""||password==="") {
            console.log(userName)
        }else{
           return navigate("/store",{replace:true})
        }
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
                    <TextField id="filled-basic" label="Usuario" variant="filled" value={userName} 
                    onChange={value=>setUserName(value.target.value)} />
                    <TextField id="filled-basic" label="Contraseña" variant="filled" value={password}
                     onChange={value=>setPassword(value.target.value)}/>
                    <Button variant="contained" className={loginStyles.button} onClick={verifyAuth}>
                        Iniciar Sesión
                    </Button>
                    <Button variant="text" href="/register" >
                        Registrarse
                    </Button>
                </Stack>
            </Stack>
        </div>
    )
}

export default Login