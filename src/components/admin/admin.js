import { Button, Grid, Input, Typography } from '@mui/material';
import React from 'react'
import adminStyles from './admin.module.css';
import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    "country": "AD",
    "hot dog": 153,
    "hot dogColor": "hsl(158, 70%, 50%)",
    "burger": 83,
    "burgerColor": "hsl(252, 70%, 50%)",
    "sandwich": 73,
    "sandwichColor": "hsl(266, 70%, 50%)",
    "kebab": 47,
    "kebabColor": "hsl(117, 70%, 50%)",
    "fries": 93,
    "friesColor": "hsl(183, 70%, 50%)",
    "donut": 97,
    "donutColor": "hsl(285, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 51,
    "hot dogColor": "hsl(256, 70%, 50%)",
    "burger": 7,
    "burgerColor": "hsl(21, 70%, 50%)",
    "sandwich": 57,
    "sandwichColor": "hsl(333, 70%, 50%)",
    "kebab": 177,
    "kebabColor": "hsl(334, 70%, 50%)",
    "fries": 94,
    "friesColor": "hsl(7, 70%, 50%)",
    "donut": 161,
    "donutColor": "hsl(226, 70%, 50%)"
  },




]
function Admin() {
  return (
    <div className={adminStyles.container}>
      <div className={adminStyles.topBar}>
        <div className={adminStyles.topBar__title}>
          <Typography variant="h4" fontWeight={700} component="h2" >
            Bienvenido, administrador
          </Typography>
          <Typography variant="h5" fontWeight={300} component="p" >
            Gestiona los reportes de ventas
          </Typography>
        </div>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" className={adminStyles.input} />
          <Button variant="contained" component="span">
            Subir archivo csv
          </Button>
        </label>
      </div>
      <Grid container spacing={2} className={adminStyles.dashboard}>
        <Grid item xs={9} md={9}>
          <div className={adminStyles.bar__container}>
            <ResponsiveBar
              data={data}
              keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
              ]}
              groupMode='grouped'
              indexBy="country"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'nivo' }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit', 
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
              fill={[
                {
                  match: {
                    id: 'fries'
                  },
                  id: 'dots'
                },
                {
                  match: {
                    id: 'sandwich'
                  },
                  id: 'lines'
                }
              ]}
              borderColor={{
                from: 'color',
                modifiers: [
                  [
                    'darker',
                    1.6
                  ]
                ]
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [
                  [
                    'darker',
                    1.6
                  ]
                ]
              }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: true,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              role="application"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
            />
          </div>
        </Grid>
        <Grid item xs={3} md={3}>
          <div className={adminStyles.bar__container}>
              <h1>Opciones</h1>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Admin