import React, { Component } from 'react'
import Header               from 'header/header'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    render() {
        return <Header/>
    }
}