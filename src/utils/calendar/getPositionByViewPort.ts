const getPositionByViewPort = (
  rect: Pick<DOMRect, 'left' | 'right' | 'top'>,
  size: Pick<DOMRect, 'width' | 'height'>,
  windowSize: Pick<Window, 'innerWidth' | 'innerHeight'>,
) => {
  const result = { top: 0, left: 0 };

  const { width, height } = size;
  const { left, right, top } = rect;

  const { innerWidth, innerHeight } = windowSize;

  if (right + width + 10 < innerWidth) {
    result.left = right + 10;
  } else if (left - width - 10 > 0) {
    result.left = left - width - 10;
  } else {
    result.left = 10;
  }

  const posTop = top - Math.floor(height / 2) + 10;

  if (posTop <= 0) {
    result.top = 10;
  } else if (posTop + height >= innerHeight) {
    result.top = innerHeight - height - 10;
  } else {
    result.top = posTop;
  }

  return result;
};

export { getPositionByViewPort };
