import React, { useState } from 'react';
import './Receipt.css'; // Import the CSS file

const Receipt = ({ formData }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the form data to the server or perform any other necessary actions
        setSubmitted(true); // Set submitted to true to display the confirmation message
    };

    if (submitted) {
        return (
            <div className="receipt-container">
                <div className="receipt-content">
                    <div className="ourLogo">
                        <img src="/Homepage art/logo-modified.png" alt="Logo" />
                    </div>
                    <div className="address">
                        <div className="box">
                            <h3>Seller</h3>
                            <p><strong>Address:</strong> {formData.sellerAddress}</p>
                            <p><strong>Email:</strong> {formData.sellerEmail}</p>
                        </div>
                        <div className="box">
                            <h3>Client</h3>
                            <p><strong>Address:</strong> {formData.clientAddress}</p>
                            <p><strong>Email:</strong> {formData.clientEmail}</p>
                        </div>
                    </div>
                    <h1>Thank you for your purchase!</h1>
                    <p>Dear {formData.buyerName},</p>
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
                            {formData.items.map((item, index) => (
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
                                <td>Total: {formData.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <p>Your order is valid till {formData.validTill}. For any questions or concerns, please contact us at {formData.contactNumber} or email us at {formData.sellerEmail}.</p>
                    <p>Thank you for shopping with us!</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <button type="submit">Submit</button>
        </form>
    );
}

export default Receipt;

//     return `
//         <html>
//             <head>
//             <style>
//                 body {
//                 font-family: Arial, sans-serif;
//                 line-height: 1.6;
//                 color: #333;
//                 background-color: #fff;
//                 }

//                 h1 {
//                 color: #444;
//                 text-align: center;
//                 margin-bottom: 20px;
//                 }

//                 table {
//                 width: 100%;
//                 border-collapse: collapse;
//                 margin-bottom: 20px;
//                 }

//                 th,
//                 td {
//                 border: 1px solid #ddd;
//                 padding: 8px;
//                 text-align: left;
//                 }

//                 th {
//                 background-color: #f2f2f2;
//                 font-weight: bold;
//                 }

//                 tfoot td {
//                 font-weight: bold;
//                 }

//                 p {
//                 margin-bottom: 10px;
//                 }

//                 .address {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 20px;
//                 }
    
//                 .address .box {
//                 flex: 1;
//                 padding: 10px;
//                 border: 1px solid #ddd;
//                 margin-right: 20px;
//                 }
    
//                 .address .box h3 {
//                 margin-top: 0;
//                 }
    
//                 .address .box p {
//                 margin: 0;
//                 }
                
//                 .ourLogo {
//                     text-align: left;
//                     margin-bottom: 20px;
//                 }
    
//                 .ourLogo img {
//                     width: 200px;
//                     height: auto;
//                 }
//             </style>
//             </head>
//             <body>
//             <div class="ourLogo">
//                 <img src="/Homepage art/logo-modified.png" alt="Logo">
//             </div>
//             <div class="address">
//             <div class="box">
//                 <h3>Seller</h3>
//                 <p><strong>Address:</strong> ${sellerAddress}</p>
//                 <p><strong>Email:</strong> ${receiptData.sellerEmail}</p>
//             </div>
//             <div class="box">
//                 <h3>Client</h3>
//                 <p><strong>Address:</strong> ${clientAddress}</p>
//                 <p><strong>Email:</strong> ${receiptData.clientEmail}</p>
//             </div>
//             </div>
//             <h1>Thank you for your purchase!</h1>
//             <p>Dear ${receiptData.buyerName},</p>
//             <p>We are pleased to confirm your recent purchase:</p>
//             <table>
//             <thead>
//                 <tr>
//                 <th>Item</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Subtotal</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${receiptData.items.map(item => `
//                 <tr>
//                     <td>${item.name}</td>
//                     <td>${item.quantity}</td>
//                     <td>${item.price}</td>
//                     <td>${item.subtotal}</td>
//                 </tr>
//                 `).join('')}
//             </tbody>
//             <tfoot>
//                 <tr>
//                 <td colspan="3"></td>
//                 <td>Total: ${receiptData.total}</td>
//                 </tr>
//             </tfoot>
//             </table>
//             <p>Your order is valid till ${receiptData.validTill}. For any questions or concerns, please contact us at ${receiptData.contactNumber} or email us at ${receiptData.sellerEmail}.</p>
//             <p>Thank you for shopping with us!</p>
//         </body>
//         </html>
//     `;
// }