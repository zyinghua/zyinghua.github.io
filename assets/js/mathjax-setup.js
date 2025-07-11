window.MathJax = {
  tex: {
    tags: "ams",
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    macros: {
      // Add any specific macros needed
    },
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process',
    renderActions: {
      addCss: [
        200,
        function (doc) {
          const style = document.createElement("style");
          style.innerHTML = `
          .mjx-container {
            color: inherit;
            overflow-x: auto;
            overflow-y: hidden;
          }
          .mjx-math {
            display: inline-block;
            overflow-x: auto;
            overflow-y: hidden;
          }
        `;
          document.head.appendChild(style);
        },
        "",
      ],
    },
  },
  chtml: {
    scale: 1,
    displayAlign: "center"
  },
  svg: {
    fontCache: "global",
    displayAlign: "center"
  },
  startup: {
    pageReady: function() {
      return MathJax.startup.defaultPageReady().then(function() {
        // Force re-render of specific elements if needed
      });
    }
  }
};
