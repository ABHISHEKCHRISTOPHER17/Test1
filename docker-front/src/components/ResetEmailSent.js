import React from 'react';
import './ResetEmailSent.css';

const EmailSentComp = () => {
  return (
    <div className="info-area">
      <div className="input-fields1ofReset">
        <div className="mail-fill0-wght400-grad0-opsz2">
          <img className="icon-shape" loading="lazy" alt="" src="/vector.svg" />
        </div>
        <div className="instruction-panelofReset">
          <div className="instruction-box">
            <div className="weve-sent-you-an-email-parent">
              <div className="weve-sent-you">We’ve sent you an Email</div>
              <div className="a-reset-password">
                A reset password link has been sent to your email address.
              </div>
            </div>
          </div>
          <button className="action-button">
            <div className="log-in-button1">
              <div className="button1ofReset">Go Back</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSentComp;
