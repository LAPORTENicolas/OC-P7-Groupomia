import React, { Component } from 'react'
import Input                from '../../component/input/input';
import Button               from '../../component/input/button';
import Alert                from '../../component/alert/alert';
import Loader               from '../../component/loader/loader';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formWanted: props.formWanted,
            form: props.form,
            loading: false,
            btn: false,
            printErrorText: '',
            printError: false,
            printSuccessText: '',
            printSuccess: false
        }
    }

    static getDerivedStateFromProps(props, prevState){
        if (props.form !== prevState.form){
            return {form: props.form}
        }
        return null;
    }

    changeHandle(key, e) {
        const state = [...this.state.form]
        const regExp = new RegExp(state[key].regExp);

        state[key].value = e.target.value;
        if (regExp.test(state[key].value) === true && state[key].value.length <= 30) {
            state[key].className[1] = 'sucess';
        } else if (!regExp.test(state[key].value) || state[key].value.length >= 30) {
            state[key].className[1] = 'error';
        }
        this.setState({form: state});
    }

    changeForm() {
        const form = this.props.changeForm()
        this.setState({formWanted: form, printError: false});
    }

    validForm() {
        this.setState({loading: true, printError: false, printSuccess: false})
        let data        = {};
        let err         = 0;
        this.state.form.form.map(value => {
            const regExp = new RegExp(value.regExp);
            if (regExp.test(document.getElementById(value.name).value)){
                data[value.name] = (document.getElementById(value.name).value)
            } else { err++; }
        })
        if (err > 0) {
            this.setState({loading: false, printError: true, printErrorText: 'Formulaire invalide'})
        }  else {
            fetch(this.state.form.url, {method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => {
                    res.json()
                        .then(json => {
                            if (res.ok) {
                                this.setState({loading: false, printSuccess: true, printSuccessText: 'Formualire envoyé'})
                                this.props.successLogin(json);
                            } else {
                                this.setState({loading: false, printError: true, printErrorText: 'Une erreur est survenue'});
                            }
                        })
                })
        }
    }

    render() {
        const form = this.state.form.form.map((value, key) => {
            return  <Input type={value.type} className={value.className.join(' ')} id={value.name} name={value.name}
                           placeholder={value.placeholder} value={value.value} key={key}/>
        })

        return <div className='form-login'>
            {this.state.loading ? <Loader/> : <>
                <h1>{this.state.form.title}</h1>
            {this.state.printError ? <Alert type='danger'>{this.state.printErrorText}</Alert> : null }
            {this.state.printSuccess ? <Alert type='success'>{this.state.printSuccessText}</Alert> : null }
            {form}
                <p onClick={this.changeForm.bind(this)}>{this.state.formWanted === 'login' ? 'Pas de compte ?' : 'Déjà inscris ?'} cliquez-ici</p>
                <Button disable={this.state.btn} validationForm={this.validForm.bind(this)}>{this.state.form.title}</Button>
            </>}
        </div>

    }
}

export default Form;