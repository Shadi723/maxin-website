import {Fab, Grid, makeStyles, Snackbar, } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../Firebase/ProductFirestore';
import { Product } from '../../../Models/Product';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import ProductComponent from '../AdminComponent/ShowItem/ProductComponent';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
    root:{
        flexGrow: 1,
        width: 'calc(100% - 230px)',
        marginLeft: 230,
        margin: 'auto',
    },
    fab:{
        textAlign: 'right',
        marginRight: 20,
        marginTop: 20,
    },
    loadingDiv:{
        position: 'relative',
        left: '50%',
        top: '50%',
    },
});

const EditProducts = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [severity, setSeverity] = useState<Color>();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const history = useHistory();


    const handleOpenAdd = () : void => {
        setOpen(false);
        history.push('/admin/pvcprofiles/addnew');
    }


    const handleEdit = (event: React.FormEvent<HTMLButtonElement>, id: string) : void => {
        event.preventDefault();
        // TODO: we have to add the id of project or product
        history.push(`/admin/pvcprofiles/${id}`)
    }

    const handleDelete = (event: React.FormEvent<HTMLButtonElement>, id: string) : void => {
        event.preventDefault();
        // TODO: we have to add the id of project or product
        deleteProduct('/website/maxwin/products/', id)
            .then((v) => setProducts(products.filter((value) => value.id !== id)))
            .catch((err)=>console.log(err));
    }

    useEffect(() => {
        getProducts('/website/maxwin/products/')
            .then((result) => {
                if(result.length !== 0){
                    setProducts(result);
                    setLoading(false);
                }else{
                    setSeverity('info');
                    setSnackBarMessage('No products available');
                    setLoading(false);
                    setOpenSnackBar(true);
                    
                }
            })
            .catch((error) =>{
                setSeverity('error');
                setSnackBarMessage(error);
                setOpenSnackBar(true);
                setLoading(false);
            })
    }, [ products])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackBar(false);
    };

    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        <div className={classes.root}>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
            <div className={classes.fab}>
                <Fab color="primary" onClick={handleOpenAdd} >
                    <AddIcon />
                </Fab>
            </div>
            {
                open?
                    (
                    <Grid container justify='center'  direction= 'row'>
                        {
                        products.map((product) =>
                                <ProductComponent 
                                    product={product}
                                    handleEdit = {handleEdit}
                                    handleDelete ={handleDelete} />
                        )}
                    </Grid>
                ) : null
            }
            
        </div>
    )
}

export default EditProducts
