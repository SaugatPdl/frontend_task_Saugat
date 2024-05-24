import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import servicesReducer from '../features/services/servicesSlice';
import rootSaga from '../features/services/serviceSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    services: servicesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
