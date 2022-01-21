import './alert.scss';

export default function Alert({loading, loaded, close }) {
    const callClose = (e) => close();
    return (
        <div className='__alert-preload'>
            {
                loading &&
                <div className='loading'>
                    <label>{loading}</label>
                </div>
            }
            {
                loaded &&
                <div className='loaded'>
                    <label>{loaded}</label>
                    <button className='btn primary' onClick={callClose}>Aceptar</button>
                </div>
            }
        </div>
    );
}