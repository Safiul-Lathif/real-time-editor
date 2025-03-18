import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout({ amount }) {
    const clientID =
        "AVrZ0lCt5i_kwOW2UHsv2hk2mHb3aLDUEdZn2mTUQrjjb7i6Y3aH84MWPzT9YbQB7vgEf5DmFwk3XZWK"; // Replace with your client ID

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: amount, // Set your payment amount
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            // Handle successful payment (e.g., update order status, send confirmation)
            console.log(details);
            const body = {
                package_id: 2,
                transaction_id: details.id,
                created_time: details.update_time,
                intent: details.intent,
                payer_id: details.payer.payer_id,
                payer_details: "",
                currency_code: details.purchase_units[0].amount.currency_code,
                amount: details.purchase_units[0].amount.value,
                status: details.status,
                updated_time: details.create_time,
            }
        });
    };

    const onError = (err) => {
        // Handle errors (e.g., display error message)
        console.error("PayPal error:", err);
    };

    return (
        <PayPalScriptProvider options={{ "client-id": clientID, currency: "USD", }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalCheckout;
