"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const article = document.querySelector(".post-content");

  if (!article || typeof window.renderMathInElement !== "function") {
    return;
  }

  window.renderMathInElement(article, {
    delimiters: [
      { left: "\\[", right: "\\]", display: true },
      { left: "$$", right: "$$", display: true },
      { left: "\\(", right: "\\)", display: false },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
    trust: false,
  });
});
