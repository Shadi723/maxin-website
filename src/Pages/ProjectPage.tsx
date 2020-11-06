import { CircularProgress, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory,  } from 'react-router-dom'
import CarouselNewsComponent from '../Components/CarouselNewsComponent'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import parse from 'html-react-parser'
import { getInnerProject } from '../Firebase/InnerProjectsFirestore'
import { getOuterProject } from '../Firebase/OuterProjectsFirestore'
import { Project } from '../Models/Project'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        carousel:{
            margin: '30px 10px 30px 30px'
        },
        typograph:{
            margin: '30px 30px 30px 0px'
        },
        loadingDiv:{
            position: 'relative',
            left: '50%',
            top: '50%',
        },
    })
);

interface IProps{
    id: string,
}
const ProjectPage :React.FC<RouteComponentProps<IProps>> = ({match}) => {
    const classes = useStyles();
    const [project, setProject] = useState<Project>();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const pathname = history.location.pathname;
    useEffect(() => {
        let id = match.params.id;
        pathname.includes('/innerprojects') ?
            getInnerProject('/website/maxwin/projects/1/inner',id)
                .then((result) => {
                    setProject(result);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
            :
            getOuterProject('/website/maxwin/projects/0/outer', id)
                .then((result) => {
                    setProject(result);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })

    }, [match.params.id, pathname]);
    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        project !== undefined ? <div>
            <Grid container >
                <Grid item xs={12} sm={4}>
                   <Box className = {classes.carousel}>
                       <CarouselNewsComponent  showArros={false} showThums={true} images={project.imageUrls} />
                   </Box>
                </Grid>
                <Grid item xs={12} sm={8}>

                    <Typography variant='body2' className={classes.typograph}>
                        {
                            parse(project.projectDetails)
                        }
                    </Typography>
                </Grid>
            </Grid>
        </div>
        :
            null
    )
}


export default ProjectPage
