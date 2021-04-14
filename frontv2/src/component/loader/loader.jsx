const Loader    = props => {
    return <div className="d-flex justify-content-center center-spinner">
    <div className="spinner-border text-primary big-spinner" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </div>
}

export default Loader;