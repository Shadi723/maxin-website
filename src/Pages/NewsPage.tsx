import {  Typography , Grid, CircularProgress} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import NewsComponent from '../Components/NewsComponent';
import { News } from '../Models/News';
import { getNews } from '../Firebase/NewsFirestore';

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

const NewsPage: React.FC = () => {
    const classes= useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        getNews('website/maxwin/news/')
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
        <div >
            <Typography variant= 'h3' className={classes.label}>
               News
            </Typography>
            <Grid container spacing={2} justify='center' >
                {
               news.map((item) =>
                    <NewsComponent 
                        imageTitle={item.imageTitle} 
                        imageUrl={item.imageUrls[0]!} 
                        description={item.imageTitle} 
                        id={item.id}/>
               )
            }
            </Grid>
        </div>
    )
}

export default NewsPage
