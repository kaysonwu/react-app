/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  intl: import('react-intl').IntlShape;
  route: import('history').History;
  // For state key
  [key: string]: any;
}
