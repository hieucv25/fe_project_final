"use strict";
!(function () {
  function u(t) {
    return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  var t;
  (t = document.querySelectorAll(".counter-value")) &&
    t.forEach(function (i) {
      !(function t() {
        var e = +i.getAttribute("data-target"),
          n = +i.innerText,
          r = e / 250;
        r < 1 && (r = 1),
          n < e
            ? ((i.innerText = (n + r).toFixed(0)), setTimeout(t, 1))
            : (i.innerText = u(e)),
          u(i.innerText);
      })();
    });
})();
