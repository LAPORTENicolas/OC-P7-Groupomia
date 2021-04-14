import React, { Component } from 'react';
import Header               from './header/header'
import Filtre               from './filtre/filtre'
import FindBar              from './module/findBar';
import Create               from './create/create';
import UserEdition          from './userEdition/userEdition';
import Feed                 from './feed/feed';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'homepage',
            username: props.username,
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
                page = <> <Filtre/> <FindBar/> <Feed getHeader={this.props.getHeader}/> </>
                break

            case "create":
                page = <> <Create token={this.props.token} getHeader={this.props.getHeader} username={this.props.username} userId={this.props.userId}/> </>
                break;

            case 'userEdition':
                page = <> <UserEdition deleteAccount={this.props.deleteAccount} getHeader={this.props.getHeader} username={this.props.username} userId={this.props.userId} email={this.props.email} token={this.props.token} /> </>
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