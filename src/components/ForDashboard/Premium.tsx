import React from 'react';
import '../../styles/Dashboard/Premium.css';

const Premium: React.FC = () => {
  const isPremiumUser = true; // Example; replace with actual data
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  return (
    <div className="premium-container">
      <div className="premium-header">
        <h2>{isPremiumUser ? 'Your Premium Membership' : 'Unlock Premium'}</h2>
        {isPremiumUser && <p>Expires on: {expiryDate.toLocaleDateString()}</p>}
      </div>

      <div className="premium-plans">
        <div className="premium-card monthly">
          <div className="plan-header">
            <h3>Monthly Plan</h3>
            <p className="premium-price">₹50 / month</p>
          </div>
          <ul className="benefits-list">
            <li>Enhanced Visibility</li>
            <li>Top Search Ranking</li>
            <li>40% Traffic Boost</li>
            <li>+30% Buyer Engagement</li>
          </ul>
          <button className="subscribe-button">Choose Monthly</button>
        </div>

        <div className="premium-card yearly">
          <div className="plan-header">
            <h3>Yearly Plan</h3>
            <p className="premium-price">₹500 / year</p>
          </div>
          <ul className="benefits-list">
            <li>Enhanced Visibility</li>
            <li>Top Search Ranking</li>
            <li>40% Traffic Boost</li>
            <li>+30% Buyer Engagement</li>
          </ul>
          <button className="subscribe-button">Choose Yearly</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
