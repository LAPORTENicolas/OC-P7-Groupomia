import React, { Component } from 'react';
import Input from "../../component/input/input";
import Button from "../../component/input/button";
import Alert from "../../component/alert/alert";
import Loader from "../../component/loader/loader";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: props.form,
            loading: false,
            error: false,
            errorText: '',
            success: false,
            successMsg: ''
        }
    }

    // Permet de changer de formulaire lorsque le props form change
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.form !== prevProps.form){
            this.setState({form: this.props.form});
        }
    }

    // Permet de vérifier le formulaire
    checkForm() {
        this.setState({loading: true})

        const   type    = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp', 'video/mp4', 'video/webm']
        let     err     = 0;
        let     data    = {};

        // Fait une boucle de tout les champs du formulaire
        this.state.form.form.map(val => {
            // Recupere le contenue du champ + ça regExp
            const input     = document.getElementById(val.name);
            const inputVal  = val.type === 'file' ? input.files[0] : input.value;
            const regExp    = new RegExp(val.regExp);

            if (inputVal === ''){
                err++;
                return 0;
            }

            // Vérifie si le champs est valide, si champ invalide ajout 1 a err sinon ajoute la valeur du champs
            if (regExp.test(inputVal) || input.type === 'file'){
                // Vérifie si mType est égal au type du fichier
                const check     = mType => mType === inputVal.type;

                if (input.type === 'file') {
                    // Vérifie si le type du fichier envoyé est valide
                    if(inputVal === undefined){
                        data['file'] = undefined;
                    } else if (type.some(check) === false) {
                        err++;
                        return 0;
                    }
                } else {
                    if (inputVal.length > 30 && val.type !== 'textarea'){
                        err++;
                        return 0;
                    } else if (inputVal.length > 254 && val.type === 'textarea'){
                        err++;
                        return 0;
                    }
                }

                // Ajoute la valeur dans le JSON data;
                data[val.name] = inputVal;
            } else { err++; }
        })

        // Si aucune erreur execute le callback sinon affiche une erreur
        if (err > 0) {
            this.setState({errorMsg: 'Le formulaire est invalide', error: true, loading: false})
        } else {
            // Execute le callback
            this.props.successCallBack(data)
                .then(res => {
                    // Si tout c'est bien passé
                  if (res === true){
                      this.setState({loading: false, success: true, successMsg: this.state.form.successMessage})
                  } else if(res === false) {
                      // Si il y a une erreur
                      this.setState({loading: false, error: true, errorMsg: 'Formulaire invalide'})
                  } else {
                      // Si il y a une erreur affiche l'erreur detexter par l'api
                      res.json()
                          .then(json => this.setState({loading: false, error: true, errorMsg: json.error}))
                  }
                })
        }
    }

    // Permet d'afficher le formulaire
    render() {
        const form = this.state.form.form.map((val, key) => {
            return <Input regExp={val.regExp} className={val.className} value={val.value} type={val.type} name={val.name} id={val.name} placeholder={val.placeholder} key={key}/>
        })

        return <div className={'container'}>
            {this.state.error ? <Alert type={'danger'}>{this.state.errorMsg}</Alert> : null}
            {this.state.success ? <Alert type={'success'}>{this.state.successMsg}</Alert> : null}
                <h2>{this.state.form.title}</h2>
            {this.state.loading ? <Loader/> : <>
                {form}
                <Button validationForm={this.checkForm.bind(this)}>Valider le formulaire</Button>
            </>
            }
            {this.props.children === undefined ? null : this.props.children }
        </div>
    }
}

export default Form;