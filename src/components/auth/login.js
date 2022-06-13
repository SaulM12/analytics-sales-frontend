import React from 'react'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import styles from './login.module.css';
import styles2 from './register.module.css';
import { AccessAlarm } from '@mui/icons-material';

function login() {
    return (
        <div>
            <p className={styles.test}>hola</p>
            <p className={styles2.test}>funciona</p>
            <Link to="/register">fasdfas</Link>
            <Button variant="outlined" href="/register">
                fasfsdf
            </Button>
            <AccessAlarm />
        </div>
    )
}

export default login