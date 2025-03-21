// src/app/components/InstallPrompt.js
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [browser, setBrowser] = useState('');
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Run only on client
    if (typeof window === 'undefined') return;

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user has dismissed the prompt
    if (localStorage.getItem('installPromptDismissed') === 'true') {
      return;
    }

    // Count site visits
    const count = parseInt(
      localStorage.getItem('siteVisitCount') || '0'
    );
    const newCount = count + 1;
    localStorage.setItem('siteVisitCount', newCount.toString());
    setVisitCount(newCount);

    // Detect browser
    const userAgent = navigator.userAgent;
    let detectedBrowser = 'other';
    if (userAgent.indexOf('Firefox') > -1) {
      detectedBrowser = 'firefox';
    } else if (userAgent.indexOf('Edg') > -1) {
      detectedBrowser = 'edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
      detectedBrowser = 'chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
      detectedBrowser = 'safari';
    }
    setBrowser(detectedBrowser);

    // For Firefox, show after 2+ visits
    if (detectedBrowser === 'firefox' && newCount >= 2) {
      setShowPrompt(true);
    }

    // For other browsers, use the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt
    );

    // Listen for installation
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setIsInstalled(true);
      localStorage.setItem('appInstalled', 'true');
    });

    // Cleanup
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  // Force show prompt after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        !isInstalled &&
        !localStorage.getItem('installPromptDismissed')
      ) {
        setShowPrompt(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      setDeferredPrompt(null);

      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  // Nothing to show if already installed or dismissed
  if (isInstalled || !showPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50 max-w-sm shadow-lg"
      style={{ maxWidth: '90vw' }}
    >
      <div
        className="bg-white rounded-lg border p-4"
        style={{ borderColor: 'var(--primary-color, #E79023)' }}
      >
        <div className="flex justify-between items-start mb-2">
          <h3
            className="font-medium"
            style={{ color: 'var(--primary-color, #E79023)' }}
          >
            Install Voyager Partner Portal
          </h3>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mb-3">
          {browser === 'firefox' ? (
            <div className="text-gray-700 text-sm">
              <p className="mb-2">To install in Firefox:</p>
              <ol className="list-decimal pl-5">
                <li className="mb-1">
                  Look for the + icon in your address bar
                </li>
                <li>Select &quot;Install&quot; when prompted</li>
              </ol>
              <div className="mt-2 flex justify-center">
                <svg
                  width="280"
                  height="40"
                  viewBox="0 0 280 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="280"
                    height="40"
                    rx="4"
                    fill="#EFEFEF"
                  />
                  <text
                    x="10"
                    y="25"
                    fontFamily="Arial"
                    fontSize="14"
                    fill="#333"
                  >
                    https://voyagervrlab.co.uk
                  </text>
                  <circle cx="260" cy="20" r="12" fill="#4285F4" />
                  <text
                    x="260"
                    y="25"
                    fontFamily="Arial"
                    fontSize="16"
                    fill="white"
                    textAnchor="middle"
                  >
                    +
                  </text>
                  <path
                    d="M230,15 L250,15 M230,20 L250,20 M230,25 L250,25"
                    stroke="#666"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="text-gray-700 text-sm">
              <p className="mb-2">
                Install for quick access without opening a browser:
              </p>
              <ol className="list-decimal pl-5">
                <li className="mb-1">
                  Click the menu {browser === 'chrome' ? '⋮' : '⋯'} in
                  your browser
                </li>
                <li>
                  Select &quot;Install Voyager Partner Portal&quot;
                </li>
              </ol>
            </div>
          )}
        </div>

        {deferredPrompt && (
          <Button
            onPress={handleInstallClick}
            className="w-full justify-center text-sm py-2 mt-2"
            style={{
              backgroundColor: 'var(--primary-color, #E79023)',
              color: 'white',
            }}
          >
            Install Now
          </Button>
        )}
      </div>
    </motion.div>
  );
}
