import React, { useState } from "react";

const FAQSection = () => {
  // State to track the active accordion item
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Function to toggle accordion items
  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      // If the clicked accordion is already open, close it
      setActiveAccordion(null);
    } else {
      // Otherwise, open the clicked accordion
      setActiveAccordion(index);
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-900">
        {/* FAQ */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Grid */}
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="max-w-xs">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                  Frequently
                  <br />
                  asked questions
                </h2>
                <p className="mt-1 hidden md:block text-gray-600 dark:text-gray-400">
                  Answers to the most frequently asked questions.
                </p>
              </div>
            </div>
            {/* End Col */}
            <div className="md:col-span-3">
              {/* Accordion */}
              <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-gray-700">
                {faqData.map((item, index) => (
                  <div
                    className={`hs-accordion pt-6 pb-3 ${
                      activeAccordion === index ? "active" : ""
                    }`}
                    key={index}
                  >
                    <button
                      className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                      onClick={() => toggleAccordion(index)}
                    >
                      {item.question}
                      {activeAccordion === index ? (
                        <svg
                          className="w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>
                    <div
                      className={`hs-accordion-content ${
                        activeAccordion === index ? "block" : "hidden"
                      } w-full overflow-hidden transition-[height] duration-300`}
                    >
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* End Accordion */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End FAQ */}
      </div>
    </div>
  );
};

export default FAQSection;

// Example FAQ data (you can replace this with your actual FAQ data)
const faqData = [
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.",
  },
  {
    question: "My team has credits. How do we use them?",
    answer:
      "Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.",
  },
  {
    question: "How does Preline's pricing work?",
    answer:
      "Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.",
  },
  {
    question: "How secure is Preline?",
    answer:
      "Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.",
  },
  {
    question: "How do I get access to a theme I purchased?",
    answer:
      "If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.",
  },
  {
    question: "Upgrade License Type",
    answer:
      "There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.",
  },
];
