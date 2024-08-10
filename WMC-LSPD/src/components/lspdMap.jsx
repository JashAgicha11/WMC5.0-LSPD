import React, { useEffect } from 'react';

const SketchfabEmbed = () => {
  useEffect(() => {
    const loadSketchfabScript = () => {
      const script = document.createElement('script');
      script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
      script.async = true;
      script.onload = initSketchfab;
      document.body.appendChild(script);
    };

    const initSketchfab = () => {
      const iframe = document.getElementById('api-frame');
      const uid = 'fe9ddaaea413487395b9f0656fd0afd7';

      const client = new Sketchfab(iframe);
        
      client.init(uid, {
        success: function onSuccess(api) {
          api.start();
          api.addEventListener('viewerready', function () {
            console.log('Viewer is ready');
          });
        },
        error: function onError() {
          console.log('Viewer error');
        },
        autostart: 1,
        preload: 1,
        ui_infos: 0,   // Hide the attribution links
        ui_controls: 0 // Hide the controls (like start/pause buttons)
      });
    };

    if (!window.Sketchfab) {
      loadSketchfabScript();
    } else {
      initSketchfab();
    }
  }, []);

  return (
    <iframe
      id="api-frame"
      title="GTA:V San Andreas 3D Map"
      allowFullScreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      style={{ width: '100%', height: '500px', border: 'none' }}
    ></iframe>
  );
};

export default SketchfabEmbed;
