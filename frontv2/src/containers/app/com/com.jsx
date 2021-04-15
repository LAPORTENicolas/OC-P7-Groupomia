import React, { useState } from 'react'

const Com = props => {
    const [value, setState] = useState('hidden');
    const onChange          = _ => {
        value === 'hidden' ? setState('visible') : setState('hidden')
    }

    const com = props.com.map((val, key) => {
        return <><div className={value === 'hidden' ? 'container container-com hidden' : 'container container-com'} key={key}>
                <div className={'com'}>
                    <span>Poster par: <strong>{val.username}</strong></span>
                    <p>{val.message}</p>
                </div>
        </div>
        </>
    })
    return <div>
        {com}
        <p onClick={onChange}>{value === 'hidden' ? 'Afficher les commentaire' : 'Masquer les commentaire'}</p>
    </div>
}

export default Com;

/*
<div className={'container container-com'}>
    <div className={'container-com'}>
        <div className={'com'}>
            <span>Poster par: <strong>Username</strong></span>
            <p>fjkhdfsdqjkfh sfjksqdhf jkqsdfhsqdjkfh sdqjkfqhsdfjklsdh fjklsdqfhsdfh sdqkjl fhsqdjklfhsqdkljfh dsjkflhsdq fkjsdqhfjsqdk fsjdkqfh ds jkf hqsdfjkqsdh fjklqsdfdsqjkfh dsqjkfhqs djfkqsdhfjk sdhf jqskdhfjqsd</p>
        </div>
    </div>
</div>
 */