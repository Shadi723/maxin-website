import { Box, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core';
import Location  from '@material-ui/icons/LocationOn'

const useStyles = makeStyles({
    typograph:{
        margin: '30px 0px 0px 30px'
    },
    icon:{
        color: 'red'
    },
    map:{
        margin: '10px 30px',
        height: 580,
    }
});

interface IProps{
    text: string ,
    lat: number, 
    lng: number
}

const AnyReactComponent :React.FC<IProps> = ( {text,} ) => 
    {
        const classes = useStyles();
        return(
            <div style={{width: 100,}}>
                <Location className={classes.icon} />
            </div>
        )
    }
 
const ContactPage: React.FC = () => {
    const defaultProps = {
        center: {
        lat: 36.978828,
        lng: 35.6469664
        },
        zoom: 11
    };

    const classes = useStyles();
    return (
        // Important! Always set the container height explicitly
        <div>
            <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <Box className={classes.typograph}>
                    <Typography variant='subtitle2'>
                        Adres Bilgilerimiz
                    </Typography>
                    <Divider />
                    <Typography variant='body2'>
                        Hacı Sabancı Organize Sanayi Bölgesi, Abdullah Gül bulvarı no: 22 Sarıçam / ADANA
                    </Typography>
                    <Typography variant='body2'>
                        Müşteri Hizmetleri:
                    </Typography>
                    <Typography variant='body2'>
                        0322 234 40 80 - 235 90 80 - 394 42 20
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <div className={classes.map}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'YOUR-KEY-API' }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom} >
                    <AnyReactComponent
                        lat={36.9812861}
                        lng={35.6366637}
                        text="NUR İŞ PVC"/>
                    </GoogleMapReact>
                </div>
            </Grid>
            </Grid>
        </div>
    );
}

export default ContactPage
