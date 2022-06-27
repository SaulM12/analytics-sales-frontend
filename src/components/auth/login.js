import React from 'react'
import Button from '@mui/material/Button';
import loginStyles from './login.module.css';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

function Login() {
   const [userName,setUserName]= React.useState("")
   const [password,setPassword]=React.useState("")
   const [send, setSend]=React.useState(false)
   var navigate=useNavigate()
   const verifyAuth=()=>{
    if (userName===""||password==="") {
        setSend(true)
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
                    <TextField id="filled-basic" type='password' label="Contraseña" variant="filled" value={password}
                     onChange={value=>setPassword(value.target.value)}/>
                    <Button variant="contained" className={loginStyles.button} onClick={verifyAuth}>
                        Iniciar Sesión
                    </Button>
                    <Button variant="text" href="/register" >
                        Registrarse
                    </Button>
                   { send?<Alert severity="error">Revise sus crendenciales!</Alert>:null}
                </Stack>
            </Stack>
           
        </div>
        
    )
}

export default Login