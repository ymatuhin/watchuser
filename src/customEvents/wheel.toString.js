import { clearString } from './helpers';

export default function() {
  const { type, deltaX, deltaY, deltaZ } = this;
  const info = { deltaX, deltaY, deltaZ };
  return `${type} ${clearString(info)}`;
}
