import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import CustomeAppBar from './Shared/Navbar/CustomeAppBar';
import AboutUs from './Shared/Navbar/Coporate/AboutUs';
import Aim from './Shared/Navbar/Coporate/Aim';
import MissionVision from './Shared/Navbar/Coporate/MissionVision';
import HomePage from './Pages/HomePage';
import BottomSection from './Shared/BottomSection/BottomSection';
import ReadNewsPage from './Pages/ReadNewsPage';
import ProjectsPage from './Pages/ProjectsPage';
import { Grid, makeStyles } from '@material-ui/core';
import CertificationPage from './Pages/CertificationPage';
import DocumentsPage from './Pages/DocumentsPage';
import MediaPage from './Pages/MediaPage';
import ContactPage from './Pages/ContactPage';
import AdminPage from './Pages/AdminPage';
import ProductsPage from './Pages/ProductsPage';
import ProductPage from './Pages/ProductPage';
import ProjectPage from './Pages/ProjectPage';
import NewsPage from './Pages/NewsPage';
import NewPage from './Pages/NewPage';

const useStyles = makeStyles({
  root:{   
    minHeight: '100%'
  },

});

function App() {
  const classes = useStyles();
  return (
    <Router  >
        <Grid container direction='column' justify='space-between' className={classes.root}>
          <Grid item>
            <CustomeAppBar />
          </Grid>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/pvcprofiles' exact component={ProductsPage}/>
            <Route path={`/pvcprofiles/:id`} component={ProductPage}/>
            <Route path='/aboutus' component={AboutUs}/>
            <Route path='/missionandVision' component={MissionVision}/>
            <Route path='/ouraim' component={Aim}/>
            <Route path={`/news/:id`}  component ={ReadNewsPage} />
            <Route path='/innerprojects' exact component = {ProjectsPage} />
            <Route path='/outerprojects' exact component = {ProjectsPage} />
            <Route path={`/innerprojects/:id`} component = {ProjectPage} />
            <Route path={`/outerprojects/:id`} component = {ProjectPage} />
            <Route path='/news' exact component = {NewsPage} />
            <Route path={`/news/:id`} component = {NewPage} />
            <Route path='/certificates' component = {CertificationPage} />
            <Route path='/documents' component = {DocumentsPage} />
            <Route path='/media' component = {MediaPage} />
            <Route path='/contact' component = {ContactPage} />
            <Route path='/admin' component = {AdminPage}  />        
          </Switch>
          <Grid item>
            <BottomSection />
          </Grid>
        </Grid>
    </Router>
  );
}

export default App;
