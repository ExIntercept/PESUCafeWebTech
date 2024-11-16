// src/components/About.js
import React from 'react';
import '../styles/About.css';

function About() {
    return (
        <div className="about-container">
            <h1>About PESU-Cafe</h1>
            <section className="about-description">
                <p>
                    PESU-Cafe is your one-stop solution for ordering food from the PES University cafeteria. 
                    With this app, you can browse the menu, customize your order, and receive notifications 
                    when your food is ready for collection, making the process quick and hassle-free.
                </p>
            </section>
            
            <section className="about-features">
                <h2>Features</h2>
                <ul>
                    <li>View and browse menu items from various cafeteria outlets</li>
                    <li>Customizable orders with quantity selection</li>
                    <li>Real-time notifications for order readiness</li>
                    <li>Seamless Google login for easy access</li>
                    <li>Secure payment gateway integration</li>
                </ul>
            </section>
            
            <section className="about-contact">
                <h2>Contact Us</h2>
                <p>
                    For support or feedback, please reach out to us at <a href="mailto:support@pesucafe.com">support@pesucafe.com</a>.
                </p>
            </section>
        </div>
    );
}

export default About;
