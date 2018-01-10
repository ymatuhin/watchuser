import { clearString } from './helpers';

export default function() {
  const orientation =
    screen.orientation || screen.mozOrientation || screen.msOrientation;
  const info = { type: orientation.type, angle: orientation.angle };
  return `${this.type} ${clearString(info)}`;
}
