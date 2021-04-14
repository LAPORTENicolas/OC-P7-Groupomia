import React, { Component } from 'react';
import Input from "../../../component/input/input";
import Button from "../../../component/input/button";
import Alert from "../../../component/alert/alert";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: props.form,
            loading: false,
            error: false,
            errorText: '',
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
        this.setState({loading: true, error: false})
        let err = 0;
        let data = {};

        // Fait une boucle de tout les champs du formulaire
        this.state.form.form.map(val => {
            // Recupere le contenue du champ + ça regExp
            const inputVal  = document.getElementById(val.name).value
            const regExp    = new RegExp(val.regExp);

            // Vérifie si le champs est valide, si champ invalide ajout 1 a err sinon ajoute la valeur du champs
            if (regExp.test(inputVal)){
                data[val.name] = inputVal;
            } else { err++; }
        })

        // Si aucune erreur execute le callback sinon affiche une erreur
        if (err > 0) {
            this.setState({errorMsg: 'Le formulaire est invalide', error: true})
        } else {
            // Execute le callback
            this.props.successCallBack(data)
                .then(res => {
                    // Si tout c'est bien passé
                  if (res === true){
                      console.log('bon')
                  }else {
                      // Si il y a une erreur affiche l'erreur
                      res.json()
                          .then(json => this.setState({loading: false, error: true, errorMsg: json.error}))
                  }
                })
        }
    }


    // Permet d'afficher le formulaire
    render() {
        const form = this.state.form.form.map((val, key) => {
            return <Input className={val.className} value={val.value} type={val.type} name={val.name} id={val.name} placeholder={val.placeholder} key={key}/>
        })

        return <div className={'container'}>
            {this.state.error ? <Alert type={'danger'}>{this.state.errorMsg}</Alert> : null}
            {form}
            <Button validationForm={this.checkForm.bind(this)}>Valider le formulaire</Button>
            {this.props.children === undefined ? null : this.props.children }
        </div>
    }
}

export default Form;