import { Button, Grid, Input, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react'
import adminStyles from './admin.module.css';
import AddIcon from '@mui/icons-material/Add';
import WidgetsIcon from '@mui/icons-material/Widgets';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';

function Admin() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={adminStyles.container}>
      <div className={adminStyles.topBar}>
        <div className={adminStyles.topBar__title}>
          <Typography variant="h4" fontWeight={700} component="h2" >
            Bienvenido, administrador
          </Typography>
          <Typography variant="h5" fontWeight={300} component="p" >
            Gestiona los reportes de ventas
          </Typography>
        </div>
        <nav className={adminStyles.menu}>

          <Button className={adminStyles.actions}
            variant="contained"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<WidgetsIcon />}
          >
            Productos
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              Añadir
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ViewListIcon fontSize="small" />
              </ListItemIcon>
              Ver listado
            </MenuItem>
          </Menu>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" className={adminStyles.input} />
            <Button variant="outlined" component="span"
              endIcon={<UploadFileIcon />} className={adminStyles.actions}>
              Subir CSV
            </Button>
          </label>
          <Button
            variant="outlined" color="secondary" endIcon={<LogoutIcon />}>
            Salir
          </Button>
        </nav>
      </div>
      <Grid container spacing={2} className={adminStyles.dashboard}>
        <Grid item xs={12} md={9}>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={adminStyles.bar__container}>
            <h1>Opciones</h1>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Admin