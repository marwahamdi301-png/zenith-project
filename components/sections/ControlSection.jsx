// components/sections/ControlSection.jsx
import React, { useState, useEffect } from 'react';
import piPaymentService from '@/lib/pi/piPaymentService';
import styles from '@/styles/ControlSection.module.css';

export default function ControlSection() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    initializePi();
    checkAccess();
    loadAdminData();

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
    setHasAccess(piPaymentService.hasAccess('control'));
  };

  const handleAccessGranted = (event) => {
    if (event.detail.section === 'control') {
      setHasAccess(true);
      loadAdminData();
    }
  };

  const loadAdminData = () => {
    setAdminData({
      totalProjects: 45,
      activeProjects: 38,
      totalInvestors: 5234,
      totalFunded: 250000,
      platformMetrics: {
        totalUsers: 5234,
        totalInvested: 250000,
        activeProjects: 38,
        successRate: 92,
      },
    });
  };

  const handleGetAdminAccess = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payment = await piPaymentService.createPayment('control', {
        feature: 'admin_panel',
        tier: 'premium',
      });
      
      checkAccess();
      loadAdminData();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasAccess && adminData) {
    return (
      <div className={styles.controlContainer}>
        <div className={styles.header}>
          <h2>⚙️ Control Panel</h2>
          <span className={styles.badge}>✅ Admin Access</span>
        </div>

        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.icon}>📊</div>
            <p className={styles.label}>Total Projects</p>
            <p className={styles.value}>{adminData.totalProjects}</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.icon}>✅</div>
            <p className={styles.label}>Active</p>
            <p className={styles.value}>{adminData.activeProjects}</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.icon}>👥</div>
            <p className={styles.label}>Investors</p>
            <p className={styles.value}>{adminData.totalInvestors.toLocaleString()}</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.icon}>💰</div>
            <p className={styles.label}>Total Funded</p>
            <p className={styles.value}>{(adminData.totalFunded / 1000).toLocaleString()}K Pi</p>
          </div>
        </div>

        <div className={styles.adminPanel}>
          <h3>Admin Controls</h3>
          <div className={styles.buttonGroup}>
            <button className={styles.adminBtn}>📝 Manage Projects</button>
            <button className={styles.adminBtn}>👥 Manage Users</button>
            <button className={styles.adminBtn}>💳 Approve Payments</button>
            <button className={styles.adminBtn}>📊 View Analytics</button>
            <button className={styles.adminBtn}>📧 Send Notifications</button>
            <button className={styles.adminBtn}>⚙️ System Settings</button>
          </div>
        </div>

        <div className={styles.statsSection}>
          <h3>Platform Statistics</h3>
          <div className={styles.statsList}>
            <div className={styles.stat}>
              <span>Total Users:</span>
              <strong>{adminData.platformMetrics.totalUsers.toLocaleString()}</strong>
            </div>
            <div className={styles.stat}>
              <span>Total Invested:</span>
              <strong>{(adminData.platformMetrics.totalInvested / 1000).toLocaleString()}K Pi</strong>
            </div>
            <div className={styles.stat}>
              <span>Active Projects:</span>
              <strong>{adminData.platformMetrics.activeProjects}</strong>
            </div>
            <div className={styles.stat}>
              <span>Success Rate:</span>
              <strong>{adminData.platformMetrics.successRate}%</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.controlContainer}>
      <div className={styles.lockedCard}>
        <div className={styles.header}>
          <h2>⚙️ Control Panel</h2>
          <span className={styles.lockBadge}>🔒 Admin Only</span>
        </div>

        <div className={styles.content}>
          <p>Get admin access to manage projects, users, and monitor platform analytics</p>
          
          <div className={styles.features}>
            <h3>Admin Features:</h3>
            <ul>
              <li>📝 Create & Manage Projects</li>
              <li>👥 User Management & KYC</li>
              <li>💳 Payment Approval System</li>
              <li>📊 Real-time Analytics Dashboard</li>
              <li>📧 Send Notifications</li>
              <li>⚙️ System Configuration</li>
              <li>🔐 Security & Compliance</li>
            </ul>
          </div>

          <div className={styles.previewBox}>
            <h4>Current Platform Status:</h4>
            <p>📊 <strong>45</strong> Projects | 👥 <strong>5,234</strong> Users | 💰 <strong>250K</strong> Pi Invested</p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              ❌ {error}
            </div>
          )}

          <button
            className={styles.adminBtn}
            onClick={handleGetAdminAccess}
            disabled={isLoading || !piPaymentService.isReady()}
          >
            {isLoading ? '⏳ Processing...' : '🔓 Get Admin Access (15 Pi)'}
          </button>

          <p className={styles.infoText}>
            Premium admin access for 1 year. Secure payment via Pi Network.
          </p>
        </div>
      </div>
    </div>
  );
}
