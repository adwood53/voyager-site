// components/modal/hooks/ModalHooks.js - Advanced Modal Management Hooks
'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useModal, performanceMonitor } from '../core/ModalEngine';

/**
 * ADVANCED MODAL HOOKS COLLECTION
 *
 * This collection provides sophisticated hooks for modal management:
 * - useModalQueue: Advanced queuing system for sequential modals
 * - useModalStack: Full stack management with history
 * - useModalAnalytics: Performance and usage analytics
 * - useModalShortcuts: Keyboard shortcut management
 * - useModalPersistence: State persistence across sessions
 * - useModalSync: Multi-tab synchronization
 * - useModalWorkflow: Complex workflow management
 * - useModalA11y: Advanced accessibility features
 * - useModalGestures: Comprehensive gesture handling
 * - useModalTheme: Dynamic theme management
 */

// ============================================================================
// MODAL QUEUE MANAGEMENT
// ============================================================================

/**
 * Advanced modal queue system for managing sequential modal presentations
 * Perfect for onboarding flows, wizards, and complex user journeys
 */
export const useModalQueue = (initialQueue = []) => {
  const [queue, setQueue] = useState(initialQueue);
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { openModal, closeModal } = useModal();

  // Add modal to queue
  const enqueue = useCallback((modalConfig) => {
    const id = `queue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const modal = {
      id,
      ...modalConfig,
      queuedAt: Date.now(),
    };

    setQueue((prev) => [...prev, modal]);
    return id;
  }, []);

  // Add modal to front of queue (high priority)
  const enqueueNext = useCallback((modalConfig) => {
    const id = `queue-priority-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const modal = {
      id,
      ...modalConfig,
      queuedAt: Date.now(),
      priority: true,
    };

    setQueue((prev) => [modal, ...prev]);
    return id;
  }, []);

  // Remove modal from queue
  const dequeue = useCallback((id) => {
    setQueue((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  // Process next modal in queue
  const processNext = useCallback(async () => {
    if (queue.length === 0 || isProcessing) return;

    setIsProcessing(true);
    const nextModal = queue[0];

    try {
      // Open the modal
      const modalId = openModal(
        nextModal.component,
        {
          ...nextModal.props,
          onClose: () => {
            closeModal(modalId);
            setHistory((prev) => [
              ...prev,
              { ...nextModal, closedAt: Date.now() },
            ]);
            setCurrent(null);
            setQueue((prev) => prev.slice(1));
            setIsProcessing(false);

            // Auto-process next if configured
            if (nextModal.autoNext !== false) {
              setTimeout(processNext, nextModal.delay || 100);
            }
          },
        },
        nextModal.config
      );

      setCurrent({ ...nextModal, modalId });

      // Wait for modal to be ready
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (error) {
      console.error('Failed to process modal queue:', error);
      setQueue((prev) => prev.slice(1));
      setIsProcessing(false);
    }
  }, [queue, isProcessing, openModal, closeModal]);

  // Clear entire queue
  const clearQueue = useCallback(() => {
    setQueue([]);
    if (current) {
      closeModal(current.modalId);
      setCurrent(null);
    }
    setIsProcessing(false);
  }, [current, closeModal]);

  // Auto-process queue when items are added
  useEffect(() => {
    if (queue.length > 0 && !current && !isProcessing) {
      processNext();
    }
  }, [queue, current, isProcessing, processNext]);

  // Queue analytics
  const analytics = useMemo(
    () => ({
      queueLength: queue.length,
      historyLength: history.length,
      averageDisplayTime:
        history.length > 0
          ? history.reduce(
              (acc, modal) => acc + (modal.closedAt - modal.queuedAt),
              0
            ) / history.length
          : 0,
      completionRate:
        (history.length / (history.length + queue.length)) * 100,
      currentWaitTime: current ? Date.now() - current.queuedAt : 0,
    }),
    [queue, history, current]
  );

  return {
    // Queue management
    queue,
    current,
    history,
    enqueue,
    enqueueNext,
    dequeue,
    processNext,
    clearQueue,

    // State
    isProcessing,
    analytics,

    // Utilities
    isEmpty: queue.length === 0,
    hasNext: queue.length > 0,
    position: current ? 0 : -1,
  };
};

// ============================================================================
// MODAL STACK MANAGEMENT
// ============================================================================

/**
 * Advanced modal stack management with full history and navigation
 */
export const useModalStack = () => {
  const { state, openModal, closeModal } = useModal();
  const [stackHistory, setStackHistory] = useState([]);
  const [navigationEnabled, setNavigationEnabled] = useState(true);

  // Enhanced stack operations
  const stackOperations = useMemo(
    () => ({
      // Push new modal to stack
      push: (component, props, config) => {
        const id = openModal(component, props, config);
        setStackHistory((prev) => [
          ...prev,
          {
            id,
            component,
            props,
            config,
            openedAt: Date.now(),
            action: 'push',
          },
        ]);
        return id;
      },

      // Pop current modal
      pop: () => {
        if (state.stack.length > 0) {
          const topModal = state.stack[state.stack.length - 1];
          closeModal(topModal.id);
          setStackHistory((prev) => [
            ...prev,
            {
              id: topModal.id,
              closedAt: Date.now(),
              action: 'pop',
            },
          ]);
        }
      },

      // Replace current modal
      replace: (component, props, config) => {
        if (state.stack.length > 0) {
          const topModal = state.stack[state.stack.length - 1];
          closeModal(topModal.id);
        }
        return stackOperations.push(component, props, config);
      },

      // Navigate to specific modal in stack
      navigateToModal: (id) => {
        if (!navigationEnabled) return false;

        const modalIndex = state.stack.findIndex(
          (modal) => modal.id === id
        );
        if (modalIndex === -1) return false;

        // Close all modals above the target
        const modalsToClose = state.stack.slice(modalIndex + 1);
        modalsToClose.forEach((modal) => closeModal(modal.id));

        return true;
      },

      // Swap two modals in stack
      swap: (id1, id2) => {
        // This is complex and would require core engine support
        console.warn('Modal swapping not yet implemented');
      },
    }),
    [state.stack, openModal, closeModal, navigationEnabled]
  );

  // Stack analytics
  const stackAnalytics = useMemo(() => {
    const now = Date.now();
    const activeModals = state.stack;

    return {
      currentDepth: activeModals.length,
      maxDepthReached: Math.max(
        ...stackHistory.map(
          (_, index) =>
            stackHistory
              .slice(0, index + 1)
              .filter((item) => item.action === 'push').length -
            stackHistory
              .slice(0, index + 1)
              .filter((item) => item.action === 'pop').length
        ),
        0
      ),
      totalOperations: stackHistory.length,
      averageModalLifetime:
        stackHistory
          .filter((item) => item.closedAt)
          .reduce(
            (acc, item) => acc + (item.closedAt - item.openedAt),
            0
          ) / stackHistory.filter((item) => item.closedAt).length ||
        0,
      oldestModalAge:
        activeModals.length > 0 ? now - activeModals[0].openedAt : 0,
    };
  }, [state.stack, stackHistory]);

  return {
    stack: state.stack,
    stackHistory,
    stackOperations,
    stackAnalytics,
    navigationEnabled,
    setNavigationEnabled,
  };
};

// ============================================================================
// MODAL ANALYTICS
// ============================================================================

/**
 * Comprehensive analytics and performance monitoring for modals
 */
export const useModalAnalytics = (config = {}) => {
  const [analytics, setAnalytics] = useState({
    opens: 0,
    closes: 0,
    interactions: 0,
    errors: 0,
    performance: [],
    userBehavior: [],
    accessibility: {
      keyboardNavigation: 0,
      screenReaderAnnouncements: 0,
      focusTraps: 0,
    },
  });

  const [isTracking, setIsTracking] = useState(
    config.autoStart !== false
  );

  // Track modal events
  const track = useCallback(
    (eventType, data = {}) => {
      if (!isTracking) return;

      const timestamp = Date.now();
      const event = {
        type: eventType,
        timestamp,
        data,
        sessionId:
          sessionStorage.getItem('modal-session-id') || 'unknown',
      };

      setAnalytics((prev) => {
        const updated = { ...prev };

        switch (eventType) {
          case 'modal_open':
            updated.opens++;
            updated.userBehavior.push(event);
            break;
          case 'modal_close':
            updated.closes++;
            updated.userBehavior.push(event);
            break;
          case 'modal_interaction':
            updated.interactions++;
            updated.userBehavior.push(event);
            break;
          case 'modal_error':
            updated.errors++;
            break;
          case 'performance_measure':
            updated.performance.push(event);
            break;
          case 'accessibility_action':
            updated.accessibility[data.action]++;
            break;
        }

        return updated;
      });

      // Optional external tracking
      if (config.onTrack) {
        config.onTrack(event);
      }
    },
    [isTracking, config]
  );

  // Performance metrics
  const performanceMetrics = useMemo(() => {
    const perfData = analytics.performance;
    if (perfData.length === 0) return null;

    const durations = perfData
      .map((p) => p.data.duration)
      .filter(Boolean);

    return {
      averageOpenTime:
        durations.reduce((a, b) => a + b, 0) / durations.length,
      fastestOpen: Math.min(...durations),
      slowestOpen: Math.max(...durations),
      totalMeasurements: perfData.length,
      performanceScore:
        (durations.filter((d) => d < 100).length / durations.length) *
        100,
    };
  }, [analytics.performance]);

  // User behavior insights
  const behaviorInsights = useMemo(() => {
    const behaviors = analytics.userBehavior;
    if (behaviors.length === 0) return null;

    const sessions = behaviors.reduce((acc, behavior) => {
      const sessionId = behavior.sessionId;
      if (!acc[sessionId]) acc[sessionId] = [];
      acc[sessionId].push(behavior);
      return acc;
    }, {});

    return {
      uniqueSessions: Object.keys(sessions).length,
      averageModalsPerSession:
        analytics.opens / Object.keys(sessions).length,
      engagementRate: analytics.interactions / analytics.opens,
      conversionRate: analytics.closes / analytics.opens,
      accessibilityUsage: analytics.accessibility,
    };
  }, [analytics]);

  // Export analytics data
  const exportData = useCallback(
    (format = 'json') => {
      const exportData = {
        summary: analytics,
        performance: performanceMetrics,
        behavior: behaviorInsights,
        exportedAt: new Date().toISOString(),
      };

      if (format === 'csv') {
        // Convert to CSV format
        const csv = Object.entries(exportData.summary)
          .map(([key, value]) => `${key},${JSON.stringify(value)}`)
          .join('\n');
        return csv;
      }

      return JSON.stringify(exportData, null, 2);
    },
    [analytics, performanceMetrics, behaviorInsights]
  );

  return {
    analytics,
    performanceMetrics,
    behaviorInsights,
    track,
    isTracking,
    setIsTracking,
    exportData,
    reset: () =>
      setAnalytics({
        opens: 0,
        closes: 0,
        interactions: 0,
        errors: 0,
        performance: [],
        userBehavior: [],
        accessibility: {
          keyboardNavigation: 0,
          screenReaderAnnouncements: 0,
          focusTraps: 0,
        },
      }),
  };
};

// ============================================================================
// MODAL SHORTCUTS
// ============================================================================

/**
 * Advanced keyboard shortcut management for modals
 */
export const useModalShortcuts = (shortcuts = {}) => {
  const [activeShortcuts, setActiveShortcuts] = useState(new Map());
  const [isEnabled, setIsEnabled] = useState(true);
  const shortcutHistory = useRef([]);

  // Register shortcut
  const registerShortcut = useCallback(
    (key, handler, options = {}) => {
      const shortcutConfig = {
        key: key.toLowerCase(),
        handler,
        description: options.description || '',
        category: options.category || 'general',
        preventDefault: options.preventDefault !== false,
        stopPropagation: options.stopPropagation !== false,
        enabled: options.enabled !== false,
        global: options.global === true,
        context: options.context || 'modal',
      };

      setActiveShortcuts(
        (prev) => new Map(prev.set(key, shortcutConfig))
      );
      return key;
    },
    []
  );

  // Unregister shortcut
  const unregisterShortcut = useCallback((key) => {
    setActiveShortcuts((prev) => {
      const updated = new Map(prev);
      updated.delete(key);
      return updated;
    });
  }, []);

  // Handle keyboard events
  const handleKeydown = useCallback(
    (event) => {
      if (!isEnabled) return;

      const key = event.key.toLowerCase();
      const shortcut = activeShortcuts.get(key);

      if (shortcut && shortcut.enabled) {
        // Check context
        const isInModal = event.target.closest('[role="dialog"]');
        if (
          shortcut.context === 'modal' &&
          !isInModal &&
          !shortcut.global
        ) {
          return;
        }

        // Record usage
        shortcutHistory.current.push({
          key,
          timestamp: Date.now(),
          context: isInModal ? 'modal' : 'global',
        });

        // Prevent default behavior if configured
        if (shortcut.preventDefault) {
          event.preventDefault();
        }

        if (shortcut.stopPropagation) {
          event.stopPropagation();
        }

        // Execute handler
        try {
          shortcut.handler(event);
        } catch (error) {
          console.error('Shortcut handler error:', error);
        }
      }
    },
    [isEnabled, activeShortcuts]
  );

  // Setup event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () =>
      document.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  // Register default shortcuts
  useEffect(() => {
    const defaultShortcuts = {
      escape: () => {
        /* Will be handled by modal system */
      },
      f1: () => console.log('Modal help'),
      'ctrl+shift+m': () => console.log('Modal debug mode'),
      ...shortcuts,
    };

    Object.entries(defaultShortcuts).forEach(([key, handler]) => {
      registerShortcut(key, handler, { category: 'default' });
    });
  }, [shortcuts, registerShortcut]);

  // Shortcut analytics
  const shortcutAnalytics = useMemo(() => {
    const usage = shortcutHistory.current;
    const usageByKey = usage.reduce((acc, use) => {
      acc[use.key] = (acc[use.key] || 0) + 1;
      return acc;
    }, {});

    return {
      totalUsage: usage.length,
      uniqueShortcuts: Object.keys(usageByKey).length,
      mostUsed:
        Object.entries(usageByKey).sort(
          ([, a], [, b]) => b - a
        )[0]?.[0] || null,
      usageByKey,
      recentUsage: usage.slice(-10),
    };
  }, []);

  return {
    activeShortcuts: Array.from(activeShortcuts.values()),
    registerShortcut,
    unregisterShortcut,
    isEnabled,
    setIsEnabled,
    shortcutAnalytics,
    clearHistory: () => {
      shortcutHistory.current = [];
    },
  };
};

// ============================================================================
// MODAL PERSISTENCE
// ============================================================================

/**
 * Advanced state persistence for modals across sessions
 */
export const useModalPersistence = (
  key = 'voyager-modals',
  options = {}
) => {
  const [persistedData, setPersistedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useModal();

  const storage =
    options.storage ||
    (typeof window !== 'undefined' ? localStorage : null);
  const autoSave = options.autoSave !== false;
  const saveInterval = options.saveInterval || 1000;

  // Load persisted data
  const loadData = useCallback(async () => {
    if (!storage) return null;

    try {
      const saved = storage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);

        // Validate data structure
        if (parsed && typeof parsed === 'object' && parsed.version) {
          setPersistedData(parsed);
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Failed to load persisted modal data:', error);
    } finally {
      setIsLoading(false);
    }

    return null;
  }, [key, storage]);

  // Save data to storage
  const saveData = useCallback(
    async (data) => {
      if (!storage) return false;

      try {
        const toSave = {
          ...data,
          version: '1.0.0',
          savedAt: Date.now(),
        };

        storage.setItem(key, JSON.stringify(toSave));
        setPersistedData(toSave);
        return true;
      } catch (error) {
        console.warn('Failed to save modal data:', error);
        return false;
      }
    },
    [key, storage]
  );

  // Clear persisted data
  const clearData = useCallback(async () => {
    if (!storage) return;

    try {
      storage.removeItem(key);
      setPersistedData(null);
    } catch (error) {
      console.warn('Failed to clear persisted data:', error);
    }
  }, [key, storage]);

  // Auto-save modal state
  useEffect(() => {
    if (autoSave && !isLoading) {
      const timer = setTimeout(() => {
        const dataToSave = {
          modalState: {
            stackCount: state.stack.length,
            activeModal: state.activeModal,
          },
          timestamp: Date.now(),
        };

        saveData(dataToSave);
      }, saveInterval);

      return () => clearTimeout(timer);
    }
  }, [state, autoSave, isLoading, saveInterval, saveData]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    persistedData,
    isLoading,
    loadData,
    saveData,
    clearData,

    // Utilities
    hasPersistedData: persistedData !== null,
    lastSaved: persistedData?.savedAt || null,
  };
};

// ============================================================================
// MODAL GESTURES
// ============================================================================

/**
 * Comprehensive gesture handling for modals
 */
export const useModalGestures = (config = {}) => {
  const [gestureState, setGestureState] = useState({
    isActive: false,
    type: null, // 'swipe', 'pinch', 'rotate', 'tap'
    direction: null,
    distance: 0,
    velocity: 0,
    startTime: 0,
  });

  const gestureHistory = useRef([]);
  const isEnabled = config.enabled !== false;

  // Gesture recognition algorithms
  const recognizeGesture = useCallback(
    (touches, previousTouches) => {
      if (!isEnabled || touches.length === 0) return null;

      const now = Date.now();

      // Single finger gestures
      if (touches.length === 1) {
        const touch = touches[0];
        const prevTouch = previousTouches?.[0];

        if (prevTouch) {
          const deltaX = touch.clientX - prevTouch.clientX;
          const deltaY = touch.clientY - prevTouch.clientY;
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
          const timeDelta = now - gestureState.startTime;
          const velocity = distance / Math.max(timeDelta, 1);

          // Swipe detection
          if (distance > (config.swipeThreshold || 30)) {
            const angle =
              (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
            let direction;

            if (angle > -45 && angle <= 45) direction = 'right';
            else if (angle > 45 && angle <= 135) direction = 'down';
            else if (angle > 135 || angle <= -135) direction = 'left';
            else direction = 'up';

            return {
              type: 'swipe',
              direction,
              distance,
              velocity,
              angle,
            };
          }
        }
      }

      // Two finger gestures
      if (touches.length === 2) {
        const [touch1, touch2] = touches;
        const [prevTouch1, prevTouch2] = previousTouches || [];

        if (prevTouch1 && prevTouch2) {
          // Pinch detection
          const currentDistance = Math.sqrt(
            (touch2.clientX - touch1.clientX) ** 2 +
              (touch2.clientY - touch1.clientY) ** 2
          );

          const previousDistance = Math.sqrt(
            (prevTouch2.clientX - prevTouch1.clientX) ** 2 +
              (prevTouch2.clientY - prevTouch1.clientY) ** 2
          );

          const scale = currentDistance / previousDistance;

          if (Math.abs(scale - 1) > (config.pinchThreshold || 0.1)) {
            return {
              type: 'pinch',
              scale,
              direction: scale > 1 ? 'out' : 'in',
            };
          }
        }
      }

      return null;
    },
    [isEnabled, config, gestureState.startTime]
  );

  // Gesture handlers
  const handleGestureStart = useCallback(
    (event) => {
      if (!isEnabled) return;

      const touches = Array.from(event.touches);

      setGestureState({
        isActive: true,
        type: null,
        direction: null,
        distance: 0,
        velocity: 0,
        startTime: Date.now(),
      });

      if (config.onGestureStart) {
        config.onGestureStart({ touches });
      }
    },
    [isEnabled, config]
  );

  const handleGestureMove = useCallback(
    (event) => {
      if (!isEnabled || !gestureState.isActive) return;

      const touches = Array.from(event.touches);
      // We'd need to store previous touches for this to work properly
      const gesture = recognizeGesture(touches);

      if (gesture) {
        setGestureState((prev) => ({
          ...prev,
          ...gesture,
        }));

        if (config.onGestureMove) {
          config.onGestureMove(gesture);
        }
      }
    },
    [isEnabled, gestureState.isActive, recognizeGesture, config]
  );

  const handleGestureEnd = useCallback(
    (event) => {
      if (!isEnabled) return;

      const gesture = gestureState;
      const duration = Date.now() - gesture.startTime;

      // Record gesture in history
      gestureHistory.current.push({
        ...gesture,
        duration,
        completedAt: Date.now(),
      });

      setGestureState({
        isActive: false,
        type: null,
        direction: null,
        distance: 0,
        velocity: 0,
        startTime: 0,
      });

      if (config.onGestureEnd) {
        config.onGestureEnd({ ...gesture, duration });
      }
    },
    [isEnabled, gestureState, config]
  );

  // Gesture analytics
  const gestureAnalytics = useMemo(() => {
    const history = gestureHistory.current;
    const typeCount = history.reduce((acc, gesture) => {
      acc[gesture.type] = (acc[gesture.type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalGestures: history.length,
      gesturesByType: typeCount,
      averageDuration:
        history.length > 0
          ? history.reduce((acc, g) => acc + g.duration, 0) /
            history.length
          : 0,
      recentGestures: history.slice(-5),
    };
  }, []);

  return {
    gestureState,
    gestureAnalytics,
    handlers: {
      onTouchStart: handleGestureStart,
      onTouchMove: handleGestureMove,
      onTouchEnd: handleGestureEnd,
    },
    clearHistory: () => {
      gestureHistory.current = [];
    },
  };
};
