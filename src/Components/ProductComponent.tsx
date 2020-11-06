import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ImLogo  from '../assets/photos/projects/project.jpg';

interface IProps{
    basicImage: string | null;
    nameOfProject: string;
    id: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
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

    })
});

const ProductComponent : React.FC<IProps> = ({basicImage, nameOfProject, id}) => {
    const classes= useStyles();
    const [elevation, setElevation] = useState(2)
    const history = useHistory();
    const handleMouseEnter = () => {
        setElevation(10);
    }
    const handleMouseLeave = () => {
        setElevation(2);
    }

    const handleNavigate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) : void => {
        event.preventDefault();
        history.push(`/pvcprofiles/${id}`);
    }

    return (
        <Grid item xs={6} sm={3} md={3} lg={3} className={classes.container}>
            <Card elevation={elevation } onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CardActionArea onClick={handleNavigate}>
                    <CardMedia image={basicImage ?? ImLogo } className={classes.media} />
                    <CardContent className={classes.name}>
                        {nameOfProject}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default ProductComponent
