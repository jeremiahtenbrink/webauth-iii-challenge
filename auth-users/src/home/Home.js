import React, { Component } from "react";
import axios                from "axios";
import { Card, CardBody }   from "reactstrap";
import CardHeader           from "reactstrap/es/CardHeader";
import Row                  from "reactstrap/es/Row";
import Col                  from "reactstrap/es/Col";

class Home extends Component {
    
    state = {
        user: {},
    };
    
    componentDidMount() {
        axios.get( "/users/me" ).then( res => {
            this.setState( { user: res.data } );
            localStorage.setItem( "user_auth-user", res.data );
        } ).catch( err => {
            console.log( err );
        } );
    }
    
    render() {
        return (
            <Row>
                <Col sm={ 12 } md={ { size: 5, offset: 2 } }>
                    <Card>
                        <CardHeader>
                            { this.state.user
                              ? `${ this.state.user.first_name } ${ this.state.user.last_name }`
                              : "Unknown User" }
                        </CardHeader>
                        <CardBody>
                            { this.state.user ?
                              <p>{ this.state.user.address }</p>
                                              : "" }
                            { this.state.user ?
                              <p>{ this.state.user.created_at }</p>
                                              : "" }
                            { this.state.user ?
                              <p>{ this.state.user.updated_at }</p>
                                              : "" }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Home;