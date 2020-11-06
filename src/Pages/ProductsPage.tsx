import {Typography , Grid, CircularProgress} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import { getProducts } from '../Firebase/ProductFirestore';
import { Product } from '../Models/Product';
import ProductComponent from '../Components/ProductComponent';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root:{
            flexGrow: 1
        },
        label:{
            textAlign: 'center',
        },
        name:{
            textAlign:'center',
            fontWeight:'bolder'
        },
        media:{
            height: 145,
            margin: '10px'
        },
        container:{
            margin: '10px'
        },
        loadingDiv:{
            position: 'relative',
            left: '50%',
            top: '50%',
        },

    })
});

const ProductsPage: React.FC = () => {
    const classes= useStyles();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
            getProducts('website/maxwin/products/')
                .then((result) => {
                    setProducts(result);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })

    }, []);
    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        <div>
            <Typography variant= 'h3' className={classes.label}>
               Products
            </Typography>
            <Grid container justify='center' >
                {
               products.map((product) =>
                    <ProductComponent 
                        key={product.id} 
                        basicImage = {product.imageUrls[0]}  
                        nameOfProject={product.productName} 
                        id = {product.id}/>
               )
            }
            </Grid>
        </div>
    )
}

export default ProductsPage
