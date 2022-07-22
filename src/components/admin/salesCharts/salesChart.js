import React, { useEffect } from 'react'
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { getLeastSoldProducts, getMostSoldProducts, getTotalSalesByCategory, getTotalSalesByMonth, getTotalSalesByMonthAndCategory } from '../../services/sales';
import { Bar } from 'react-chartjs-2';

import adminStyles from '../../styles/admin/admin.module.css'
function SalesChart() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const [value, setValue] = React.useState('monthAndCategory');
    const [productsAsArray, setProductsAsArray] = React.useState([])
    const [filtered, setFiltered] = React.useState(false);
    const [otherData, setOtherData] = React.useState({});


    useEffect(() => {
        getTotalSalesByMonthAndCategory().then((data => {
            setProductsAsArray(data)
        }))
    }, []);

    const handleFilterChange = (event) => {
        setValue(event.target.value);
        let filters = {
            category: getTotalSalesByCategory(), monthAndCategory: getTotalSalesByMonthAndCategory(), top: getMostSoldProducts(), less: getLeastSoldProducts(),
            month: getTotalSalesByMonth()
        }
        let filterFunction = filters[event.target.value]
        setFiltered(event.target.value !== 'monthAndCategory' ? true : false)
        filterFunction.then(productsToShow => {
            const sortable = Object.entries(productsToShow)
                .sort(([, a], [, b]) => event.target.value !== 'less' ? b - a : a - b)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            let labelsO = Object.keys(sortable)
            setOtherData({
                labels: labelsO,
                datasets: [
                    {
                        data: Object.values(sortable),
                        backgroundColor: ['#083554', '#2c83c6', '#39a8f0', '#62beef', '#a6d4ec', '#e3e3e3', '#e1a793', '#dd6d55', '#dd6d55', '#e24c33', '#c23726']
                    }
                ]
            })
        })
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: !filtered
            },
            title: {
                display: true,
                text: 'Reporte de ventas',
            },
        },
    };
    const labels = productsAsArray.map((productLabel) => productLabel.month);
    const data = {
        labels,
        datasets: [
            {
                label: 'Ropa',
                data: productsAsArray.map(firstCategoryData => firstCategoryData.clothes),
                backgroundColor: '#083554',
            },
            {
                label: 'Tecnología',
                data: productsAsArray.map(secondCategoryData => secondCategoryData.technology),
                backgroundColor: '#2c83c6',
            },
        ],
    };
    return (
        <Grid container spacing={2} className={adminStyles.dashboard}>
            <Grid item xs={12} md={9} className={adminStyles.bar__container}>
                {filtered ? <Bar options={options} data={otherData} /> :
                    <Bar options={options} data={data} />}
            </Grid>
            <Grid item xs={12} md={3}>
                <div className={adminStyles.filter__container}>
                    <FormControl>
                        <Stack p={2}>
                            <Typography variant="h6" component="h2">Mostrar diagrama por:</Typography>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleFilterChange}>
                                <FormControlLabel value="monthAndCategory" control={<Radio />} label="Ventas por temporada y categoria" />
                                <FormControlLabel value="category" control={<Radio />} label="Ventas por categoria" />
                                <FormControlLabel value="month" control={<Radio />} label="Ventas por mes" />
                                <FormControlLabel value="top" control={<Radio />} label="Productos más vendidos " />
                                <FormControlLabel value="less" control={<Radio />} label="Productos menos vendidos" />
                            </RadioGroup>
                        </Stack>
                    </FormControl>
                </div>
            </Grid>
        </Grid>
    )
}

export default SalesChart;