import React     from "react";
import PropTypes from "prop-types";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from "reactstrap";

export default class NavbarComponent extends React.Component {
    
    state = {
        isOpen: false,
    };
    
    toggle() {
        this.setState( {
            isOpen: !this.state.isOpen
        } );
    }
    
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">{ this.props.title }</NavbarBrand>
                    <NavbarToggler onClick={ this.toggle }/>
                    <Collapse isOpen={ this.state.isOpen } navbar>
                        <Nav className="ml-auto" navbar>
                            { this.props.children }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

NavbarComponent.propTypes = {
    title:    PropTypes.string.isRequired,
    children: PropTypes.arrayOf( PropTypes.node ) | PropTypes.node,
};