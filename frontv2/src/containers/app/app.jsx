import React, { Component } from 'react';
import CreatePublication    from './createPublication';
import Header               from '../header/header';
import ListPublication      from "./listPublication";
import Homepage             from "./homepage";
import Find                 from "../find/find";
import AccountEdit from "./account/accountEdit";
import AdminPage from "./adminPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state ={
            page: 'homepage',
            id: props.id,
            rank: props.rank,
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
                page = <Homepage id={this.props.id} username={this.props.username} rank={this.props.rank} email={this.props.email} token={this.props.token}/>
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

            case 'userEdition':
                page = <AccountEdit refreshUser={this.props.refreshUser} deleteAccount={this.props.deleteAccount} id={this.props.id} username={this.props.username} email={this.props.email} token={this.props.token} />
                break;

            case 'adminPage':
                if (this.state.rank === 0) {
                    this.setState({page: 'homepage'});
                } else {
                    page = <AdminPage userId={this.props.id} username={this.props.username} email={this.props.email} token={this.props.token} />
                }
                break;

            case 'logout':
                this.props.logout();
                break;

            default:
                break;
        }

        return <div>
            <Header changePage={this.handleChangePage.bind(this)} rank={this.state.rank} active={this.state.page}/>
            {page}
        </div>
    }
}

export default App;