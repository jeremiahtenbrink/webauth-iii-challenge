import React from "react";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
}            from "reactstrap";
import "./login.scss";
import axios from "axios";

class Login extends React.Component {
    
    state = {
        email:    "",
        password: "",
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    onSubmit = e => {
        e.preventDefault();
        axios.post( "/login", this.state ).then( res => {
            if ( res.data.token ) {
                localStorage.setItem( "token", res.data.token );
                this.props.history.push( "/" );
            }
        } ).catch( err => {
            console.log( err );
        } );
    };
    
    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col sm={ 12 } md={ { size: 6, offset: 3 } }>
                            <Form onSubmit={ this.onSubmit }>
                                <FormGroup>
                                    <Label form={ "email" }>Email</Label>
                                    <Input type={ "email" } name={ "email" }
                                           placeholder={ "...Email" }
                                           value={ this.state.email }
                                           onChange={ this.onChange }
                                    />
                                    <Label form={ "password" }>Password</Label>
                                    <Input type={ "password" }
                                           name={ "password" }
                                           placeholder={ "...password" }
                                           value={ this.state.password }
                                           onChange={ this.onChange }
                                    />
                                    
                                    <Button className={ "margin-top" } block
                                            type={ "submit" }>Login</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                
                </Container>
            </>
        );
    }
}

export default Login;