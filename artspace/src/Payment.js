// Queueing system page
// for ideas

import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import "./styles/Payment.css";
// Import Receipt component
import Receipt from './Receipt';

const Payment = () => {

    // Yasmine's additions
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        billingName: "",
        billingAddress1: "",
        billingAddress2: "",
        billingCity: "",
        billingState: "",
        billingZip: "",
        cardName: "",
        cardNum: "",
        cardCvc: "",
        cardMonth: "",
        cardYear: "",
        paymentAmount: ""
    });

    const [submitted, setSubmitted] = useState(false); // New state for submitted status
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData); // Log form data
        // setFormData({
        //     firstName: formData.firstName || "",
        //     lastName: formData.lastName || "",
        //     email: formData.email || "",
        //     phone: formData.phone || "",
        //     billingName: formData.billingName || "",
        //     billingAddress1: formData.billingAddress1 || "",
        //     billingAddress2: formData.billingAddress2 || "",
        //     billingCity: formData.billingCity || "",
        //     billingState: formData.billingState || "",
        //     billingZip: formData.billingZip || "",
        //     cardName: formData.cardName || "",
        //     cardNum: formData.cardNum || "",
        //     cardCvc: formData.cardCvc || "",
        //     cardMonth: formData.cardMonth || "",
        //     cardYear: formData.cardYear || "",
        //     paymentAmount: formData.paymentAmount || ""
        // });
        setSubmitted(true); // Set submitted to true
        navigate('/receipt', { state: { formData } });
    };
    
    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="payment-container">
            <form className="payment-form" onSubmit={handleSubmit}> {/* action="" method="POST" */}
                <h1>Payment</h1>
                <h3>Personal Information</h3>
                <div className="personal-info">
                    <div className="input-info">
                        <input type="text" placeholder="First Name" required className="fname" name="firstName" value={formData.firstName} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="Last Name" required className="lname" name="lastName" value={formData.lastName} onChange={handleInputChange}></input>
                    </div>
                </div>
                <div className="personal-info">
                    <div className="input-info">
                        <input type="email" placeholder="Email" required className="email" name="email" value={formData.email} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="Phone Number (111-222-3333)" required className="phone" name="phone" value={formData.phone} onChange={handleInputChange}></input>
                    </div>
                </div>
                <h3>Billing Information</h3>
                <div className="billing-info">
                    <div className="input-info">
                        <input type="text" placeholder="Full Name" required className="billing-name" name="billingName" value={formData.billingName} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="Address 1" required className="billing-address-1" name="billingAddress1" value={formData.billingAddress1} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="Address 2" className="billing-address-2" name="billingAddress2" value={formData.billingAddress2} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="City" required className="billing-city" name="billingCity" value={formData.billingCity} onChange={handleInputChange}></input>
                    </div>                    
                    <div className="input-info">
                        <input type="text" placeholder="State (CA, OH, ...)" required className="billing-state" name="billingState" value={formData.billingState} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="Zip Code" required className="billing-zip" name="billingZip" value={formData.billingZip} onChange={handleInputChange}></input>
                    </div>
                </div>
                <h3>Payment Details</h3>
                <div className="card-info">
                    <div className="input-info">
                        <input type="text" placeholder="Name on Card" required className="card-name" name="cardName" value={formData.cardName} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="number" placeholder="Card Number 1234-5678-1357-2468" required className="card-num" name="cardNum" value={formData.cardNum} onChange={handleInputChange}></input>
                    </div>
                </div>
                <div className="card-info-2">
                    <div className="input-info">
                        <input type="text" placeholder="Card CVC" required className="card-cvc" name="cardCvc" value={formData.cardCvc} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="Month" required className="card-month" name="cardMonth" value={formData.cardMonth} onChange={handleInputChange}></input>
                    </div>
                    <div className="input-info">
                        <input type="text" placeholder="Year" required className="card-year" name="cardYear" value={formData.cardYear} onChange={handleInputChange}></input>
                    </div>
                </div>
                <h3>Amount</h3>
                <div className="amount-info">
                    <div className="input-info">
                        <input type="number" placeholder="123.11" required className="payment-amount" name="paymentAmount" value={formData.paymentAmount} onChange={handleInputChange}></input>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            {submitted && <Receipt formData={formData} />}
        </div>


    );
}

export default Payment