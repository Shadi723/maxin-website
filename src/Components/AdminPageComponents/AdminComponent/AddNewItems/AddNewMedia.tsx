import { Button, Grid, InputLabel, makeStyles, Paper, TextField } from '@material-ui/core'
import React, {  useState } from 'react'
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { add_updateMedia } from '../../../../Firebase/MediaFirestore';
import { Media } from '../../../../Models/Media';


const useStyles = makeStyles({
    root:{
        flexGrow: 1,
        width: 'calc(100% - 230px)',
        textAlign: 'center',
        marginLeft: 230
    },
    rootGrid:{
        width: '100%',
        margin: 'auto',
        textAlign: 'center'
    },
    gridItem:{
        margin: '0px auto 30px  auto',
    },
    imageContainer:{
        width: '200px',
        height: '200px',
        margin: '20px',
        borderRadius: '30px'
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: '30px'
    },
    textField:{
        width: 600,
    },
});

const AddNewMedia = () => {
    const[selectedImage, setSelectedImage] = useState('');
    const[name, setName] = useState('');
    const[file, setFile] = useState<File | null>(null);
    const classes = useStyles();
    const history = useHistory();

    const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        event.preventDefault();
        if(event.target.files !== null && event.target.files[0] !== undefined) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file)
            setFile(file);
            setSelectedImage(url);
            //console.log(event.target.files);
        }
        
    }
    const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) : void => {
        event.preventDefault();
        URL.revokeObjectURL(selectedImage);

    }
    

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) : void => {
        event.preventDefault();
        let id = uuidv4();
        //TODO: implementing add new product to firestore 
        let media = new Media(name, selectedImage, id);
        add_updateMedia('/website/maxwin/media/', media , file, history)
        console.log('success to save to firestore');
        
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        event.preventDefault();
        setName(event.target.value);
        
    }

    return (
        <div className={classes.root}>
            <Grid container direction='column' justify='center' className={classes.rootGrid}>
                <Grid item className={classes.gridItem}>
                        <Paper className={classes.imageContainer} elevation={0}>
                            {
                                selectedImage !== '' ? <img src={selectedImage} alt='' className={classes.image}
                                                    onLoad={handleOnLoad}/>
                                                    :
                                                    null
                            }
                        </Paper>
                        <InputLabel  >
                            <input type='file' 
                                style={{display:'none'}} onChange={handleSelectImage}/>
                            <Button color="secondary"  variant="contained" component="span" >
                                Select Photo
                            </Button>
                        </InputLabel>

                </Grid>
                <Grid item className={classes.gridItem}>
                    <TextField   onChange={handleNameChange} placeholder='Media Name'/>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <Button color='primary' variant='outlined' onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}


export default AddNewMedia
