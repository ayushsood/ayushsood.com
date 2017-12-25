function _fade(direction, elementId, interval) {
  var tick = interval / 10;

  var target = document.getElementById(elementId);
  var fadeEffect = setInterval(function() {
    // We are fading in
    if (direction) {
      if (!target.style.opacity) {
        target.style.opacity = 0.1;
      }
      if (target.style.opacity >= 1) {
        clearInterval(fadeEffect);
      } else {
        target.style.opacity = parseFloat(target.style.opacity) + 0.1;
      }
    // We are fading out
    } else {
      if (!target.style.opacity) {
        target.style.opacity = 1;
      }
      if (target.style.opacity <= 0) {
        clearInterval(fadeEffect);
      } else {
        target.style.opacity = parseFloat(target.style.opacity) - 0.1;
      }
    }
  }, tick);
}

function fadeIn(elementId, interval) {
  _fade(true, elementId, interval);
}

function fadeOut(elementId, interval) {
  _fade(false, elementId, interval);
}

setTimeout(function() {
  var elementId = 'logo-center';
  fadeOut(elementId, 200);

  setTimeout(function() {
    var target = document.getElementById(elementId);
    target.id = 'logo';
    fadeIn('logo', 600);
  }, 500);
}, 1000);

setTimeout(function() {
  fadeIn('circle-container', 600);
}, 1500);

