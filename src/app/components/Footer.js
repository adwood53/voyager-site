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
                    href="/about"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#benefits"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#studio"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Studio Access
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#plans"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Plans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-textLight opacity-60 hover:text-primary hover:opacity-100 transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#signup"
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
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <div className="flex items-center gap-4">
              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/company/voyager-vr-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textLight opacity-60 hover:opacity-100 hover:text-primary transition-all"
                aria-label="Voyager LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/voyager_vr_lab_uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textLight opacity-60 hover:opacity-100 hover:text-primary transition-all"
                aria-label="Voyager Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok Icon */}
              <a
                href="https://www.tiktok.com/@voyager.vr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textLight opacity-60 hover:opacity-100 hover:text-primary transition-all"
                aria-label="Voyager TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-4 text-textLight opacity-40 text-sm">
              <Link
                href="/our-code"
                className="hover:text-primary hover:opacity-100 transition-colors"
              >
                Our Code
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                className="hover:text-primary hover:opacity-100 transition-colors"
              >
                Terms
              </Link>
              <span>•</span>
              <Link
                href="/privacy"
                className="hover:text-primary hover:opacity-100 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="/bug-report"
                className="hover:text-primary hover:opacity-100 transition-colors"
              >
                Report a Bug
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
