import Movies from './component/hello'
import Director from './component/details'
import Login from './component/login'
import Header from './component/header'
import Adddirectors from './component/addDrirectors'
import Register from './component/register'
import Moviedetails from './component/Movies'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'


function App() {
    return ( <
        Router >
        <
        Header > < /Header>  <
        Switch >
        <
        Route exact path = "/" >
        <
        Login > < /Login>  <
        /Route >  <
        Route exact path = "/display" >
        <
        Movies > < /Movies>  <
        /Route >  <
        Route exact path = "/movies/:id" >
        <
        Director > < /Director>  <
        /Route > <
        Route exact path = "/AddDirectors" >
        <
        Adddirectors > < /Adddirectors>  <
        /Route > <
        Route exact path = "/register" >
        <
        Register > < /Register>  <
        /Route > <
        Route exact path = "/moviedetails/:id" >
        <
        Moviedetails > < /Moviedetails>  <
        /Route > <
        /Switch>  <
        /Router >
    );
}

export default App;