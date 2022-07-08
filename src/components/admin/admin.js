import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Input, Paper, Radio, RadioGroup, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import adminStyles from './admin.module.css';
import AddIcon from '@mui/icons-material/Add';
import WidgetsIcon from '@mui/icons-material/Widgets';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { createProduct, uploadCsvFile, getAllProducts, updateProduct } from '../services/product'
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Bar } from 'react-chartjs-2';
import { getTotalSalesByCategory, getTotalSalesByMonth, getLeastSoldProducts, getMostSoldProducts, getTotalSalesByMonthAndCategory } from '../services/sales';
function Admin() {
  var navigate = useNavigate()
  const [product, setProduct] = React.useState({ name: "", price: 0, description: "", category: "", image: "" })
  const [wrongProduct, setWrongProduct] = React.useState({ wrongData: false, infoText: '', })
  const [showProductFeedback, setProductFeedback] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [productId, setProductId] = React.useState("");
  const [showAlert, setShowAlert] = React.useState({ show: false, message: '', severity: 'success' });
  const [productList, setProductList] = React.useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState('female');
  const [productsAsArray, setProductsAsArray] = React.useState([])
  const [productsAsObject, setProductsAsObject] = React.useState({})
  const titleRef = useRef()
  const getProductList = () => {
    getAllProducts({ setProductList })
  }
  useEffect(() => {
    getProductList()
    getTotalSalesByMonthAndCategory().then((data => {
      setProductsAsArray(data)
    }))
    getMostSoldProducts().then((data) => {
      console.log(data);
      setProductsAsObject(data)
    })
  }, []);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false)
    setEdit(false)
    setProduct({ name: "", price: 0, description: "", category: "", image: "" })
  };
  const seeProducts = () => {
    titleRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleProductForm = e => {
    const tempData = { ...product }
    tempData[e.target.id] = e.target.value
    setProduct(tempData)
  }
  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback(false);
  };
  const saveNewProduct = () => {
    createProduct({ product }).then(response => {
      setWrongProduct({ status: false, infoText: response.data.message })
      setProduct({ name: "", price: 0, description: "", category: "", image: "" })
      setProductFeedback(true)
      getProductList()
    })
      .catch(error => {
        setWrongProduct({ status: true, infoText: error.response.data.message })
        setProductFeedback(true)
      })
  }
  const editExitingProduct = () => {
    updateProduct({ product, productId }).then(response => {
      setWrongProduct({ status: false, infoText: response.data.message })
      setProductFeedback(true)
      setOpenModal(false)
      getProductList()
      setProduct({ name: "", price: 0, description: "", category: "", image: "" })
      setEdit(false)
    })
      .catch(error => {
        setWrongProduct({ status: true, infoText: error.response.data.message })
        setProductFeedback(true)
      })
  }
  const saveProduct = () => {
    edit ?
      editExitingProduct()
      : saveNewProduct()
  }
  const closeSession = () => {
    logout({ navigate })
  }
  const uploadFile = async (e) => {
    let file = e.target.files
    let document = new FormData()
    document.append('file', file[0])
    const response = await uploadCsvFile(document);
    if (response) {
      let alertColor = response.status === 200 ? 'success' : 'error'
      setShowAlert({ show: true, message: response.data.message, severity: alertColor })
    }
    e.target.value = null
  }
  const openModalToEdit = (productToEdit) => {
    setProduct(productToEdit)
    setOpenModal(true)
    setEdit(true)
    setProductId(productToEdit.id)
  }
  const closeAlert = () => {
    setShowAlert(false)
  }
  const handleFilterChange = (event) => {
    setValue(event.target.value);
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CAMBIAR TÍTULO',
      },
    },
  };
  const labels = productsAsArray.map(data => data.month);
  const data = {
    labels,
    datasets: [
      {
        label: 'Ropa',
        data: productsAsArray.map(data => data.clothes),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Tecnología',
        data: productsAsArray.map(data => data.technology),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  /*   const labels = Object.keys(productsAsObject)
    const data = {
      labels,
      datasets: [
        {
          label: 'Productos más vendidos',
          data: Object.values(productsAsObject).sort((a, b) => b - a),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    }; */
  return (
    <div className={adminStyles.container}>
      <Snackbar open={showAlert.show} autoHideDuration={3000} onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={closeAlert} severity={showAlert.severity} a sx={{ width: '100%' }}>
          {showAlert.message}
        </Alert>
      </Snackbar>
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
          <Button variant='contained' className={adminStyles.actions}
            onClick={seeProducts}
            endIcon={<WidgetsIcon />} color="primary">
            Productos
          </Button>
          <Button variant='outlined' className={adminStyles.actions}
            onClick={handleOpenModal}
            endIcon={<AddIcon />} color="primary">
            Añadir
          </Button>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" className={adminStyles.input}
              onChange={e => uploadFile(e)} />
            <Button variant="outlined" component="span" color="success"
              endIcon={<UploadFileIcon />} className={adminStyles.actions}>
              Subir CSV
            </Button>

          </label>
          <Button className={adminStyles.actions}
            variant="outlined" color="error" endIcon={<LogoutIcon />} onClick={closeSession}>
            Salir
          </Button>
        </nav>
      </div>
      <Grid container spacing={2} className={adminStyles.dashboard}>
        <Grid item xs={12} md={9} className={adminStyles.bar__container}>
          <Bar options={options} data={data} />
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={adminStyles.bar__container}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group"><h1>Filtros</h1></FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleFilterChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Productos más vendidos " />
                <FormControlLabel value="male" control={<Radio />} label="Ventas por categoria" />
                <FormControlLabel value="male2" control={<Radio />} label="Ventas por temporada" />
                <FormControlLabel value="male6" control={<Radio />} label="Productos menos vendidos" />
              </RadioGroup>
            </FormControl>
          </div>
        </Grid>
      </Grid>
      <div className={adminStyles.table__container} ref={titleRef}>
        <TableContainer component={Paper} className={adminStyles.table}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow >
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Imagen</TableCell>
                <TableCell align="left">Descripción</TableCell>
                <TableCell align="right">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {(rowsPerPage > 0
                ? productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : productList
              )
                .map((productItem) => (
                  <TableRow
                    key={productItem.name}
                  >
                    <TableCell component="th" scope="row">
                      {productItem.name}
                    </TableCell>
                    <TableCell component="th" align="right">{productItem.price.toFixed(2)}</TableCell>
                    <TableCell component="th" align="right">{productItem.price}</TableCell>
                    <TableCell component="th" align="right">{productItem.category}</TableCell>
                    <TableCell component="th" align="right">
                      <img loading="lazy" alt='hola' src={productItem.image} height={50} width={50}>
                      </img>
                    </TableCell>
                    <TableCell component="th" align="left">{productItem.description}</TableCell>
                    <TableCell component="th" align="right">
                      <IconButton color="primary" aria-label="add to shopping cart" onClick={() => {
                        openModalToEdit(productItem)
                      }}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 6]}
                  colSpan={4}
                  count={productList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
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
              {edit ? "Editar producto" : "Nuevo producto"}
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
        <Alert onClose={closeProductFeedback} severity={wrongProduct.status ? "error" : "success"} sx={{ width: '100%' }}>
          {wrongProduct.infoText}
        </Alert>
      </Snackbar>
    </div >
  )
}

export default Admin