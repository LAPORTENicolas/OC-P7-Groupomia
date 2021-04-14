import React, { Component } from 'react';
import Loader               from '../../component/loader/loader';

class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            publication: '',
        }
    }

    componentDidMount() {
        const header = this.props.getHeader();
        fetch('http://localhost:3001/publication/getAll', {method: 'GET', headers: header})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(data => this.setState({publication: data, isLoaded: true}));
                }
            })
    }

    render() {
        if (this.state.error){
            return <h1>Aie Aie: {this.state.error}</h1>
        } else if (!this.state.isLoaded){
            return <Loader />
        } else {
            const publication = this.state.publication.map((val, key) => {
                const date      = new Date(val.date_post).toLocaleDateString();
                console.log(val.file);
                //const dateText  = date.toLocaleString();
                return <div className="card center border-0 col-10 mt-3">
                    {val.file ? <img src={''} className="card-img-top" alt="..."/> : null}
                    <div className="card-body bg-light shadow-sm">
                        <p className="card-text">{val.description}</p>
                        <p>Poster par {val.usernameUser} le {date}</p>
                        <p className="btn btn-primary">Afficher les commentaires</p>
                    </div>
                </div>
            })
            return <div className='container container-center'>
                {publication}
            </div>
        }
    }
}

export default Feed;