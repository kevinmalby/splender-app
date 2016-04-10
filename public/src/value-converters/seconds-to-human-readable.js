import * as juration from 'juration';

export class SecondsToHumanReadableValueConverter {
  toView(value) {
    return juration.stringify(value, { format: 'long' });
  }
}