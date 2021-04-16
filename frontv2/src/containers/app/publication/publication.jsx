import React, { Component } from 'react';
import Loader from "../../../component/loader/loader";
import Com from "../com/com";
import Input from "../../../component/input/input";
import Button from "../../../component/input/button";

class Publication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            errorMsg: '',
            userId: props.userId,
            token: props.token,
            form: {
                com: {
                    name: 'com',
                    title: 'Commenter',
                    url: 'http://91.162.231.131:3001/com/new',
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

    componentDidMount() {
        const url       = 'http://91.162.231.131:3001/publication/getAll';
        const headers   = {'authorization': 'Baerer ' + this.state.token}

        fetch(url, {method: 'GET', headers: headers})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(json => {
                            console.log(json);
                            this.setState({loading: false, publication: json})
                        })
                } else {
                    this.setState({loading: false, error: true, errorMsg: 'Une erreur est survenue'})
                }
            })
    }

    sendCommentary(id, key) {
        let     err     = 0;
        const   input   = document.getElementById(this.state.form.com.name+key).value;
        const   regExp  = new RegExp(this.state.form.com.regExp);

        if (regExp.test(input)){

        } else {
            this.setState({loading: false, error: true, errorMsg: 'Formulaire invalide'})
            return 0;
        }

        // Initialisation des vars
        let     commentaryJ                 = {}
        const   url                         = 'http://91.162.231.131:3001/commentary/new';
        const   username                    = this.props.username;
        const   headers                     = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}
        const   previousCom                 = JSON.parse(this.state.publication[key].commantary);
                commentaryJ['commentary']   = JSON.stringify(previousCom) === '{}' ? [{username: username, message: input}] : [...previousCom, {username: username, message: input}];
                commentaryJ['id']           = id;

        // Requete HTTP
        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(commentaryJ)})
            .then(res => {
                if (res.ok){
                    this.setState({loading: false, success: true, successMsg: 'Commentaire envoyé'})
                } else {
                    this.setState({loadind: false, error: true, errorMsg: 'Une erreur est survenue'})
                }
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const url       = 'http://91.162.231.131:3001/publication/getAll';
        const headers   = {'authorization': 'Baerer ' + this.state.token}

        fetch(url, {method: 'GET', headers: headers})
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
        let publication;

        if (this.state.loading === false && this.state.error === false) {
            publication = this.state.publication.map((val, key) => {
                console.log(val);
                const date      = new Date(val.date_post).toLocaleDateString();
                return <div className="card center border-0 col-10 mt-3" key={key}>
                    {val.filePath ? val.filePath.indexOf('.mp4') ? <video src={val.filePath} controls autoPlay>Vidéo non supporte</video> : <img src={val.filePath} className="card-img-top" alt="Image"/> : null}
                    <div className="card-body bg-light shadow-sm">
                        <p className="card-text">{val.description}</p>
                        { val.commantary === '{}' ? null : <Com com={JSON.parse(val.commantary)}/> }
                        <div>
                            <Input className={['form-control']} value={''} name={this.state.form.com.name} id={this.state.form.com.name+key} type={'text'} placeholder={'Commentaire'}/>
                            <Button validationForm={this.sendCommentary.bind(this, val.id, key)} >Envoyer</Button>
                        </div>
                        <p>Poster par {val.usernameUser} le {date}</p>
                    </div>
                </div>
            })
        }
        return <div className={'container container-flex-col-center'}>
            {this.state.loading ? <Loader/> : publication }
        </div>
    }
}

export default Publication;