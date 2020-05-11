const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_NEWS':
            return {...state, loading: true};
        case 'NEWS_RECEIVED':
            return {...state, news: action.json[0], loading: false};
        case 'GET_DOCTORS':
            return {...state, loading: true};
        case 'DOCTORS_RECEIVED':
            return {...state, doctors: action.json, loading: false};
        case 'DOCTORS_RECEIVED_ERROR':
            return {...state, doctors: null, loading: false, error: action.error};
        case 'SUBMIT_APPOINTMENT':
            return {...state, loading: true};
        case 'SUBMIT_APPOINTMENT_ERROR':
            return {...state, loading: false, error: action.error, appointment: false};
        case 'SUBMIT_APPOINTMENT_RESULT':
            return {...state, appointment: action.json, loading: false};
        default:
            return state;
    }
};

export default reducer;
