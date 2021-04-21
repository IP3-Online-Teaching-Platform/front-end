import './Pay.css';
import StripeContainer from './StripeContainer';
import logo from "./assets/logobigwhitebackground.png"
import { useState } from 'react';
import { Link } from "react-router-dom";


function MakePayment() {

    const [showItem, setShowItem] = useState(false)
    return (
        <div className="body">
            <div className="MakePayment">
                <h1>Make Payment to Tutor</h1>
                {showItem ? <StripeContainer/> : <> <h3>£20</h3> 
                <button onClick={() => setShowItem(true)}>Pay</button>
                <Link to="/dashboard" className="button">Home</Link>                </>}
            </div>
            <img src= {logo} alt="Logo" />
        </div>
    );
}

export default MakePayment;