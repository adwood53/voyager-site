'use client';

import { useEffect, useState } from 'react';
import { testFirestoreConnection } from '@/src/lib/firestore';

export function FirestoreTest() {
  const [testResult, setTestResult] = useState('Not tested yet');
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult('Testing...');
    try {
      await testFirestoreConnection();
      setTestResult('Connection successful!');
    } catch (error) {
      setTestResult(`Test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-medium mb-2">
        Firestore Connection Test
      </h2>
      <p>Status: {testResult}</p>
      <button
        onClick={runTest}
        disabled={isLoading}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Connection'}
      </button>
    </div>
  );
}
