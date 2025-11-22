import { useEffect } from 'react';

export function SEOHead() {
  useEffect(() => {
    // Update meta tags for PWA
    const updateMetaTags = () => {
      // Set viewport
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover');

      // Set theme color
      let themeColor = document.querySelector('meta[name="theme-color"]');
      if (!themeColor) {
        themeColor = document.createElement('meta');
        themeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(themeColor);
      }
      themeColor.setAttribute('content', '#2563eb');

      // Set description
      let description = document.querySelector('meta[name="description"]');
      if (!description) {
        description = document.createElement('meta');
        description.setAttribute('name', 'description');
        document.head.appendChild(description);
      }
      description.setAttribute('content', 'EduCare - A learning application for kids aged 2-6 with interactive educational content including alphabets, numbers, fruits, animals, and vegetables.');

      // Set Apple mobile web app capable
      let appleMobileWebApp = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
      if (!appleMobileWebApp) {
        appleMobileWebApp = document.createElement('meta');
        appleMobileWebApp.setAttribute('name', 'apple-mobile-web-app-capable');
        document.head.appendChild(appleMobileWebApp);
      }
      appleMobileWebApp.setAttribute('content', 'yes');

      // Set Apple mobile web app status bar style
      let appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (!appleStatusBar) {
        appleStatusBar = document.createElement('meta');
        appleStatusBar.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
        document.head.appendChild(appleStatusBar);
      }
      appleStatusBar.setAttribute('content', 'black-translucent');

      // Set Apple mobile web app title
      let appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
      if (!appleTitle) {
        appleTitle = document.createElement('meta');
        appleTitle.setAttribute('name', 'apple-mobile-web-app-title');
        document.head.appendChild(appleTitle);
      }
      appleTitle.setAttribute('content', 'EduCare');

      // Set manifest link
      let manifest = document.querySelector('link[rel="manifest"]');
      if (!manifest) {
        manifest = document.createElement('link');
        manifest.setAttribute('rel', 'manifest');
        document.head.appendChild(manifest);
      }
      manifest.setAttribute('href', '/manifest.json');

      // Set title
      document.title = 'EduCare - Kids Learning App';

      // Mobile-first meta tags
      let mobileOptimized = document.querySelector('meta[name="mobile-web-app-capable"]');
      if (!mobileOptimized) {
        mobileOptimized = document.createElement('meta');
        mobileOptimized.setAttribute('name', 'mobile-web-app-capable');
        document.head.appendChild(mobileOptimized);
      }
      mobileOptimized.setAttribute('content', 'yes');

      // Add touch icons for iOS
      let touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
      if (!touchIcon) {
        touchIcon = document.createElement('link');
        touchIcon.setAttribute('rel', 'apple-touch-icon');
        document.head.appendChild(touchIcon);
      }
      touchIcon.setAttribute('href', '/icon-192.png');
    };

    updateMetaTags();
  }, []);

  return null;
}
