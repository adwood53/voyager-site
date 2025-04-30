'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Select,
  SelectItem,
} from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );

  // Load HubSpot tracking script
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = '//js.hs-scripts.com/47604746.js';
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(
        'hs-script-loader'
      );
      if (existingScript) existingScript.remove();
    };
  }, []);

  // Define services for the dropdown
  const services = [
    { value: 'partnership', label: 'Voyager Partnership' },
    { value: 'upgrade', label: 'Upgrade Partnership' },
    { value: 'ar', label: 'AR' },
    { value: 'vr', label: 'VR' },
    { value: 'studio', label: 'Studio' },
    { value: 'virtual-events', label: 'Virtual Events' },
    { value: 'gamification', label: 'Gamification' },
    { value: 'custom', label: 'Custom Solutions' },
  ];

  // State for selected services
  const [selectedServices, setSelectedServices] = useState([]);

  // Submit handler to post data to HubSpot using their Forms API
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const payload = {
      fields: [
        { name: 'firstname', value: form.firstname.value },
        { name: 'lastname', value: form.lastname.value },
        { name: 'email', value: form.email.value },
        { name: 'company', value: form.company.value },
        { name: 'message', value: form.message.value },
        {
          name: 'voyager-services-interested',
          value: selectedServices.join(', '), // join selected services into a comma-separated string
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    console.log('Payload to be sent:', payload);

    try {
      const response = await fetch(
        'https://api.hsforms.com/submissions/v3/integration/submit/47604746/c4aa0a63-b6ae-4e49-a699-5f2b95b84c42',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log('Form submission successful!', result);
        form.reset();
        setSelectedServices([]);
      } else {
        console.error('Form submission error:', result);
      }
    } catch (error) {
      console.error('Form submission exception:', error);
    }
  };

  return (
    <section
      id="signup"
      ref={sectionRef}
      className="py-24 bg-backgroundDark relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-darkBg to-backgroundDark"></div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary bg-opacity-5 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-altPrimary bg-opacity-5 rounded-full filter blur-3xl"
        ></motion.div>
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        <div className="max-w-4xl mx-auto">
          <Card className="card-voyager bg-darkCard border border-primary border-opacity-20 hover:border-opacity-40 overflow-hidden shadow-glow-sm">
            <CardBody className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Left side */}
                <div className="w-full md:w-1/3 p-8 relative flex flex-col justify-center bg-gradient-to-br from-primary to-accent">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-heading text-textLight mb-4">
                      Get Started
                    </h2>
                    <p className="text-textLight opacity-90 mb-4">
                      Let&apos;s Make Something Unreal
                    </p>
                    <p className="text-textLight opacity-80 text-sm">
                      No lengthy applications, no complex contracts.
                      If you want to deliver cutting-edge immersive
                      experiences, we&apos;ll make it happen.
                    </p>

                    <div className="mt-8 bg-darkBg bg-opacity-20 p-5 rounded-lg backdrop-blur-sm">
                      <h3 className="text-lg font-medium text-textLight mb-3">
                        Contact Us Directly
                      </h3>
                      <div className="space-y-2 text-textLight">
                        <div className="flex items-start">
                          <span className="text-lg w-6 flex justify-center mr-2">
                            📧
                          </span>
                          <a
                            href="mailto:connect@voyagervrlab.co.uk"
                            className="hover:underline transition-all break-words overflow-hidden"
                          >
                            connect@voyagervrlab.co.uk
                          </a>
                        </div>
                        <div className="flex items-start">
                          <span className="text-lg w-6 flex justify-center mr-2">
                            📱
                          </span>
                          <a
                            href="tel:+447470361585"
                            className="hover:underline transition-all"
                          >
                            +44 7470 361585
                          </a>
                        </div>
                        <div className="flex items-start">
                          <span className="text-lg w-6 flex justify-center mr-2">
                            📍
                          </span>
                          <span className="flex-1">
                            The Hub, 58a Granby St,
                            <br />
                            Leicester, LE1 1DH,
                            <br />
                            United Kingdom
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right side form */}
                <div className="w-full md:w-2/3 p-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <form onSubmit={handleSubmit}>
                      {/* First Row: First Name and Last Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-2 text-textLight">
                            First Name*
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              name="firstname"
                              placeholder="Your first name"
                              required
                              className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 focus:outline-none focus:border-opacity-70 placeholder:text-textLight placeholder:opacity-40"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 text-textLight">
                            Last Name*
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              name="lastname"
                              placeholder="Your last name"
                              required
                              className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 focus:outline-none focus:border-opacity-70 placeholder:text-textLight placeholder:opacity-40"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <div className="mb-2 text-textLight">
                          Email*
                        </div>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            required
                            className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 focus:outline-none focus:border-opacity-70 placeholder:text-textLight placeholder:opacity-40"
                          />
                        </div>
                      </div>

                      {/* Business Name Field */}
                      <div>
                        <div className="mb-2 text-textLight">
                          Business Name*
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            name="company"
                            placeholder="Your business name"
                            required
                            className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 focus:outline-none focus:border-opacity-70 placeholder:text-textLight placeholder:opacity-40"
                          />
                        </div>
                      </div>

                      {/* Services Field */}
                      <div>
                        <div className="mb-2 text-textLight">
                          What services are you interested in?
                        </div>
                        <div className="relative">
                          <Select
                            items={services}
                            placeholder="Select services"
                            selectionMode="multiple"
                            onSelectionChange={(selected) => {
                              if (selected) {
                                const values = Array.from(selected);
                                setSelectedServices(values);
                              } else {
                                setSelectedServices([]);
                              }
                            }}
                            classNames={{
                              base: 'max-w-full',
                              trigger:
                                'border border-primary border-opacity-30 rounded-md bg-darkBg hover:bg-opacity-60 focus-within:border-opacity-70 hover:border-opacity-50 hover:shadow-glow-sm transition-all duration-200 pr-8',
                              value: 'text-textLight',
                              popover:
                                'bg-darkBg border border-primary border-opacity-30 rounded-md shadow-glow-sm',
                              listbox: 'bg-darkBg text-textLight',
                              listboxItem:
                                'text-textLight data-[hover=true]:bg-primary data-[hover=true]:bg-opacity-20',
                              selectorIcon: 'hidden',
                            }}
                          >
                            {(service) => (
                              <SelectItem
                                key={service.value}
                                value={service.value}
                              >
                                {service.label}
                              </SelectItem>
                            )}
                          </Select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary">
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M8.25 15.25L12 18.75L15.75 15.25"
                              ></path>
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 5.75V18.25"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Notes Field */}
                      <div>
                        <div className="mb-2 text-textLight">
                          Additional Notes
                        </div>
                        <div className="relative">
                          <textarea
                            name="message"
                            placeholder="Tell us about your project or any specific requirements"
                            rows="4"
                            className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 resize-y focus:outline-none focus:border-opacity-70 placeholder:text-textLight placeholder:opacity-40"
                          ></textarea>
                        </div>
                      </div>

                      <div className="pt-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-primary text-textLight font-medium hover:bg-accent transition-all duration-300 rounded-md py-3 text-lg hover:shadow-glow glitch-effect"
                            size="lg"
                          >
                            Apply Now
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  </motion.div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
