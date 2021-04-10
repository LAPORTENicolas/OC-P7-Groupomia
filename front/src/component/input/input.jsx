import React, { useState }  from 'react'

const Input = (props) => {
    const [value, setState] = useState(props.value);
    const onChange          = e => {
        e.preventDefault();
        setState(e.target.value);
    }

    return <div className='mb-3'>
        <label className='form-label'>{props.placeholder}:</label>
        <input type={props.type} className={props.className} name={props.name} id={props.id} onChange={onChange} value={value} placeholder={props.placeholder}/>
    </div>
}

export default Input;