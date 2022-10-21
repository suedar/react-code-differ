/*** examples/src/index.js ***/
import React from 'react';
import { render} from 'react-dom';
import MyComponent from '../../src/App';
const App = () => (
    <MyComponent />
);
render(<App />, document.getElementById("root"));
