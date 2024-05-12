// Queueing system page
// for ideas

// import sendReceipt from './sendReceipt';
import React, { useState } from "react"; // Yasmine - Testing some setup for emails
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you can handle the form data as needed
            console.log(formData); // Log the form data
            // Reset form data or show success message to the user
            setFormData({
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
            // You can display a success message to the user here if needed
        } catch (error) {
            console.error('Error handling form submission:', error);
            // Handle error
        }
    };
    
    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div class="payment-container">
            <form class="payment-form" onSubmit={handleSubmit}> {/* action="" method="POST" */}
                <h1>Payment</h1>
                <h3>Personal Information</h3>
                <div class="personal-info">
                    <div class="input-info">
                        <input type="text" placeholder="First Name" required class="fname" name="firstName" value={formData.firstName} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Last Name" required class="lname" name="lastName" value={formData.lastName} onChange={handleInputChange}></input>
                    </div>
                </div>
                <div class="personal-info">
                    <div class="input-info">
                        <input type="email" placeholder="Email" required class="email" name="email" value={formData.email} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Phone Number (111-222-3333)" required class="phone" name="phone" value={formData.phone} onChange={handleInputChange}></input>
                    </div>
                </div>
                <h3>Billing Information</h3>
                <div class="billing-info">
                    <div class="input-info">
                        <input type="text" placeholder="Full Name" required class="billing-name" name="billingName" value={formData.billingName} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Address 1" required class="billing-address-1" name="billingAddress1" value={formData.billingAddress1} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Address 2" class="billing-address-2" name="billingAddress2" value={formData.billingAddress2} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="City" required class="billing-city" name="billingCity" value={formData.billingCity} onChange={handleInputChange}></input>
                    </div>                    
                    <div class="input-info">
                        <input type="text" placeholder="State (CA, OH, ...)" required class="billing-state" name="billingState" value={formData.billingState} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Zip Code" required class="billing-zip" name="billingZip" value={formData.billingZip} onChange={handleInputChange}></input>
                    </div>
                </div>
                <h3>Payment Details</h3>
                <div class="card-info">
                    <div class="input-info">
                        <input type="text" placeholder="Name on Card" required class="card-name" name="cardName" value={formData.cardName} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="number" placeholder="Card Number 1234-5678-1357-2468" required class="card-num" name="cardNum" value={formData.cardNum} onChange={handleInputChange}></input>
                    </div>
                </div>
                <div class="card-info-2">
                    <div class="input-info">
                        <input type="text" placeholder="Card CVC" required class="card-cvc" name="cardCvc" value={formData.cardCvc} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Month" required class="card-month" name="cardMonth" value={formData.cardMonth} onChange={handleInputChange}></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Year" required class="card-year" name="cardYear" value={formData.cardYear} onChange={handleInputChange}></input>
                    </div>
                </div>
                <h3>Amount</h3>
                <div class="amount-info">
                    <div class="input-info">
                        <input type="number" placeholder="123.11" required class="payment-amount" name="paymentAmount" value={formData.paymentAmount} onChange={handleInputChange}></input>
                    </div>
                </div>
                <button type="submit">Submit</button>
                <Receipt formData={formData} />
            </form>
        
        </div>


    );
}

export default Payment