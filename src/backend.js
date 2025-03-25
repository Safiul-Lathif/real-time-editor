import Echo from 'laravel-echo';
import Pusher from 'pusher-js'; // Or import io from 'socket.io-client';

// Assuming you have access to the authenticated user object (e.g., from Redux, Context API, or props)
const initializeEcho = (userId) => {
    window.Pusher = Pusher; // Required for Laravel Echo with Pusher

    window.Echo = new Echo({
        broadcaster: 'pusher', // Or 'socket.io'
        key: "2ae2e982409c3e397b85", // Replace with your Pusher app key
        cluster: "ap2", // Replace with your Pusher cluster
        forceTLS: true,
    });

    // You might want to store this Echo instance somewhere if you need to access it elsewhere
    // For example, in a React context or a global variable (be mindful of best practices)
};

export default initializeEcho;