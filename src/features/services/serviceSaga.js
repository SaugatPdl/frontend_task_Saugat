import { call, put, takeEvery, all } from 'redux-saga/effects';
import { fetchServicesStart, fetchServicesSuccess, fetchServicesFailure } from './servicesSlice';

function* fetchServices() {
  try {
    const response = yield call(fetch, 'https://admin.naxa.com.np/api/services');
    const data = yield response.json();
    yield put(fetchServicesSuccess(data));
  } catch (error) {
    yield put(fetchServicesFailure(error.message));
  }
}

function* servicesSaga() {
  yield takeEvery(fetchServicesStart.type, fetchServices);
}

export default function* rootSaga() {
  yield all([
    servicesSaga()
  ]);
}
