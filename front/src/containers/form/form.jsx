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
            file: '',
            fileLoading: false,
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

    prepare(){
        const file = document.getElementById('file');
        if (file === null || file.files.length === 0) {
            console.log('pas de fichier');
            this.validForm('')
        } else {
            this.validForm('');
            //this.readFile(file.files[0])
        }
    }

    readFile(file){
        const fileReader        = new FileReader();
        fileReader.onload       = _ => this.uploadFile(fileReader.result);
        fileReader.readAsText(file);
    }

    uploadFile(file) {
       this.validForm(file);
    }

    inputCheck(){
        //let data = {};
        let  dataForm = new FormData(document.getElementById('trying-form'));
        let data;
        dataForm.append('name', 'value');
        console.log(dataForm.values('name'));
        let err = 0;
        // Vérifie les champs
        this.state.form.form.map(value => {
            const regExp = new RegExp(value.regExp);
            if (value.type === 'file') {
                const files = document.getElementById(value.name);
                if (files.files.length !== 0) {
                    //data.append('file', files.files[0]);
                    //data.append('test', 'de');
                    console.log(data);
                    //data['file'] = {name: files.files[0].name, type: files.files[0].type};
                }
            } else {
                if (regExp.test(document.getElementById(value.name).value)){
                    //data.append(value.name, (document.getElementById(value.name).value));
                } else { err++; }
            }
        })

        // Si il y a un/des d'erreur(s) Affiche une errur sinon excute le callback
        if (err > 0) {
            return [false, ''];
        }  else {
            return [true, data];
        }
    }

    validForm(file) {
        const [form, data] = this.inputCheck();
        if (file !== '') { data['file']['file'] = file }
        if (form) {
            this.setState({loading: true, printError: false, printSuccess: false})
            this.props.callBack(data)
                .then(valid =>{
                    if (valid) {
                        this.setState({loading: false, printSuccess: true, printSuccessText: this.state.form.successMessage})
                    } else { this.setState({loading: false, printError: true, printErrorText: 'Une erreur est survenue'}) }
                })
        } else {
            this.setState({loading: false, printError: true, printErrorText: 'Formulaire invalide'})
        }
    }

    render() {

        const form = this.state.form.form.map((value, key) => {
            return  <Input type={value.type} className={value.className} id={value.name} name={value.name}
                           placeholder={value.placeholder} value={value.value} regExp={value.regExp} key={key}/>
        })

        return <form id={'trying-form'} className={this.props.className.join(' ')}>
            {this.state.loading ? <Loader/> : <>
                <h1>{this.state.form.title}</h1>
            {this.state.printError ? <Alert type='danger'>{this.state.printErrorText}</Alert> : null }
            {this.state.printSuccess ? <Alert type='success'>{this.state.printSuccessText}</Alert> : null }
            {form}
                {this.props.children}
                <Button validationForm={this.prepare.bind(this)}>{this.state.form.title}</Button>
            </>}
        </form>

    }
}

export default Form;