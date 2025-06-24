// examples/ModalIntegrationExamples.js - Real-world Integration Patterns
'use client';

import React, { useState, useEffect } from 'react';
import { ModalProvider } from '../components/modal/core/ModalEngine';
import VoyagerModal from '../components/modal/VoyagerModal';
import {
  ConfirmationModal,
  YouTubeModal,
  JotFormModal,
  NotificationModal,
  LoadingModal,
} from '../components/modal/types/ModalTypes';
import {
  useModalQueue,
  useModalStack,
  useModalAnalytics,
  useModalShortcuts,
} from '../components/modal/hooks/ModalHooks';
import {
  ModalComposer,
  ModalDebugTools,
} from '../components/modal/utils/ModalUtils';

/**
 * VOYAGER MODAL INTEGRATION EXAMPLES
 *
 * Real-world patterns and integration examples:
 * - E-commerce checkout flow
 * - User onboarding sequence
 * - Content management workflow
 * - Multi-step form wizard
 * - Advanced notification system
 * - Error handling patterns
 * - Performance optimization examples
 * - Accessibility implementation patterns
 * - Migration from other modal libraries
 */

// ============================================================================
// E-COMMERCE CHECKOUT FLOW
// ============================================================================

const EcommerceCheckoutFlow = () => {
  const { enqueue, current, clearQueue } = useModalQueue();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Voyager T-Shirt', price: 29.99, quantity: 2 },
    { id: 2, name: 'Modal Mastery Book', price: 49.99, quantity: 1 },
  ]);
  const [orderData, setOrderData] = useState({});

  // Define checkout workflow
  const startCheckout = () => {
    // Step 1: Cart Review
    enqueue({
      component: CartReviewModal,
      props: {
        items: cartItems,
        onContinue: (data) =>
          setOrderData((prev) => ({ ...prev, ...data })),
      },
      config: { dismissible: false },
    });

    // Step 2: Shipping Information
    enqueue({
      component: ShippingInfoModal,
      props: {
        onContinue: (data) =>
          setOrderData((prev) => ({ ...prev, ...data })),
      },
    });

    // Step 3: Payment
    enqueue({
      component: PaymentModal,
      props: {
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        onContinue: (data) =>
          setOrderData((prev) => ({ ...prev, ...data })),
      },
    });

    // Step 4: Order Confirmation
    enqueue({
      component: OrderConfirmationModal,
      props: {
        orderData,
        onComplete: () => {
          setCartItems([]);
          setOrderData({});
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        E-commerce Checkout Flow
      </h2>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="font-semibold mb-2">
          Shopping Cart ({cartItems.length} items)
        </h3>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-2 border-b"
          >
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="font-bold pt-2">
          Total: $
          {cartItems
            .reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )
            .toFixed(2)}
        </div>
      </div>

      <div className="space-x-4">
        <button
          onClick={startCheckout}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start Checkout
        </button>
        <button
          onClick={clearQueue}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Cancel Checkout
        </button>
      </div>

      {current && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Current Step:{' '}
            {current.component.displayName || 'Checkout Step'}
          </p>
        </div>
      )}
    </div>
  );
};

// Checkout Modal Components
const CartReviewModal = ({ isOpen, onClose, items, onContinue }) => (
  <VoyagerModal isOpen={isOpen} onClose={onClose} size="lg">
    <VoyagerModal.Header onClose={onClose}>
      <h3 className="text-xl font-semibold">Review Your Order</h3>
    </VoyagerModal.Header>
    <VoyagerModal.Body>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded"
          >
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </div>
            </div>
            <div className="text-lg font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </VoyagerModal.Body>
    <VoyagerModal.Footer>
      <button
        onClick={() => onContinue({ reviewedAt: Date.now() })}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Continue to Shipping
      </button>
    </VoyagerModal.Footer>
  </VoyagerModal>
);

const ShippingInfoModal = ({ isOpen, onClose, onContinue }) => {
  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    zipCode: '',
    method: 'standard',
  });

  return (
    <VoyagerModal isOpen={isOpen} onClose={onClose} size="lg">
      <VoyagerModal.Header onClose={onClose}>
        <h3 className="text-xl font-semibold">
          Shipping Information
        </h3>
      </VoyagerModal.Header>
      <VoyagerModal.Body>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={shippingData.address}
              onChange={(e) =>
                setShippingData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={shippingData.city}
                onChange={(e) =>
                  setShippingData((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={shippingData.zipCode}
                onChange={(e) =>
                  setShippingData((prev) => ({
                    ...prev,
                    zipCode: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Method
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={shippingData.method}
              onChange={(e) =>
                setShippingData((prev) => ({
                  ...prev,
                  method: e.target.value,
                }))
              }
            >
              <option value="standard">
                Standard Shipping (5-7 days)
              </option>
              <option value="express">
                Express Shipping (2-3 days)
              </option>
              <option value="overnight">Overnight Shipping</option>
            </select>
          </div>
        </form>
      </VoyagerModal.Body>
      <VoyagerModal.Footer>
        <button
          onClick={() => onContinue({ shipping: shippingData })}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={
            !shippingData.address ||
            !shippingData.city ||
            !shippingData.zipCode
          }
        >
          Continue to Payment
        </button>
      </VoyagerModal.Footer>
    </VoyagerModal>
  );
};

const PaymentModal = ({ isOpen, onClose, total, onContinue }) => (
  <VoyagerModal isOpen={isOpen} onClose={onClose} size="lg">
    <VoyagerModal.Header onClose={onClose}>
      <h3 className="text-xl font-semibold">Payment Information</h3>
    </VoyagerModal.Header>
    <VoyagerModal.Body>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-lg font-semibold">
            Order Total: ${total.toFixed(2)}
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </form>
      </div>
    </VoyagerModal.Body>
    <VoyagerModal.Footer>
      <button
        onClick={() => onContinue({ paymentProcessedAt: Date.now() })}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Place Order
      </button>
    </VoyagerModal.Footer>
  </VoyagerModal>
);

const OrderConfirmationModal = ({
  isOpen,
  onClose,
  orderData,
  onComplete,
}) => (
  <VoyagerModal
    isOpen={isOpen}
    onClose={onClose}
    size="md"
    animation="bounce"
  >
    <VoyagerModal.Header>
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-green-600">
          Order Confirmed!
        </h3>
      </div>
    </VoyagerModal.Header>
    <VoyagerModal.Body>
      <div className="text-center space-y-4">
        <p className="text-gray-600">
          Thank you for your purchase! Your order has been
          successfully placed.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Order Number</div>
          <div className="font-mono text-lg">
            #VO{Date.now().toString().slice(-6)}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          You will receive a confirmation email shortly with tracking
          information.
        </p>
      </div>
    </VoyagerModal.Body>
    <VoyagerModal.Footer>
      <button
        onClick={() => {
          onComplete();
          onClose();
        }}
        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </VoyagerModal.Footer>
  </VoyagerModal>
);

// ============================================================================
// USER ONBOARDING SEQUENCE
// ============================================================================

const UserOnboardingFlow = () => {
  const composer = new ModalComposer();
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [userProgress, setUserProgress] = useState({
    step: 0,
    completed: false,
    preferences: {},
  });

  // Define onboarding workflow
  useEffect(() => {
    composer.defineWorkflow('user-onboarding', {
      steps: [
        {
          component: WelcomeModal,
          props: { userName: 'New User' },
          config: { dismissible: false },
        },
        {
          component: PreferencesModal,
          props: {},
          condition: (data) => !data.skipPreferences,
        },
        {
          component: FeatureTourModal,
          props: {},
          config: { swipeToClose: true },
        },
        {
          component: OnboardingCompleteModal,
          props: {},
        },
      ],
      onComplete: (instance) => {
        setUserProgress((prev) => ({ ...prev, completed: true }));
        setIsOnboarding(false);
      },
      onCancel: (instance) => {
        setIsOnboarding(false);
      },
    });
  }, []);

  const startOnboarding = () => {
    setIsOnboarding(true);
    // Would need openModal function from useModal hook here
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Onboarding</h2>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Welcome to Voyager</h3>
            <p className="text-gray-600">
              Complete your onboarding to get started
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {userProgress.completed
                ? '100%'
                : `${((userProgress.step / 4) * 100).toFixed(0)}%`}
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${userProgress.completed ? 100 : (userProgress.step / 4) * 100}%`,
            }}
          />
        </div>
      </div>

      <button
        onClick={startOnboarding}
        disabled={isOnboarding || userProgress.completed}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {userProgress.completed
          ? 'Onboarding Complete'
          : 'Start Onboarding'}
      </button>
    </div>
  );
};

// ============================================================================
// ADVANCED NOTIFICATION SYSTEM
// ============================================================================

const AdvancedNotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const { track } = useModalAnalytics();

  const addNotification = (type, title, message, options = {}) => {
    const notification = {
      id: `notification-${Date.now()}`,
      type,
      title,
      message,
      timestamp: Date.now(),
      ...options,
    };

    setNotifications((prev) => [...prev, notification]);
    track('notification_created', { type, title });

    // Auto-remove after delay
    if (options.autoRemove !== false) {
      setTimeout(() => {
        removeNotification(notification.id);
      }, options.duration || 5000);
    }

    return notification.id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    track('notification_dismissed', { id });
  };

  const notificationTypes = [
    { type: 'success', label: 'Success', color: 'green' },
    { type: 'error', label: 'Error', color: 'red' },
    { type: 'warning', label: 'Warning', color: 'yellow' },
    { type: 'info', label: 'Info', color: 'blue' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Advanced Notification System
      </h2>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="font-semibold mb-3">Create Notifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {notificationTypes.map(({ type, label, color }) => (
            <button
              key={type}
              onClick={() =>
                addNotification(
                  type,
                  `${label} Notification`,
                  `This is a ${type} notification message with some details.`,
                  { duration: 4000 }
                )
              }
              className={`px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() =>
              addNotification(
                'info',
                'Persistent Notification',
                'This notification will not auto-remove',
                {
                  autoRemove: false,
                  actions: [
                    {
                      label: 'Action 1',
                      onClick: () => console.log('Action 1'),
                    },
                    {
                      label: 'Action 2',
                      onClick: () => console.log('Action 2'),
                    },
                  ],
                }
              )
            }
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mr-2"
          >
            Persistent with Actions
          </button>

          <button
            onClick={() => setNotifications([])}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Active Notifications */}
      <div className="space-y-2">
        <h3 className="font-semibold">
          Active Notifications ({notifications.length})
        </h3>
        {notifications.map((notification) => (
          <NotificationModal
            key={notification.id}
            isOpen={true}
            onClose={() => removeNotification(notification.id)}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            actions={notification.actions}
            autoClose={notification.autoRemove !== false}
            autoCloseDelay={notification.duration || 5000}
            showProgress={true}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PERFORMANCE OPTIMIZATION EXAMPLE
// ============================================================================

const PerformanceOptimizedModals = () => {
  const [heavyModalOpen, setHeavyModalOpen] = useState(false);
  const [lazyModalOpen, setLazyModalOpen] = useState(false);
  const { track, performanceMetrics } = useModalAnalytics();

  // Heavy modal with optimization
  const HeavyModal = React.memo(({ isOpen, onClose }) => {
    // Simulate heavy computation
    const heavyData = React.useMemo(() => {
      return Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 100,
      }));
    }, []);

    return (
      <VoyagerModal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        performance="high"
        onOpen={() => track('heavy_modal_opened')}
      >
        <VoyagerModal.Header onClose={onClose}>
          <h3 className="text-xl font-semibold">
            Performance Optimized Modal
          </h3>
        </VoyagerModal.Header>
        <VoyagerModal.Body>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <p className="text-gray-600 mb-4">
              This modal contains {heavyData.length} items and uses
              React.memo for optimization.
            </p>
            {heavyData.slice(0, 50).map((item) => (
              <div
                key={item.id}
                className="flex justify-between p-2 border-b"
              >
                <span>{item.name}</span>
                <span>{item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </VoyagerModal.Body>
      </VoyagerModal>
    );
  });

  // Lazy loaded modal
  const LazyModal = React.lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            default: ({ isOpen, onClose }) => (
              <VoyagerModal
                isOpen={isOpen}
                onClose={onClose}
                size="md"
              >
                <VoyagerModal.Header onClose={onClose}>
                  <h3 className="text-xl font-semibold">
                    Lazy Loaded Modal
                  </h3>
                </VoyagerModal.Header>
                <VoyagerModal.Body>
                  <p>
                    This modal was loaded asynchronously to improve
                    initial page load time.
                  </p>
                </VoyagerModal.Body>
              </VoyagerModal>
            ),
          });
        }, 1000);
      })
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Performance Optimization
      </h2>

      {/* Performance Metrics */}
      {performanceMetrics && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-semibold mb-2">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Avg Open Time</div>
              <div className="font-semibold">
                {performanceMetrics.averageOpenTime?.toFixed(2)}ms
              </div>
            </div>
            <div>
              <div className="text-gray-600">Fastest Open</div>
              <div className="font-semibold">
                {performanceMetrics.fastestOpen?.toFixed(2)}ms
              </div>
            </div>
            <div>
              <div className="text-gray-600">Slowest Open</div>
              <div className="font-semibold">
                {performanceMetrics.slowestOpen?.toFixed(2)}ms
              </div>
            </div>
            <div>
              <div className="text-gray-600">Performance Score</div>
              <div className="font-semibold">
                {performanceMetrics.performanceScore?.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-x-4">
        <button
          onClick={() => setHeavyModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Open Heavy Modal (Optimized)
        </button>

        <button
          onClick={() => setLazyModalOpen(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Open Lazy Modal
        </button>
      </div>

      {/* Modals */}
      <HeavyModal
        isOpen={heavyModalOpen}
        onClose={() => setHeavyModalOpen(false)}
      />

      {lazyModalOpen && (
        <React.Suspense
          fallback={
            <LoadingModal
              isOpen={true}
              title="Loading Modal..."
              message="Please wait while the modal loads"
            />
          }
        >
          <LazyModal
            isOpen={lazyModalOpen}
            onClose={() => setLazyModalOpen(false)}
          />
        </React.Suspense>
      )}
    </div>
  );
};

// ============================================================================
// MAIN INTEGRATION SHOWCASE
// ============================================================================

export default function VoyagerModalIntegrationShowcase() {
  const { registerShortcut } = useModalShortcuts();
  const [activeExample, setActiveExample] = useState('ecommerce');

  // Register global shortcuts
  useEffect(() => {
    registerShortcut(
      'ctrl+shift+d',
      () => setActiveExample('debug'),
      {
        description: 'Open debug tools',
        global: true,
      }
    );
  }, [registerShortcut]);

  const examples = [
    {
      id: 'ecommerce',
      label: 'E-commerce Checkout',
      component: EcommerceCheckoutFlow,
    },
    {
      id: 'onboarding',
      label: 'User Onboarding',
      component: UserOnboardingFlow,
    },
    {
      id: 'notifications',
      label: 'Notification System',
      component: AdvancedNotificationSystem,
    },
    {
      id: 'performance',
      label: 'Performance Optimization',
      component: PerformanceOptimizedModals,
    },
  ];

  const ActiveComponent =
    examples.find((ex) => ex.id === activeExample)?.component ||
    EcommerceCheckoutFlow;

  return (
    <ModalProvider
      config={{
        baseZIndex: 1000,
        performance: 'high',
        debugging: process.env.NODE_ENV === 'development',
      }}
    >
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Voyager Modal Integration Examples
            </h1>
            <p className="text-gray-600 mt-2">
              Real-world implementation patterns and advanced use
              cases
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-8">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setActiveExample(example.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeExample === example.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {example.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          <ActiveComponent />
        </div>

        {/* Debug Tools */}
        <ModalDebugTools
          enabled={process.env.NODE_ENV === 'development'}
        />
      </div>
    </ModalProvider>
  );
}
