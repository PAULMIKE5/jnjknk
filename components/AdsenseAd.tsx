
import React, { useEffect } from 'react';

interface AdsenseAdProps {
  adClient: string;
  adSlot: string;
  className?: string;
}

const AdsenseAd: React.FC<AdsenseAdProps> = ({ adClient, adSlot, className }) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense push error:", e);
    }
  }, [adSlot]); // Re-run if adSlot changes, though typically it won't

  return (
    <div className={`my-6 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }} // Added minHeight for visibility
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {adSlot.includes("YOUR_AD_SLOT_ID") && (
         <p className="text-xs text-yellow-400 mt-1">Developer: Replace 'YOUR_AD_SLOT_ID' with your actual Ad Slot ID.</p>
      )}
    </div>
  );
};

export default AdsenseAd;
    