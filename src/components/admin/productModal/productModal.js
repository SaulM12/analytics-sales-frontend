import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import adminStyles from '../../styles/admin/admin.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { createProduct, updateProduct } from '../../services/product';

function ProductModal(props) {
    const { openModal, setOpenModal, setProductFeedback, productId, setEdit, edit, setProduct, product, setRefresh } = props;
    const [loading, setLoading] = useState(false)

    const handleProductForm = e => {
        const tempData = { ...product }
        tempData[e.target.name === "category" ? e.target.name : e.target.id] = e.target.value
        setProduct(tempData)
    }


    const handleCloseModal = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenModal(false)
            setEdit(false)
            setProduct({ name: "", price: 0, description: "", category: "", image: "" })
        }

    };

    const saveNewProduct = () => {
        setLoading(true)
        createProduct({ product }).then(response => {
            setProduct({ name: "", price: 0, description: "", category: "", image: "" })
            setProductFeedback({ show: true, status: true, infoText: response.data.message })
            setLoading(false)
            setRefresh(true)
        }).catch(error => {
            setProductFeedback({ show: true, status: false, infoText: error.response.data.message })
            setLoading(false)
        })
    }

    const editExitingProduct = () => {
        setLoading(true)
        updateProduct({ product, productId }).then(response => {
            setProductFeedback({ show: true, status: true, infoText: response.data.message })
            setOpenModal(false)
            setProduct({ name: "", price: 0, description: "", category: "", image: "" })
            setEdit(false)
            setLoading(false)
            setRefresh(true)
        }).catch(error => {
            setProductFeedback({ show: true, status: false, infoText: error.response.data.message })
            setLoading(false)
        })
    }

    const saveProduct = () => {
        edit ? editExitingProduct() : saveNewProduct()
    }
    return (
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
                    <FormControl fullWidth>
                        <InputLabel id="category">Categoria</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            name='category'
                            label="Categoria"
                            onChange={e => handleProductForm(e)}
                            value={product.category}
                        >
                            <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
                            <MenuItem value={"Ropa"}>Ropa</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        id="description"
                        label="Descripción"
                        multiline
                        rows={3}
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
                    <div className={adminStyles.modal__image}>
                        <img src={product.image} alt='' height={100} width={100} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "http://www.pinsoft.ec/images/default.png";
                        }} />
                    </div>
                    <Stack spacing={0} direction="row" justifyContent={"center"}>
                        {loading ? <LoadingButton loading variant="contained" className={adminStyles.actions} />
                            :
                            <Button className={adminStyles.actions}
                                variant="contained"
                                id="button" onClick={saveProduct}>
                                Guardar
                            </Button>}
                        <Button className={adminStyles.actions}
                            variant="outlined"
                            id="button"
                            color="error"
                            onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal >
    )
}

export default ProductModal;