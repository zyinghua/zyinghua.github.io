document.addEventListener('DOMContentLoaded', function() {
  // Wait for MathJax to complete initial typesetting
  MathJax.startup.promise.then(function() {
    // Find all complex-math divs
    const complexMathDivs = document.querySelectorAll('.complex-math');
    
    complexMathDivs.forEach(function(div) {
      // Process markdown-style links: [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      
      // Get the HTML content of the div
      let htmlContent = div.innerHTML;
      
      // Replace markdown-style links with HTML links
      htmlContent = htmlContent.replace(linkRegex, function(match, text, url) {
        return '<a href="' + url + '">' + text + '</a>';
      });
      
      // Process markdown headers (## Title) - but only at line start
      // Match headers level 1-6 (# to ######)
      htmlContent = htmlContent.replace(/^(#{1,6})\s+(.+?)$/gm, function(match, hashes, title) {
        const level = hashes.length;
        return `</p><h${level}>${title}</h${level}><p>`;
      });
      
      // Fix image captions (text that comes after an img tag and is wrapped in asterisks)
      htmlContent = htmlContent.replace(/(<img[^>]*>)\s*\*([^*]+)\*/g, function(match, imgTag, caption) {
        return '<div class="figure-container" style="margin-top:2em;">' + imgTag + '<div class="figure-caption">' + caption + '</div></div>';
      });
      
      // Fix paragraph spacing - ensure proper paragraph breaks
      // Replace double line breaks with paragraph tags if they aren't already in paragraphs
      if (!htmlContent.includes('<p>') || htmlContent.includes('</p><h')) {
        // Identify consecutive math formulas with single line breaks between them for special handling
        htmlContent = htmlContent.replace(/(\$\$[\s\S]+?\$\$)\s*\n\s*(\$\$[\s\S]+?\$\$)/g, '$1\n<span class="math-separator" style="height:0.4em; display:block;"></span>\n$2');
        
        // Then convert normal paragraph breaks (but not where we've already placed closing </p> tags for headers)
        htmlContent = htmlContent.replace(/(?<!<\/p>)\n\s*\n/g, '</p><p>');
        
        // Wrap the content in paragraph tags if needed
        if (!htmlContent.startsWith('<p>') && !htmlContent.startsWith('</p><h')) {
          htmlContent = '<p>' + htmlContent;
        }
        if (!htmlContent.endsWith('</p>')) {
          htmlContent = htmlContent + '</p>';
        }
        
        // Fix any double closing or opening tags from our processing
        htmlContent = htmlContent.replace(/<\/p><\/p>/g, '</p>');
        htmlContent = htmlContent.replace(/<p><p>/g, '<p>');
        
        // Fix empty paragraphs created by our header processing
        htmlContent = htmlContent.replace(/<\/p><h([1-6])>/g, '</p><h$1>');
        htmlContent = htmlContent.replace(/<\/h([1-6])><p><\/p>/g, '</h$1><p>');
        htmlContent = htmlContent.replace(/<\/h([1-6])><p>/g, '</h$1><p>');
      }
      
      // Update the div content
      div.innerHTML = htmlContent;
      
      // Re-render MathJax in this div to ensure formulas stay rendered correctly
      MathJax.typesetPromise([div]).then(function() {
        // Add a class to consecutive math display elements to control spacing
        const mathElements = div.querySelectorAll('.MathJax_Display, .mjx-chtml');
        
        for (let i = 0; i < mathElements.length - 1; i++) {
          const current = mathElements[i];
          const next = mathElements[i + 1];
          
          // Check if they're close siblings with only whitespace or a single <br> between them
          let node = current.nextSibling;
          let hasOnlyBreak = true;
          let breakCount = 0;
          
          while (node && node !== next) {
            if (node.nodeType === 1) { // Element node
              if (node.tagName === 'BR') {
                breakCount++;
                if (breakCount > 1) {
                  hasOnlyBreak = false;
                  break;
                }
              } else if (node.tagName !== 'SPAN' || !node.classList.contains('math-separator')) {
                hasOnlyBreak = false;
                break;
              }
            } else if (node.nodeType === 3) { // Text node
              if (node.textContent.trim() !== '') {
                hasOnlyBreak = false;
                break;
              }
            }
            node = node.nextSibling;
          }
          
          if (hasOnlyBreak) {
            next.classList.add('consecutive-math');
          }
        }
        
        // Ensure proper spacing for images after math formulas
        mathElements.forEach(function(mathElement) {
          let next = mathElement.nextElementSibling;
          while (next) {
            if (next.tagName === 'IMG') {
              next.style.marginTop = '2em';
              break;
            } else if (next.classList.contains('figure-container')) {
              next.style.marginTop = '2em';
              break;
            } else if (next.tagName === 'BR' || next.classList.contains('math-separator')) {
              next = next.nextElementSibling;
            } else {
              break;
            }
          }
        });
        
        // Fix overflow issues in long paragraphs with math formulas
        const paragraphs = div.querySelectorAll('p');
        paragraphs.forEach(function(p) {
          // Check if paragraph contains both text and math
          if (p.textContent.trim().length > 200 && p.querySelector('.MathJax, .mjx-chtml')) {
            p.style.overflowX = 'visible';
            p.style.width = '100%';
            p.style.boxSizing = 'border-box';
            p.style.wordWrap = 'break-word';
            p.style.overflowWrap = 'break-word';
            
            // Ensure math containers within have proper overflow handling
            const mathContainers = p.querySelectorAll('.MathJax_Display, .mjx-chtml.MJXc-display');
            mathContainers.forEach(function(container) {
              container.style.maxWidth = '100%';
              container.style.overflowX = 'auto';
            });
          }
        });
      });
    });
  });
}); 