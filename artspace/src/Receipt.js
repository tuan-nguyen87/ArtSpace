import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./styles/Receipt.css"; 

const Receipt = () => {
    const location = useLocation();
    const { formData, sellerData } = location.state;

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
                        <br/>
                        <p><strong>Email: </strong> {sellerData.email}</p>
                        <br/>
                        <p><strong>Phone #: </strong> {sellerData.phone}</p>
                    </div>
                    <div className="box">
                        <h3>Client</h3>
                        <p><strong>Address: </strong> {formData.billingAddress1}</p>
                        <br/>
                        <p><strong>City: </strong> {formData.billingCity}</p>
                        <br/>
                        <p><strong>State: </strong> {formData.billingState}</p>
                        <p><strong>Zip: </strong> {formData.billingZip}</p>
                        <br/>
                        <p><strong>Email: </strong> {formData.email}</p>
                        <br/>
                        <p><strong>Phone #: </strong> {formData.phone}</p>
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
                        {/* {formData.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.subtotal}</td>
                            </tr>
                        ))} */}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td>Total: {formData.paymentAmount}</td>
                        </tr>
                    </tfoot>
                </table>
                <p>Your order is valid till some date. For any questions or concerns, please contact us at SELLER NUMBER or email us at SELLER EMAIL.</p>
                <p>Thank you for shopping with us!</p>
            </div>
        </div>
    );
}

export default Receipt;