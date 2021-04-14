const Alert = props => {
    return <div className={"alert alert-" + props.type} role="alert">{props.children}</div>
}

export default Alert;