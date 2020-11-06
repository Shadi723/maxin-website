import {  makeStyles, Drawer, List, Typography, Button, CircularProgress, } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import ListItemComponent from '../Components/AdminPageComponents/AdminComponent/ListItemComponent';
import { Coporate, Certificates, Contacts, Documents, Media, News, Products, Projects } from '../Infos/NavBarInfo';
import { AddNewCertificate, AddNewInner, AddNewMedia, AddNewNew, AddNewOuter, AddNewProduct} from '../Components/AdminPageComponents/AdminComponent/AddNewItems/AddNewItem'
import { EditNew, EditCertificate, EditInnerProject, EditMedia, EditOuterProject, EditProduct } from '../Components/AdminPageComponents/AdminComponent/EditItem/EditItem';
import { EditAbout, EditAllMedia, EditCertificates, EditInnerProjects, EditMission, EditNews, EditOurAim, EditOuterProjects, EditProducts } from '../Components/AdminPageComponents/AdminPages/AdminPages';
import LoginForm from '../Components/LoginForm';
import { auth, signOut } from '../Firebase/LoginFirebase';

const useStyles = makeStyles({
    root:{
        flexGrow: 1
    },
    sideBar:{
        margin: 'auto'
    },
    paper:{
        height: '100%',
        width: '100%'
    },
    list:{
        margin: 'auto',
        justifyContent: 'start',
        textAlign: 'left',
    },
    drawer: {
      flexShrink: 0,
      zIndex: -1,
    },
    loadingDiv:{
        position: 'relative',
        left: '50%',
        top: '50%',
    },
    
});

const AdminPage = () => {

    const classes= useStyles();
    const [login, setLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const unsubscribe =  auth.onAuthStateChanged((user) =>{
            if(user)
                {   console.log(user);
                    setLogin(false);
                    setLoading(false);
                }
            else
                setLogin(true)
                setLoading(false);
       })
       return () => unsubscribe();
    }, [])

    return (
        loading? <div className={classes.loadingDiv}><CircularProgress /></div> :
        !login? <div className={classes.root}>
            <header>
                <Typography variant='h5' style={{textAlign: 'center', margin: 10, fontWeight: 'bold'}}>
                    Admin Panel
                </Typography>
                <Button
                    style={{position: "absolute", right: 10}} 
                    onClick={signOut} 
                    variant='contained' 
                    color='secondary'>
                    sign out
                </Button>

            </header>
            <Drawer variant='permanent'  className={classes.drawer}>
                <List className={classes.list}>
                    <ListItemComponent title='Edit Coporate' elements={Coporate} />
                    <ListItemComponent title='Edit Products' elements={Products} />
                    <ListItemComponent title='Edit Projects' elements={Projects} />
                    <ListItemComponent title='Edit Certificates' elements={Certificates}  />
                    <ListItemComponent title='Edit Documents' elements={Documents}  />
                    <ListItemComponent title='Edit Media' elements={Media}  />
                    <ListItemComponent title='Edit News' elements={News}  />
                    <ListItemComponent title='Edit Contact' elements={Contacts}  />
                </List>
            </Drawer>
            <Switch>
                <Route path='/admin/aboutus'  component ={EditAbout} />
                <Route path='/admin/missionandvision'  component ={EditMission} />
                <Route path='/admin/ouraim'  component ={EditOurAim} />
                <Route path='/admin/pvcprofiles' exact component ={EditProducts} />
                <Route path='/admin/pvcprofiles/addnew'  component ={AddNewProduct} />
                <Route path='/admin/pvcprofiles/:id'  component ={EditProduct} />
                <Route path='/admin/innerprojects' exact component={EditInnerProjects}  />
                <Route path='/admin/outerprojects' exact component={EditOuterProjects}  />
                <Route path='/admin/innerprojects/addnew'  component={AddNewInner}  />
                <Route path='/admin/outerprojects/addnew'  component={AddNewOuter}  />
                <Route path='/admin/innerprojects/:id'  component={EditInnerProject}  />
                <Route path='/admin/outerprojects/:id'  component={EditOuterProject}  />
                <Route path='/admin/editcertificates'  exact component={EditCertificates} />
                <Route path='/admin/editcertificates/addnew'   component={AddNewCertificate} />
                <Route path='/admin/editcertificates/:id'   component={EditCertificate} />
                <Route path='/admin/editdocuments'   />
                <Route path='/admin/editmedia' exact component={EditAllMedia} />
                <Route path='/admin/editmedia/addnew'  component={AddNewMedia} />
                <Route path='/admin/editmedia/:id'  component={EditMedia} />
                <Route path='/admin/editnews' exact component={EditNews}  />
                <Route path='/admin/editnews/addnew'  component={AddNewNew}  />
                <Route path='/admin/editnews/:id'  component={EditNew}  />
                <Route path='/admin/editcontact'   />
            </Switch>

        </div>
        :
        <LoginForm />

    )
}

export default AdminPage