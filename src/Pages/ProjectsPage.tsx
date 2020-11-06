import {  Typography , Grid, CircularProgress} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import ProjectComponent from '../Components/ProjectComponent';
import { getInnerProjects } from '../Firebase/InnerProjectsFirestore';
import { Project } from '../Models/Project';
import { getOuterProjects } from '../Firebase/OuterProjectsFirestore';

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

const ProjectsPage: React.FC = () => {
    const classes= useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const pathname = history.location.pathname;
    const title = pathname === '/innerprojects' ? 'Inner Projects' : 'Outer Projects';

    useEffect(() => {
        pathname === '/innerprojects' ?
            getInnerProjects('website/maxwin/projects/1/inner/')
                .then((result) => {
                    setProjects(result);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
            :
            getOuterProjects('website/maxwin/projects/0/outer/')
                .then((result) => {
                    setProjects(result);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })

    }, [pathname, projects]);
    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        <div>
            <Typography variant= 'h3' className={classes.label}>
               {title}
            </Typography>
            <Grid container justify='center' >
                {
               projects.map((project) =>
                    <ProjectComponent 
                        key={project.id} 
                        id={project.id}
                        type={pathname}
                        basicImage = {project.imageUrls[0]}  
                        nameOfProject={project.projectName} />
               )
            }
            </Grid>
        </div>
    )
}

export default ProjectsPage
