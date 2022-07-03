import { Alert, Button, Grid, Input, ListItemIcon, Menu, MenuItem, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import adminStyles from './admin.module.css';
import AddIcon from '@mui/icons-material/Add';
import WidgetsIcon from '@mui/icons-material/Widgets';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { createProduct } from '../services/product'

function Admin() {
  const [product, setProduct] = React.useState({ name: "", price: 0, description: "", category: "", image: "" })
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [wrongProduct, setWrongProduct] = React.useState({ wrongData: false, infoText: '', })
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [showProductFeedback, setProductFeedback] = React.useState(false);
  const handleProductForm = e => {
    const tempData = { ...product }
    tempData[e.target.id] = e.target.value
    setProduct(tempData)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback(false);
  };
  const saveProduct = () => {
    createProduct({ product, setWrongProduct, setProduct,setProductFeedback })
  }

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
            <MenuItem onClick={handleOpenModal}>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '0px solid #000',
          borderRadius: '5px',
          boxShadow: 24,
          p: 2,
        }}>
          <Stack spacing={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nuevo producto
            </Typography>
            <TextField
              required
              id="name"
              label="Nombre"
              onChange={e => handleProductForm(e)}
              value={product.name}
            />
            <TextField
              required
              id="price"
              label="Precio"
              type="number"
              onChange={e => handleProductForm(e)}
              value={product.price}
            />
            <TextField
              required
              id="category"
              label="Categoria"
              onChange={e => handleProductForm(e)}
              value={product.category}
            />
            <TextField
              required
              id="description"
              label="Descripción"
              onChange={e => handleProductForm(e)}
              value={product.description}
            />
            <TextField
              required
              id="image"
              label="Imágen"
              onChange={e => handleProductForm(e)}
              value={product.image}
            />
            <Button className={adminStyles.actions}
              variant="contained"
              id="button" onClick={saveProduct}>
              Guardar
            </Button>
            <Button className={adminStyles.actions}
              variant="outlined"
              id="button"
              color="error"
              onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Snackbar open={showProductFeedback} autoHideDuration={2000} onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={closeProductFeedback} severity={wrongProduct.status ? "error" : "success"} a sx={{ width: '100%' }}>
          {wrongProduct.infoText}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Admin