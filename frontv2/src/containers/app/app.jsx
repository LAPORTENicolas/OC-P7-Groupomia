import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state({
            id: props.id,
            username: props.username,
            email: props.email,
        })
    }

    render(){
        return <div>test</div>
    }
}

export default App;