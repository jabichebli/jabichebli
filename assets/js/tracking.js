/*
	Name: Jason Abi Chebli
	Last Edited: 25-Feb-2025	
	Credit to HTML5 UP for laying some foundations.
*/

// Helper function to send data to the server
function sendTrackingData(endpoint, data) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

// Track page view
function trackPageView() {
    const pageData = {
        page: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
    };

    // Send page view data to the server
    sendTrackingData('/trackPageView', pageData);

    // Track the duration of the page view
    const startTime = Date.now();
    window.onbeforeunload = () => {
        const duration = (Date.now() - startTime) / 1000; // in seconds
        pageData.duration = duration;
        sendTrackingData('/trackPageView', pageData);
    };
}

// Track link clicks
function trackLinkClicks() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const linkData = {
                link: e.target.href,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
            };

            // Send link click data to the server
            sendTrackingData('/trackLinkClick', linkData);
        });
    });
}

// Track file downloads
function trackDownloads() {
    document.querySelectorAll('a.download').forEach(link => {
        link.addEventListener('click', function(e) {
            const downloadData = {
                file: e.target.href,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
            };

            // Send download data to the server
            sendTrackingData('/trackDownload', downloadData);
        });
    });
}

// Initialize all tracking functions
function initializeTracking() {
    trackPageView();
    trackLinkClicks();
    trackDownloads();
}

// Run tracking when the page is fully loaded
window.addEventListener('load', initializeTracking);
