import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./styles/Receipt.css"; 

const Receipt = () => {
    const location = useLocation();
    const { formData, sellerData, itemData } = location.state;

    // Calculate total
    const total = itemData.items.reduce((acc, item) => acc + item.subtotal, 0);

    // Calculate valid until date (today's date + 7 days)
    const today = new Date();
    const validUntil = new Date(today);
    validUntil.setDate(validUntil.getDate() + 7);

    return (
        <div className="receipt-container">
            <div className="receipt-content">
                <div className="address">
                    <div className="box">
                        <h3>Seller</h3>
                        <p><strong>Address: </strong> {sellerData.billingAddress1}</p>
                        <br/>
                        <p><strong>City: </strong> {sellerData.billingCity}</p>
                        <br/>
                        <p><strong>State: </strong> {sellerData.billingState}</p>
                        <p><strong>Zip: </strong> {sellerData.billingZip}</p>
                    </div>
                    <div className="box">
                        <h3>Client</h3>
                        <p><strong>Address: </strong> {formData.billingAddress1}</p>
                        <br/>
                        <p><strong>City: </strong> {formData.billingCity}</p>
                        <br/>
                        <p><strong>State: </strong> {formData.billingState}</p>
                        <p><strong>Zip: </strong> {formData.billingZip}</p>
                    </div>
                </div>
                <h1>Thank you for your purchase!</h1>
                <p>Dear {formData.firstName} {formData.lastName},</p>
                <br/>
                <p>We are pleased to confirm your recent purchase:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemData.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            {/* <td>Total: {formData.paymentAmount}</td> */}
                            <td>Total: {total}</td>
                        </tr>
                    </tfoot>
                </table>
                <p>Your order is valid until {validUntil.toLocaleDateString()}. For any questions or concerns, you may contact the seller at {sellerData.phone} or email them at {sellerData.email}.</p>
                <p>Thank you for shopping with us!</p>
            </div>
        </div>
    );
}

export default Receipt;