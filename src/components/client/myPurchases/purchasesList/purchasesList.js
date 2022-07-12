import React, { useState } from 'react';
import { Box, Paper, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination } from '@mui/material';
import { getDetailBySaleId } from '../../../services/detail';

function PurchasesList({ purchases, setPurchaseDetail, setOpen }) {


    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const getDate = date => {
        let test = new Date(date).toLocaleDateString();
        return test
    }

    const viewPurchaseDetail = (purchaseId) => {
        getDetailBySaleId(purchaseId).then(data => {
            setPurchaseDetail(data)
            setOpen(true)
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box px={10} pt={5}>
            <Typography textAlign={'center'} variant="h4" gutterBottom component="div">
                Mis compras
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow >
                            <TableCell align="center"><b>#</b></TableCell>
                            <TableCell align="center"><b>Orden de compra</b></TableCell>
                            <TableCell align="center"><b>Fecha</b></TableCell>
                            <TableCell align="center"><b>Total</b></TableCell>
                            <TableCell align="center"><b>Visualizar</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? purchases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : purchases
                        ).map((purchase, index) => (
                            <TableRow key={index} hover>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{purchase.id}</TableCell>
                                <TableCell align="center">{getDate(purchase.date)}</TableCell>
                                <TableCell align="center">${purchase.total}</TableCell>
                                <TableCell align="center">
                                    <Button size="medium" variant='outlined' onClick={() => viewPurchaseDetail(purchase.id)}>Ver compra</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                colSpan={5}
                                count={purchases.length}
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
            {!purchases.length &&
                <Typography textAlign={'center'} variant="p" marginTop={10} fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                    Aún no has realizado ninguna compra.
                </Typography>
            }
        </Box>
    )
}

export default PurchasesList;