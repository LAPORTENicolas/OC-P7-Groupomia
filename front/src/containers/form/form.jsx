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
            printErrorText: '',
            printError: false,
            printSuccessText: '',
            printSuccess: false,
        }
    }

    static getDerivedStateFromProps(props, prevState){
        if (props.form !== prevState.form){
            return {form: props.form}
        }
        return null;
    }

    async validForm() {
        this.setState({loading: true, printError: false, printSuccess: false})
        let data        = {};
        let err         = 0;

        // Vérifie les champs
        this.state.form.form.map(value => {
            const regExp = new RegExp(value.regExp);
            if (value.type === 'file') {
                const   file  = document.getElementById(value.name);
                const   fr    = new FileReader();
                fr.readAsText(file.files[0]);
                fr.onload = _ => sessionStorage.setItem('file', fr.result);
                console.log(sessionStorage.getItem('file'));
            } else {
                if (regExp.test(document.getElementById(value.name).value)){
                    data[value.name] = (document.getElementById(value.name).value)
                } else { err++; }
            }
        })
        // Si il y a un/des d'erreur(s) Affiche une errur sinon excute le callback
        if (err > 0) {
            this.setState({loading: false, printError: true, printErrorText: 'Formulaire invalide'})
        }  else {
            await this.props.callBack(data) ? this.setState({loading: false, printSuccess: true, printSuccessText: this.state.form.successMessage}) : this.setState({loading: false, printError: true, printErrorText: 'Une erreur est survenue'})
        }
    }

    render() {

        const form = this.state.form.form.map((value, key) => {
            return  <Input type={value.type} className={value.className} id={value.name} name={value.name}
                           placeholder={value.placeholder} value={value.value} regExp={value.regExp} key={key}/>
        })

        return <div className={this.props.className.join(' ')}>
            {this.state.loading ? <Loader/> : <>
                <h1>{this.state.form.title}</h1>
            {this.state.printError ? <Alert type='danger'>{this.state.printErrorText}</Alert> : null }
            {this.state.printSuccess ? <Alert type='success'>{this.state.printSuccessText}</Alert> : null }
            {form}
                {this.props.children}
                <Button validationForm={this.validForm.bind(this)}>{this.state.form.title}</Button>
            </>}
        </div>

    }
}

export default Form;