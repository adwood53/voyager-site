'use client';

import {
  Card,
  CardBody,
  Input,
  Button,
  Link,
  Select,
  SelectItem,
} from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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

  const services = [
    { value: 'ar', label: 'AR' },
    { value: 'vr', label: 'VR' },
    { value: 'studio', label: 'Studio' },
    { value: 'virtual-events', label: 'Virtual Events' },
    { value: 'gamification', label: 'Gamification' },
    { value: 'custom', label: 'Custom Solutions' },
  ];

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
                {/* Left side gradient banner */}
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
                        <p className="flex items-center gap-2 text-sm">
                          <span className="text-lg">📧</span>
                          <a
                            href="mailto:connect@voyagervrlab.co.uk"
                            className="hover:underline transition-all"
                          >
                            connect@voyagervrlab.co.uk
                          </a>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="text-lg">📱</span>
                          <a
                            href="tel:+447470361585"
                            className="hover:underline transition-all"
                          >
                            +44 7470 361585
                          </a>
                        </p>
                        <p className="flex items-start gap-2 text-sm">
                          <span className="text-lg">📍</span>
                          <span>
                            The Hub, 58a Granby St,
                            <br />
                            Leicester, LE1 1DH,
                            <br />
                            United Kingdom
                          </span>
                        </p>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          label="Name"
                          labelPlacement="outside"
                          placeholder="Your name"
                          classNames={{
                            base: 'max-w-full',
                            label: 'text-textLight',
                            inputWrapper:
                              'border border-primary border-opacity-30 rounded-md bg-darkBg hover:bg-opacity-60 focus-within:border-opacity-70 hover:border-opacity-50 hover:shadow-glow-sm transition-all duration-200',
                            input:
                              'text-textLight placeholder:text-textLight placeholder:opacity-40',
                          }}
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          label="Email"
                          labelPlacement="outside"
                          placeholder="Your email"
                          classNames={{
                            base: 'max-w-full',
                            label: 'text-textLight',
                            inputWrapper:
                              'border border-primary border-opacity-30 rounded-md bg-darkBg hover:bg-opacity-60 focus-within:border-opacity-70 hover:border-opacity-50 hover:shadow-glow-sm transition-all duration-200',
                            input:
                              'text-textLight placeholder:text-textLight placeholder:opacity-40',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <Input
                        type="text"
                        label="Business Name"
                        labelPlacement="outside"
                        placeholder="Your business name"
                        classNames={{
                          base: 'max-w-full',
                          label: 'text-textLight',
                          inputWrapper:
                            'border border-primary border-opacity-30 rounded-md bg-darkBg hover:bg-opacity-60 focus-within:border-opacity-70 hover:border-opacity-50 hover:shadow-glow-sm transition-all duration-200',
                          input:
                            'text-textLight placeholder:text-textLight placeholder:opacity-40',
                        }}
                      />
                    </div>

                    <div>
                      <Select
                        label="What services are you interested in?"
                        labelPlacement="outside"
                        placeholder="Select services"
                        selectionMode="multiple"
                        classNames={{
                          base: 'max-w-full',
                          label: 'text-textLight',
                          trigger:
                            'border border-primary border-opacity-30 rounded-md bg-darkBg hover:bg-opacity-60 focus-within:border-opacity-70 hover:border-opacity-50 hover:shadow-glow-sm transition-all duration-200',
                          value: 'text-textLight',
                          popover:
                            'bg-darkBg border border-primary border-opacity-30 rounded-md shadow-glow-sm',
                          listbox: 'bg-darkBg text-textLight',
                          listboxItem:
                            'text-textLight data-[hover=true]:bg-primary data-[hover=true]:bg-opacity-20',
                        }}
                      >
                        {services.map((service) => (
                          <SelectItem
                            key={service.value}
                            value={service.value}
                          >
                            {service.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="pt-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-primary text-textLight font-medium hover:bg-accent transition-all duration-300 rounded-md py-3 text-lg hover:shadow-glow glitch-effect"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
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
