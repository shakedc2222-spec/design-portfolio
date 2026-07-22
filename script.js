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
  var zoomLevel = 1;
  var panX = 0;
  var panY = 0;
  var isDragging = false;
  var dragStartX = 0;
  var dragStartY = 0;
  var dragOriginX = 0;
  var dragOriginY = 0;

  function updateTransform() {
    lightboxImg.style.transform = 'scale(' + zoomLevel + ') translate(' + panX + 'px, ' + panY + 'px)';
    zoomLevelLabel.textContent = Math.round(zoomLevel * 100) + '%';
    zoomOutBtn.disabled = zoomLevel <= ZOOM_MIN;
    zoomInBtn.disabled = zoomLevel >= ZOOM_MAX;
    imageWrap.classList.toggle('zoomed', zoomLevel > ZOOM_MIN);
  }

  function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    updateTransform();
  }

  function setZoom(newLevel) {
    zoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, newLevel));
    if (zoomLevel === ZOOM_MIN) {
      panX = 0;
      panY = 0;
    }
    updateTransform();
  }

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    resetZoom();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    resetZoom();
  }

  document.querySelectorAll('.project-img').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === '+' || e.key === '=') setZoom(zoomLevel + ZOOM_STEP);
    if (e.key === '-' || e.key === '_') setZoom(zoomLevel - ZOOM_STEP);
  });

  zoomInBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setZoom(zoomLevel + ZOOM_STEP);
  });

  zoomOutBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setZoom(zoomLevel - ZOOM_STEP);
  });

  lightboxImg.addEventListener('wheel', function (e) {
    e.preventDefault();
    setZoom(zoomLevel + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
  }, { passive: false });

  lightboxImg.addEventListener('pointerdown', function (e) {
    if (zoomLevel <= ZOOM_MIN) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragOriginX = panX;
    dragOriginY = panY;
    lightboxImg.setPointerCapture(e.pointerId);
    imageWrap.classList.add('dragging');
  });

  lightboxImg.addEventListener('pointermove', function (e) {
    if (!isDragging) return;
    panX = dragOriginX + (e.clientX - dragStartX) / zoomLevel;
    panY = dragOriginY + (e.clientY - dragStartY) / zoomLevel;
    updateTransform();
  });

  function endDrag() {
    isDragging = false;
    imageWrap.classList.remove('dragging');
  }

  lightboxImg.addEventListener('pointerup', endDrag);
  lightboxImg.addEventListener('pointercancel', endDrag);
});
