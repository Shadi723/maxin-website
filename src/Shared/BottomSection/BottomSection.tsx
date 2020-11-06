import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/photos/bottomLogo.png';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            flexGrow: 1,
            width: '100%',
            marginBottom: '0px'
        },
        image:{
            maxHeight: '80%',
            margin:'auto',
            width: '150px',

        },
        imageContainer:{
            margin: 'auto'
        },
        typographContainer: {
            justifyContent: 'center',
            textAlign: 'center',
            margin: 'auto',
        },
        typographRights:{
            fontSize: 10,
            fontWeight: 'bold'
        },
        madeBy:{
            fontSize: 7,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        span:{
            color: 'blue'
        },
    })
);

const BottomSection: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [hide, setHide] = useState(false);
    useEffect(() => {
        let url = history.location.pathname;
        if(url.includes('/admin'))
            {
                console.log(url.includes('/admin'));
                setHide(true);}
        else
            setHide(false);
    }, [history.location.pathname])
    return (
        hide? null : 
        <div className={classes.root}>
            <Grid container justify='space-between'>
                <Grid item className={classes.imageContainer} sm={3} xs={2}>
                    <img src={Logo} className={classes.image} alt='logo'/>
                </Grid>
                 <Grid item className={classes.typographContainer} sm={5} xs={2}>
                    <Typography variant='body2' className={classes.typographRights}>
                        Acıdere Organize Sanayi Bölgesi Mahallesi, Sedef Cad No:9, 01790 Acıdere Osb
                    </Typography>
                </Grid>
                <Grid item className={classes.typographContainer}sm={3} xs={2}>
                    <Typography variant='subtitle2'className={classes.typographRights} >
                        Maxwin2020 © Maxwin. All rights reserved.
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.madeBy} >
                This site made by <span className={classes.span}>© ŞADİ OSMAN </span>  company
            </Typography>
        </div>
    )
}

export default BottomSection
