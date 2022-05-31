import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FeedBacky } from '../.';

const App = () => {
  return (
    <div>
      <FeedBacky />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
