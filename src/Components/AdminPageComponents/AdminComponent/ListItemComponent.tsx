import { makeStyles, Popper, MenuList, MenuItem, Button, Fade} from '@material-ui/core'
import React from 'react'
import Arrow from '@material-ui/icons/ArrowForwardIosRounded'
import { useState } from 'react';
import { Link } from 'react-router-dom';


interface IProps{
    title: string,
    elements: string[],
}


const useStyles = makeStyles({
    root:{
        backgroundColor: 'blue',
        width: '230px',
        height: '50px',
        color:' white',
        margin: '2px auto',
        borderRadius: '0px 10px 10px 0px',
        fontSize: 16,
        justifyContent: 'left',
    },
    rootOpen: {
        width: '230px',
        height: '50px',
        color: 'white',
        backgroundColor: 'red',
        margin: '2px auto',
        borderRadius: '0px 10px 10px 0px',
        fontSize: 16,
        justifyContent: 'left',
        '&:hover': {
            backgroundColor: 'red',
        },
    },
    icon:{
        color:'white'
    },
    option:{
        color:'white',
        marginLeft: 0,
        '&:hover':{
            backgroundColor: '#FFA07A'
        }
    },
    menuList:{
        backgroundColor: 'red',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
});

const ListItemComponent:React.FC<IProps> = ({title, elements}) => {

    
    const[open, setOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseEnter = (event: React.MouseEvent<EventTarget>) : void => {
        setOpen(true);
    }
    const handleMouseLeave = (event: React.MouseEvent<EventTarget>) : void => {
        setOpen(false);
    }

    const classes = useStyles();


    return (
        <div>
            <Button  className={open? classes.rootOpen: classes.root}
                ref={anchorRef}
                size='small'
                variant='text'
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}>
                {
                elements.length === 0 ? 
                    <Link className={classes.link}  to={`/admin/${title.split(' ').join('').toLowerCase()}`} >{title}</Link>
                :
                title
                }
                {
                    open? <Arrow /> : null
                }
                
            </Button>
            <Popper 
                open={open} 
                anchorEl={anchorRef.current} 
                placement='right'
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                transition
                >
                {
                    ({TransitionProps}) =>(
                        <Fade {...TransitionProps} timeout={350}>
                            <MenuList id="menu-list" className={classes.menuList}>
                                {
                                    elements.map((element) => (
                                        <MenuItem className={classes.option} >
                                            <Link className={classes.link} to={`/admin/${element.split(' ').join('').toLowerCase()}`} >{element}</Link>
                                        </MenuItem>
                                    ))
                                }
                            </MenuList>
                        </Fade>
                    )
                }
            </Popper>
        </div>
    )
}

export default ListItemComponent
