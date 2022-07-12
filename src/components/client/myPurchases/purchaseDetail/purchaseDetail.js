import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import ProductsList from '../../addedToCart/productList/productsList';

function PurchaseDetail({ open, handleClose, purchaseDetail }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography textAlign={'center'} variant="h4" component="div" mb={2}>
                    Detalle de compra
                </Typography>
                <ProductsList seeDetail={true} productList={purchaseDetail} />
            </Box>
        </Modal>
    )
}

export default PurchaseDetail;