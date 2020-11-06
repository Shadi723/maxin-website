import React, { useEffect, useState } from 'react';
import CarouselComponent from '../Components/CarouselHeadComponent';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Darwin from '../assets/photos/darwin.jpg';
import {  CircularProgress, Container, Grid } from '@material-ui/core';
import {
  Typography
} from "@material-ui/core";
import NewsComponent from '../Components/NewsComponent';
import { getNews } from '../Firebase/NewsFirestore';
import { News } from '../Models/News';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    box: {
      background: 'radial-gradient(circle 600px at center,#de3c38 47%,#c11d19 100%)',
      height: '150px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center'
    },
    typography: {
      color: 'white',
      textAlign: 'center',
      fontFamily: 'proxima100',
      margin: 'auto',
      textShadow: '0px 0px 10px #0e3fa2',
      '@media (max-width:1055px)':{
        fontSize: '24px',
      },
      '@media (max-width:745px)':{
        fontSize: '18px',
      },
      '@media (max-width:558px)':{
        fontSize: '14px',
      },
      '@media (max-width:435px)':{
        fontSize: '10px',
      },
      '@media (max-width:310px)':{
        fontSize: '7px',
      },
    },
    middleRoot:{
      flexGrow: 1,
      margin: '40px auto'
    },
    video:{
      borderRadius: '30px',
      width: '300px',
      height: '300px',
      margin:'auto',
      [theme.breakpoints.down('sm')]:{
        width: 'auto',
        height: 'auto',
      },
      [theme.breakpoints.down('xs')]:{
        width: '80%',
        height: 'auto',
      },
    },
    imagePaper:{
      display:'inline'
    },
    imageContainer:{
      position:'relative',
      color: 'white',
      textAlign:'start',
    },
    overImage:{
      position: 'absolute',
      top:'16%',
      left: '5%',
      width: '50%',
      height: '40%',
    },
    head1:{
      fontSize: '14px',
      '@media (max-width:951px)':{
        fontSize: '11px',
      },
      '@media (max-width:860px)':{
        fontSize: '8px',
      },
      '@media (max-width:600px)':{
        fontSize: '14px',
      },
      
      '@media (max-width:501px)':{
        fontSize: '9px',
      },
    },
    head2:{
      fontSize: '15px',
      fontWeight: 'bold',
      '@media (max-width:951px)':{
        fontSize: '12px',
      },
      '@media (max-width:860px)':{
        fontSize: '8.5px',
      },
      '@media (max-width:600px)':{
        fontSize: '15px',
      },
      
      '@media (max-width:501px)':{
        fontSize: '10px',
      },
    },
    head3:{
      fontSize: '13px',
      '@media (max-width:1190px)':{
        fontSize: '9.8px',
      },
      '@media (max-width:951px)':{
        fontSize: '10px',
      },
      '@media (max-width:860px)':{
        fontSize: '6px',
      },
      '@media (max-width:600px)':{
        fontSize: '11px',
      },
      '@media (max-width:501px)':{
        fontSize: '8px',
      },
    },
    gridContainer:{
      margin: '8px 0px 8px 0px'
    },
    loadingDiv:{
        position: 'relative',
        left: '50%',
        top: '50%',
    },
  })
);
const HomeComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => {
    getNews('/website/maxwin/news/')
      .then((result) =>{
        setNews(result);
        setLoading(false);
      })
      .catch((err) =>{
        setLoading(false);
        console.log(err);
      })
  }, [])
  return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
    <div className={classes.root} >
        <CarouselComponent />
        <div  className={classes.box}>
          <Typography variant='h4' className={classes.typography}>
            Üstün Teknoloji ve Uluslararası İhracat Ağı ile Dünya’ya Hizmet Veriyoruz.
          </Typography>  
        </div>
        <Grid container justify='center' spacing={2} className={classes.middleRoot}>
          <Grid item xs={12} sm={6}  className={classes.imageContainer} >
            <CardMedia src={Darwin} component="img" className={classes.imagePaper}/>
            <Container className={classes.overImage}>
              <Typography variant='h6' className={classes.head1}>
                Dünya’nın Penceresi
              </Typography>
              <Typography variant='h5' className={classes.head2}>
                Maxwin İle Evlere Takılıyor.
              </Typography>
              <Typography variant='body1' className={classes.head3}>
                6000 m2 Alman Makina Parkurumuz ve 250 kalifiye 
                çalışan son teknoloji üretim tesisimiz ile Adana’dan dünya’ya 
                açılan pencereler Maxwin ile üretilip evlerimize takılıyor.
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6}  >
            <CardMedia src='https://www.youtube.com/embed/vv2yGhtbGCM' component="iframe"  className={classes.video}/>
          </Grid>
        </Grid>
        <Grid container  justify='center' spacing={2} className={classes.gridContainer} >
          {
            news.map((info, index) =>
              index < 4 ? <NewsComponent imageTitle={info.imageTitle} imageUrl={info.imageUrls[0]!} description={info.imageTitle} id={info.id}/>
                        : null
            )
          }
        </Grid>

    </div>
  )
}

export default HomeComponent


/*
<Grid container  className={classes.middleRoot} spacing={1} justify='center'>
        <Grid item xs={12} md={6} className={classes.paper} >
          <CardMedia src={Darwin} component="img"  />
        </Grid>
        <Grid item xs={12} md={6} >
          <CardMedia src='https://www.youtube.com/embed/vv2yGhtbGCM' component="iframe" className={classes.paper} />
        </Grid>
      </Grid>
*/