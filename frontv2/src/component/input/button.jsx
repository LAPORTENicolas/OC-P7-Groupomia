const Button = props => {
    return <div className='btn-container'>
        <button className='btn btn-primary' onClick={props.validationForm}>{props.children}</button>
    </div>
}

export default Button;