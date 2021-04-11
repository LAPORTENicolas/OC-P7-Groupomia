import React, { Component } from 'react';
import Header               from './header/header'
import Filtre               from './filtre/filtre'
import FindBar              from './module/findBar';
import Create               from './create/create';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'create',
            user: props.user,
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
                page = <> <Create/> </>
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