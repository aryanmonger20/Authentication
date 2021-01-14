import Header from "./components/layouts/Header"
import UserContext from "./context/UserContext"
import "./style.css"
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from "./components/pages/Home"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"


export default function App() {
  //const [userData,setUserData]=useState
  return (
    <div>
        <BrowserRouter>
        <Header>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path ="/login" component ={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </Header>
        </BrowserRouter>
    </div>
  )
}
