import { Button, Grid, InputLabel, makeStyles, Paper, TextField } from '@material-ui/core'
import React, {  useState } from 'react'
import { add_updateProducts } from '../../../../Firebase/ProductFirestore'
import  RichTextEditor, { EditorValue , } from 'react-rte';
import { v4 as uuidv4 } from 'uuid';
import CustomRichTextEditor from '../../../../Shared/CustomRichTextEditor';
import { Product } from '../../../../Models/Product';
import { useHistory } from 'react-router-dom';


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
    gridRichText:{
        margin: '0px auto 30px  auto',
        width: '100%'
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

const AddNewProduct = () => {
    const[selectedImages, setSelectedImages] = useState<string[]>([]);
    const[text, setText] = useState('');
    const[name, setName] = useState('');
    const[files, setFiles] = useState<File[]>([]);
    const classes = useStyles();
    const[value, setValue] = useState(RichTextEditor.createEmptyValue());
    const history = useHistory();
    const photos = ['0' ,'1', '2', '3']

    const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>, id: number) : void => {
        event.preventDefault();
        if(event.target.files !== null && event.target.files[0] !== undefined) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file)
            setFiles([...files, files[id] = file]);
            setSelectedImages([...selectedImages, selectedImages[id] = url]);
            //console.log(event.target.files);
        }
        
    }
    const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) : void => {
        event.preventDefault();
        selectedImages.map(photo => URL.revokeObjectURL(photo));

    }
    

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) : void => {
        event.preventDefault();
        let id = uuidv4();
        //TODO: implementing add new product to firestore 
        let product = new Product(selectedImages, name, id, text);
        add_updateProducts(`/website/maxwin/products/${id}`,product, files, history);
        console.log('success to save to firestore');
    }

     const handleChange = (value: EditorValue ): void => {
        setValue(value);
        setText(value.toString('html'))
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        event.preventDefault();
        setName(event.target.value);
        
    }

    return (
        <div className={classes.root}>
            <Grid container direction='column' justify='center' className={classes.rootGrid}>
                <Grid item className={classes.gridItem}>
                    <Grid container justify='space-between'>

                        {
                            photos.map((_, index) => (
                                <Grid item className={classes.gridItem} key={index}>
                                    <Paper className={classes.imageContainer} elevation={0}>
                                        {
                                            selectedImages !== [] ? <img src={selectedImages[index]} alt='' className={classes.image}
                                                                onLoad={handleOnLoad}/>
                                                                :
                                                                null
                                        }
                                    </Paper>
                                    <InputLabel  >
                                        <input type='file' 
                                            style={{display:'none'}} onChange={(event) =>handleSelectImage(event, index)}/>
                                        <Button color="secondary"  variant="contained" component="span" >
                                            Select Photo
                                        </Button>
                                    </InputLabel>
                                </Grid>
                            ))
                        }

                    </Grid>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <TextField   onChange={handleNameChange} placeholder='Product Name'/>
                </Grid>
                <Grid item className={classes.gridRichText}>
                    <CustomRichTextEditor  value={value} handleChange={handleChange}  placeholder='Product Details'/>
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


export default AddNewProduct
