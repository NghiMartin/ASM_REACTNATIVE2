import { Provider } from "react-redux";
import AppRouters from "./src/navigators/AppRouters";
import { store,persistor } from "./src/store/store";
import { NavigationContainer } from '@react-navigation/native';

import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor= {persistor}>
      <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </PersistGate>
      </Provider>
    </>

  )
}