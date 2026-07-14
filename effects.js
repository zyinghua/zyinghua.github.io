/* Click anywhere -> a cool emoji pops up and floats away, fading smoothly. */
(function () {
  var EMOJIS = [
    "✨", // sparkles
    "🌟", // glowing star
    "💫", // dizzy
    "🚀", // rocket
    "🔥", // fire
    "🎉", // party popper
    "🧠", // brain
    "🎮", // video game
    "🏓", // ping pong
    "🌸", // cherry blossom
    "⭐",  // star
    "🫧", // bubbles
    "🗽",
    "🎓"
  ];

  var css = ""
    + ".emoji-pop{position:fixed;z-index:9999;pointer-events:none;user-select:none;"
    + "font-size:18px;line-height:1;will-change:transform,opacity;"
    + "transform:translate(-50%,-50%);opacity:1;}"
    + "@keyframes emoji-float{"
    + "0%{opacity:0;transform:translate(-50%,-50%) scale(.4) rotate(0deg);}"
    + "18%{opacity:1;transform:translate(-50%,-90%) scale(1.15) rotate(var(--r1));}"
    + "100%{opacity:0;transform:translate(-50%,-320%) scale(.9) rotate(var(--r2));}"
    + "}"
    + "@media (prefers-reduced-motion: reduce){.emoji-pop{display:none;}}"
    + ".to-top{position:fixed;right:22px;bottom:22px;z-index:9998;width:42px;height:42px;"
    + "border:none;border-radius:50%;background:var(--accent,#d2691e);color:#fff;font-size:20px;"
    + "line-height:42px;text-align:center;cursor:pointer;padding:0;"
    + "box-shadow:0 4px 14px rgba(60,45,25,.28);opacity:0;visibility:hidden;transform:translateY(8px);"
    + "transition:opacity .2s ease,transform .2s ease,visibility .2s;}"
    + ".to-top.show{opacity:1;visibility:visible;transform:translateY(0);}"
    + ".to-top:hover{background:#b85a17;}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---- back-to-top float button (appears once the page is scrolled well down) ----
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = "&#8593;";           // up arrow
  toTop.addEventListener("click", function (e) {
    e.stopPropagation();  // never trigger the emoji pop
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(toTop);
  function onScroll() {
    if (window.scrollY > 500) toTop.classList.add("show");
    else toTop.classList.remove("show");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- day / night theme toggle (Tabler filled moon/sun icons) ----
  var MOON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z"/><path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .073z"/><path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z"/><path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"/><path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"/><path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .073z"/><path d="M18.79 4.81a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z"/><path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z"/><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"/></svg>';
  var themeBtn = document.createElement("button");
  themeBtn.className = "theme-toggle";
  function setTheme(t) {
    if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try { localStorage.setItem("theme", t); } catch (e) {}
    themeBtn.innerHTML = (t === "dark") ? SUN : MOON;
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to day mode" : "Switch to night mode");
  }
  try { if (localStorage.getItem("theme") === "dark") document.documentElement.setAttribute("data-theme", "dark"); } catch (e) {}
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  themeBtn.addEventListener("click", function (e) {
    e.stopPropagation();  // never trigger the emoji pop
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
  // group the Blog/Home link + toggle together, right-aligned; toggle on the right
  var tab = document.querySelector(".blog-tab");
  var nav = document.createElement("div");
  nav.className = "top-nav";
  if (tab && tab.parentNode) {
    tab.parentNode.insertBefore(nav, tab);
    nav.appendChild(tab);
  } else {
    document.body.appendChild(nav);
  }
  nav.appendChild(themeBtn);

  function spawn(x, y) {
    var el = document.createElement("span");
    el.className = "emoji-pop";
    el.textContent = EMOJIS[(Math.random() * EMOJIS.length) | 0];
    var spread = (Math.random() * 40 - 20);      // small horizontal drift
    var r1 = (Math.random() * 30 - 15) + "deg";
    var r2 = (Math.random() * 80 - 40) + "deg";
    var dur = (1.0 + Math.random() * 0.5).toFixed(2);
    el.style.left = (x + spread) + "px";
    el.style.top = y + "px";
    el.style.setProperty("--r1", r1);
    el.style.setProperty("--r2", r2);
    el.style.animation = "emoji-float " + dur + "s cubic-bezier(.25,.55,.3,1) forwards";
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, dur * 1000 + 60);
  }

  var INTERACTIVE = 'a, button, input, textarea, select, label, summary, [role="button"], [onclick]';
  document.addEventListener("click", function (e) {
    // only pop on non-interactive areas — leave links/buttons alone
    if (e.target.closest && e.target.closest(INTERACTIVE)) return;
    spawn(e.clientX, e.clientY);
  }, { passive: true });
})();
