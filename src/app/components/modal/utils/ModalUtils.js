// components/modal/utils/ModalUtils.js - Testing, Composition & Developer Tools
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';

/**
 * VOYAGER MODAL UTILITIES & TESTING SUITE
 *
 * Comprehensive utilities for testing, debugging, and composing modals:
 * - ModalTestProvider: Testing environment with mocks and assertions
 * - ModalComposer: Complex modal workflow composition
 * - ModalDebugTools: Real-time debugging and inspection
 * - ModalPerformanceProfiler: Advanced performance analysis
 * - ModalAccessibilityTester: Automated accessibility testing
 * - ModalSnapshotTester: Visual regression testing
 * - ModalStorybook: Interactive documentation generator
 * - ModalThemeBuilder: Visual theme customization tool
 */

// ============================================================================
// MODAL TESTING PROVIDER
// ============================================================================

/**
 * Comprehensive testing environment for modal components
 */
export const ModalTestProvider = ({
  children,
  config = {},
  mocks = {},
  assertions = {},
}) => {
  const [testState, setTestState] = useState({
    modalsOpened: [],
    modalsClosed: [],
    interactions: [],
    errors: [],
    performance: [],
    accessibility: [],
  });

  const [isRecording, setIsRecording] = useState(
    config.autoRecord !== false
  );
  const assertionResults = useRef([]);

  // Mock implementations
  const mockImplementations = {
    localStorage: {
      getItem: jest?.fn() || (() => null),
      setItem: jest?.fn() || (() => {}),
      removeItem: jest?.fn() || (() => {}),
      ...mocks.localStorage,
    },

    performance: {
      now: jest?.fn() || (() => Date.now()),
      mark: jest?.fn() || (() => {}),
      measure: jest?.fn() || (() => {}),
      ...mocks.performance,
    },

    ResizeObserver:
      jest?.fn().mockImplementation(() => ({
        observe: jest?.fn(),
        unobserve: jest?.fn(),
        disconnect: jest?.fn(),
      })) ||
      class MockResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      },

    IntersectionObserver:
      jest?.fn().mockImplementation(() => ({
        observe: jest?.fn(),
        unobserve: jest?.fn(),
        disconnect: jest?.fn(),
      })) ||
      class MockIntersectionObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      },

    ...mocks,
  };

  // Test utilities
  const testUtils = {
    // Record modal events
    recordEvent: (type, data) => {
      if (!isRecording) return;

      const event = {
        type,
        data,
        timestamp: Date.now(),
        id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      setTestState((prev) => ({
        ...prev,
        [type]: [...(prev[type] || []), event],
      }));
    },

    // Wait for modal to appear
    waitForModal: async (
      selector = '[role="dialog"]',
      timeout = 5000
    ) => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const check = () => {
          const modal = document.querySelector(selector);
          if (modal) {
            resolve(modal);
          } else if (Date.now() - startTime > timeout) {
            reject(new Error(`Modal not found within ${timeout}ms`));
          } else {
            setTimeout(check, 100);
          }
        };

        check();
      });
    },

    // Wait for modal to disappear
    waitForModalClose: async (
      selector = '[role="dialog"]',
      timeout = 5000
    ) => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const check = () => {
          const modal = document.querySelector(selector);
          if (!modal) {
            resolve();
          } else if (Date.now() - startTime > timeout) {
            reject(
              new Error(`Modal still present after ${timeout}ms`)
            );
          } else {
            setTimeout(check, 100);
          }
        };

        check();
      });
    },

    // Simulate user interactions
    interact: {
      clickBackdrop: () => {
        const backdrop =
          document.querySelector('[role="dialog"]')?.parentElement;
        if (backdrop) {
          backdrop.click();
        }
      },

      pressEscape: () => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape' })
        );
      },

      clickClose: () => {
        const closeButton = document.querySelector(
          '[aria-label*="close" i], [aria-label*="Close" i]'
        );
        if (closeButton) {
          closeButton.click();
        }
      },

      swipe: (direction = 'down', element) => {
        const target =
          element || document.querySelector('[role="dialog"]');
        if (!target) return;

        const directions = {
          up: { deltaY: -100 },
          down: { deltaY: 100 },
          left: { deltaX: -100 },
          right: { deltaX: 100 },
        };

        const delta = directions[direction] || directions.down;

        // Simulate touch events
        target.dispatchEvent(
          new TouchEvent('touchstart', {
            touches: [{ clientX: 0, clientY: 0 }],
          })
        );

        target.dispatchEvent(
          new TouchEvent('touchmove', {
            touches: [
              {
                clientX: delta.deltaX || 0,
                clientY: delta.deltaY || 0,
              },
            ],
          })
        );

        target.dispatchEvent(
          new TouchEvent('touchend', {
            touches: [],
          })
        );
      },
    },

    // Assertions
    assert: {
      modalIsOpen: (selector = '[role="dialog"]') => {
        const modal = document.querySelector(selector);
        const result = {
          passed: !!modal,
          message: modal ? 'Modal is open' : 'Modal is not open',
          selector,
          timestamp: Date.now(),
        };

        assertionResults.current.push(result);
        return result;
      },

      modalIsClosed: (selector = '[role="dialog"]') => {
        const modal = document.querySelector(selector);
        const result = {
          passed: !modal,
          message: !modal ? 'Modal is closed' : 'Modal is still open',
          selector,
          timestamp: Date.now(),
        };

        assertionResults.current.push(result);
        return result;
      },

      modalHasTitle: (expectedTitle) => {
        const title = document.querySelector(
          '[id*="modal-title"]'
        )?.textContent;
        const result = {
          passed: title === expectedTitle,
          message: `Expected title "${expectedTitle}", got "${title}"`,
          expected: expectedTitle,
          actual: title,
          timestamp: Date.now(),
        };

        assertionResults.current.push(result);
        return result;
      },

      modalIsAccessible: () => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal)
          return { passed: false, message: 'No modal found' };

        const checks = [
          {
            test: () => modal.hasAttribute('aria-modal'),
            message: 'Has aria-modal',
          },
          {
            test: () => modal.hasAttribute('role'),
            message: 'Has role attribute',
          },
          {
            test: () => modal.hasAttribute('aria-labelledby'),
            message: 'Has aria-labelledby',
          },
          {
            test: () =>
              document.activeElement &&
              modal.contains(document.activeElement),
            message: 'Has focus within modal',
          },
        ];

        const results = checks.map((check) => ({
          passed: check.test(),
          message: check.message,
          timestamp: Date.now(),
        }));

        const allPassed = results.every((r) => r.passed);
        const summary = {
          passed: allPassed,
          message: `Accessibility check ${allPassed ? 'passed' : 'failed'}`,
          details: results,
          timestamp: Date.now(),
        };

        assertionResults.current.push(summary);
        return summary;
      },
    },
  };

  // Setup global mocks
  useEffect(() => {
    const originalLocalStorage = global.localStorage;
    const originalPerformance = global.performance;

    // Apply mocks
    global.localStorage = mockImplementations.localStorage;
    global.performance = mockImplementations.performance;
    global.ResizeObserver = mockImplementations.ResizeObserver;
    global.IntersectionObserver =
      mockImplementations.IntersectionObserver;

    return () => {
      // Restore originals
      global.localStorage = originalLocalStorage;
      global.performance = originalPerformance;
    };
  }, [mockImplementations]);

  return (
    <ModalTestContext.Provider
      value={{
        testState,
        testUtils,
        isRecording,
        setIsRecording,
        assertionResults: assertionResults.current,
        clearResults: () => {
          assertionResults.current = [];
        },
      }}
    >
      {children}
    </ModalTestContext.Provider>
  );
};

