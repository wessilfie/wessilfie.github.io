/**
 * Theme Toggle Script
 * Detects ?theme= in URL and applies data-theme attribute
 * Supported themes: sea (Sea-Tac Airport), nyc (NYC Vignelli Subway)
 */
(function() {
    'use strict';

    var validThemes = ['sea', 'nyc'];

    function applyTheme() {
        var urlParams = new URLSearchParams(window.location.search);
        var theme = urlParams.get('theme');

        if (theme && validThemes.indexOf(theme) !== -1) {
            // Apply to html element
            document.documentElement.setAttribute('data-theme', theme);

            // Apply to body when it exists
            if (document.body) {
                document.body.setAttribute('data-theme', theme);
            }

            // Apply to site-body element if it exists
            var siteBody = document.getElementById('site-body');
            if (siteBody) {
                siteBody.setAttribute('data-theme', theme);
            }
        }
    }

    // Apply when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTheme);
    } else {
        applyTheme();
    }

    // Also run on page load to ensure it's applied
    window.addEventListener('load', applyTheme);
})();
