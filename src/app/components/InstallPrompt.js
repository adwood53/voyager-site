// src/app/components/InstallPrompt.js
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop'); // 'desktop', 'ios', or 'android'

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if already running in standalone mode
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone || // iOS Safari
      document.referrer.includes('android-app://');

    setIsStandalone(standalone);

    // Don't show prompt if already in standalone mode
    if (standalone) {
      return;
    }

    // Detect device type for specific instructions
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType('ios');
    } else if (/android/.test(userAgent)) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }

    // Show the prompt immediately
    setShowPrompt(true);

    // For Chrome and Edge: Use beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt
    );

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setIsStandalone(true);
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

    // Set a short-term dismissal (1 hour)
    const dismissalTime = Date.now();
    localStorage.setItem(
      'installPromptDismissedAt',
      dismissalTime.toString()
    );

    // Schedule to show again after 1 hour
    setTimeout(
      () => {
        setShowPrompt(true);
      },
      60 * 60 * 1000
    );
  };

  // Don't show anything if in standalone mode or prompt is hidden
  if (isStandalone || !showPrompt) return null;

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
            aria-label="Dismiss for now"
          >
            ✕
          </button>
        </div>

        <div className="mb-3">
          {deviceType === 'ios' ? (
            <div className="text-gray-700 text-sm">
              <p className="mb-2">To install on your iOS device:</p>
              <ol className="list-decimal pl-5">
                <li className="mb-1">
                  Tap the Share icon{' '}
                  <span className="text-lg">⎙</span> at the bottom of
                  your browser
                </li>
                <li>
                  Scroll down and tap &quot;Add to Home Screen&quot;
                </li>
                <li>Tap &quot;Add&quot; in the top-right corner</li>
              </ol>
            </div>
          ) : deviceType === 'android' ? (
            <div className="text-gray-700 text-sm">
              <p className="mb-2">
                To install on your Android device:
              </p>
              <ol className="list-decimal pl-5">
                <li className="mb-1">
                  Tap the menu icon ⋮ in your browser
                </li>
                <li>Tap &quot;Add to Home Screen&quot;</li>
                <li>Tap &quot;Add&quot; when prompted</li>
              </ol>
            </div>
          ) : (
            <div className="text-gray-700 text-sm">
              <p className="mb-2">
                Install for quick access without opening a browser:
              </p>
              <ol className="list-decimal pl-5">
                <li className="mb-1">
                  Look for the install icon in your browser&apos;s
                  address bar
                </li>
                <li>Click &quot;Install&quot; when prompted</li>
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
