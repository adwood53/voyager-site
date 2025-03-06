'use client';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Link,
} from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function PlansSection() {
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

  return (
    <section
      id="plans"
      ref={sectionRef}
      className="py-24 bg-darkBg relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 w-64 h-64 bg-accent rounded-full filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-altPrimary rounded-full filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
          >
            Two Ways to <span className="text-primary">Join</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-textLight opacity-80 max-w-3xl mx-auto"
          >
            Choose the access level that works for you and your
            clients
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="h-full flex"
          >
            <Card className="card-voyager h-full bg-gradient-to-br from-backgroundDark to-darkBg border border-primary border-opacity-40 transition-all hover:shadow-glow-lg w-full flex flex-col">
              <div className="absolute top-0 right-0 bg-primary text-textLight px-4 text-sm font-bold rounded-bl-lg">
                STANDARD PLAN
              </div>
              <CardHeader className="pb-0 pt-6 px-6 flex-shrink-0">
                <div className="flex-1">
                  <h3 className="font-heading text-2xl text-textLight">
                    FREE Immersive Reseller
                  </h3>
                </div>
                <div className="flex flex-col items-end self-start">
                  <p className="text-4xl font-bold text-primary">
                    FREE
                  </p>
                  <p className="text-sm text-textLight opacity-60">
                    Upgradeable
                  </p>
                </div>
              </CardHeader>
              <CardBody className="py-6 flex-grow">
                <ul className="space-y-4 min-h-[280px]">
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <span>
                      Sales PDF with ideas to sell immersive across
                      industries
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <span>Your own quoting & booking system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <span>
                      Experience Builder, create custom interactive
                      experiences
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <span>
                      Full access to our immersive tech team
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <span>
                      Minium 20% Commission on all products sold.
                    </span>
                  </li>
                </ul>
              </CardBody>
              <CardFooter className="mt-auto">
                <Button
                  as={Link}
                  href="#signup"
                  className="w-full bg-primary text-textLight font-medium hover:bg-accent transition-all duration-300 rounded-md py-3 hover:shadow-glow"
                >
                  Apply now for Free →
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="h-full flex"
          >
            <Card className="card-voyager h-full bg-gradient-to-br from-backgroundDark to-darkBg border border-primary border-opacity-40 transition-all hover:shadow-glow-lg w-full flex flex-col">
              <div className="absolute top-0 right-0 bg-primary text-textLight px-4 text-sm font-bold rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader className="pb-0 pt-6 px-6 flex-shrink-0">
                <div className="flex-1">
                  <h3 className="font-heading text-2xl text-textLight">
                    PRO White-Label Partner
                  </h3>
                </div>
                <div className="flex flex-col items-end self-start">
                  <p className="text-4xl font-bold text-primary">
                    £799
                  </p>
                  <p className="text-sm text-textLight opacity-60">
                    One-Time Fee
                  </p>
                </div>
              </CardHeader>

              <CardBody className="py-6 flex-grow">
                <div className="mb-4">
                  <p className="font-medium">
                    Everything in the Free Tier PLUS:
                  </p>
                </div>
                <ul className="space-y-4 min-h-[280px]">
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <div>
                      <span className="font-medium text-primary">
                        Immersive Brand Package
                      </span>
                      <p className="text-sm text-textLight opacity-60">
                        Your own branded immersive marketing materials
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <div>
                      <span className="font-medium text-primary">
                        50 Interactive Business Cards
                      </span>
                      <p className="text-sm text-textLight opacity-60">
                        Tap-to-access digital portfolio & contact info
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-confirm">✓</span>
                    <div>
                      <span className="font-medium text-primary">
                        50 Interactive Posters
                      </span>
                      <p className="text-sm text-textLight opacity-60">
                        Clients scan to engage with your immersive
                        work
                      </p>
                    </div>
                  </li>
                </ul>
              </CardBody>
              <CardFooter className="mt-auto">
                <Button
                  as={Link}
                  href="#signup"
                  className="w-full bg-primary text-textLight font-medium hover:bg-accent transition-all duration-300 rounded-md py-3 hover:shadow-glow glitch-effect"
                >
                  Upgrade to Pro →
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
