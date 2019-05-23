import React from 'react';
import Helmet from 'react-helmet';
import Top from './Top';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>MyQuiz App</title>
        <meta name="description" content="CodeGritのReactコースレッスン10のために作られたクイズアプリです。" />
      </Helmet>
      <Top />
    </div>
  );
}

export default App;
