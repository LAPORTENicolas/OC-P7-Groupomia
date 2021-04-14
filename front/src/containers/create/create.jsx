import React, { Component } from 'react'
import Form                 from '../form/form'

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                publi: {
                    name: 'login',
                    title: 'Créer une publication',
                    url: 'http://localhost:3001/publication/new',
                    form: [
                        {
                            type: 'textarea',
                            name: 'description',
                            value: 'd',
                            placeholder: 'Description',
                            className: ['form-control big-input'],
                            regExp: '^([a-zA-Z0-9&éèà -_ç()!$£^¨]+)$'
                        },
                        {
                            type: 'file',
                            name: 'file',
                            value: '',
                            placeholder: 'Image',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9&éèà -_ç()!$£^¨]+)$'
                        },
                    ]
                },
            },
        }
    }

     async cb(arrayData) {
        console.log(arrayData);
        /*
        console.log(arrayData);
        const sendData  = {
            userId: this.props.userId,
            username: this.props.username,
            ...arrayData
        };

        return fetch(this.state.form.publi.url, {method: 'POST', headers: {'content-type': 'multipart/from-data', 'authorization': this.props.token}, body: JSON.stringify(sendData)})
            .then( res => {
                return res.ok;
            })
         */
    }

    render() {
        return <div className={'container-fluid'}>
            <Form callBack={this.cb.bind(this)} className={['form-login']} formWanted={'Publication'} form={this.state.form['publi']} />
        </div>
    }

}

export default Create;