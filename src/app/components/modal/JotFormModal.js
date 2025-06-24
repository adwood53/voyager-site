// components/modal/JotFormModal.js
import Modal from './Modal';
import { JotFormEmbed } from './JotFormEmbed';

/**
 * Pre-configured Modal for JotForm embeds
 */
export function JotFormModal({
  isOpen,
  onClose,
  formId,
  formTitle,
  size = 'xl',
  ...modalProps
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
      showCloseButton={true}
      closeButtonPosition="floating"
      {...modalProps}
    >
      <Modal.Header>
        <h2 className="text-xl font-semibold text-gray-900">
          {formTitle || 'Form'}
        </h2>
      </Modal.Header>
      <Modal.Body className="p-0">
        <JotFormEmbed
          formId={formId}
          formTitle={formTitle}
          height={600}
          onSubmit={() => {
            // Auto-close modal on successful submission
            setTimeout(() => onClose(), 1000);
          }}
        />
      </Modal.Body>
    </Modal>
  );
}
