import { Button, Grid, InputLabel, makeStyles, Paper, TextField } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import CustomRichTextEditor from '../../../../Shared/CustomRichTextEditor';
import RichTextEditor, { EditorValue } from 'react-rte';
import { Project } from '../../../../Models/Project';
import { useHistory } from 'react-router-dom';
import { add_updateOuterProjects, getOuterProject } from '../../../../Firebase/OuterProjectsFirestore';



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

const EditOuterProject:React.FC = () => {

    const[selectedImages, setSelectedImages] = useState<string[]>([]);
    const[text, setText] = useState('');
    const[name, setName] = useState('');
    const[files, setFiles] = useState<File[]>([]);
    const[project, setProject]= useState<Project>();
    const classes = useStyles();
    const[value, setValue] = useState(RichTextEditor.createEmptyValue());
    const photos = ['0' ,'1', '2', '3']

    const history = useHistory();

    const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>, id: number) : void => {
        event.preventDefault();
        if(event.target.files !== null && event.target.files[0] !== undefined) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file)
            setFiles([...files, files[id] = file]);
            setSelectedImages([...selectedImages, selectedImages[id] = url]);
        }
        
    }
    const handleOnLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) : void => {
        event.preventDefault();
        selectedImages.map(photo => URL.revokeObjectURL(photo));

    }
    

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) : void => {
        event.preventDefault();
        let url = history.location.pathname.split('/');
        let id = url[url.length - 1];
        //TODO: implementing add new product to firestore 
        let project = new Project(selectedImages, name, id, text, 'Outer Project');
        add_updateOuterProjects(`/website/maxwin/projects/outer/${id}`,project, files, history);        
    }

     const handleChange = (value: EditorValue ): void => {
        setValue(value);
        setText(value.toString('html'))
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        event.preventDefault();
        setName(event.target.value);
        
    }

    useEffect(() => {
        let url = history.location.pathname.split('/');
        let id = url[url.length - 1];
        getOuterProject('/website/maxwin/projects/outer/', id)
            .then((result) => setProject(result))
            .catch((error) => console.log(error));
    }, [history.location.pathname])

    useEffect(() => {
        if(project !== undefined){
            setSelectedImages(project.imageUrls);
            setValue(RichTextEditor.createValueFromString(project.projectDetails, 'html'));
            setName(project.projectName);
        }
    }, [project])

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
                                            selectedImages[index] !== null ?
                                             <img src={selectedImages[index]} alt='' className={classes.image}
                                                            onLoad={handleOnLoad}/>
                                            :
                                            <img src='' alt='' className={classes.image}/>
                                        }
                                    </Paper>
                                    <InputLabel  >
                                        <input type='file' 
                                            style={{display:'none'}} onChange={(event) =>handleSelectImage(event, index)}/>
                                        <Button color="secondary"  variant="contained" component="span" >
                                            Change Photo
                                        </Button>
                                    </InputLabel>
                                </Grid>
                            ))
                        }

                    </Grid>
                </Grid>
              <Grid item className={classes.gridItem}>
                    <TextField   onChange={handleNameChange} placeholder='Project Name' value={name}/>
                </Grid>
                <Grid item className={classes.gridRichText}>
                    <CustomRichTextEditor  value={value} handleChange={handleChange}  placeholder='Project Details'/>
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


export default EditOuterProject
