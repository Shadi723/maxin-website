import { CircularProgress, GridList, GridListTileBar, Typography } from '@material-ui/core';
import GridListTile from '@material-ui/core/GridListTile';
import { Theme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import { useState } from 'react';
import { getCertificates } from '../Firebase/CertificateFirestore';
import { Certificate } from '../Models/Certificate';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '80%',
      minHeight: '100%',
      justifyContent: 'center',

    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    typograph:{
        fontWeight:'bold',
        textAlign: 'center',
        margin: '50px auto'
    },
    item:{
        cursor: 'pointer',
        margin: '10px',
        borderRadius: '0 0 10px 10px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(255,255,255,0.7)',
    },
    itemBar:{
        borderRadius: '0 0 10px 10px',
        textAlign: 'center'
    },
    loadingDiv:{
        position: 'relative',
        left: '50%',
        top: '50%',
    },
  }),
);


const CertificationPage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [dropImage, setDropImage] = useState('');
    const [certifications, setCertifications] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const openDropback = (cer: Certificate) => {
        setDropImage(cer.imgUrl);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getCertificates('/website/maxwin/certificates/')
            .then((result) =>{
                setCertifications(result);
                setLoading(false);
            })
            .catch((err) =>{
                setLoading(false);
                console.log(err)
            });

    }, [certifications])

    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        <div>
             <Typography variant='h4' className={classes.typograph}>
               Certifications 
            </Typography>
            <div className={classes.root}>
                <GridList cellHeight={300} cols={5} className={classes.gridList}>
                    {
                        certifications.map((cer) => (
                            <GridListTile key={cer.id} className={classes.item} onClick={() => openDropback(cer)}>
                                <img src={cer.imgUrl} alt={cer.certificateName} />
                                <GridListTileBar title={cer.certificateName} className={classes.itemBar}/>
                            </GridListTile>
                        )
                        )
                    }
                </GridList>
            </div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                {
                    dropImage !== '' ?
                    <img src={dropImage} alt={dropImage} />
                    : <CircularProgress />
                }
            </Backdrop>
        </div>
    )
}

export default CertificationPage
