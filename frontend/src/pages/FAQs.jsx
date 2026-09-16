// pages/FAQs.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const FAQ_ITEMS = [
  {
    q: "Which cities do you provide service in?",
    a: "Hammad Motors and Rent A Car Pakistan is based in Gujrat, and we provide service across all major cities of Pakistan, including Lahore, Islamabad, Faisalabad, Karachi, and more.",
  },
  {
    q: "Can I rent a car with a driver?",
    a: "Yes — all of our luxury vehicles are available with a professional driver on request. Simply mention this when making your booking.",
  },
  {
    q: "How do I book a car?",
    a: "Browse our fleet, select a car, choose your pickup and drop-off dates and locations, and confirm your booking online. Our team will reach out to finalize the details.",
  },
  {
    q: "What documents do I need to rent a car?",
    a: "You'll typically need a valid CNIC and, if you're driving yourself, a valid driving license. Our team will confirm exact requirements when you book.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash on pickup, card payments, and mobile wallet transfers (JazzCash / EasyPaisa). Contact us for details on the payment method that works best for you.",
  },
  {
    q: "Can I cancel or change my booking?",
    a: "Yes, bookings can be cancelled or adjusted from your account under 'My Bookings', subject to availability. For urgent changes, contact us directly.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <Helmet>
        <title>FAQs | Hammad Motors and Rent A Car Pakistan</title>
        <meta name="description" content="Frequently asked questions about renting a car with Hammad Motors and Rent A Car Pakistan." />
      </Helmet>

      <section className="bg-asphalt text-cream py-16">
        <div className="container-x max-w-3xl">
          <span className="text-amber text-xs font-semibold tracking-widest uppercase">Support</span>
          <h1 className="font-display text-3xl md:text-4xl mt-2">Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="container-x py-16 max-w-2xl">
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="card">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-asphalt">{item.q}</span>
                  <span className="text-amber-dark text-lg shrink-0">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <p className="px-4 pb-4 text-sm text-asphalt/70 leading-relaxed">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FAQs;
