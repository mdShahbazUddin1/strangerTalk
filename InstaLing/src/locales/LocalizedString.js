import LocalizedStrings from 'react-native-localization';

import en from './en';
import hi from './hi';
import ta from './ta';
import te from './te';
import kn from './kn';
import ml from './ml';
import mr from './mr';
import bn from './bn';

let strings = new LocalizedStrings({
  en: en,
  hi: hi,
  ta: ta,
  te: te,
  kn,
  ml,
  mr,
  bn,
});

export default strings;
