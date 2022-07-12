import React, { useRef } from 'react'
import { Alert, Snackbar } from '@mui/material';
import adminStyles from '../styles/admin/admin.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AdminHeader from './header/adminHeader';
import ProductModal from './productModal/productModal';
import ProductsTable from './productsList/productsTable';
import SalesChart from './salesCharts/salesChart';
function Admin() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const [product, setProduct] = React.useState({ name: "", price: 0, description: "", category: "", image: "" })
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' })
  const [openModal, setOpenModal] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [productId, setProductId] = React.useState("");
  const [refresh, setRefresh] = React.useState(false)
  const titleRef = useRef()


  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false });
  };

  const handleOpenModal = () => setOpenModal(true);

  return (
    <div className={adminStyles.container}>
      <AdminHeader handleOpenModal={handleOpenModal} titleRef={titleRef} />

      <ProductModal setRefresh={setRefresh} openModal={openModal} setOpenModal={setOpenModal}
        setProductFeedback={setProductFeedback} productId={productId} edit={edit}
        setProduct={setProduct} product={product} setEdit={setEdit} />

      <SalesChart />

      <ProductsTable titleRef={titleRef} refresh={refresh} setOpenModal={setOpenModal}
        setProduct={setProduct} setEdit={setEdit} setProductId={setProductId} />

      <Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
          {showProductFeedback.infoText}
        </Alert>
      </Snackbar>
    </div >
  )
}

export default Admin