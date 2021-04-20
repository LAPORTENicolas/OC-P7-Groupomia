import React, { useState }  from 'react'

const Input = (props) => {
    const   [value, setState] = useState(props.value);
    const   regExp            = new RegExp(props.regExp);
    const   className         = props.className;
    let     input;

    const onChange          = e => {
        e.preventDefault();
        setState(e.target.value);

        switch(e.target.type) {
            case 'file':
                break;

            case 'textarea':
                regExp.test(e.target.value) ? className[1] = 'success' : className[1] = 'error';
                e.target.value.length < 250 ? className[1] = 'success' : className[1] = 'error';
                break;

            default:
                regExp.test(e.target.value) ? className[1] = 'success' : className[1] = 'error';
                e.target.value.length < 30 ? className[1] = 'success' : className[1] = 'error';
            break;
        }
    }

    switch (props.type) {
        case 'textarea':
            input = <textarea className={className.join(' ')} name={props.name} id={props.id} onChange={onChange}>{value}</textarea>;
            break;

        case 'file':
            input = <input type='file' className={className.join(' ')} name={props.name} id={props.id} onChange={onChange} placeholder={props.placeholder}/>;
            break;

        default:
            input = <input type={props.type} className={className.join(' ')} name={props.name} id={props.id} onChange={onChange} placeholder={props.placeholder} value={value}/>;
            break;
    }

    return <div className='mb-3'>
            <label className='form-label' htmlFor={props.id}>{props.placeholder}:</label>
        {input}
    </div>
}

export default Input;