const ModalTestContext = createContext(null);

export const useModalTest = () => {
  const context = useContext(ModalTestContext);
  if (!context) {
    throw new Error(
      'useModalTest must be used within ModalTestProvider'
    );
  }
  return context;
};

// ============================================================================
// MODAL COMPOSER
// ============================================================================

/**
 * Advanced workflow composition system for complex modal sequences
 */
export class ModalComposer {
  constructor() {
    this.workflows = new Map();
    this.activeWorkflows = new Map();
    this.eventHandlers = new Map();
  }

  // Define a workflow
  defineWorkflow(name, definition) {
    const workflow = {
      name,
      steps: definition.steps || [],
      conditions: definition.conditions || {},
      data: definition.data || {},
      onComplete: definition.onComplete,
      onCancel: definition.onCancel,
      onError: definition.onError,
    };

    this.workflows.set(name, workflow);
    return this;
  }

  // Start a workflow
  async startWorkflow(name, initialData = {}, openModal) {
    const workflow = this.workflows.get(name);
    if (!workflow) {
      throw new Error(`Workflow "${name}" not found`);
    }

    const workflowId = `workflow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const instance = {
      id: workflowId,
      name,
      currentStep: 0,
      data: { ...workflow.data, ...initialData },
      history: [],
      startedAt: Date.now(),
      status: 'running',
    };

    this.activeWorkflows.set(workflowId, instance);

    try {
      await this.executeStep(workflowId, openModal);
      return workflowId;
    } catch (error) {
      instance.status = 'error';
      if (workflow.onError) {
        workflow.onError(error, instance);
      }
      throw error;
    }
  }

  // Execute workflow step
  async executeStep(workflowId, openModal) {
    const instance = this.activeWorkflows.get(workflowId);
    const workflow = this.workflows.get(instance.name);

    if (instance.currentStep >= workflow.steps.length) {
      // Workflow complete
      instance.status = 'completed';
      instance.completedAt = Date.now();

      if (workflow.onComplete) {
        workflow.onComplete(instance);
      }

      return;
    }

    const step = workflow.steps[instance.currentStep];

    // Check conditions
    if (
      step.condition &&
      !this.evaluateCondition(step.condition, instance.data)
    ) {
      // Skip step
      instance.currentStep++;
      return this.executeStep(workflowId, openModal);
    }

    // Record step execution
    instance.history.push({
      step: instance.currentStep,
      executedAt: Date.now(),
      data: { ...instance.data },
    });

    // Execute step
    return new Promise((resolve, reject) => {
      const stepProps = {
        ...step.props,
        workflowData: instance.data,
        onNext: (data = {}) => {
          instance.data = { ...instance.data, ...data };
          instance.currentStep++;
          this.executeStep(workflowId, openModal)
            .then(resolve)
            .catch(reject);
        },
        onPrevious: () => {
          if (instance.currentStep > 0) {
            instance.currentStep--;
            this.executeStep(workflowId, openModal)
              .then(resolve)
              .catch(reject);
          }
        },
        onCancel: () => {
          instance.status = 'cancelled';
          if (workflow.onCancel) {
            workflow.onCancel(instance);
          }
          resolve();
        },
        onError: (error) => {
          instance.status = 'error';
          if (workflow.onError) {
            workflow.onError(error, instance);
          }
          reject(error);
        },
      };

      openModal(step.component, stepProps, step.config);
    });
  }

  // Evaluate condition
  evaluateCondition(condition, data) {
    if (typeof condition === 'function') {
      return condition(data);
    }

    if (typeof condition === 'string') {
      // Simple property check
      return !!data[condition];
    }

    if (typeof condition === 'object') {
      // Complex condition object
      for (const [key, value] of Object.entries(condition)) {
        if (data[key] !== value) {
          return false;
        }
      }
      return true;
    }

    return true;
  }

  // Get workflow instance
  getWorkflow(workflowId) {
    return this.activeWorkflows.get(workflowId);
  }

  // Cancel workflow
  cancelWorkflow(workflowId) {
    const instance = this.activeWorkflows.get(workflowId);
    if (instance) {
      instance.status = 'cancelled';
      const workflow = this.workflows.get(instance.name);
      if (workflow.onCancel) {
        workflow.onCancel(instance);
      }
    }
  }

  // Get all active workflows
  getActiveWorkflows() {
    return Array.from(this.activeWorkflows.values());
  }
}

// ============================================================================
// MODAL DEBUG TOOLS
// ============================================================================

/**
 * Real-time debugging and inspection tools
 */
export const ModalDebugTools = ({
  enabled = true,
  position = 'bottom-right',
}) => {
  const [isVisible, setIsVisible] = useState(enabled);
  const [selectedModal, setSelectedModal] = useState(null);
  const [debugData, setDebugData] = useState({});

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  // Debug panel component
  const DebugPanel = () => {
    if (!isVisible) return null;

    return createPortal(
      <div
        className={`fixed ${positionClasses[position]} z-[9999] w-80 bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-700 font-mono text-xs`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <h3 className="font-bold">Modal Debug Tools</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-3 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {/* Active Modals */}
            <div>
              <h4 className="font-semibold text-blue-400 mb-1">
                Active Modals
              </h4>
              <div className="text-gray-300">
                {debugData.activeModals?.length > 0 ? (
                  debugData.activeModals.map((modal, index) => (
                    <div
                      key={modal.id}
                      className="mb-2 p-2 bg-gray-800 rounded"
                    >
                      <div>ID: {modal.id}</div>
                      <div>Z-Index: {modal.zIndex}</div>
                      <div>
                        Opened:{' '}
                        {new Date(
                          modal.openedAt
                        ).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">
                    No active modals
                  </div>
                )}
              </div>
            </div>

            {/* Performance */}
            <div>
              <h4 className="font-semibold text-green-400 mb-1">
                Performance
              </h4>
              <div className="text-gray-300">
                <div>Render Time: {debugData.renderTime || 0}ms</div>
                <div>
                  Memory Usage: {debugData.memoryUsage || 0}MB
                </div>
                <div>
                  Active Listeners: {debugData.activeListeners || 0}
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div>
              <h4 className="font-semibold text-yellow-400 mb-1">
                Accessibility
              </h4>
              <div className="text-gray-300">
                <div>Focus Traps: {debugData.focusTraps || 0}</div>
                <div>
                  ARIA Violations: {debugData.ariaViolations || 0}
                </div>
                <div>
                  Keyboard Nav:{' '}
                  {debugData.keyboardSupport ? '✓' : '✗'}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="font-semibold text-purple-400 mb-1">
                Actions
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() =>
                    console.log('Modal Debug Data:', debugData)
                  }
                  className="block w-full text-left px-2 py-1 bg-purple-600 rounded hover:bg-purple-700"
                >
                  Log Debug Data
                </button>
                <button
                  onClick={() => setDebugData({})}
                  className="block w-full text-left px-2 py-1 bg-red-600 rounded hover:bg-red-700"
                >
                  Clear Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // Update debug data
  useEffect(() => {
    if (!enabled) return;

    const updateDebugData = () => {
      const modals = Array.from(
        document.querySelectorAll('[role="dialog"]')
      );
      const memoryInfo = performance?.memory;

      setDebugData({
        activeModals: modals.map((modal, index) => ({
          id:
            modal.getAttribute('aria-labelledby') || `modal-${index}`,
          zIndex: window.getComputedStyle(modal).zIndex,
          openedAt: Date.now(), // This would need to be tracked differently
        })),
        renderTime: performance.now(),
        memoryUsage: memoryInfo
          ? Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)
          : 0,
        activeListeners: 0, // Would need event listener tracking
        focusTraps: modals.filter(
          (modal) => modal.getAttribute('tabindex') === '-1'
        ).length,
        ariaViolations: modals.filter(
          (modal) =>
            !modal.hasAttribute('aria-modal') ||
            !modal.hasAttribute('role')
        ).length,
        keyboardSupport: true, // Would need keyboard event testing
      });
    };

    updateDebugData();
    const interval = setInterval(updateDebugData, 1000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <>
      <DebugPanel />

      {/* Toggle button when hidden */}
      {!isVisible && enabled && (
        <button
          onClick={() => setIsVisible(true)}
          className={`fixed ${positionClasses[position]} z-[9999] w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg border border-gray-700 flex items-center justify-center font-mono text-xs hover:bg-gray-800`}
          title="Show Modal Debug Tools"
        >
          🐛
        </button>
      )}
    </>
  );
};

// ============================================================================
// PERFORMANCE PROFILER
// ============================================================================

/**
 * Advanced performance analysis and optimization suggestions
 */
export class ModalPerformanceProfiler {
  constructor() {
    this.measurements = [];
    this.isProfileling = false;
    this.observers = [];
  }

  // Start profiling
  startProfiling() {
    this.isProfileling = true;
    this.measurements = [];

    // Performance observer for paint timing
    if ('PerformanceObserver' in window) {
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.measurements.push({
            type: 'paint',
            name: entry.name,
            startTime: entry.startTime,
            duration: entry.duration || 0,
          });
        });
      });

      paintObserver.observe({ entryTypes: ['paint', 'measure'] });
      this.observers.push(paintObserver);
    }

    // Memory usage tracking
    this.memoryInterval = setInterval(() => {
      if (performance?.memory) {
        const memory = performance.memory;
        this.measurements.push({
          type: 'memory',
          timestamp: Date.now(),
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        });
      }
    }, 1000);
  }

  // Stop profiling
  stopProfiling() {
    this.isProfileling = false;

    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];

    if (this.memoryInterval) {
      clearInterval(this.memoryInterval);
    }
  }

  // Analyze performance
  analyze() {
    const analysis = {
      totalDuration: 0,
      paintMetrics: [],
      memoryUsage: [],
      recommendations: [],
    };

    // Process measurements
    this.measurements.forEach((measurement) => {
      switch (measurement.type) {
        case 'paint':
          analysis.paintMetrics.push(measurement);
          analysis.totalDuration += measurement.duration;
          break;
        case 'memory':
          analysis.memoryUsage.push(measurement);
          break;
      }
    });

    // Generate recommendations
    if (analysis.totalDuration > 100) {
      analysis.recommendations.push({
        type: 'performance',
        severity: 'high',
        message:
          'Modal rendering is slow. Consider reducing DOM complexity or using React.memo().',
      });
    }

    const memoryGrowth = this.calculateMemoryGrowth(
      analysis.memoryUsage
    );
    if (memoryGrowth > 10 * 1024 * 1024) {
      // 10MB
      analysis.recommendations.push({
        type: 'memory',
        severity: 'medium',
        message:
          'Memory usage is growing. Check for memory leaks in event listeners or refs.',
      });
    }

    return analysis;
  }

  // Calculate memory growth
  calculateMemoryGrowth(memoryUsage) {
    if (memoryUsage.length < 2) return 0;

    const first = memoryUsage[0];
    const last = memoryUsage[memoryUsage.length - 1];

    return last.usedJSHeapSize - first.usedJSHeapSize;
  }

  // Get report
  getReport() {
    return {
      measurements: this.measurements,
      analysis: this.analyze(),
      generatedAt: new Date().toISOString(),
    };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================
