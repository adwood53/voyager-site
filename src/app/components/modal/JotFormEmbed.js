// components/modal/JotFormEmbed.js
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Spinner } from '@heroui/react';
import Script from 'next/script';

/**
 * JotForm Embed Component
 *
 * @param {Object} props
 * @param {string} props.formId - JotForm form ID (required)
 * @param {string} props.formTitle - Title for the form
 * @param {number} props.height - Form height in pixels
 * @param {boolean} props.autoResize - Whether to auto-resize the iframe
 * @param {Function} props.onLoad - Callback when form loads
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {Object} props.formParams - Additional form parameters
 */
export function JotFormEmbed({
  formId,
  formTitle = 'Form',
  height = 600,
  autoResize = true,
  onLoad,
  onSubmit,
  formParams = {},
  ...rest
}) {
  // ALL HOOKS MUST BE DECLARED BEFORE ANY CONDITIONAL LOGIC
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  // Build form URL with parameters - moved to useMemo for performance
  const formUrl = useMemo(() => {
    if (!formId) return '';
    const baseUrl = `https://form.jotform.com/${formId}`;
    const params = new URLSearchParams(formParams);
    return params.toString()
      ? `${baseUrl}?${params.toString()}`
      : baseUrl;
  }, [formId, formParams]);

  // Handle script loading
  const handleScriptLoad = useCallback(() => {
    setScriptLoaded(true);

    // Initialize JotForm embed handler if available
    if (window.jotformEmbedHandler && iframeRef.current && formId) {
      try {
        window.jotformEmbedHandler(
          `iframe[id='JotFormIFrame-${formId}']`,
          'https://form.jotform.com/'
        );
      } catch (err) {
        console.warn('JotForm embed handler failed:', err);
      }
    }
  }, [formId]);

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    setError(null);
    if (onLoad) onLoad();
  }, [onLoad]);

  // Handle iframe error
  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setError('Failed to load form. Please try again.');
  }, []);

  // Listen for form submission messages
  useEffect(() => {
    if (!formId) return;

    const handleMessage = (event) => {
      if (event.origin !== 'https://form.jotform.com') return;

      try {
        const data = JSON.parse(event.data);
        if (data.type === 'form_submit' && data.formID === formId) {
          if (onSubmit) onSubmit(data);
        }
      } catch (err) {
        // Ignore parsing errors for non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [formId, onSubmit]); // Fixed: included all dependencies

  // Validate required props AFTER hooks are declared
  if (!formId) {
    console.error('JotFormEmbed: formId prop is required');
    return (
      <div className="p-4 text-red-600">
        Error: Form ID is required
      </div>
    );
  }

  return (
    <div className="jotform-embed-container" {...rest}>
      {/* JotForm Script */}
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        onLoad={handleScriptLoad}
        onError={() => setError('Failed to load JotForm scripts')}
      />

      {/* Loading State */}
      {isLoading && !error && (
        <div
          className="flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-gray-600">
              Loading {formTitle}...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <div className="text-center text-red-600">
            <p className="font-medium">Error Loading Form</p>
            <p className="text-sm mt-2">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                if (iframeRef.current) {
                  iframeRef.current.src = formUrl;
                }
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* JotForm Iframe */}
      {!error && (
        <iframe
          ref={iframeRef}
          id={`JotFormIFrame-${formId}`}
          title={formTitle}
          src={formUrl}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          frameBorder="0"
          scrolling={autoResize ? 'no' : 'yes'}
          style={{
            minWidth: '100%',
            maxWidth: '100%',
            height: autoResize ? 'auto' : `${height}px`,
            border: 'none',
            display: isLoading ? 'none' : 'block',
          }}
          allow="geolocation; microphone; camera"
        />
      )}
    </div>
  );
}
