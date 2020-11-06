import { CircularProgress, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps,  } from 'react-router-dom'
import CarouselNewsComponent from '../Components/CarouselNewsComponent'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import parse from 'html-react-parser'
import { getProduct } from '../Firebase/ProductFirestore'
import { Product } from '../Models/Product'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        carousel:{
            margin: '30px 10px 30px 30px'
        },
        typograph:{
            margin: '30px 30px 30px 0px'
        },
        loadingDiv:{
            position: 'relative',
            left: '50%',
            top: '50%',
        },
    })
);

interface IProps{
    id: string,
}
const ProductPage :React.FC<RouteComponentProps<IProps>> = ({match}) => {
   const classes = useStyles();
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let id = match.params.id;
        console.log(match);
        getProduct('/website/maxwin/products', id)
            .then((result) => {
                if(result !== undefined){
                    setProduct(result);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
        
    }, [match])
    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        product !== undefined ? <div>
            <Grid container >
                <Grid item xs={12} sm={4}>
                   <Box className = {classes.carousel}>
                       <CarouselNewsComponent  showArros={false} showThums={true} images={product.imageUrls} />
                   </Box>
                </Grid>
                <Grid item xs={12} sm={8}>

                    <Typography variant='body2' className={classes.typograph}>
                        {
                            parse(product.productDetails)
                        }
                    </Typography>
                </Grid>
            </Grid>
        </div>
        :
            null
    )
}


export default ProductPage
