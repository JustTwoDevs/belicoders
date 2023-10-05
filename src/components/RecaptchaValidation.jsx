import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaValidation = ({ sitekey, onValidationSuccess }) => {
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);

  const handleRecaptchaSuccess = (token) => {
    
    setIsRecaptchaValid(true);
    onValidationSuccess(token);
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
        onChange={handleRecaptchaSuccess}
      />
    </div>
  );
};

export default RecaptchaValidation;
