import * as juration from 'juration';

export class SecondsToHumanReadableValueConverter {
  toView(value, format) {
    if (value)
      return juration.stringify(value, { format: format });
    else
      return value;
  }
}