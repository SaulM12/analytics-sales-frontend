
import { IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteShoppingItem } from '../../../services/detail';

function ProductsList({ productList, setRefresh, seeDetail }) {


    const deleteItem = (itemId) => {
        deleteShoppingItem({ itemId }).then(() => {
            let number = parseInt(localStorage.getItem("number")) - 1
            localStorage.setItem("number", number.toString())
            window.dispatchEvent(new Event('storage'))
            setRefresh(true)
        })
    }

    return (
        <>
            <TableContainer >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>#</b></TableCell>
                            <TableCell align="center"><b>Producto</b></TableCell>
                            <TableCell align="center"><b>Imágen</b></TableCell>
                            <TableCell align="center"><b>Cantidad</b></TableCell>
                            <TableCell align="center"><b>Precio unitario</b></TableCell>
                            <TableCell align="center"><b>Total</b></TableCell>
                            {!seeDetail && <TableCell align="center"><b>Quitar</b></TableCell>}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((detail, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{detail.product.name}</TableCell>
                                <TableCell align="center">
                                    <img loading="lazy" alt='hola' src={detail.product.image} height={50} width={50} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = "http://www.pinsoft.ec/images/default.png";
                                    }}>
                                    </img></TableCell>
                                <TableCell align="center">{detail.amount}</TableCell>
                                <TableCell align="center">${detail.product.price}</TableCell>
                                <TableCell align="center">${(detail.product.price * detail.amount).toFixed(2)}</TableCell>

                                {!seeDetail && <TableCell align="center">
                                    <IconButton color="error" aria-label="add to shopping cart" onClick={() => deleteItem(detail.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!productList.length &&
                <Typography variant="p" marginTop={10} fontSize={20} color={'#333333'} fontWeight={400} component="h2">
                    Aún no has añadido ningún producto al carrito.
                </Typography>
            }
        </>
    )
}

export default ProductsList;