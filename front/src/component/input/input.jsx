const Input = (props) => {
    return <div className='mb-3'>
        <label className='form-label'>{props.placeholder}:</label>
        <input type={props.type} className={props.className} name={props.name} value={props.value} onChange={props.change} placeholder={props.placeholder}/>
    </div>
}

export default Input;