import React, { Component } from 'react';
import CreatePublication    from './createPublication';
import Header               from '../header/header';
import ListPublication      from "./listPublication";
import Homepage             from "./homepage";
import Find                 from "../find/find";

class App extends Component {
    constructor(props) {
        super(props);
        this.state ={
            page: 'homepage',
            id: props.id,
            username: props.username,
            email: props.email,
            token: props.token,
        }
    }

    handleChangePage(page){
        this.setState({page: page});
    }

    render(){
        let page = '';

        switch (this.state.page){
            case 'homepage':
                page = <Homepage id={this.props.id} username={this.props.username} email={this.props.email} token={this.props.token}/>
                break;

            case 'find':
                page = <Find id={this.props.id} username={this.props.username} email={this.props.email} token={this.props.token}/>
                break;

            case 'createPublication':
                page = <CreatePublication id={this.props.id} username={this.props.username} email={this.props.email} token={this.props.token} />
                break;

            case 'listPublications':
                page = <ListPublication userId={this.props.id} username={this.props.username} email={this.props.email} token={this.props.token}/>
                break;

            case 'logout':
                this.props.logout();
                break;

            default:
                break;
        }

        return <div>
            <Header changePage={this.handleChangePage.bind(this)} active={this.state.page}/>
            {page}
        </div>
    }
}

export default App;