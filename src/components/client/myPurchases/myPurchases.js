import React, { useEffect, useState } from 'react'
import purchasesStyles from '../../styles/myPurchases/myPurchases.module.css'
import { getSalesByClient } from '../../services/sales';

import PurchasesList from './purchasesList/purchasesList';
import PurchaseDetail from './purchaseDetail/purchaseDetail';

function MyPurchases() {
    const [purchases, setPurchases] = useState([])
    const [open, setOpen] = useState(false);
    const [purchaseDetail, setPurchaseDetail] = useState([])

    const getPurchases = () => {
        getSalesByClient().then(list => {
            setPurchases(list)
        })
    }

    useEffect(() => {
        getPurchases()
    }, []);

    const handleClose = () => setOpen(false)
    return (
        <div className={purchasesStyles.container}>
            <PurchasesList purchases={purchases} setPurchaseDetail={setPurchaseDetail} setOpen={setOpen} />
            <PurchaseDetail open={open} handleClose={handleClose} purchaseDetail={purchaseDetail} />
        </div>
    )
}

export default MyPurchases;