// components/modal/YouTubeModal.js
import Modal from './Modal';
import { YouTubeEmbed } from './YouTubeEmbed.js';

/**
 * Pre-configured Modal for YouTube embeds
 */
export function YouTubeModal({
  isOpen,
  onClose,
  videoId,
  videoTitle,
  size = 'lg',
  autoplay = true,
  ...modalProps
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      showCloseButton={true}
      closeButtonPosition="floating"
      allowBackdropClick={true}
      {...modalProps}
    >
      <Modal.Body className="p-4">
        <YouTubeEmbed
          videoId={videoId}
          title={videoTitle}
          autoplay={autoplay}
          lazyLoad={false}
        />
      </Modal.Body>
    </Modal>
  );
}
