export const stringKeys = (event: Event): string => {
  let str = '';
  if (event.metaKey) str += '[meta]';
  if (event.shiftKey) str += '[shift]';
  if (event.altKey) str += '[alt]';
  if (event.ctrlKey) str += '[ctrl]';
  return str || null;
};

export const getElement = (event: Event) => event.target || event.srcElement;

export const stringElement = (event: Event) => {
  const element = getElement(event);
  const isRoot =
    element === document ||
    element === document.documentElement ||
    element === document.body ||
    element === window;
  if (isRoot) return element.toString().replace('object ', '');

  const html = element.outerHTML || '';
  const noBreaks = html.replace(/\n/g, '');
  const noExtraSpaces = noBreaks.replace(/\s\s+/g, ' ');
  const noSpaceBetweenTags = noExtraSpaces.replace(/> </g, '><');
  const sliced = noSpaceBetweenTags.slice(0, 50) + '...';
  const finalHtml =
    noSpaceBetweenTags.length > 50 ? sliced : noSpaceBetweenTags;
  return finalHtml;
};

export const stringMouseButton = (event: Event): string => {
  if (event.button === 0) return 'left';
  if (event.button === 1) return 'middle';
  if (event.button === 2) return 'right';
  if (event.button === 3) return 'back';
  if (event.button === 4) return 'forward';
  return '';
};

const removeEmptyFields = (obj: Object): Object => {
  let newObj = {};
  Object.keys(obj).forEach(propName => {
    if (obj[propName] !== null && obj[propName] !== undefined)
      newObj[propName] = obj[propName];
  });
  return newObj;
};

export const clearString = (obj: Object): string => {
  const result = JSON.stringify(removeEmptyFields(obj))
    .replace(/"([^(")"]+)":/g, '$1:')
    .replace(/\\"/g, '"');

  return result === '{}' ? '' : result;
};
