import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/index';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
