import StripeContainer from './StripeContainer';
import { useState } from 'react';

function MakePayment() {
    const [showItem, setShowItem] = useState(false)

    const style = {
        height: '100VH',
        textAlign: 'center',
        backgroundImage: `url(/assets/logobigwhitebackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    return (
        <>
            <div className="MakePayment" style={style}>
                <h1 style={{}}>Make a payment</h1>
                {showItem ? <StripeContainer /> : <> <h3>£20</h3>
                    <div>
                        <button className="payment-form-submit-button" style={{marginRight: '3px', width: '150px'}} onClick={() => setShowItem(true)}>Make Payment</button>
                        <button className="payment-form-submit-button" onClick={() => {window.location.href = '/dashboard'}} style={{marginLeft: '3px', width: '150px'}}>Home</button> 
                    </div> 
                    </>}
            </div>
        </>
    );
}

export default MakePayment;