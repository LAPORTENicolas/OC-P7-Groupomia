import React, { Component } from 'react';
import Publication from "./publication/publication";

class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <div className={'container'}>
            <h2>Les dernier publication</h2>
            <Publication userId={this.props.id} username={this.props.username} token={this.props.token}/>
        </div>
    }

}

export default Homepage;