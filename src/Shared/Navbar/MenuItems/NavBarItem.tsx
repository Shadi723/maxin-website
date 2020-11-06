import React from 'react'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import {Link } from 'react-router-dom';

interface IProp {
  childrens: string[],
  title: string,
  style?: object
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: 'white',
      margin: 'auto',
      borderRadius: '0px',
    },
    buttonOpen: {
      color: 'white',
      margin: 'auto',
      backgroundColor: 'red',
      borderRadius: '0px',
      '&:hover': {
        backgroundColor: 'red',
      },
    },

    paper: {
      borderRadius: '0px 0px 5px 5px',
      color: 'white',
      backgroundColor:'red'
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
    root: {
      float: 'left',
      display:'flex',
    },
    menuItem:{
      '&:hover':{
            backgroundColor: '#FFA07A'
      }
    }
  }),
);

const NavBarItem: React.FC<IProp> = ({childrens, title, style}) => {

  const [open, setOpen] = React.useState<boolean>(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = (event: React.MouseEvent<EventTarget>) => {
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    setOpen(false);
  };

  const classes = useStyles();
  
  return (
    <div className={classes.root} style={style}>
      <Button
          size='small'
          variant='text'
          className={open? classes.buttonOpen: classes.button}
          ref={anchorRef}
          disableElevation
          onMouseEnter={handleToggle}
          onMouseLeave={handleClose}
        >
        {
          childrens.length === 0 ? 
            <Link className={classes.link} to={`/${title.toLowerCase()}`} >{title}</Link>
          :
          title  
        }
        </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        onMouseEnter={handleToggle}
        onMouseLeave={handleClose} 
        role={undefined}
        transition
        placement='bottom-start'
        disablePortal
      >
          {({ TransitionProps }) => (
          <Grow
              {...TransitionProps}
            >
              <Paper  className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" >
                    {
                    childrens.map((child) =>
                      <MenuItem className={classes.menuItem}>
                        <Link className={classes.link} to={`/${child.split(' ').join('').toLowerCase()}`} >{child}</Link>
                      </MenuItem>
                    )
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  )
}

export default NavBarItem
