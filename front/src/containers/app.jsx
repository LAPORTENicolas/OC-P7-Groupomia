import React, { Component } from 'react';
import Header               from './header/header'
import Filtre               from './filtre/filtre'
import FindBar              from './module/findBar';
import Create               from './create/create';
import userEdition          from './userEdition/userEdition';
import UserEdition from "./userEdition/userEdition";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'userEdition',
            user: props.username,
            userId: props.userId,
            token: props.token
        }
    }

    changePage(page) {
        this.setState({page: page})
    }

    render() {
        let page;
        switch (this.state.page) {
            case "homepage":
                page = <> <Filtre/> <FindBar/> </>
                break

            case "create":
                page = <> <Create getHeader={this.props.getHeader} userId={this.props.userId}/> </>
                break;

            case 'userEdition':
                page = <> <UserEdition deleteAccount={this.props.deleteAccount} getHeader={this.props.getHeader} username={this.props.username} userId={this.props.userId} token={this.props.token} /> </>
                break;

            default:
                break;
        }
        return <div>
            <Header logout={this.props.logout} changePage={this.changePage.bind(this) }/>
            {page}
        </div>
    }
}

export default App;