// Queueing system page
// for ideas

import sendReceipt from './sendReceipt';
import React, { useState } from "react"; // Yasmine - Testing some setup for emails
import "./styles/Payment.css";

const Payment = () => {
    // Yasmine's additions
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        // Add other form fields later
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call Cloud Function to send receipt
            const response = await sendReceipt(formData);
            console.log(response); // Log the response from the Cloud Function
            // Reset form data or show success message to the user
        } catch (error) {
            console.error('Error sending receipt:', error);
            // Handle error
        }
    };
    //End Yasmine's additions outside of return (call handleSubmit inside return)

    return (
        <div class="payment-container">
            <form class="payment-form" action="" method="POST">
                <h1>Payment</h1>
                <h3>Personal Information</h3>
                <div class="personal-info">
                    <div class="input-info">
                        <input type="text" placeholder="First Name" required class="fname"></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Last Name" required class="lname"></input>
                    </div>
                </div>
                <div class="personal-info">
                    <div class="input-info">
                        <input type="email" placeholder="Email" required class="email"></input>
                    </div>
                    <div class="input-info">
                        <input type="number" placeholder="Phone Number (111-222-3333)" required class="phone"></input>
                    </div>
                </div>
                <h3>Billing Information</h3>
                <div class="billing-info">
                    <div class="input-info">
                        <input type="text" placeholder="Full Name" required class="billing-name"></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Address 1" required class="billing-address-1"></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Address 2" required class="billing-address-2"></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="City" required class="billing-city"></input>
                    </div>                    
                    <div class="input-info">
                        <input type="text" placeholder="State (CA, OH, ...)" required class="billing-state"></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Zip Code" required class="billing-zip"></input>
                    </div>
                </div>
                <h3>Payment Details</h3>
                <div class="card-info">
                    <div class="input-info">
                        <input type="text" placeholder="Name on Card" required class="card-name"></input>
                    </div>
                    <div class="input-info">
                        <input type="number" placeholder="Card Number 1234-5678-1357-2468" required class="card-num"></input>
                    </div>
                </div>
                <div class="card-info-2">
                    <div class="input-info">
                        <input type="text" placeholder="Card CVC" required class="card-cvc"></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Month" required class="card-month"></input>
                    </div>
                    <div class="input-info">
                        <input type="text" placeholder="Year" required class="card-year"></input>
                    </div>
                </div>
                <h3>Amount</h3>
                <div class="amount-info">
                    <div class="input-info">
                        <input type="number" placeholder="123.11" required class="payment-amount"></input>
                    </div>
                </div>
                {/* Yasmine added a submit button here */}
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <button type="submit">Submit</button>
                </form>
            </form>
        
        </div>


    );
}

export default Payment