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
                    url: 'http://localhost:3001/auth/login',
                    form: [
                        {
                            type: 'textarea',
                            name: 'description',
                            value: '',
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

    onSuccess() {
        console.log('success')
    }

    onError() {
        console.log('error');
    }

    render() {
        return <div className={'container-fluid'}>
            <Form className={['form-login']} onSuccess={this.onSuccess.bind(this)} onError={this.onError.bind(this)} formWanted={'Publication'} form={this.state.form['publi']} />
        </div>
    }

}

export default Create;