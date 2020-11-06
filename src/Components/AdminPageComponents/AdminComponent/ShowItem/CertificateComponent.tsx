import { Button, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Card } from '@material-ui/core';
import React, { useState } from 'react'
import { Certificate } from '../../../../Models/Certificate'

const useStyles = makeStyles({

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
    cardActions:{
        backgroundColor:' red',
        justifyContent: 'center',
        width: 'auto',
        bottom: 0
    },
    cardButton:{
        color: 'white',
    },
});

interface IProps {
    certificate: Certificate;
    handleEdit(event: React.FormEvent<HTMLButtonElement>, id: string) : void;
    handleDelete(event: React.FormEvent<HTMLButtonElement>, id: string): void;
}

const CertificateComponent:React.FC<IProps> = ({certificate, handleEdit, handleDelete}) => {
    const [elevation, setElevation] = useState(2);

    const handleMouseEnter = () => {
        setElevation(10);
    }
    const handleMouseLeave = () => {
        setElevation(2);
    }
    const classes = useStyles();
    return (
        <Grid item xs={6} sm={3} md={3} lg={3} key={certificate.id} className={classes.container}>
            <Card elevation={elevation } onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CardActionArea>
                    <CardMedia image={certificate.imgUrl} className={classes.media} />
                    <CardContent className={classes.name}>
                        {certificate.certificateName}
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Button onClick={(event) => handleEdit(event, certificate.id)} className={classes.cardButton}>
                        Edit
                    </Button>
                    <Button onClick={(event) => handleDelete(event, certificate.id)} className={classes.cardButton}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CertificateComponent
