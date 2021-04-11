import Input from '../../component/input/input';

const FindBar   = props => {
    return <div className="container-fluid">
        <div className="container-lg bg-light pb-3 ml-5 mr-5">
            <div className="form-control border-0 bg-light">
                <label className="form-label">Rechercher</label>
                <Input type="text" className={['form-control']} placeholder="Poster par" />
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">Les plus récents</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">Les plus anciens</label>
            </div>
        </div>
    </div>
}

export default FindBar;