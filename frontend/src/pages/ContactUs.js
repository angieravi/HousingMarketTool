import React from 'react';
import Footer from '../components/Footer';

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-gray-700 text-lg">
          Have questions or feedback? We'd love to hear it! Contact us at{' '}
          <a
            href="mailto:aeg70@pitt.edu"
            className="text-blue-500 underline hover:text-blue-700"
          >
            aeg70@pitt.edu
          </a>.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
