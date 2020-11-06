import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Coporate, Certificates, Projects, Products, Documents, Media, News, Contacts}  from '../../Infos/NavBarInfo';
import NavBarItem from './MenuItems/NavBarItem';
import {AppBar, Paper, Toolbar, } from '@material-ui/core'
import Logo from '../../assets/photos/appbarLogo.png';
import Head from '../../assets/photos/head.jpg'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundImage: `url(${Head})`,
      margin: '0 auto',
      width: '100%',
      
    },
    appbar: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: ' 80%',
        margin: 'auto',
        
      },
    logo: {
      width: '15%',
      cursor: 'pointer',
      zIndex:9999,

    },
    toolbar: {
      backgroundColor: 'transparent',
      justifyContent:'space-between',
      },
    paper: {
      backgroundColor: 'blue',
      zIndex:9999,
      borderRadius: 30
    },

  }),
);


const CustomeAppBar = () => {

  const history = useHistory();
  const [hide, setHide] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    let url = history.location.pathname;
    if(url.includes('/admin'))
      setHide(true);
    else
      setHide(false);
  }, [history.location.pathname])
  return (
    hide? null: 
    <div className={ classes.root}>
      <AppBar className={classes.appbar} position='static' elevation={0}>
        <Toolbar className={classes.toolbar}>
          <img src={Logo} alt='Logo' className={classes.logo} onClick={() => history.push('/')}/>
          <Paper className={classes.paper} elevation={10}>
            <NavBarItem title='Coporate' childrens={Coporate} style={{marginLeft: 15}}/>
            <NavBarItem title='Products' childrens={Products}  />
            <NavBarItem title='Projects' childrens={Projects} />
            <NavBarItem title='Certificates' childrens={Certificates} />
            <NavBarItem title='Documents' childrens={Documents} />
            <NavBarItem title='Media' childrens={Media} />
            <NavBarItem title='News' childrens={News} />
            <NavBarItem title='Contact' childrens={Contacts}  style={{marginRight: 15}}/>
          </Paper>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default CustomeAppBar
