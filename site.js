document.querySelectorAll('.yr').forEach(function (element) {
  element.textContent = new Date().getFullYear();
});

// A shared case-study link opens its content before the browser scrolls to it.
function revealHash() {
  var id;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (_) { return; }
  var target = document.getElementById(id);
  if (!target) return;
  var detail = target.closest('details');
  while (detail) {
    detail.open = true;
    detail = detail.parentElement.closest('details');
  }
  if (id === 'product-case') {
    document.getElementById('product').open = true;
  }
  requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
}
window.addEventListener('hashchange', revealHash);
document.addEventListener('click', function (event) {
  var link = event.target.closest('a[href^="#"]');
  if (link && link.hash === window.location.hash) revealHash();
});
revealHash();

var printState = [];
window.addEventListener('beforeprint', function () {
  printState = Array.from(document.querySelectorAll('details')).map(function (detail) {
    var previous = detail.open;
    detail.open = true;
    return [detail, previous];
  });
});
window.addEventListener('afterprint', function () {
  printState.forEach(function (entry) { entry[0].open = entry[1]; });
});
