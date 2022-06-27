import React, { useState } from 'react';
import registerStyles from './register.module.css';
import Button from '@mui/material/Button';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
function Register() {

  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const handleRegister = e => {
    const tempData = { ...registerData }
    tempData[e.target.id] = e.target.value
    setRegisterData(tempData)
  }

  const register = () => {
    axios.post('http://localhost:8090/auth/register', registerData)
    .then(response => console.log(response.data.message))
    .catch(error =>{
      console.log(error.response.data.message);
    })
  }

  return (
    <div className={registerStyles.container}>
      <Stack spacing={2} className={registerStyles.card} alignItems="center" justifyContent="space-evenly">
        <Stack spacing={0} alignItems="center" justifyContent="center" direction="column">
          <BubbleChartSharpIcon sx={{ fontSize: 100 }} color="primary" />
          <Typography variant="h4" fontWeight={600} component="div" >
            Registro
          </Typography>
        </Stack>
        <form>
          <Stack spacing={2} alignItems="center" justifyContent="center">

            <TextField id="userName" onChange={e => handleRegister(e)} value={registerData.userName} label="Nombre" variant="filled" />
            <TextField id="email" onChange={e => handleRegister(e)} value={registerData.email} label="Email" variant="filled" />
            <TextField id="password" onChange={e => handleRegister(e)} value={registerData.password} label="Contraseña" variant="filled" />
            <Button variant="contained" className={registerStyles.button} onClick={register}>
              Registrarse
            </Button>
            <Button variant="text" href="/">
              Iniciar Sesión
            </Button>

          </Stack>
        </form>
      </Stack>
    </div>
  )
}

export default Register
