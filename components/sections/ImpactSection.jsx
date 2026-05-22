// components/sections/ImpactSection.jsx
import React, { useState, useEffect } from 'react';
import piPaymentService from '@/lib/pi/piPaymentService';
import styles from '@/styles/ImpactSection.module.css';

export default function ImpactSection() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [impactData, setImpactData] = useState(null);

  useEffect(() => {
    initializePi();
    checkAccess();
    loadImpactData();

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
    setHasAccess(piPaymentService.hasAccess('impact'));
  };

  const handleAccessGranted = (event) => {
    if (event.detail.section === 'impact') {
      setHasAccess(true);
      loadImpactData();
    }
  };

  const loadImpactData = () => {
    // Mock data - replace with real Firebase data
    setImpactData({
      totalTreesPlanted: 5250,
      carbonOffset: 2625, // tons
      waterSaved: 525000, // liters
      projectsSupported: 12,
      badges: [
        { name: 'Green Champion', icon: '🌱', progress: 75 },
        { name: 'Carbon Hero', icon: '♻️', progress: 60 },
        { name: 'Water Guardian', icon: '💧', progress: 45 },
      ],
      recentProjects: [
        {
          id: 1,
          name: 'Reforestation in Madagascar',
          impact: 1000,
          metric: 'trees',
        },
        {
          id: 2,
          name: 'Solar Farm Kenya',
          impact: 500,
          metric: 'tons CO2',
        },
        {
          id: 3,
          name: 'Water Well Uganda',
          impact: 50000,
          metric: 'liters',
        },
      ],
    });
  };

  const handleSupportProject = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payment = await piPaymentService.createPayment('impact', {
        feature: 'project_support',
        projectType: 'environmental',
      });
      
      checkAccess();
      loadImpactData();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasAccess && impactData) {
    return (
      <div className={styles.impactContainer}>
        <div className={styles.header}>
          <h2>🌍 Environmental Impact Dashboard</h2>
          <span className={styles.badge}>✅ Active Contributor</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.icon}>🌳</div>
            <div className={styles.content}>
              <p className={styles.label}>Trees Planted</p>
              <p className={styles.value}>{impactData.totalTreesPlanted.toLocaleString()}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.icon}>♻️</div>
            <div className={styles.content}>
              <p className={styles.label}>Carbon Offset</p>
              <p className={styles.value}>{impactData.carbonOffset.toLocaleString()} tons</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.icon}>💧</div>
            <div className={styles.content}>
              <p className={styles.label}>Water Saved</p>
              <p className={styles.value}>{(impactData.waterSaved / 1000).toLocaleString()}K L</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.icon}>🎯</div>
            <div className={styles.content}>
              <p className={styles.label}>Projects Supported</p>
              <p className={styles.value}>{impactData.projectsSupported}</p>
            </div>
          </div>
        </div>

        <div className={styles.badgesSection}>
          <h3>Your Badges</h3>
          <div className={styles.badgesList}>
            {impactData.badges.map((badge, i) => (
              <div key={i} className={styles.badge}>
                <span className={styles.icon}>{badge.icon}</span>
                <p>{badge.name}</p>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${badge.progress}%` }}></div>
                </div>
                <p className={styles.percent}>{badge.progress}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.projectsSection}>
          <h3>Recent Contributions</h3>
          <div className={styles.projectsList}>
            {impactData.recentProjects.map((proj) => (
              <div key={proj.id} className={styles.projectItem}>
                <h4>{proj.name}</h4>
                <p><strong>{proj.impact.toLocaleString()}</strong> {proj.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.impactContainer}>
      <div className={styles.lockedCard}>
        <div className={styles.header}>
          <h2>🌍 Environmental Impact</h2>
          <span className={styles.lockBadge}>🔓 Support Projects</span>
        </div>

        <div className={styles.content}>
          <p>Support sustainable development projects across Africa and track your environmental impact</p>
          
          <div className={styles.features}>
            <h3>Support Environmental Projects:</h3>
            <ul>
              <li>🌳 Plant Trees & Reforestation</li>
              <li>☀️ Solar Energy Projects</li>
              <li>💧 Water & Sanitation</li>
              <li>🌾 Sustainable Agriculture</li>
              <li>🏕️ Biodiversity Conservation</li>
            </ul>
          </div>

          <div className={styles.impactPreview}>
            <h4>Your Potential Impact (per 5 Pi):</h4>
            <ul>
              <li>🌳 10 Trees Planted</li>
              <li>♻️ 5 Tons CO2 Offset</li>
              <li>💧 50,000 Liters Water Saved</li>
            </ul>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              ❌ {error}
            </div>
          )}

          <button
            className={styles.supportBtn}
            onClick={handleSupportProject}
            disabled={isLoading || !piPaymentService.isReady()}
          >
            {isLoading ? '⏳ Processing...' : '💚 Support Green Projects (5 Pi)'}
          </button>

          <p className={styles.infoText}>
            Your contribution helps fund real environmental projects in Africa
          </p>
        </div>
      </div>
    </div>
  );
}
