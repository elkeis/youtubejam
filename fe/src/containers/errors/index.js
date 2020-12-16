import './errors.scss';
import { connect } from 'react-redux';
import Error from '../../components/error';
import { removeError } from '../../store/errors';


function Errors({
    errorList = [],
    onResolve = () => null,
}) {
    return <div className="Errors">
        {
            errorList.map((errorObject) => (
                <Error key={errorObject.id} message={errorObject.message} onResolve={() => onResolve(errorObject)}/>
            ))
        }
    </div>
}

export default connect(
    state => ({
        errorList: state.errors.errorList,
    }),
    {
        onResolve: removeError,
    }
)(Errors);

