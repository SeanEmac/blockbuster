import '@testing-library/jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16';
import React from "react" 
React.useLayoutEffect = React.useEffect 
import { configure } from 'enzyme';
import 'core-js';

configure({ adapter: new Adapter() });
