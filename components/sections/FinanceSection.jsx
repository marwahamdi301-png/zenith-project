// components/sections/FinanceSection.jsx
import React, { useState, useEffect } from 'react';
import piPaymentService from '@/lib/pi/piPaymentService';
import styles from '@/styles/FinanceSection.module.css';

export default function FinanceSection() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  useEffect(() => {
    // Initialize Pi
    initializePi();

    // Check access
    checkAccess();

    // Listen for access granted event
    window.addEventListener('hnifa-access-granted', handleAccessGranted);
    return () => window.removeEventListener('hnifa-access-granted', handleAccessGranted);
  }, []);

  const initializePi = async () => {
    try {
      await piPaymentService.init();
    } catch (err) {
      console.error('Pi init error:', err);
    }
  };

  const checkAccess = () => {
    setHasAccess(piPaymentService.hasAccess('finance'));
  };

  const handleAccessGranted = (event) => {
    if (event.detail.section === 'finance') {
      setHasAccess(true);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    setPaymentStatus('processing');

    try {
      const payment = await piPaymentService.createPayment('finance', {
        feature: 'premium_analytics',
      });
      
      setPaymentStatus('completed');
      checkAccess();
    } catch (err) {
      setError(err.message);
      setPaymentStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (hasAccess) {
    return (
      <div className={styles.financeContainer}>
        <div className={styles.header}>
          <h2>💰 Finance Dashboard</h2>
          <span className={styles.badge}>✅ Premium Active</span>
        </div>

        <div className={styles.analyticsGrid}>
          <div className={styles.card}>
            <h3>Portfolio Value</h3>
            <p className={styles.value}>125.50 Pi</p>
            <p className={styles.change}>+25.50 (25%)</p>
          </div>

          <div className={styles.card}>
            <h3>Total Invested</h3>
            <p className={styles.value}>1,250 Pi</p>
            <p className={styles.change}>In 5 projects</p>
          </div>

          <div className={styles.card}>
            <h3>Monthly Returns</h3>
            <p className={styles.value}>15.75 Pi</p>
            <p className={styles.change}>Average 1.2%/month</p>
          </div>

          <div className={styles.card}>
            <h3>Next Dividend</h3>
            <p className={styles.value}>2024-03-31</p>
            <p className={styles.change}>15 days remaining</p>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <h3>Premium Features</h3>
          <ul>
            <li>✅ Advanced Analytics & Insights</li>
            <li>✅ Real-time Portfolio Tracking</li>
            <li>✅ Risk Analysis Reports</li>
            <li>✅ Dividend Forecasting</li>
            <li>✅ Priority Support</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.financeContainer}>
      <div className={styles.lockedCard}>
        <div className={styles.header}>
          <h2>💰 Finance Dashboard</h2>
          <span className={styles.lockBadge}>🔒 Locked</span>
        </div>

        <div className={styles.content}>
          <p>Unlock premium investment analytics and real-time portfolio tracking</p>
          
          <div className={styles.features}>
            <h3>Premium Features:</h3>
            <ul>
              <li>📊 Advanced Analytics & Insights</li>
              <li>📈 Real-time Portfolio Tracking</li>
              <li>⚠️ Risk Analysis Reports</li>
              <li>🎯 Dividend Forecasting</li>
              <li>⭐ Priority Support</li>
            </ul>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              ❌ {error}
            </div>
          )}

          {paymentStatus !== 'idle' && (
            <div className={styles.statusMessage}>
              Status: <strong>{paymentStatus.toUpperCase()}</strong>
            </div>
          )}

          <button
            className={styles.paymentBtn}
            onClick={handlePayment}
            disabled={isLoading || !piPaymentService.isReady()}
          >
            {isLoading ? '⏳ Processing...' : '💳 Unlock Premium (10 Pi)'}
          </button>

          <p className={styles.infoText}>
            Secure payment via Pi Network Testnet
          </p>
        </div>
      </div>
    </div>
  );
}
