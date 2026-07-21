document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  var imageWrap = document.createElement('div');
  imageWrap.className = 'lightbox-image-wrap';
  overlay.appendChild(imageWrap);

  var lightboxImg = document.createElement('img');
  imageWrap.appendChild(lightboxImg);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';
  overlay.appendChild(closeBtn);

  var zoomControls = document.createElement('div');
  zoomControls.className = 'lightbox-zoom-controls';

  var zoomOutBtn = document.createElement('button');
  zoomOutBtn.className = 'lightbox-zoom-btn';
  zoomOutBtn.setAttribute('aria-label', 'Zoom out');
  zoomOutBtn.innerHTML = '&minus;';

  var zoomLevelLabel = document.createElement('span');
  zoomLevelLabel.className = 'lightbox-zoom-level';

  var zoomInBtn = document.createElement('button');
  zoomInBtn.className = 'lightbox-zoom-btn';
  zoomInBtn.setAttribute('aria-label', 'Zoom in');
  zoomInBtn.innerHTML = '&plus;';

  zoomControls.appendChild(zoomOutBtn);
  zoomControls.appendChild(zoomLevelLabel);
  zoomControls.appendChild(zoomInBtn);
  overlay.appendChild(zoomControls);

  document.body.appendChild(overlay);

  var ZOOM_MIN = 1;
  var ZOOM_MAX = 4;
  var ZOOM_STEP = 0.5;
