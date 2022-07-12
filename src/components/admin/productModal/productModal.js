import React, {  useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
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
        tempData[e.target.id] = e.target.value
        setProduct(tempData)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setEdit(false)
        setProduct({ name: "", price: 0, description: "", category: "", image: "" })
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
            </Box>
        </Modal>
    )
}

export default ProductModal;