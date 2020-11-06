import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    typograph:{
        textAlign: 'center'
    }
})

const DocumentsPage = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant='h4' className={classes.typograph}>
                Working on it!
            </Typography>
        </div>
    )
}

export default DocumentsPage
