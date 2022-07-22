import React, { useEffect, useState } from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import adminStyles from '../../styles/admin/admin.module.css'
import { getAllProducts } from '../../services/product';

import EditIcon from '@mui/icons-material/Edit';

function ProductsTable({ setOpenModal, setEdit, setProductId, setProduct, refresh, titleRef }) {
    const [productList, setProductList] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = React.useState(0);
    // const titleRef = useRef()

    useEffect(() => {
        const x = () => getAllProducts({ setProductList })
        x()
    }, [refresh]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openModalToEdit = (productToEdit) => {
        setProduct(productToEdit)
        setOpenModal(true)
        setEdit(true)
        setProductId(productToEdit.id)
    }

    return (
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
                                    <TableCell component="th" align="right">{productItem.category}</TableCell>
                                    <TableCell component="th" align="right">
                                        <img loading="lazy" alt='hola' src={productItem.image} height={50} width={50} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = "http://www.pinsoft.ec/images/default.png";
                                        }}>
                                        </img>
                                    </TableCell>
                                    <TableCell component="th" align="left">{productItem.description}</TableCell>
                                    <TableCell component="th" align="right">
                                        <IconButton color="primary" aria-label="add to shopping cart"
                                            onClick={() => openModalToEdit(productItem)}>
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
                                colSpan={6}
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
    )
}

export default ProductsTable;