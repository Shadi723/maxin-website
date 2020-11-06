import { CircularProgress, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import CarouselNewsComponent from '../../../Components/CarouselNewsComponent';
import { Details } from '../../../Models/Details';
import { getCoporateInfo } from '../../../Firebase/CoporateFirestore';
import parser from 'html-react-parser';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        carousel:{
            margin: '30px 10px 30px 30px'
        },
        typograph:{
            margin: '5px 30px 0px 0px'
        },
        headers:{
          fontWeight: 'bold',
          marginTop: 10
        },
        info:{
          margin: 'auto'
        },
        loadingDiv:{
          position: 'relative',
          left: '50%',
          top: '50%',
        },
        
    })
);



const MissionVision:React.FC = () => {
    
    const classes = useStyles();
    const [details, setDetails] = useState<Details >(new Details('', ''));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getCoporateInfo('/website/maxwin/information/mission')
        .then((result) =>{
          if(result !== undefined){
            setDetails(result);
            setLoading(false);
          }
        })
        .catch((err) =>{
          console.log(err);
          setLoading(false);
        })
    }, [])

    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        <div>
            <Grid container >
                <Grid item xs={12} sm={5}>
                   <Box className = {classes.carousel}>
                       <CarouselNewsComponent  showArros={false} showThums={false} images={[details.imgUrl]} />
                   </Box>
                </Grid>
                <Grid item xs={12} sm={7} className={classes.info}>
                    <Typography>
                      {
                        parser(details.description)
                      }
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default MissionVision
