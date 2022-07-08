import React, { useState } from 'react';
import registerStyles from './register.module.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { submitRegister } from '../services/auth';
import { Alert, Snackbar } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
function Register() {

  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const [open, setOpen] = useState(false);

  const [wrongData, setWrongData] = useState({
    status: null,
    infoText: ''
  })
  const handleRegister = e => {
    const tempData = { ...registerData }
    tempData[e.target.id] = e.target.value
    setRegisterData(tempData)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const register=()=>{
    submitRegister({ registerData, setWrongData, setRegisterData,setOpen })
  }
  return (
    <div className={registerStyles.container}>
      <Stack spacing={2} className={registerStyles.card} alignItems="center" justifyContent="space-evenly">
        <Stack spacing={0} alignItems="center" justifyContent="center" direction="column">
          <LocalMallIcon sx={{ fontSize: 100 }} color="primary" />
          <Typography variant="h4" fontWeight={600} component="div" >
            Registro
          </Typography>
        </Stack>
        <form>
          <Stack spacing={2} alignItems="center" justifyContent="center">

            <TextField id="userName" onChange={e => handleRegister(e)} value={registerData.userName} label="Nombre" variant="filled" />
            <TextField id="email" onChange={e => handleRegister(e)} value={registerData.email} label="Email" variant="filled" />
            <TextField id="password" onChange={e => handleRegister(e)} value={registerData.password} label="Contraseña" variant="filled" />
            <Button
              variant="contained"
              className={registerStyles.button}
              onClick={register}>
              Registrarse
            </Button>
            <Button variant="text" href="/">
              Iniciar Sesión
            </Button>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
              <Alert onClose={handleClose} severity={wrongData.status ? "error" : "success"} sx={{ width: '100%' }}>
                {wrongData.status ? wrongData.infoText : "Inicia sesión para continuar"}
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </Stack>
    </div>
  )
}

export default Register
