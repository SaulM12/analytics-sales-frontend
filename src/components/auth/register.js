import registerStyles from './register.module.css';
import Button from '@mui/material/Button';
import BubbleChartSharpIcon from '@mui/icons-material/BubbleChartSharp';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
function Register() {
  return (
    <div className={registerStyles.container}>
      <Stack spacing={2} className={registerStyles.card} alignItems="center" justifyContent="space-evenly">
        <Stack spacing={0} alignItems="center" justifyContent="center" direction="column">
          <BubbleChartSharpIcon sx={{ fontSize: 100 }} color="primary" />
          <Typography variant="h4" fontWeight={600} component="div" >
            Registro
          </Typography>
        </Stack>
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <TextField id="filled-basic" label="Nombre" variant="filled" />
          <TextField id="filled-basic" label="Email" variant="filled" />
          <TextField id="filled-basic" label="Contraseña" variant="filled" />
          <TextField id="filled-basic" label="Verificar Contraseña" variant="filled" />
          <Button variant="contained" href="/register" className={registerStyles.button}>
            Empezar
          </Button>
          <Button variant="text" href="/">
            Iniciar Sesión
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default Register
