import React, { Component } from 'react';
import Form                 from "../form/form";

class CreatePublication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            email: props.email,
            token: props.token,
            form: {
                publi: {
                    name: 'publication',
                    title: 'Créer une publication',
                    url: 'http://91.162.231.131:3001/publication/new',
                    successMessage: 'Publication en ligne',
                    form: [
                        {
                            type: 'textarea',
                            name: 'description',
                            value: 'd',
                            placeholder: 'Description',
                            className: ['form-control big-input'],
                            regExp: '^([a-zA-Z0-9&éèà :/.?=https://twitter.com/tds/status/1383015549999968256?s=20]+)$'
                        },
                        {
                            type: 'file',
                            name: 'file',
                            value: '',
                            placeholder: 'Upload votre image/gif',
                            className: ['form-control'],
                            regExp: ''
                        }
                    ]
                },
            }
        }
    }

    async successCB(data) {
        // Initialisation des vars
        const   url         = 'http://91.162.231.131:3001/publication/new';
        const   headers     = {'authorization': 'Baerer ' + this.state.token};
        const   onlyText    = data['file'] === undefined ? '1' : '0';
        const   file        = data['file'] === undefined ? null : data['file'];
        let     formData    = new FormData();

        // Ajout d'infomration dans le corps de la requete
        formData.append('id', this.state.id);
        formData.append('username', this.state.username);
        formData.append('onlyText', onlyText)
        formData.append('description', data['description']);
        formData.append('upload', file);

        // Requete HTTP
        return await fetch(url, {method: 'POST', headers: headers, body: formData})
            .then(res => {
              if (res.ok){
                  return true;
              } else {
                  return res;
              }
            })
    }

    render() {
        return <>
            <Form form={this.state.form.publi} successCallBack={this.successCB.bind(this)}/>
        </>
    }
}

export default CreatePublication;