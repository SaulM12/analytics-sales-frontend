import React, { useState } from 'react';
import { Alert, Button, Input, Snackbar, Typography } from '@mui/material';
import adminStyles from '../../styles/admin/admin.module.css'
import { uploadCsvFile } from '../../services/product';
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import WidgetsIcon from '@mui/icons-material/Widgets';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';

function AdminHeader({ handleOpenModal, titleRef }) {

    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState({ show: false, message: '', severity: 'success' });

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

    const closeAlert = () => {
        setShowAlert(false)
    }

    const closeSession = () => {
        logout({ navigate })
    }

    const seeProducts = () => {
        titleRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <Snackbar open={showAlert.show} autoHideDuration={3000} onClose={closeAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert onClose={closeAlert} severity={showAlert.severity} a sx={{ width: '100%' }}>
                    {showAlert.message}
                </Alert>
            </Snackbar>
            <div className={adminStyles.topBar}>
                <div className={adminStyles.topBar__title}>
                    <Typography variant="h4" fontWeight={700} component="h2" >
                        Bienvenido
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
        </>
    )
}

export default AdminHeader;