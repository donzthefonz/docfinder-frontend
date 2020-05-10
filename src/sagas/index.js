import {put, takeLatest, call, all} from 'redux-saga/effects';
import axios from "axios";
import querystring from 'querystring';

const apiUrl = 'http://localhost:5000/';

function* fetchNews() {

    const json = yield fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
        .then(response => response.json());

    yield put({type: "NEWS_RECEIVED", json: json.articles || [{error: json.message}]});
}

function* fetchDoctors() {

    const json = yield fetch(apiUrl + 'doctors')
        .then(response => response.json());

    yield put({type: "DOCTORS_RECEIVED", json: json.doctors || [{error: json.message}]});
}


const submitAppointment = (input) => {
    console.log('submitAppointment saga: ', input);
    let url = apiUrl + "appointment";
    let form = {
        'email' : input.email,
        'name'  : input['name'],
        'doctor': input.doctor.name,
        'time'  : input.time,
    };
    return axios
        .post(url, querystring.stringify(form))
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

const appointment = function* ({input}) {
    try {
        console.log('appointment saga: ', input);
        const response = yield call(submitAppointment, input);
        console.log("RESPONSE", response);

        yield put({type: "SUBMIT_APPOINTMENT_RESULT", appointment: response.data});

    }
    catch (err) {
        console.log("ERROR");
        console.log(err);
        yield put({type: "SUBMIT_APPOINTMENT_RESULT", appointment: false});
    }
};


function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews);
    yield takeLatest('GET_DOCTORS', fetchDoctors);
    yield takeLatest('SUBMIT_APPOINTMENT', appointment);
}


export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
