import { Button, CircularProgress, Grid, InputLabel, makeStyles, Paper } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import RichTextEditor, { EditorValue , } from 'react-rte';
import CustomRichTextEditor from '../../../Shared/CustomRichTextEditor';
import { add_updateCoporate, getCoporateInfo } from '../../../Firebase/CoporateFirestore';
import { Details } from '../../../Models/Details';

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
        width: '100%'
    },
    imageContainer:{
        width: '200px',
        height: '200px',
        margin: '50px auto',
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
    loadingDiv:{
        position: 'relative',
        left: '50%',
        top: '50%',
    },
});

const EditOurAim = () => {
    const[selectedImage, setSelectedImage] = useState('');
    const[text, setText] = useState('');
    const[file, setFile] = useState<File | null>(null);
    const classes = useStyles();
    const[value, setValue] = useState(RichTextEditor.createEmptyValue());
    const[loading, setLoading] = useState(true);

    const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        event.preventDefault();
        if(event.target.files !== null && event.target.files[0] !== undefined) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file)
            setFile(file);
            setSelectedImage(url);
        }
        
    }
    const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) : void => {
        event.preventDefault();
        URL.revokeObjectURL(selectedImage);

    }
    


    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) : void => {
        event.preventDefault();
        let info = new Details(text, selectedImage);
        add_updateCoporate('/website/maxwin/information/aim',info, file, 'Our Aim');
        console.log('success to save to firestore');
        
    }

    const handleChange = (value: EditorValue ): void => {
        setValue(value);
        setText(value.toString('html'))
    }

    useEffect( () => {
       getCoporateInfo('/website/maxwin/information/aim')
            .then((result) => {
                console.log(result);
                if(result !== undefined){
                    setValue(RichTextEditor.createValueFromString(result.description, 'html'))
                    setSelectedImage(result.imgUrl)
                    setLoading(false);
                    console.log(result);
                }
                else{
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }, [])

    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        <div className={classes.root}>
            <Grid container direction='column' justify='center' className={classes.rootGrid}>
                <Grid item className={classes.gridItem}>
                    <Paper className={classes.imageContainer} elevation={10}>
                        {
                            selectedImage !=='' ? <img src={selectedImage} alt='' className={classes.image}
                                                   onLoad={handleOnLoad}/>
                                                :
                                                 null
                        }
                    </Paper>
                    <InputLabel  >
                        <input type='file' name='selectImage' id='selectImage' 
                            style={{display:'none'}} onChange={handleSelectImage}/>
                        <Button color="secondary" variant="contained" component="span" >
                            Add Photo
                        </Button>
                    </InputLabel>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <CustomRichTextEditor  value={value} handleChange={handleChange}  placeholder=''/>
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

export default EditOurAim
