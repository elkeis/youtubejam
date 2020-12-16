import './error.scss';

export default function Error({
    message = 'Error',
    onResolve = () => null,
}) {
    return <div className="Error">
        <span className="error-msg"> { message } </span>
        <button className="retry-button" onClick={onResolve}>got it</button>
    </div>
}