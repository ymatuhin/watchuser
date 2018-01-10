import { clearString } from './helpers';

export default function() {
  const info = {
    text: this.clipboardData.getData('Text'),
  };

  return `${this.type} ${clearString(info)}`;
}
