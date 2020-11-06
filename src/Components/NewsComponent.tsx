import React from 'react'
import {  makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardMedia, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {  useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  rootGrid: {
    heigh: '100%',
    flexGrow: 1,
  },
  root: {
    height: 300,
    borderRadius: 30,
    margin: 'auto',
    position: 'relative'
  },
  media: {
    height: 145,
    margin: 'auto'
  },
  cardAction:{
    backgroundColor:' red',
    justifyContent: 'center',
    width: '95%',
    position: 'absolute',
    bottom: 0
  },
  button:{
    color: 'white',
    justifyContent:'center',
  },
  cardContent:{
    textAlign: 'center'
  }
});

interface IProps {
  imageUrl: string ;
  imageTitle: string;
  description: string;
  id: string;
}

const NewsComponent: React.FC<IProps> = ({description, imageUrl, imageTitle, id}) => {

  let history = useHistory();
  let handleReadNew =function () : void  {
      history.push(`/news/${id}`)
  }
  const classes = useStyles();
  return (
  <Grid item xs={12} sm={6}  md={2} justify='center' className={classes.rootGrid}>
    <Card className={classes.root} elevation={10}>
      <CardActionArea onClick={handleReadNew}>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={imageTitle}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle2" color="textSecondary" component="p" >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button size="small" className={classes.button} onClick={handleReadNew}>
          Read
        </Button>
      </CardActions>
    </Card>
  </Grid>
  )
}

export default NewsComponent
