// Wait for MathJax to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Helper function to find all elements with specific content
  function findElementsWithContent(selector, content) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(el => 
      el.innerHTML.includes(content)
    );
  }

  // Function to handle specific problematic math expressions
  function fixSpecificMathExpressions() {
    // Find paragraphs with complex math expressions that might cause rendering issues
    const complexMathParagraphs = findElementsWithContent('.post p', 'mathbf{z}_t');
    
    // Add special class to these paragraphs for better styling
    complexMathParagraphs.forEach(paragraph => {
      paragraph.classList.add('complex-math');
      // Force line breaks before and after complex math to avoid inline rendering issues
      paragraph.style.overflowX = 'auto';
      paragraph.style.display = 'block';
    });
    
    // Force all MathJax containers to respect containment
    const mjxContainers = document.querySelectorAll('.mjx-container');
    mjxContainers.forEach(container => {
      container.style.overflowX = 'auto';
      container.style.maxWidth = '100%';
    });
  }

  // If MathJax is loaded, hook into its render complete event
  if (typeof MathJax !== 'undefined') {
    MathJax.Hub?.Queue(fixSpecificMathExpressions);
    
    // For MathJax v3
    if (MathJax.startup) {
      const oldReady = MathJax.startup.defaultReady;
      MathJax.startup.defaultReady = function() {
        oldReady.apply(this, arguments);
        fixSpecificMathExpressions();
      };
    }
  } else {
    // If MathJax hasn't loaded yet, try again later
    setTimeout(fixSpecificMathExpressions, 2000);
  }
}); 