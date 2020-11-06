import { CircularProgress, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps  } from 'react-router-dom'
import CarouselNewsComponent from '../Components/CarouselNewsComponent'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import parse from 'html-react-parser'
import { getNew } from '../Firebase/NewsFirestore'
import { News } from '../Models/News'

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
const NewPage :React.FC<RouteComponentProps<IProps>> = ({match}) => {
    const classes = useStyles();
    const [news, setNews] = useState<News>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let id = match.params.id;
        getNew('/website/maxwin/news/',id)
            .then((result) => {
                setNews(result);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
    }, []);
    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        news !== undefined ? <div>
            <Grid container >
                <Grid item xs={12} sm={4}>
                   <Box className = {classes.carousel}>
                       <CarouselNewsComponent  showArros={false} showThums={true} images={news.imageUrls} />
                   </Box>
                </Grid>
                <Grid item xs={12} sm={8}>

                    <Typography variant='body2' className={classes.typograph}>
                        {
                            parse(news.report)
                        }
                    </Typography>
                </Grid>
            </Grid>
        </div>
        : null
    )
}


export default NewPage
