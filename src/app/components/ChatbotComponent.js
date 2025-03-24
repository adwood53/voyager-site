'use client';

import React, { useEffect } from 'react';

export default function ChatbotComponent() {
  useEffect(() => {
    // First, add a script that defines process.env
    const polyfillScript = document.createElement('script');
    polyfillScript.innerHTML = `
      window.process = {
        env: {
          NODE_ENV: "${process.env.NODE_ENV || 'production'}"
        }
      };
    `;
    document.head.appendChild(polyfillScript);

    // Then load the Jotform script
    const jotformScript = document.createElement('script');
    jotformScript.src =
      'https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js';
    jotformScript.async = true;

    // Initialize when the script loads
    jotformScript.onload = () => {
      console.log('Jotform script loaded');

      // Make sure window.AgentInitializer exists
      if (window.AgentInitializer) {
        // Initialize the chatbot
        setTimeout(() => {
          window.AgentInitializer.init({
            agentRenderURL:
              'https://eu.jotform.com/agent/0195c8d9acf87097a819ba63f76df43672cb',
            rootId:
              'JotformAgent-0195c8d9acf87097a819ba63f76df43672cb',
            formID: '0195c8d9acf87097a819ba63f76df43672cb',
            queryParams: ['skipWelcome=1', 'maximizable=1'],
            domain: 'https://eu.jotform.com',
            isDraggable: false,
            background:
              'linear-gradient(180deg, #e79023 0%, #a6620c 100%)',
            buttonBackgroundColor: '#e79023',
            buttonIconColor: '#FFFFFF',
            variant: false,
            customizations: {
              greeting: 'Yes',
              greetingMessage: 'Hi! How can I assist you?',
              openByDefault: 'No',
              pulse: 'Yes',
              position: 'right',
              autoOpenChatIn: '0',
            },
            isVoice: undefined,
          });
        }, 100); // Short delay to ensure initialization is complete
      }
    };

    // Add to document
    document.body.appendChild(jotformScript);

    // Clean up function
    return () => {
      if (document.head.contains(polyfillScript)) {
        document.head.removeChild(polyfillScript);
      }
      if (document.body.contains(jotformScript)) {
        document.body.removeChild(jotformScript);
      }
    };
  }, []);

  return (
    <div id="JotformAgent-0195c8d9acf87097a819ba63f76df43672cb"></div>
  );
}
