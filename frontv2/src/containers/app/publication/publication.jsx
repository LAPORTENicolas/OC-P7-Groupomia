import React, { Component } from 'react';
import Loader from "../../../component/loader/loader";
import Com from "../com/com";
import Input from "../../../component/input/input";
import Button from "../../../component/input/button";
import Alert from "../../../component/alert/alert";
import Commantary from "../com/com";

class Publication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingCom: false,
            error: false,
            errorMsg: '',
            type: 2,
            userId: props.userId,
            token: props.token,
            searchIndice: 1,
            successCom: false,
            successMessageCom: '',
            like: [],
            form: {
                com: {
                    name: 'com',
                    title: 'Commenter',
                    form: [
                        {
                            type: 'text',
                            name: 'commentaire',
                            value: '',
                            placeholder: 'Commentaire',
                            className: ['form-control big-input'],
                            regExp: '^([a-zA-Z0-9&éèà -_ç()!$,£^¨]+)$'
                        }
                    ]
                },
            }
        }
    }

    handleClick(){
        const state = this.state.searchIndice;
        this.setState({searchIndice: state+1})
    }

    handleChange(val) {
        this.setState({type: val});
    }

    handleLike(key, checked) {
        const userId        = this.state.userId;
        const publicationId = this.state.publication[key].id;
        const url           = checked ? `http://${window.location.host.replace(':3000', ':3001')}/like/delete` : `http://${window.location.host.replace(':3000', ':3001')}/like/new`
        const headers       = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'};
        const data          = {userId: userId, publicationId: publicationId};

        fetch(url, {method: `${checked ? 'DELETE' : 'POST'}`, headers: headers, body: JSON.stringify(data)})
            .then(res => {
                if (res.ok){
                    this.setState({refresh: true})
                }
            })
    }

    componentDidMount() {
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/publication/getAll`;
        const headers   = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}
        const body      = {userId: this.state.userId}

        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(body)})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(json => {
                            this.setState({loading: false, publication: json})
                        })
                } else {
                    this.setState({loading: false, error: true, errorMsg: 'Une erreur est survenue'})
                }
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/publication/getAll`;
        const headers   = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}
        const body      = {userId: this.state.userId}

        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(body)})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(json => {
                            const state = JSON.stringify(this.state.publication);
                            if(state !== JSON.stringify(json)) {
                                this.setState({loading: false, publication: json})
                            }
                        })
                }
            })
    }

    render() {
        // Initilisation des var
        let publication;
        let checked;
        let actualTime  = new Date();
        let dateSearch  = Date.parse(actualTime) - (this.state.searchIndice * 259200000);

        if (this.state.loading === false && this.state.error === false) {

            publication = this.state.publication.map((val, key) => {

                if (Date.parse(val.date_post) > dateSearch) {
                    const date = new Date(val.date_post).toLocaleDateString();
                    if (this.state.type !== 2) {
                        if (this.state.type !== val.onlyText) {
                            return '';
                        }
                    }

                    if (this.state.publication[key].id === val.publicationId && this.state.userId === val.userId){
                        checked = true;
                    } else {
                        checked = false;
                    }

                    return <div className="card center border-0 col-10 mt-3">
                        {val.filePath ? val.filePath.indexOf('.mp4') !== -1 ?
                            <video src={val.filePath} controls>Vidéo non supporte</video> :
                            <img src={val.filePath} className="card-img-top" alt="Image"/> : null}
                        <div className="card-body bg-light shadow-sm">
                            <div className={'container-like row'}>
                                <p className="card-text col-9 col-sm-10 col-md-11">{val.description}</p>
                                <div className="animation__icon col-1">
                                    <label htmlFor={"icon" + val.id}>
                                        <input type="checkbox" id={"icon" + val.id} className="checkbox_cache" defaultChecked={checked} onClick={this.handleLike.bind(this, key, checked)}/>
                                        <span className="icon__content">
                                            <i className={"icon fas fa-heart"} />
                                            <span className={'masque'} />
                                            <i className="icon_animation fas fa-heart" />
                                        </span>
                                    </label>
                                </div>
                            </div>
                            { <Commantary idPublicaiton={val.id} rank={this.props.rank} owner={val.idUser} token={this.state.token} userId={this.props.userId} username={this.props.username}/> }
                            <p>Posté par {val.usernameUser} le {date}</p>
                        </div>
                    </div>

                }
            })
        }

        return <div className={'container container-flex-col-center'}>

            {this.state.loading ? <Loader/> : <>  <div>

                <div className={'container-checkbox-input'}>
                    <div>
                        <label htmlFor={'radio-all'}>Tous</label>
                        <input id={'radio-all'} type={'radio'} name={'typePublication'} onChange={_ => this.handleChange(2)} />
                    </div>
                    <div>
                        <label htmlFor={'radio-text'}>Unique textuelle</label>
                        <input id={'radio-text'} type={'radio'} name={'typePublication'} onChange={_ => this.handleChange(1)} />
                    </div>
                    <div>
                        <label htmlFor={'radio-media'}>Unique Media</label>
                        <input id={'radio-media'} type={'radio'} name={'typePublication'} onChange={_ => this.handleChange(0)}/>
                    </div>
                </div>

            </div>
                {publication}
                <button onClick={this.handleClick.bind(this)} className={'btn btn-primary mt-5 mb-5'}>Plus de contenu</button></>}
        </div>
    }
}

export default Publication;