import { isNode } from '../env';
import { clearString } from './helpers';

export default function() {
  if (isNode) return {};

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const info = {
    width,
    height,
  };

  return `${this.type} ${clearString(info)}`;
}
