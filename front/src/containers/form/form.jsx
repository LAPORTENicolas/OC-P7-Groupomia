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
            printError: false
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
        const form      = [...this.props.form];
        const data      = {};
        let err         = 0;
        let url         = '';
        form.map(value => {
            const regExp    = new RegExp(value.regExp)
            const val       = value.value;
            if (!regExp.test(val) || val.length > 30){
                console.log('er');
                err++;
            } else {
                data[value.name] = value.value;
            }
        })

        if (err > 0) {
            this.setState({loading: false, printError: true, printErrorText: 'Le formulaire n\'est pas remplis correctement'});
        } else {
            if (this.state.formWanted === 'login'){
                url = "http://localhost:3001/auth/login";
            } else {
                url = "http://localhost:3001/auth/register";
            }
            fetch(url, {method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => {
                  if (res.ok) {
                      if (this.state.formWanted === 'login') {
                          res.json()
                              .then(res => {
                                  const userId  = res.userId;
                                  const token   = res.token;
                                  const data    = JSON.stringify({userId: userId, token: token});
                                  sessionStorage.setItem('user', data);
                                  this.props.login();
                                  this.setState({loading: false});
                              })
                              .catch(err => console.log(err)) //this.setState({printError: true, printErrorText: err.error, loading: false}))
                      } else {
                        res.json()
                          .then(res => res.code ? this.setState({printError: true, printErrorText: res.code, loading: false}) : this.setState({printSuccess: true, printSuccessText: 'Compte créer', loading: false}))
                      }
                  } else {
                      res.json()
                          .then(err => this.setState({printError: true, printErrorText: err.error, loading: false}))
                  }
                })
        }
        /*
        const regExp0   = new RegExp(this.state.form[0].regExp)
        const regExp1   = new RegExp(this.state.form[1].regExp)
        const email     = this.state.form[0].value;
        const password  = this.state.form[1].value;
        const data      = JSON.stringify({email: email, password: password});

        if (this.state.formWanted === 'login') {
            if (regExp0.test(email) && regExp1.test(password) && email.length <= 30 && password.length <= 30) {
                fetch('http://localhost:3001/auth/login', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: data
                })
                    .then(res => {
                        if (res.ok) {
                            res.json()
                                .then(data => console.log(data))
                        } else {
                            form[0].className[1] = 'error';
                            form[1].className[1] = 'error';
                            res.json()
                                .then(err => this.setState({printError: true, printErrorText: err.error}))
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                this.setState({printError: true, printErrorText: 'Le formulaire n\'est pas remplis correctement'})
            }
        } else {
        }
        this.setState({loading: false})
         */
    }

    render() {
        const form = this.props.form.map((value, key) => {
            return <Input type={value.type} className={value.className.join(' ')} name={value.name}
                          placeholder={value.placeholder} value={value.value} change={this.changeHandle.bind(this, key)}
                          key={key}/>
        })
        return <div className='form-login'>
            {this.state.loading ? <Loader/> : <>
                <h1>{this.state.formWanted === 'login' ? 'Connexion' : 'Inscription'}</h1>
            {this.state.printError ? <Alert type='danger'>{this.state.printErrorText}</Alert> : null }
            {this.state.printSuccess ? <Alert type='success'>{this.state.printSuccessText}</Alert> : null }
            {form}
                <a onClick={this.changeForm.bind(this)}>{this.state.formWanted === 'login' ? 'Pas de compte ?' : 'Déjà inscris ?'} cliquez-ici</a>
                <Button disable={this.state.btn}
                validationForm={this.validForm.bind(this)}>{this.state.formWanted === 'login' ? 'Connexion' : 'Inscription'}</Button>
            </>}
        </div>

    }
}

export default Form;