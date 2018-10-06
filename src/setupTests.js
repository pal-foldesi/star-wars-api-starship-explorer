import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true //Keeping shallow shallow! https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#lifecycle-methods
});