// src/app/components/dashboard/panels/ResourcesPanel.js
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { QRCodeSVG } from 'qrcode.react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Divider,
} from '@heroui/react';
import author from '@/src/schemas/author';

// NEW (use .min.mjs for React-PDF v9+)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResourcesPanel() {
  // State for active resource
  const [activeResource, setActiveResource] = useState(null);
  // State for active gallery item
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedWhat, setCopiedWhat] = useState(null);
  // State for active industry in sales resources
  const [activeIndustry, setActiveIndustry] = useState(null);
  // State for active PDF
  const [activePdf, setActivePdf] = useState(null);

  // State for PDF viewer
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfScale, setPdfScale] = useState(1.0);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Function to handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // Initialize Jotform embed handler
    if (
      window.jotformEmbedHandler &&
      iframeRef.current &&
      activeGalleryItem?.formId
    ) {
      window.jotformEmbedHandler(
        `iframe[id='JotFormIFrame-${activeGalleryItem.formId}']`,
        'https://form.jotform.com/'
      );
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setPdfLoading(false);
  }

  // Functions for navigation
  function previousPage() {
    setPageNumber((prevPageNumber) =>
      Math.max(prevPageNumber - 1, 1)
    );
  }

  function nextPage() {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages || 1)
    );
  }

  // Functions for zooming
  function zoomIn() {
    setPdfScale((prevScale) => Math.min(prevScale + 0.2, 2.0));
  }

  function zoomOut() {
    setPdfScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  }

  // Define our resources
  const resources = [
    {
      id: 'training-presentation',
      title: 'Partner Training Presentation',
      icon: '🎓',
      color: '#3B82F6', // Blue
      bgColor: '#EFF6FF', // Light blue background
      description:
        'Comprehensive presentation on becoming a successful Voyager partner.',
      type: 'presentation',
      fileType: 'Presentation',
      canvaUrl:
        'https://www.canva.com/design/DAGj8Gf0ImQ/4rAB-G8t6E95T-69c0KeKw/view',
      embedUrl:
        'https://www.canva.com/design/DAGj8Gf0ImQ/4rAB-G8t6E95T-69c0KeKw/view?embed',
      utm: 'utm_content=DAGj8Gf0ImQ&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    },
    {
      id: 'vcard-pricing',
      title: 'Pricing',
      icon: '💰',
      color: '#10B981', // Green
      bgColor: '#ECFDF5', // Light green background
      description:
        'Detailed breakdown of pricing structures for our vCard offerings.',
      type: 'case-studies',
      fileType: 'Spreadsheet',
      caseStudies: [
        {
          id: 'voyager-service-pricing',
          name: 'Voyager Service Costs',
          description: 'Cost rubric for Voyager Services',
          color: '#3B82F6', // Red
          canvaUrl:
            'https://www.canva.com/design/DAGk_u7Rn2Y/CE8Fp4sGtH74gU9l0JtHcQ/view',
          embedUrl:
            'https://www.canva.com/design/DAGk_u7Rn2Y/CE8Fp4sGtH74gU9l0JtHcQ/view?embed',
          utm: 'utm_content=DAGk_u7Rn2Y&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        {
          id: 'voyager-nfc-pricing',
          name: 'Voyager NFC Unit Costs',
          description: 'Cost rubric for Voyager NFC units',
          color: '#EF4444', // Red
          canvaUrl:
            'https://www.canva.com/design/DAGlXxC3OJY/-PQx5SAZsjh0M-n_fG4iAg/view',
          embedUrl:
            'https://www.canva.com/design/DAGlXxC3OJY/-PQx5SAZsjh0M-n_fG4iAg/view?embed',
          utm: 'utm_content=DAGlXxC3OJY&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        {
          id: 'voyager-feature-comparison',
          name: 'Voyager Feature Comparison',
          description: 'Feature Comparison Table',
          color: '#10B981', // Red
          canvaUrl:
            'https://www.canva.com/design/DAGk_itvhXM/tkcEPoJw9H1_4p_zCIYnLw/view',
          embedUrl:
            'https://www.canva.com/design/DAGk_itvhXM/tkcEPoJw9H1_4p_zCIYnLw/view?embed',
          utm: 'utm_content=DDAGk_itvhXM&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
      ],
    },
    {
      id: 'idea-factory',
      title: 'Idea Factory',
      icon: '💡',
      color: '#EC4899', // Pink
      bgColor: '#FCE7F3', // Light pink background
      description: 'A collection of ideas to use in your pitches.',
      type: 'gallery', // Change from 'case-studies' to 'gallery'
      fileType: 'Ideas',
      // Add gallery items instead of case studies
      galleryItems: [
        {
          id: 'suggest-idea',
          name: 'Suggest an Idea',
          description:
            'Have a great immersive tech idea? Share it with the community!',
          author: 'Voyager Team',
          image: '/ideas/submit-idea.png',
          isSuggestCard: true,
          formId: '251312979017054', // Replace the jotformUrl property with formId
        },
        {
          id: 'hole-in-wall',
          name: 'Hole in the Wall',
          description:
            'An image on a wall that, when scanned, reveals a virtual hole in the wall that acts as a portal to another world.',
          purpose:
            'Offer a view inside for your audience to explore a different environment.',
          author: 'Voyager Team',
          image: '/ideas/holeinwall.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'barn-door-bottle',
          name: 'Barn Door Bottle',
          description:
            'A Bottle that, when scanned, opens a barn door to reveal a virtual world or character inside.',
          purpose:
            'Create a fun and engaging way to showcase products or characters.',
          author: 'Voyager Team',
          image: '/ideas/barndoorbottle.webp',
          status: {
            liked: false,
            commissioned: true,
          },
        },
        {
          id: 'hollow-can',
          name: 'Hollow Can',
          description:
            'A can that, when scanned, reveals a hidden message or animation inside popping out of the top of the can.',
          purpose:
            'Create a fun and engaging way to showcase products or characters.',
          author: 'Voyager Team',
          image: '/ideas/hollowcan.webp',
          status: {
            liked: false,
            commissioned: true,
          },
        },
        {
          id: 'animated-street-art',
          name: 'Animated Street Art',
          description:
            'Street art that comes to life with AR when viewed through a device.',
          purpose:
            'Engage viewers with interactive and immersive art experiences.',
          author: 'Voyager Team',
          image: '/ideas/animatedstreetart.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'open-augmented-gallery',
          name: 'Open Augmented Gallery',
          description:
            'An open gallery space where users can explore various AR artworks.',
          purpose:
            'Provide a platform for artists to showcase their digital creations.',
          author: 'Voyager Team',
          image: '/ideas/openaugmentedgallery.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'headwear-try-on',
          name: 'Headwear Try-On',
          description:
            'An AR experience that allows users to try on different headwear styles virtually.',
          purpose:
            'Enhance online shopping experiences for fashion retailers.',
          author: 'Voyager Team',
          image: '/ideas/headweartryon.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'try-at-home',
          name: 'Try at Home',
          description:
            'An AR experience that allows users to visualise products in their own space before purchasing.',
          purpose:
            'Help customers make informed decisions by visualising products in their environment.',
          author: 'Voyager Team',
          image: '/ideas/tryathome.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'augmented-digital-signage',
          name: 'Augmented Digital Signage',
          description:
            'Signage that incorporates augmented reality elements as interactive displays.',
          purpose:
            'Transform traditional advertising spaces into interactive experiences.',
          author: 'Voyager Team',
          image: '/ideas/augmenteddigitalsignage.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'immersive-pos',
          name: 'Immersive Point of Sale',
          description:
            'An AR experience that enhances the point of sale with interactive elements.',
          purpose:
            'Improve customer engagement and drive sales in retail environments.',
          author: 'Voyager Team',
          image: '/ideas/immersivepos.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'immersive-menu',
          name: 'Immersive Menu',
          description:
            'An AR experience that transforms traditional menus into interactive displays.',
          purpose:
            'Enhance the dining experience and engage customers with dynamic content.',
          author: 'Voyager Team',
          image: '/ideas/immersivemenu.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'augmented-signage',
          name: 'Augmented Signage',
          description:
            'Augmented Reality elements in the place of Signage.',
          purpose:
            'Transform traditional advertising spaces into interactive experiences.',
          author: 'Voyager Team',
          image: '/ideas/augmentedsignage.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'immersive-storefront',
          name: 'Immersive Storefront',
          description:
            'An AR experience that transforms traditional storefronts into interactive displays.',
          purpose:
            'Enhance the shopping experience and engage customers with dynamic content.',
          author: 'Voyager Team',
          image: '/ideas/immersivestorefront.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'augmented-trophies',
          name: 'Augmented Trophies',
          description:
            'AR trophies that can be awarded to users for various achievements.',
          purpose:
            'Gamify the user experience and encourage engagement.',
          author: 'Voyager Team',
          image: '/ideas/augmentedtrophies.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'ar-season-tickets',
          name: 'AR Season Tickets',
          description:
            'Augmented Reality tickets for events, providing interactive experiences.',
          purpose:
            'Enhance event experiences and provide additional value to attendees.',
          author: 'Voyager Team',
          image: '/ideas/arseasontickets.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'immersive-venue',
          name: 'Immersive Venue',
          description:
            'An AR experience that transforms traditional venues into interactive spaces.',
          purpose:
            'Enhance the event experience and engage attendees with dynamic content.',
          author: 'Voyager Team',
          image: '/ideas/immersivevenue.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: '360-countdown',
          name: '360 Countdown',
          description: 'An immersive countdown experience in 360°.',
          purpose: 'Create excitement and anticipation for events.',
          author: 'Voyager Team',
          image: '/ideas/360countdown.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'treasure-hunt',
          name: 'Treasure Hunt',
          description:
            'An AR experience that guides users on a treasure hunt with interactive clues.',
          purpose:
            'Engage users in a fun and immersive way, encouraging exploration and discovery.',
          author: 'Voyager Team',
          image: '/ideas/treasurehunt.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'immersive-album',
          name: 'Immersive Album',
          description:
            'An AR experience that transforms traditional photo albums into interactive displays.',
          purpose:
            'Enhance the storytelling experience and engage users with dynamic content.',
          author: 'Voyager Team',
          image: '/ideas/immersivealbum.webp',
          status: {
            liked: false,
            commissioned: true,
          },
        },
        {
          id: 'immersive-music-merch',
          name: 'Immersive Music Merch',
          description:
            'An AR experience that brings music merchandise to life.',
          purpose:
            'Enhance the music experience and engage fans with interactive content.',
          author: 'Voyager Team',
          image: '/ideas/immersivemusicmerch.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'album-jukebox',
          name: 'Album Jukebox',
          description:
            'An AR experience that allows users to interact with album artwork and play music.',
          purpose:
            'Enhance the music listening experience and engage fans with interactive content.',
          author: 'Voyager Team',
          image: '/ideas/albumjukebox.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'album-stem-player',
          name: 'Album Stem Player',
          description:
            'An AR experience that allows users to interact with album stems and create their own mixes.',
          purpose:
            'Enhance the music creation experience and engage fans with interactive content.',
          author: 'Voyager Team',
          image: '/ideas/albumstemplayer.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
        {
          id: 'immersive-song-lyrics',
          name: 'Immersive Song Lyrics',
          description:
            'An AR experience that displays song lyrics in an interactive way.',
          purpose:
            'Enhance the music listening experience and engage fans with dynamic content.',
          author: 'Voyager Team',
          image: '/ideas/immersivesonglyrics.webp',
          status: {
            liked: false,
            commissioned: false,
          },
        },
      ],
    },
    {
      id: 'demos',
      title: 'Demo Collection',
      icon: '🎮',
      color: '#F59E0B', // Amber
      bgColor: '#FFFBEB', // Light amber background
      description:
        'Access interactive demos to showcase to your clients.',
      type: 'demos',
      fileType: 'Interactive',
      demos: [
        {
          name: '360 Studio Explainer',
          type: 'standalone',
          demoUrl:
            'https://immerse.voyagervrlab.co.uk/VOY/3D-Model-VR',
          description:
            'Explore our virtual studio in 360°. Works best on mobile devices or desktop with webcam.',
        },
        {
          name: 'Music Banner',
          type: 'tracked',
          demoUrl: 'https://immerse.voyagervrlab.co.uk/VOY/Automatom',
          imageUrl:
            'https://immerse.voyagervrlab.co.uk/VOY/brand/images/voyager-banner.png',
          description:
            'Interactive AR experience triggered by scanning the music banner image.',
        },
        {
          name: 'AR Business Card',
          type: 'tracked',
          demoUrl:
            'https://immerse.voyagervrlab.co.uk/VOY/Business-Card/Demo',
          imageUrl:
            'https://immerse.voyagervrlab.co.uk/VOY/brand/images/business-card/front.png',
          description:
            'Virtual content that appears when scanning our business card design.',
        },
        {
          name: 'Voyager Lens',
          type: 'standalone',
          demoUrl:
            'https://immerse.voyagervrlab.co.uk/VOY/Face-Tracking',
          description:
            'AR face filter experience. Works best on mobile devices or desktop with webcam.',
        },
      ],
    },
    {
      id: 'card-templates',
      title: 'Card Design Templates',
      icon: '🎨',
      color: '#EC4899', // Pink
      bgColor: '#FCE7F3', // Light pink background
      description:
        'Templates for creating effective AR business cards.',
      type: 'templates',
      fileType: 'Templates',
      templates: [
        { name: 'Template 1000', id: '1000' },
        { name: 'Template 1001', id: '1001' },
        { name: 'Template 1002', id: '1002' },
        { name: 'Template 1003', id: '1003' },
        { name: 'Template 1004', id: '1004' },
        { name: 'Template 1005', id: '1005' },
        { name: 'Template 1006', id: '1006' },
        { name: 'Template 1007', id: '1007' },
        { name: 'Template 1008', id: '1008' },
        { name: 'Template 1009', id: '1009' },
        { name: 'Template 1010', id: '1010' },
        { name: 'Template 1011', id: '1011' },
        { name: 'Template 1034', id: '1034' },
        { name: 'Template 1035', id: '1035' },
        { name: 'Template 1036', id: '1036' },
        { name: 'Template 1037', id: '1037' },
        { name: 'Template 1038', id: '1038' },
        { name: 'Template 1039', id: '1039' },
        { name: 'Template 1040', id: '1040' },
        { name: 'Template 1041', id: '1041' },
        { name: 'Template 1042', id: '1042' },
        { name: 'Template 1043', id: '1043' },
        { name: 'Template 1044', id: '1044' },
        { name: 'Template 1045', id: '1045' },
        { name: 'Template 1046', id: '1046' },
        { name: 'Template 1047', id: '1047' },
        { name: 'Template 1048', id: '1048' },
        { name: 'Template 1049', id: '1049' },
        { name: 'Template 1050', id: '1050' },
        { name: 'Template 1051', id: '1051' },
        { name: 'Template 1052', id: '1052' },
        { name: 'Template 1053', id: '1053' },
      ],
      // Add Canva URL generation function
      getCanvaUrl: (templateId) => {
        const templateMap = {
          1000: 'https://www.canva.com/design/DAGjr3bX_lY/iXE8NQwA4BZ60dyNm-amqQ/edit?utm_content=DAGjr3bX_lY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1001: 'https://www.canva.com/design/DAGjr86cnIk/5ORDEfmbmwNZcTdkR6VWzg/edit?utm_content=DAGjr86cnIk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1002: 'https://www.canva.com/design/DAGjr4KNQQk/EU9SXQWhi2zyrJ73QNmWjQ/edit?utm_content=DAGjr4KNQQk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1003: 'https://www.canva.com/design/DAGjrx-ITUw/I1K4LSzQXGcREaE8966q9Q/edit?utm_content=DAGjrx-ITUw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1004: 'https://www.canva.com/design/DAGjr7DLQIg/MmhUi879ycyY0JT-gG73Vg/edit?utm_content=DAGjr7DLQIg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1005: 'https://www.canva.com/design/DAGjryGOhPs/G2qQSDyxL0KIN4bNrSzOiw/edit?utm_content=DAGjryGOhPs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1006: 'https://www.canva.com/design/DAGjr9MGHx8/8gS9rwqR1DShs-Mq6iKRQQ/edit?utm_content=DAGjr9MGHx8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1007: 'https://www.canva.com/design/DAGjry9_w7w/oksOMxOBF548Hxn1eazOdQ/edit?utm_content=DAGjry9_w7w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1008: 'https://www.canva.com/design/DAGjr55aAzc/b9GXW-B5fH85G97JBtk7VQ/edit?utm_content=DAGjr55aAzc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1009: 'https://www.canva.com/design/DAGjr1lkEY0/yQTMMdzvN-3meEffQLvMuw/edit?utm_content=DAGjr1lkEY0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1010: 'https://www.canva.com/design/DAGjr5yI-zw/g3O4uTR4cxEQ5PdERUfpsA/edit?utm_content=DAGjr5yI-zw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1011: 'https://www.canva.com/design/DAGjrxBxqck/9WkQZLbRWU7eaK4mfG3Rew/edit?utm_content=DAGjrxBxqck&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1034: 'https://www.canva.com/design/DAGjryTMKFE/Wqq7fab9MOc24e5JLM2Rrw/edit?utm_content=DAGjryTMKFE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1035: 'https://www.canva.com/design/DAGjr-iIKU0/i3ml8u1VQa74xHVFbM_yKg/edit?utm_content=DAGjr-iIKU0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1036: 'https://www.canva.com/design/DAGjr55ItT0/S82e3JFC--ubBdpukonxKQ/edit?utm_content=DAGjr55ItT0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1037: 'https://www.canva.com/design/DAGjr6HNHDk/Dzt8XuRBLOP-lUAdbDF82A/edit?utm_content=DAGjr6HNHDk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1038: 'https://www.canva.com/design/DAGjr4WUsuI/xlhIgjBEtOaqHyiYEB1vag/edit?utm_content=DAGjr4WUsuI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1039: 'https://www.canva.com/design/DAGjr2DAlT4/gPxIZFkpG3Ad_IuPQFkbzA/edit?utm_content=DAGjr2DAlT4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1040: 'https://www.canva.com/design/DAGjr-63XuQ/Lcv05aLag7Of52EuAewerg/edit?utm_content=DAGjr-63XuQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1041: 'https://www.canva.com/design/DAGjr17CMm8/LvysQmSGprcOqyFnIjPLTA/edit?utm_content=DAGjr17CMm8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1042: 'https://www.canva.com/design/DAGjr4_g2ck/WmI3wpZ3sc99sOMZmk875g/edit?utm_content=DAGjr4_g2ck&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1043: 'https://www.canva.com/design/DAGjr3acdc8/G7OflnAdQ1JM3GJ0mnF1fQ/edit?utm_content=DAGjr3acdc8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1044: 'https://www.canva.com/design/DAGjrzEWyGI/5SWc6XtR4rnqh9ayq7cRZQ/edit?utm_content=DAGjrzEWyGI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1045: 'https://www.canva.com/design/DAGjr2Dkq90/7tAjy0RUGI6d8VLpLsDFnw/edit?utm_content=DAGjr2Dkq90&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1046: 'https://www.canva.com/design/DAGjr-vpi_Y/92HMxHaiNVWB_8SPPpue0g/edit?utm_content=DAGjr-vpi_Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1047: 'https://www.canva.com/design/DAGjr8fv3UE/ILCbuXTIokKbNMdZ7WBM8Q/edit?utm_content=DAGjr8fv3UE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1048: 'https://www.canva.com/design/DAGjr8TyM6U/eNQYpZk2bEM64AkrpvC_0w/edit?utm_content=DAGjr8TyM6U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1049: 'https://www.canva.com/design/DAGjr8PticA/7k5BM5CXClzNyhbXrmiNtA/edit?utm_content=DAGjr8PticA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1050: 'https://www.canva.com/design/DAGjr_--Q-s/6BD0tk562-sZROG-SZzTqQ/edit?utm_content=DAGjr_--Q-s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1051: 'https://www.canva.com/design/DAGjr-RwT-Y/7DZOutHTvvSoAi_1RY_mag/edit?utm_content=DAGjr-RwT-Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1052: 'https://www.canva.com/design/DAGjr052w7s/KoI08v-Io_8sO_a7lDj8nQ/edit?utm_content=DAGjr052w7s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          1053: 'https://www.canva.com/design/DAGjr1l-Qbs/ksQ5xJdcmny6NCRJJpcw7Q/edit?utm_content=DAGjr1l-Qbs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        };

        return templateMap[templateId] || '';
      },
    },
    {
      id: 'sales-scripts',
      title: 'Sales Scripts',
      icon: '📝',
      color: '#8B5CF6', // Purple
      bgColor: '#F5F3FF', // Light purple background
      description:
        'Ready-to-use scripts for pitching immersive tech to clients.',
      type: 'case-studies', // Changed from 'scripts' to 'case-studies' to use the same interface
      fileType: 'Document',
      // Define sales scripts as case studies
      caseStudies: [
        {
          id: 'objections-responses',
          name: 'Objections & Responses',
          description: 'How to handle common client objections',
          color: '#8B5CF6', // Purple
          canvaUrl:
            'https://www.canva.com/design/DAGk_DwUN3A/XAe5QX53FdgoyFlwVux_Rg/view',
          embedUrl:
            'https://www.canva.com/design/DAGk_DwUN3A/XAe5QX53FdgoyFlwVux_Rg/view?embed',
          utm: 'utm_content=DAGk_DwUN3A&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        {
          id: 'jargon-buster',
          name: 'Jargon Buster',
          description: 'Terms and Phrases explained.',
          color: '#EF4444', // Purple
          canvaUrl:
            'https://www.canva.com/design/DAGlips28fo/rUu-ivWH9jqfFN7ncAQ5Zg/view',
          embedUrl:
            'https://www.canva.com/design/DAGlips28fo/rUu-ivWH9jqfFN7ncAQ5Zg/view?embed',
          utm: 'utm_content=DAGlips28fo&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        // New PDF resource
        {
          id: 'immersive-tech-guide',
          name: 'A Simple Guide to Immersive Tech',
          description: 'Comprehensive guide to immersive technology',
          color: '#6366F1', // Indigo
          pdfUrl: '/PDFs/A-Simple-Guide-to-Immersive-Tech.pdf',
          fileType: 'pdf',
        },
      ],
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: '📊',
      color: '#EF4444', // Red
      bgColor: '#FEF2F2', // Light red background
      description:
        'Success stories and case studies to share with prospects.',
      type: 'case-studies',
      fileType: 'Presentations',
      // Define case studies
      caseStudies: [
        {
          id: 'chris-lake-mainfactor',
          name: 'Chris Lake x Mainfactor Case Study',
          description: 'AR marketing campaign for artist merchandise',
          color: '#EF4444', // Red
          canvaUrl:
            'https://www.canva.com/design/DAGk-R3nzbY/pRSuYe1RbSSFxM0qOz99Rg/view',
          embedUrl:
            'https://www.canva.com/design/DAGk-R3nzbY/pRSuYe1RbSSFxM0qOz99Rg/view?embed',
          utm: 'utm_content=DAGk-R3nzbY&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        {
          id: 'pepsi',
          name: 'Pepsi Case Study',
          description: 'AR marketing campaign for Pepsi',
          color: '#8B5CF6', // Purple
          canvaUrl:
            'https://www.canva.com/design/DAGk-_lh0PY/y9P3GZcpf4A6Y9k6qZY9ww/view',
          embedUrl:
            'https://www.canva.com/design/DAGk-_lh0PY/y9P3GZcpf4A6Y9k6qZY9ww/view?embed',
          utm: 'utm_content=DAGk-_lh0PY&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        {
          id: 'adidas',
          name: 'Adidas Case Study',
          description: 'AR marketing campaign for Adidas',
          color: '#0EA5E9', // Sky Blue
          canvaUrl:
            'https://www.canva.com/design/DAGk-3L39DI/WJK85zWqxzp-qkfdc5cXGw/view',
          embedUrl:
            'https://www.canva.com/design/DAGk-3L39DI/WJK85zWqxzp-qkfdc5cXGw/view?embed',
          utm: 'utm_content=DAGk-3L39DI&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
      ],
    },
    {
      id: 'sales-resources',
      title: 'Sales Presentations',
      icon: '📣',
      color: '#0EA5E9', // Sky blue
      bgColor: '#F0F9FF', // Light sky blue background
      description:
        'Industry-specific sales presentations to use with prospects.',
      type: 'sales-resources',
      fileType: 'Presentations',
      // Define industry-specific presentations
      industries: [
        {
          id: 'construction',
          name: 'Construction Industry',
          description: 'Sales materials for construction clients',
          color: '#F59E0B', // Amber
          canvaUrl:
            'https://www.canva.com/design/DAGkt3Rm-T0/FjCfY_ddWxJpM237g-LIJg/view',
          embedUrl:
            'https://www.canva.com/design/DAGkt3Rm-T0/FjCfY_ddWxJpM237g-LIJg/view?embed',
          utm: 'utm_content=DAGkt3Rm-T0&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        {
          id: 'fashion',
          name: 'Fashion Industry',
          description: 'Sales materials for fashion clients',
          color: '#d5f409', // Lime
          canvaUrl:
            'https://www.canva.com/design/DAGk36bVM3M/k9FghjNFLb9uHqy9aLjdGg/view',
          embedUrl:
            'https://www.canva.com/design/DAGk36bVM3M/k9FghjNFLb9uHqy9aLjdGg/view?embed',
          utm: 'utm_content=DAGk36bVM3M&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
        {
          id: 'music',
          name: 'Music Industry',
          description: 'Sales materials for music clients',
          color: '#09d1f4', // Cyan
          canvaUrl:
            'https://www.canva.com/design/DAGk4F7eVeA/BX-rKUn_IKV6sfBALgFBQQ/view',
          embedUrl:
            'https://www.canva.com/design/DAGk4F7eVeA/BX-rKUn_IKV6sfBALgFBQQ/view?embed',
          utm: 'utm_content=DAGk4F7eVeA&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        },
      ],
    },
    {
      id: 'studio-resources',
      title: 'Studio Resources',
      icon: '🎬',
      color: '#22C55E', // Green
      bgColor: '#ECFDF5', // Light green background
      description:
        'Studio guides and information for your production sessions.',
      type: 'case-studies', // Reusing case-studies layout
      fileType: 'PDF Documents',
      // Define studio resources as case studies
      caseStudies: [
        {
          id: 'green-screen-beginners',
          name: 'Green Screen for Beginners',
          description: 'Learn the basics of green screen production',
          color: '#22C55E', // Green
          pdfUrl: '/PDFs/Green-Screen-for-Beginners.pdf',
          fileType: 'pdf',
        },
        {
          id: 'podcast-howto',
          name: 'Voyager Podcast How-To',
          description: 'Guide to recording podcasts in our studio',
          color: '#6366F1', // Indigo
          pdfUrl: '/PDFs/Voyager-Podcast-HowTopdf.pdf',
          fileType: 'pdf',
        },
        {
          id: 'studio-safety',
          name: 'Studio Safety Procedure',
          description: 'Safety guidelines for using our studio',
          color: '#EF4444', // Red
          pdfUrl: '/PDFs/Voyager-VR-Studio-Safety-Procedure.pdf',
          fileType: 'pdf',
        },
        {
          id: 'studio-terms',
          name: 'Studio Terms & Conditions',
          description: 'Terms of use for our production studio',
          color: '#3B82F6', // Blue
          pdfUrl: '/PDFs/Voyager-VR-Studio-Terms-and-Conditions.pdf',
          fileType: 'pdf',
        },
      ],
    },
  ];

  // Function to handle resource click
  const handleResourceClick = (resource) => {
    setActiveResource(resource);

    // Reset active industry when opening a resource
    if (resource.type !== 'sales-resources') {
      setActiveIndustry(null);
    }

    // Reset active PDF when opening a resource
    setActivePdf(null);

    onOpen();
  };

  // Function to handle PDF selection
  const handlePdfSelect = (pdf) => {
    setActivePdf(pdf);
  };

  // Function to copy URL to clipboard with enhanced feedback
  const copyToClipboard = (text, index, type = 'url') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setCopiedWhat(type);
      setTimeout(() => {
        setCopiedIndex(null);
        setCopiedWhat(null);
      }, 2000);
    });
  };

  // Handle the selection of an industry within the sales resources
  const handleIndustrySelect = (industry) => {
    setActiveIndustry(industry);
  };

  // Function to open template in Canva
  const openTemplateInCanva = (templateId) => {
    if (activeResource && activeResource.getCanvaUrl) {
      const canvaUrl = activeResource.getCanvaUrl(templateId);
      if (canvaUrl) {
        window.open(canvaUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Function to render modal content based on resource type
  const renderModalContent = () => {
    if (!activeResource) return null;

    switch (activeResource.type) {
      case 'presentation':
        const directUrl = `${activeResource.canvaUrl}?${activeResource.utm}`;

        return (
          <div className="w-full h-[70vh]">
            {/* Embedding container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                padding: 0,
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <iframe
                loading="lazy"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  border: 'none',
                  padding: 0,
                  margin: 0,
                }}
                src={activeResource.embedUrl}
                allowFullScreen={true}
                allow="fullscreen"
                title={activeResource.title}
              ></iframe>
            </div>

            {/* Direct link */}
            <div className="flex justify-center mt-2">
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Open Presentation in New Tab
              </a>
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="text-lg font-medium text-yellow-800 mb-2">
                Presentation Controls
              </h4>
              <p className="text-yellow-700">
                Use the arrows to navigate or press the full-screen
                button for the best viewing experience. If you&apos;re
                having trouble viewing the presentation, please use
                the link above to open it in a new tab.
              </p>
            </div>
          </div>
        );

      case 'demos':
        return (
          <div className="w-full">
            {/* Instructions at the top */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                How to Use These Demos
              </h3>
              <p className="text-blue-700 mb-2">
                Our demos come in two types:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-blue-700">
                <li>
                  <strong className="text-blue-800">
                    Tracked Image Demos:
                  </strong>{' '}
                  These require both a camera and a tracking image.
                  Open the tracking image on your computer, then scan
                  it with your phone using the demo link.
                </li>
                <li>
                  <strong className="text-blue-800">
                    Standalone Demos:
                  </strong>{' '}
                  These work directly on your mobile device without
                  needing a separate tracking image. Simply open the
                  link on your phone.
                </li>
              </ul>
              <p className="mt-2 text-blue-700">
                All demos can work on desktop with a webcam, but the
                experience is optimised for mobile devices.
              </p>
            </div>

            {/* Tabs to separate demo types */}
            <Tabs
              aria-label="Demo Types"
              className="mb-6"
              variant="underlined"
              disableAnimation={true} // Add this line to prevent animation-related event issues
              // Ensure tab selection doesn't bubble up to the modal backdrop
              onClick={(e) => e.stopPropagation()} // Add this event handler
              classNames={{
                base: 'w-full',
                tabList:
                  'flex justify-center border-b border-gray-200 mb-6 gap-8 mx-auto',
                tab: 'px-6 py-2 text-gray-700 data-[selected=true]:text-primary data-[selected=true]:border-primary data-[selected=false]:text-gray-700 data-[selected=false]:hover:text-gray-800 transition-colors',
                tabContent: 'w-full',
                cursor: 'bg-primary',
                panel: 'pt-4',
              }}
            >
              <Tab key="tracked" title="Tracked Image Demos">
                <div className="grid grid-cols-1 gap-6">
                  {activeResource.demos
                    .filter((demo) => demo.type === 'tracked')
                    .map((demo, index) => (
                      <DemoCard
                        key={demo.name}
                        demo={demo}
                        index={index}
                        copiedIndex={copiedIndex}
                        copiedWhat={copiedWhat}
                        copyToClipboard={copyToClipboard}
                      />
                    ))}
                </div>
              </Tab>
              <Tab key="standalone" title="Standalone Demos">
                <div className="grid grid-cols-1 gap-6">
                  {activeResource.demos
                    .filter((demo) => demo.type === 'standalone')
                    .map((demo, index) => (
                      <DemoCard
                        key={demo.name}
                        demo={demo}
                        index={index}
                        copiedIndex={copiedIndex}
                        copiedWhat={copiedWhat}
                        copyToClipboard={copyToClipboard}
                      />
                    ))}
                </div>
              </Tab>
            </Tabs>
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-4">
              Click on any template to open it in Canva for
              customisation. Images shown are previews of the
              templates. Be sure to include an NFC branded logo to
              notify your users of the vCards capabilities.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {activeResource.templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-2 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-800 truncate">
                      {template.name}
                    </h4>
                  </div>

                  <div className="relative aspect-[304/229] overflow-hidden group">
                    <div className="relative w-full h-full">
                      <Image
                        src={`/vcards/${template.id}.webp`}
                        alt={`Template ${template.id}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        color="primary"
                        onClick={() =>
                          openTemplateInCanva(template.id)
                        }
                        className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                      >
                        Open in Canva
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'gallery':
        // If a "Suggest Idea" card is clicked
        if (activeGalleryItem && activeGalleryItem.isSuggestCard) {
          return (
            <div className="relative">
              {/* Loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6">
                  <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-700">Loading form...</p>
                </div>
              )}

              {/* JotForm iframe */}
              <iframe
                id={`JotFormIFrame-${activeGalleryItem.formId}`}
                title="Suggest an Idea Form"
                ref={iframeRef}
                onLoad={handleIframeLoad}
                allowTransparency="true"
                allow="geolocation; microphone; camera; fullscreen"
                src={`https://form.jotform.com/${activeGalleryItem.formId}`}
                style={{
                  minWidth: '100%',
                  maxWidth: '100%',
                  height: '539px',
                  border: 'none',
                }}
              ></iframe>

              {/* JotForm scripts */}
              <Script
                src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
                onLoad={handleScriptLoad}
                strategy="afterInteractive"
              />
            </div>
          );
        }

        // If no gallery item is selected, show the grid of gallery items
        if (!activeGalleryItem) {
          return (
            <div className="space-y-6">
              <p className="text-gray-600 mb-4">
                Browse our collection of innovative immersive
                technology ideas or suggest your own ideas to pitch to
                clients.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeResource.galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setActiveGalleryItem(item)}
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {/* For normal idea cards, show status badges */}
                      {!item.isSuggestCard && item.status && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          {item.status.liked && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Liked
                            </span>
                          )}
                          {item.status.commissioned && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Commissioned
                            </span>
                          )}
                        </div>
                      )}
                      {/* For the Suggest Idea card, show a special badge */}
                      {item.isSuggestCard && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                            New Idea
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-sm mb-1">
                        {item.isSuggestCard
                          ? 'Create your own idea'
                          : `By ${item.author}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Show selected gallery item (for normal idea cards, not for "Suggest Idea")
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image on the left */}
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={activeGalleryItem.image}
                alt={activeGalleryItem.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {activeGalleryItem.status.liked && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Liked by Clients
                  </span>
                )}
                {activeGalleryItem.status.commissioned && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Successfully Commissioned
                  </span>
                )}
              </div>
            </div>

            {/* Details on the right */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  {activeGalleryItem.name}
                </h3>
                <p className="text-gray-500">
                  Submitted by {activeGalleryItem.author}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  Description
                </h4>
                <p className="text-gray-600">
                  {activeGalleryItem.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  Purpose
                </h4>
                <p className="text-gray-600">
                  {activeGalleryItem.purpose}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  size="md"
                  variant="bordered"
                  style={{
                    borderColor: activeResource.color,
                    color: activeResource.color,
                  }}
                  onClick={() => {
                    // Return to gallery view
                    setActiveGalleryItem(null);
                  }}
                >
                  Back to Ideas
                </Button>
              </div>
            </div>
          </div>
        );
      case 'case-studies':
        // Check if we're dealing with a PDF resource
        const hasPdfResources = activeResource.caseStudies.some(
          (study) => study.fileType === 'pdf'
        );

        // If a PDF is active, show the PDF viewer
        if (activePdf) {
          return (
            <div className="w-full h-full flex flex-col">
              {/* 1) PDF Viewer */}
              <div className="flex-1 overflow-auto flex items-center justify-center">
                <Document
                  file={activePdf.pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<p>Loading PDF…</p>}
                >
                  {/* wrap the <Page> in its own centering div */}
                  <div className="flex justify-center">
                    <Page
                      pageNumber={pageNumber}
                      scale={pdfScale}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                </Document>
              </div>

              {/* 2) Navigation & Page Controls */}
              <div className="mt-4 flex justify-center items-center gap-4">
                <Button
                  size="sm"
                  onPress={previousPage}
                  isDisabled={pageNumber <= 1}
                  style={{
                    backgroundColor: activeResource.color,
                    color: 'white',
                  }}
                >
                  ‹
                </Button>

                <span className="text-gray-600 text-sm">
                  Page {pageNumber} of {numPages || '--'}
                </span>

                <Button
                  size="sm"
                  onPress={nextPage}
                  isDisabled={pageNumber >= (numPages || 1)}
                  style={{
                    backgroundColor: activeResource.color,
                    color: 'white',
                  }}
                >
                  ›
                </Button>
              </div>

              {/* 3) Download Buttons */}
              <div className="mt-4 flex justify-center">
                <a href={activePdf.pdfUrl} download className="btn">
                  Download PDF
                </a>
              </div>

              {/* 4) About this Resource */}
              <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
                <h4 className="text-lg text-gray-600 font-semibold mb-2">
                  About this Resource
                </h4>
                <p className="text-gray-600">
                  {activePdf.description}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div className="w-full">
            {/* If no case study selected, show the case study selection grid */}
            {!activeIndustry ? (
              <div className="space-y-6">
                <p className="text-gray-600 mb-4">
                  {hasPdfResources
                    ? 'Select a resource to access detailed information, guides, and downloadable content.'
                    : 'Select a case study to access detailed success stories and ROI metrics. These presentations demonstrate how immersive technology has delivered measurable results for real clients.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {activeResource.caseStudies.map((caseStudy) => (
                    <div
                      key={caseStudy.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() =>
                        caseStudy.fileType === 'pdf'
                          ? handlePdfSelect(caseStudy)
                          : handleIndustrySelect(caseStudy)
                      }
                    >
                      <div
                        className="p-4 flex flex-col items-center text-center"
                        style={{
                          borderTop: `4px solid ${caseStudy.color}`,
                        }}
                      >
                        <h4
                          className="text-lg font-semibold mb-2"
                          style={{ color: caseStudy.color }}
                        >
                          {caseStudy.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {caseStudy.description}
                        </p>
                        {caseStudy.fileType === 'pdf' && (
                          <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                            PDF Document
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Show the selected case study's presentation
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <Button
                    size="sm"
                    variant="light"
                    className="flex items-center gap-1 text-gray-600"
                    onClick={() => setActiveIndustry(null)}
                  >
                    <span>&#8592;</span> Back to Case Studies
                  </Button>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: activeIndustry.color }}
                  >
                    {activeIndustry.name}
                  </h3>
                </div>

                {/* Embedding container */}
                <div className="w-full h-[70vh]">
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      padding: 0,
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
                    <iframe
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        border: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                      src={activeIndustry.embedUrl}
                      allowFullScreen={true}
                      allow="fullscreen"
                      title={activeIndustry.name}
                    ></iframe>
                  </div>

                  {/* Direct link */}
                  <div className="flex justify-center mt-2">
                    <a
                      href={`${activeIndustry.canvaUrl}?${activeIndustry.utm}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-accent transition-colors"
                    >
                      Open Case Study in New Tab
                    </a>
                  </div>

                  {/* Instructions and information about the case study */}
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      How to Use This Case Study
                    </h4>
                    <p className="text-gray-600 mb-2">
                      This case study demonstrates real results and
                      contains:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Client challenge and project objectives</li>
                      <li>
                        Implementation strategy and technology used
                      </li>
                      <li>Measurable outcomes and ROI metrics</li>
                      <li>Testimonials and key takeaways</li>
                    </ul>
                    <p className="mt-2 text-gray-600">
                      You can present this directly to prospects to
                      demonstrate proven success with similar clients.
                      All case studies are white-labeled for your use.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'sales-resources':
        return (
          <div className="w-full">
            {/* If no industry selected, show the industry selection grid */}
            {!activeIndustry ? (
              <div className="space-y-6">
                <p className="text-gray-600 mb-4">
                  Select an industry to access sales resources
                  specific to that client type. These presentations
                  contain value propositions, use cases, and ROI
                  metrics tailored for each sector.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {activeResource.industries.map((industry) => (
                    <div
                      key={industry.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleIndustrySelect(industry)}
                    >
                      <div
                        className="p-4 flex flex-col items-center text-center"
                        style={{
                          borderTop: `4px solid ${industry.color}`,
                        }}
                      >
                        <h4
                          className="text-lg font-semibold mb-2"
                          style={{ color: industry.color }}
                        >
                          {industry.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Show the selected industry's presentation
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <Button
                    size="sm"
                    variant="light"
                    className="flex items-center gap-1 text-gray-600"
                    onClick={() => setActiveIndustry(null)}
                  >
                    <span>&#8592;</span> Back to Industries
                  </Button>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: activeIndustry.color }}
                  >
                    {activeIndustry.name}
                  </h3>
                </div>

                {/* Embedding container */}
                <div className="w-full h-[70vh]">
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      padding: 0,
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
                    <iframe
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        border: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                      src={activeIndustry.embedUrl}
                      allowFullScreen={true}
                      allow="fullscreen"
                      title={activeIndustry.name}
                    ></iframe>
                  </div>

                  {/* Direct link */}
                  <div className="flex justify-center mt-2">
                    <a
                      href={`${activeIndustry.canvaUrl}?${activeIndustry.utm}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-accent transition-colors"
                    >
                      Open Presentation in New Tab
                    </a>
                  </div>

                  {/* Instructions and information about the presentation */}
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      How to Use This Resource
                    </h4>
                    <p className="text-gray-600 mb-2">
                      This presentation is designed for{' '}
                      {activeIndustry.name.toLowerCase()} prospects
                      and contains:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>
                        Industry-specific case studies and success
                        stories
                      </li>
                      <li>
                        Common pain points and solutions for this
                        sector
                      </li>
                      <li>
                        Recommended products and pricing strategies
                      </li>
                    </ul>
                    <p className="mt-2 text-gray-600">
                      You can download, customise, or present this
                      directly to your clients. All sales resources
                      are white-labeled for your use.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <p>This content is currently in development.</p>
            <p className="mt-2">Check back soon for updates!</p>
          </div>
        );
    }
  };

  // DemoCard component to encapsulate the demo display logic
  const DemoCard = ({
    demo,
    index,
    copiedIndex,
    copiedWhat,
    copyToClipboard,
  }) => {
    const isTracked = demo.type === 'tracked';

    return (
      <Card className="overflow-hidden shadow-sm border border-gray-200">
        <CardBody className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left side - Demo Info & Primary Actions */}
            <div className="p-5 bg-white">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {demo.name}
              </h4>
              <p className="text-gray-600 mb-4">{demo.description}</p>

              <div className="flex flex-col space-y-3">
                <Button
                  color="primary"
                  className="w-full bg-primary text-white hover:bg-accent"
                  onPress={() =>
                    window.open(
                      demo.demoUrl,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  Open Demo
                </Button>

                <Button
                  variant="bordered"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                  onClick={() =>
                    copyToClipboard(demo.demoUrl, index, 'url')
                  }
                >
                  {copiedIndex === index && copiedWhat === 'url'
                    ? '✓ URL Copied!'
                    : 'Copy Demo URL'}
                </Button>

                {isTracked && demo.imageUrl && (
                  <>
                    <Button
                      color="secondary"
                      className="w-full bg-blue-500 text-white hover:bg-blue-600"
                      onPress={() =>
                        window.open(
                          demo.imageUrl,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                    >
                      Open Tracking Image
                    </Button>

                    <Button
                      variant="bordered"
                      className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                      onPress={() =>
                        copyToClipboard(demo.imageUrl, index, 'image')
                      }
                    >
                      {copiedIndex === index && copiedWhat === 'image'
                        ? '✓ Image URL Copied!'
                        : 'Copy Image URL'}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Right side - QR Code with direct correlation to Open Demo */}
            <div className="p-5 bg-gray-50 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
              <div className="text-center mb-4">
                <h5 className="text-lg font-medium text-gray-700 mb-1">
                  Scan to open on mobile
                </h5>
                <p className="text-sm text-gray-500">
                  {isTracked
                    ? 'Display the tracking image on your computer, then scan this QR code with your phone'
                    : 'Scan this QR code to open the demo directly on your phone'}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <QRCodeSVG
                  value={demo.demoUrl}
                  size={180}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: '/Voyager-Box-Logo.png',
                    x: undefined,
                    y: undefined,
                    height: 36,
                    width: 36,
                    excavate: true,
                  }}
                />
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                <span>Same link as &quot;Open Demo&quot; button</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Partner Resources
        </h1>
        <p className="text-gray-600">
          Access training materials, pricing guides, demos, and design
          templates to enhance your partnership experience.
        </p>
      </div>

      {/* Resource Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="flex">
            <Card
              isPressable
              onPress={() => handleResourceClick(resource)}
              className="w-full border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Title section with fixed height */}
                <div
                  className="p-6 flex flex-col items-center justify-center min-h-[180px]"
                  style={{ backgroundColor: resource.bgColor }}
                >
                  <span className="text-4xl mb-4">
                    {resource.icon}
                  </span>
                  <h3
                    className="text-xl font-semibold text-center"
                    style={{ color: resource.color }}
                  >
                    {resource.title}
                  </h3>
                </div>
                {/* Footer section with fixed height */}
                <div className="flex-grow bg-white p-4 flex justify-between items-center min-h-[56px]">
                  <span className="text-sm text-gray-600">
                    {resource.fileType}
                  </span>
                  <span
                    className="text-sm font-medium flex items-center"
                    style={{ color: resource.color }}
                  >
                    Access <span className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* HeroUI Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          // Reset PDF viewer state when closing modal
          setTimeout(() => {
            setActiveIndustry(null);
            setActivePdf(null);
            setActiveGalleryItem(null); // Add this line to reset the gallery item
            setCopiedIndex(null);
            setCopiedWhat(null);
            setNumPages(null);
            setPageNumber(1);
            setIsLoading(true); // Reset the loading state
          }, 100);
        }}
        size="5xl"
        scrollBehavior="inside"
        classNames={{
          backdrop: 'bg-black/70 backdrop-blur-sm',
          base: 'w-[85%] max-w-[calc(100vw-40px)] max-h-[calc(100vh-40px)] m-auto border-none rounded-lg shadow-xl',
          wrapper:
            'fixed inset-0 z-50 flex items-center justify-center',
          body: 'bg-white p-6',
          header: 'bg-white border-b border-gray-200 p-6',
          footer: 'bg-white border-t border-gray-200 p-6',
          closeButton: 'text-gray-500 hover:text-gray-700',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col gap-1"
                style={{
                  borderBottom: activeResource
                    ? `3px solid ${activeResource.color}`
                    : 'none',
                }}
              >
                {activeResource && (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {activeResource.icon}
                    </span>
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: activeResource.color }}
                    >
                      {activeResource.title}
                    </h2>
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="bg-white">
                {renderModalContent()}
              </ModalBody>
              <ModalFooter className="bg-white">
                <Button
                  onPress={() => {
                    // Reset states before closing modal
                    onClose();
                    // Slight delay to ensure modal is closed before resetting states
                    setTimeout(() => {
                      setActiveIndustry(null);
                      setCopiedIndex(null);
                      setCopiedWhat(null);
                    }, 100);
                  }}
                  style={{
                    backgroundColor:
                      activeResource?.color || '#10B981',
                    color: 'white',
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Add custom CSS for PDF viewer */}
      <style jsx global>{`
        .pdf-viewer {
          border: none;
          width: 100%;
          height: 100%;
        }

        /* PDF viewer iframe */
        .pdf-viewer iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
    </div>
  );
}
