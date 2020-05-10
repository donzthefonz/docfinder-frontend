import {put, takeLatest, all} from 'redux-saga/effects';

function* fetchNews() {

    const json = yield fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
        .then(response => response.json());

    yield put({type: "NEWS_RECEIVED", json: json.articles || [{error: json.message}]});
}

function* fetchDoctors() {

    const json = yield fetch('http://127.0.0.1:5000/doctors')
        .then(response => response.json());

    yield put({type: "DOCTORS_RECEIVED", json: json.doctors || [{error: json.message}]});
}


function* submitAppointment() {

    const json = yield fetch('http://127.0.0.1:5000/doctors')
        .then(response => response.json());

    console.log(json.doctors);

    yield put({type: "DOCTORS_RECEIVED", json: json.doctors || [{error: json.message}]});
}

function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews);
    yield takeLatest('GET_DOCTORS', fetchDoctors);
}


export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
