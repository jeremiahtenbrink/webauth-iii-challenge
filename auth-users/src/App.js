import React, { Component }         from "react";
import "./App.scss";
import { Route }                    from "react-router-dom";
import NavbarComponent              from "./navbar/Navbar";
import { NavItem, NavLink, Button } from "reactstrap";
import Home                         from "./home/Home";
import Login                        from "./login/Login";
import Users                        from "./users/Users";
import RequiresAuth                 from "./auth/requiresAuth";

class App extends Component {
    
    state = {
        token: "",
        user:  ""
    };
    
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <NavbarComponent title={ "UsersAuth" }>
                        <NavItem>
                            <NavLink href={ "/" }>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={ "/login" }>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={ "/users" }>Users</NavLink>
                        </NavItem>
                        <Button outline color={ "secondary" }>Logout</Button>
                    </NavbarComponent>
                </header>
                <main>
                    <Route path={ "/" } exact
                           component={ RequiresAuth( Home ) }/>
                    <Route path={ "/login" } component={ Login }/>
                    <Route path={ "/users" }
                           component={ RequiresAuth( Users ) }/>
                </main>
            </div>
        );
    }
}

export default App;
