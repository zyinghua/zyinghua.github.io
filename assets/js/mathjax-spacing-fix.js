document.addEventListener('DOMContentLoaded', function() {
  // Wait for MathJax to complete initial typesetting
  if (typeof MathJax !== 'undefined') {
    MathJax.startup.promise.then(function() {
      // Add specific CSS adjustments for MathJax elements
      const style = document.createElement('style');
      style.textContent = `
        /* Reduce vertical space between consecutive math displays in complex-math divs */
        .complex-math .MathJax {
          margin-top: 0.16em !important;
          margin-bottom: 0.16em !important;
        }
        
        /* Reduce spacing between consecutive equation blocks */
        .complex-math p > .MathJax + br {
          display: block;
          height: 0.16em;
          content: "";
          margin: 0;
        }
        
        /* Special handling for math display containers */
        .complex-math .MathJax_Display {
          margin-top: 0.4em !important;
          margin-bottom: 0.4em !important;
        }
        
        /* Fix overflow issues to prevent horizontal scrollbars */
        .complex-math {
          overflow-x: visible !important;
        }
        
        /* Allow normal text to wrap while keeping math overflow contained */
        .complex-math .MathJax_Display {
          overflow-x: auto !important;
          max-width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        
        /* Improve handling of long paragraphs with math */
        .complex-math p {
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          hyphens: auto !important;
        }
        
        /* Ensure proper spacing above figures */
        .complex-math .figure-container,
        .complex-math img {
          margin-top: 2em !important;
        }
        
        /* More space when figures follow math formulas */
        .complex-math .MathJax_Display + .figure-container,
        .complex-math .MathJax_Display + img,
        .complex-math .mjx-chtml + .figure-container,
        .complex-math .mjx-chtml + img {
          margin-top: 2em !important;
        }
      `;
      document.head.appendChild(style);
    });
  }
}); 