import StripeContainer from './StripeContainer';

function MakePayment() {

    return (
        <>
            <div className="MakePayment">
                <h2>Pay a tutor</h2>
                <StripeContainer />
            </div>
        </>
    );
}

export default MakePayment;