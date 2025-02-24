'use client';

import { Link } from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 bg-darkBg border-t border-primary border-opacity-10">
      <div className="container-voyager">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col space-y-4"
            >
              <Link
                href="/"
                className="flex items-center gap-3 w-fit"
              >
                <Image
                  src="/Voyager-Box-Logo.png"
                  alt="Voyager Logo"
                  width={60}
                  height={60}
                  className="rounded-md shadow-glow-sm hover:shadow-glow transition-all duration-300"
                />
                <span className="font-heading text-3xl font-bold text-primary">
                  VOYAGER
                </span>
              </Link>
              <p className="text-textLight opacity-60 mt-4 max-w-md">
                We help agencies and businesses deliver immersive
                experiences to their clients. Our white-label
                solutions make you look good without the overhead.
              </p>
            </motion.div>
          </div>

          {/* Quick links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-primary mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#benefits"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#studio"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Studio Access
                  </Link>
                </li>
                <li>
                  <Link
                    href="#plans"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Plans
                  </Link>
                </li>
                <li>
                  <Link
                    href="#signup"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-primary mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="text-textLight opacity-60 hover:opacity-100 transition-opacity">
                  <span className="block">Email:</span>
                  <Link
                    href="mailto:connect@voyagervrlab.co.uk"
                    className="text-primary hover:text-accent transition-colors hover:translate-x-1 transform inline-block"
                  >
                    connect@voyagervrlab.co.uk
                  </Link>
                </li>
                <li className="text-textLight opacity-60 hover:opacity-100 transition-opacity">
                  <span className="block">Phone:</span>
                  <Link
                    href="tel:+447470361585"
                    className="text-primary hover:text-accent transition-colors hover:translate-x-1 transform inline-block"
                  >
                    +44 7470 361585
                  </Link>
                </li>
                <li className="text-textLight opacity-60 hover:opacity-100 transition-opacity">
                  <span className="block">Address:</span>
                  <p>
                    The Hub, 58a Granby St,
                    <br />
                    Leicester, LE1 1DH,
                    <br />
                    United Kingdom
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-primary border-opacity-10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-textLight opacity-40 text-sm">
            &copy; {year} Voyager. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <span className="text-textLight opacity-40 text-sm">
              Terms and Privacy Policy Coming Soon
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
