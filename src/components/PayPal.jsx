import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout({ amount, package_id }) {
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
            console.log(details);
            const body = {
                package_id: package_id,
                transaction_id: details.id,
                created_time: details.update_time,
                intent: details.intent,
                payer_id: details.payer.payer_id,
                payer_details: JSON.stringify(details.payer),
                currency_code: details.purchase_units[0].amount.currency_code,
                amount: details.purchase_units[0].amount.value,
                status: details.status,
                updated_time: details.create_time,
            }
            console.log(body);
            fetch("http://pocapi.researchpick.com/api/StoreTransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === true) {
                        alert("Plan Activated");
                    } else {
                        alert("Transaction failed.");
                    }
                    console.log(data);
                }

                )
                .catch((err) => console.error(err));
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
