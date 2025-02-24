/**
 * File: src/app/page.js
 *
 * Latest version with the following fixes:
 * 1) Key Focus (dark) section => the card text is now light, avoiding dark-on-dark issues.
 * 2) Hero "Accelerator" accent text uses the same layout/positioning as the other sections,
 *    i.e. heading at top, accent at ~2/3 with the "scale(1,1.3)" approach, consistent with how
 *    you do it in “Impact,” “Focus,” “Team,” “Contact,” etc.
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// HeroUI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';

import { motion } from 'framer-motion';

// Universal
import UniversalNavbar from '@/src/app/components/UniversalNavbar';
import UniversalFooter from '@/src/app/components/UniversalFooter';
import ScrollDownButton from '@/src/app/components/ScrollDownButton';

// Example data for Key Focus modals
const focusModals = {
  community: {
    title: 'Community Innovation',
    image: '/images/People2.jpeg',
    description:
      'Our community innovation efforts partner with local groups to launch sustainable, high-impact initiatives.',
  },
  tech: {
    title: 'Technology Solutions',
    image: '/images/LightBulb.png',
    description:
      'We design and deploy digital tools that address pressing social needs in an accessible, scalable manner.',
  },
  research: {
    title: 'Social Research',
    image: '/images/Research.png',
    description:
      'Through data-driven analysis, we uncover root causes of challenges and inform evidence-based solutions.',
  },
};

// Dark vs. Light heading/accent logic
const headingDark = 'text-background'; // Heading on dark => text-background
const accentDark = 'text-primary'; // Accent on dark => text-primary
const headingLight = 'text-primary'; // Heading on light => text-primary
const accentLight = 'text-foreground'; // Accent on light => text-foreground

// Framer Motion fade+rise animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Black BG, white text tooltips
const tooltipProps = {
  className: '!bg-black !text-white !p-2 !rounded !shadow-md',
  followCursor: true,
};

export default function HomePage() {
  const [openModal, setOpenModal] = useState(null);

  // Open a specific modal
  const handleOpenModal = (key) => {
    setOpenModal(key);
  };

  // Close the open modal
  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      {/*******************************************************************
       ** 1) HERO SECTION (Dark)
       **    Single scrollDown button
       **    "Accelerator" accent text is placed like other sections
       *******************************************************************/}
      <section className="relative md:h-screen h-auto bg-darkPrimary overflow-hidden pb-8">
        <div className="relative z-50">
          <UniversalNavbar variant="dark" />
        </div>

        <div className="relative w-full md:h-[calc(100vh-4rem)] h-auto flex flex-col px-6 pt-10">
          <div className="relative text-center mb-8">
            <h1
              className={`font-heading text-[7vw] tracking-tight ${headingDark}`}
              style={{
                letterSpacing: '0.02em',
                transform: 'scaleY(2)',
              }}
            >
              SOCIAL&nbsp;INNOVATION
            </h1>
            <span
              className={`font-accent ${accentDark} text-[8vw] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 whitespace-nowrap`}
              style={{ transform: 'scale(1,1.3)' }}
            >
              Accelerator
            </span>
          </div>

          {/* Container for hero image */}
          <div className="relative flex-grow">
            {/* Hero image with black tooltip */}
            <Tooltip
              content="Empower social progress"
              {...tooltipProps}
            >
              <div className="relative w-full h-80 md:h-full">
                <Image
                  src="/images/hero.jpeg"
                  alt="Hero section image"
                  fill
                  className="object-cover transition-opacity duration-300 hover:opacity-90"
                />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* ScrollDownButton only on hero */}
        <ScrollDownButton targetId="impact" />
      </section>

      {/*******************************************************************
       ** 2) IMPACT SECTION (Light)
       *******************************************************************/}
      <motion.section
        id="impact"
        className="relative md:h-screen h-auto bg-lightPrimary pb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="md:h-full h-auto flex flex-col px-[5%] pt-[5vh]">
          <div className="relative text-center mb-8">
            <h1
              className={`font-heading text-[7vw] tracking-tight ${headingLight}`}
              style={{
                letterSpacing: '0.02em',
                transform: 'scaleY(2)',
              }}
            >
              INNOVATION&nbsp;IMPACT
            </h1>
            <span
              className={`font-accent ${accentLight} text-[8vw] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 whitespace-nowrap`}
              style={{ transform: 'scale(1,1.3)' }}
            >
              By Numbers
            </span>
          </div>

          <div className="flex-grow flex items-center text-darkPrimary">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '/images/LightBulb.png',
                  number: '50+',
                  label: 'Projects Launched',
                  tooltip: 'Working across multiple sectors',
                },
                {
                  icon: '/images/Money.png',
                  number: '£2M+',
                  label: 'Funding Secured',
                  tooltip: 'Support from local & national grants',
                },
                {
                  icon: '/images/People1.jpeg',
                  number: '1000+',
                  label: 'People Impacted',
                  tooltip: 'Direct beneficiaries of our programs',
                },
                {
                  icon: '/images/Research.png',
                  number: '25+',
                  label: 'Research Projects',
                  tooltip: 'Data-driven solutions uncovered',
                },
              ].map((stat, idx) => (
                <Tooltip
                  key={idx}
                  content={stat.tooltip}
                  {...tooltipProps}
                >
                  <Card className="bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <CardBody className="p-6 flex flex-col items-center">
                      <div className="relative w-16 h-16 mb-4">
                        <Image
                          src={stat.icon}
                          alt={stat.label}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <h3 className="text-2xl font-bold">
                        {stat.number}
                      </h3>
                      <p className="mt-1 text-center">{stat.label}</p>
                    </CardBody>
                  </Card>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/*******************************************************************
       ** 3) KEY FOCUS AREAS (Dark)
       **    => text-textLight on the card so we avoid dark-on-dark
       *******************************************************************/}
      <motion.section
        id="focus"
        className="relative md:h-screen h-auto bg-darkPrimary pb-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="md:h-full h-auto flex flex-col px-[5%] pt-[5vh] text-textLight">
          <div className="relative text-center mb-8">
            <h1
              className={`font-heading text-[7vw] tracking-tight ${headingDark}`}
              style={{
                letterSpacing: '0.02em',
                transform: 'scaleY(2)',
              }}
            >
              KEY&nbsp;FOCUS&nbsp;AREAS
            </h1>
            <span
              className={`font-accent ${accentDark} text-[8vw] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 whitespace-nowrap`}
              style={{ transform: 'scale(1,1.3)' }}
            >
              Our Work
            </span>
          </div>

          <div className="flex-grow flex items-center mt-8 ">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  modalKey: 'community',
                  title: 'Community Innovation',
                  image: '/images/People2.jpeg',
                  desc: 'Support local solutions with direct impact.',
                },
                {
                  modalKey: 'tech',
                  title: 'Tech Solutions',
                  image: '/images/LightBulb.png',
                  desc: 'Leverage digital tools for bigger social reach.',
                },
                {
                  modalKey: 'research',
                  title: 'Social Research',
                  image: '/images/Research.png',
                  desc: 'Gather data to shape better solutions.',
                },
              ].map((area, idx) => (
                <Card
                  key={idx}
                  // 1) Card is on a dark background => text-textLight
                  className="bg-darkAccent text-textLight hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="p-4 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/RightArrow.svg"
                        alt="Arrow icon"
                        width={20}
                        height={20}
                      />
                      <h3 className="text-xl font-semibold">
                        {area.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardBody className="p-4">
                    <Tooltip
                      content={`Learn about ${area.title}`}
                      {...tooltipProps}
                    >
                      <div className="relative rounded mb-4 aspect-[4/3] overflow-hidden">
                        <Image
                          src={area.image}
                          alt={area.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </Tooltip>
                    <p className="text-sm">{area.desc}</p>
                  </CardBody>
                  <CardFooter className="p-4 border-t border-gray-700 flex items-center justify-between"></CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/*******************************************************************
       ** 4) TEAM SECTION (Light)
       *******************************************************************/}
      <motion.section
        id="team"
        className="relative md:h-screen h-auto bg-lightPrimary pb-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="md:h-full h-auto flex flex-col px-[5%] pt-[5vh]">
          <div className="relative text-center mb-8">
            <h1
              className={`font-heading text-[7vw] tracking-tight ${headingLight}`}
              style={{
                letterSpacing: '0.02em',
                transform: 'scaleY(2)',
              }}
            >
              MEET&nbsp;THE&nbsp;TEAM
            </h1>
            <span
              className={`font-accent ${accentLight} text-[8vw] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 whitespace-nowrap`}
              style={{ transform: 'scale(1,1.3)' }}
            >
              Our People
            </span>
          </div>

          <div className="flex-grow flex items-center">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Chris Shaw',
                  role: 'Technology Lead',
                  image: '/images/CShaw.jpeg',
                  desc: 'Ensures best practices in digital solutions.',
                },
                {
                  name: 'Stacey Wragg',
                  role: 'Community Lead',
                  image: '/images/SWragg.jpeg',
                  desc: 'Aligns projects with local priorities.',
                },
                {
                  name: 'Research Team',
                  role: 'Innovation Research',
                  image: '/images/Research.png',
                  desc: 'Collects data and measures outcomes.',
                },
              ].map((member, idx) => (
                <Card
                  key={idx}
                  className="bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="flex flex-col items-center p-4">
                    <Tooltip
                      content={`${member.name} - ${member.role}`}
                      {...tooltipProps}
                    >
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        className="!w-16 !h-16 mb-2"
                      />
                    </Tooltip>
                    <h3 className="font-semibold text-lg">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {member.role}
                    </p>
                  </CardHeader>
                  <CardBody className="p-4 text-center">
                    <p className="text-sm text-darkPrimary">
                      {member.desc}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/*******************************************************************
       ** 5) CONTACT SECTION (Dark)
       *******************************************************************/}
      <motion.section
        id="contact"
        className="relative md:h-screen h-auto bg-darkPrimary pb-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="md:h-full h-auto flex flex-col px-[5%] pt-[5vh] text-textLight">
          <div className="relative text-center mb-8">
            <h1
              className={`font-heading text-[7vw] tracking-tight ${headingDark}`}
              style={{
                letterSpacing: '0.02em',
                transform: 'scaleY(2)',
              }}
            >
              GET&nbsp;IN&nbsp;TOUCH
            </h1>
            <span
              className={`font-accent ${accentDark} text-[8vw] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 whitespace-nowrap`}
              style={{ transform: 'scale(1,1.3)' }}
            >
              Connect
            </span>
          </div>

          <div className="flex-grow flex items-center">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-darkAccent hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <CardHeader className="p-4 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-textLight">
                    Contact Us
                  </h3>
                </CardHeader>
                <CardBody className="p-4 space-y-4 text-textLight">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/Leicester1.jpeg"
                      alt="Location"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p>Leicester Innovation Hub</p>
                      <p>Innovation Centre</p>
                      <p>Leicester, UK</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>Email: info@socialinnovationpeople.co.uk</p>
                    <p>Tel: 07470 361 585</p>
                  </div>
                </CardBody>
                <CardFooter className="p-4 border-t border-gray-700 flex flex-col sm:flex-row sm:justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-primary text-darkPrimary hover:bg-accent"
                      onClick={() => window.open('tel:07470361585')}
                    >
                      Call Us
                    </Button>
                    <Image
                      src="/icons/TelIcon.svg"
                      alt="Call Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-primary text-darkPrimary hover:bg-accent"
                      onClick={() =>
                        window.open(
                          'mailto:info@socialinnovationpeople.co.uk'
                        )
                      }
                    >
                      Email Us
                    </Button>
                    <Image
                      src="/icons/WebIcon.svg"
                      alt="Email Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </CardFooter>
              </Card>
              <Tooltip
                content="Our Leicester location"
                {...tooltipProps}
              >
                <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Image
                    src="/images/Leicester2.jpeg"
                    alt="Leicester Location"
                    fill
                    className="object-cover"
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </motion.section>

      {/*******************************************************************
       ** 6) UNIVERSAL FOOTER (Dark)
       *******************************************************************/}
      <UniversalFooter variant="dark" />
    </>
  );
}
