import React, { useState }  from 'react'

const Input = (props) => {
    const   [value, setState] = useState(props.value);
    const   regExp            = new RegExp(props.regExp);
    const   className         = props.className;
    let     input;

    const onChange          = e => {
        e.preventDefault();
        setState(e.target.value);

        if (regExp.test(e.target.value)){
            className[1]    = 'sucess';
        } else {
            className[1]    = 'error';
        }
    }

    switch (props.type) {
        case 'textarea':
            input = <textarea className={className.join(' ')} name={props.name} id={props.id} onChange={onChange}>{props.placeholder}</textarea>;
            break;

        case 'file':
            input = <input type='file' className={className.join(' ')} name={props.name} id={props.id} onChange={onChange} placeholder={props.placeholder}/>;
            break;

        default:
            input = <input type={props.type} className={className.join(' ')} name={props.name} id={props.id} onChange={onChange} placeholder={props.placeholder} value={props.value}/>;
            break;
    }

    return <div className='mb-3'>
            <label className='form-label'>{props.placeholder}:</label>
        {input}
    </div>
}

export default Input;