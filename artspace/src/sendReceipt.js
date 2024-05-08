import functions from 'firebase-functions';
import admin from 'firebase-admin';
import "./Payment.js";
admin.initializeApp();
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// pull artists info from commissions file?
// pull clients info from Payment.js

// Extract email template into a separate function
function generateReceiptEmail(receiptData) {
    const receiptDate = new Date(receiptData.receiptDate).toLocaleDateString();
    const sellerAddress = `${receiptData.sellerAddress.street}, ${receiptData.sellerAddress.city}, ${receiptData.sellerAddress.country}`;
    const clientAddress = `${receiptData.clientAddress.street}, ${receiptData.clientAddress.city}, ${receiptData.clientAddress.country}`;

    return `
        <html>
            <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #fff;
                }

                h1 {
                color: #444;
                text-align: center;
                margin-bottom: 20px;
                }

                table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                }

                th,
                td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                }

                th {
                background-color: #f2f2f2;
                font-weight: bold;
                }

                tfoot td {
                font-weight: bold;
                }

                p {
                margin-bottom: 10px;
                }

                .address {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                }
    
                .address .box {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                margin-right: 20px;
                }
    
                .address .box h3 {
                margin-top: 0;
                }
    
                .address .box p {
                margin: 0;
                }
                
                .ourLogo {
                    text-align: left;
                    margin-bottom: 20px;
                }
    
                .ourLogo img {
                    width: 200px;
                    height: auto;
                }
            </style>
            </head>
            <body>
            <div class="ourLogo">
                <img src="/Homepage art/logo-modified.png" alt="Logo">
            </div>
            <div class="address">
            <div class="box">
                <h3>Seller</h3>
                <p><strong>Address:</strong> ${sellerAddress}</p>
                <p><strong>Email:</strong> ${receiptData.sellerEmail}</p>
            </div>
            <div class="box">
                <h3>Client</h3>
                <p><strong>Address:</strong> ${clientAddress}</p>
                <p><strong>Email:</strong> ${receiptData.clientEmail}</p>
            </div>
            </div>
            <h1>Thank you for your purchase!</h1>
            <p>Dear ${receiptData.buyerName},</p>
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
                ${receiptData.items.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.subtotal}</td>
                </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <tr>
                <td colspan="3"></td>
                <td>Total: ${receiptData.total}</td>
                </tr>
            </tfoot>
            </table>
            <p>Your order is valid till ${receiptData.validTill}. For any questions or concerns, please contact us at ${receiptData.contactNumber} or email us at ${receiptData.sellerEmail}.</p>
            <p>Thank you for shopping with us!</p>
        </body>
        </html>
    `;
}

//Version 2
exports.sendReceipt = functions.https.onCall(async (data, context) => {
    try {
        // Validate data
        if (!data.formData) {
            throw new Error('Form data is required.');
        }

        // Extract relevant information from the data
        const formData = data.formData;
        const { buyerName, buyerEmail, items, total, validTill, contactNumber } = formData;

        // Construct receipt data
        const receiptData = {
            receiptDate: Date.now(), // Example: Timestamp of receipt generation
            sellerAddress: {
                street: "123 Seller St",
                city: "Seller City",
                country: "Seller Country"
            }, // Example: Seller's address
            clientAddress: {
                street: "456 Client St",
                city: "Client City",
                country: "Client Country"
            }, // Example: Client's address
            sellerEmail: "seller@example.com", // Example: Seller's email
            clientEmail: buyerEmail, // Example: Client's email
            buyerName: buyerName, // Example: Client's name
            items: items, // Example: Array of purchased items
            total: total, // Example: Total amount
            validTill: validTill, // Example: Expiry date of the receipt
            contactNumber: contactNumber // Example: Seller's contact number
        };

        // Generate receipt email HTML
        const htmlContent = generateReceiptEmail(receiptData);

        // Send email
        const msg = {
            to: buyerEmail, // Send receipt to the buyer's email
            from: 'your@example.com', // Your sender email address
            subject: 'Receipt for Your Purchase',
            html: htmlContent
        };

        await admin.firestore().collection('receipts').add(receiptData); // Save receipt data to Firestore if needed

        // Send email using SendGrid, Nodemailer, or any other email service
        // Example: await sendEmail(msg);

        // Return success status
        return { status: 'success', message: 'Receipt sent successfully.' };
    } catch (error) {
        // Handle errors
        console.error('Error sending receipt:', error);
        return { status: 'error', message: 'Failed to send receipt.' };
    }
});

// sendReceipt.js
// export { sendReceipt };

//Version 1
// exports.sendReceipt = functions.https.onCall(async (data, context) => {
//   const receiptNumber = admin.firestore().collection('receipts').doc().id;

//   const msg = {
//     to: data.to,
//     from: data.from,
//     subject: `${data.subject} - ${receiptNumber}`,
//     html: generateReceiptEmail(data.receiptData),
//   };

//   const receiptDoc = admin.firestore().collection('receipts').doc(receiptNumber);
//   await receiptDoc.set(msg);

//   return {
//     status: 'success',
//     receiptNumber,
//   };
// });