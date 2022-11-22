import React from "react";
import { Container } from "react-bootstrap";
import { settings } from "../../../../utils/settings";


const Map = () => {
  return (
    
      <iframe
        title={settings.siteName}
        src={settings.mapEmbedUrl}
        width="100%"
        height="450"
        
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
  );
};

export default Map;
