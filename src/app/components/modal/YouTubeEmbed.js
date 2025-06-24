// components/modal/YouTubeEmbed.js
import { useState } from 'react';
import { Spinner, Button } from '@heroui/react';

// Inline SVG Play Icon to match your existing pattern
const PlayIcon = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * YouTube Embed Component
 *
 * @param {Object} props
 * @param {string} props.videoId - YouTube video ID (required)
 * @param {string} props.title - Video title
 * @param {boolean} props.autoplay - Whether to autoplay video
 * @param {boolean} props.muted - Whether to start muted
 * @param {boolean} props.controls - Whether to show controls
 * @param {boolean} props.lazyLoad - Whether to lazy load the iframe
 * @param {string} props.startTime - Start time in seconds
 * @param {string} props.endTime - End time in seconds
 */
export function YouTubeEmbed({
  videoId,
  title = 'YouTube Video',
  autoplay = false,
  muted = false,
  controls = true,
  lazyLoad = true,
  startTime,
  endTime,
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showIframe, setShowIframe] = useState(!lazyLoad);

  // Validate required props
  if (!videoId) {
    console.error('YouTubeEmbed: videoId prop is required');
    return (
      <div className="p-4 text-red-600">
        Error: Video ID is required
      </div>
    );
  }

  // Build YouTube URL with parameters
  const buildYouTubeUrl = () => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: muted ? '1' : '0',
      controls: controls ? '1' : '0',
      rel: '0',
      modestbranding: '1',
      ...(startTime && { start: startTime }),
      ...(endTime && { end: endTime }),
    });

    return `${baseUrl}?${params.toString()}`;
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Handle lazy load activation
  const handleLoadVideo = () => {
    setShowIframe(true);
    setIsLoading(true);
  };

  return (
    <div className="youtube-embed-container" {...rest}>
      {/* Lazy Load Placeholder */}
      {lazyLoad && !showIframe && (
        <div
          className="aspect-video bg-gray-900 relative overflow-hidden rounded-lg cursor-pointer group"
          onClick={handleLoadVideo}
        >
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <div className="bg-red-600 text-white rounded-full p-4 group-hover:scale-110 transition-transform">
              <PlayIcon size={32} />
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-medium truncate">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Loading State */}
      {showIframe && isLoading && !hasError && (
        <div className="aspect-video flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-gray-600">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="aspect-video flex items-center justify-center bg-gray-100">
          <div className="text-center text-red-600">
            <p className="font-medium">Failed to load video</p>
            <p className="text-sm mt-2">
              Please check your connection and try again
            </p>
            <Button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setShowIframe(true);
              }}
              className="mt-4"
              color="danger"
              variant="light"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* YouTube Iframe */}
      {showIframe && !hasError && (
        <div className="aspect-video">
          <iframe
            src={buildYouTubeUrl()}
            title={title}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-lg"
            style={{
              display: isLoading ? 'none' : 'block',
            }}
          />
        </div>
      )}
    </div>
  );
}
