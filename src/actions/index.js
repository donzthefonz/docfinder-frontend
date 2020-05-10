export const getNews = () => ({
  type: 'GET_NEWS',
});


export const getDoctors = () => ({
  type: 'GET_DOCTORS',
});

export const submitAppointment = (formObj) => ({
  type: 'SUBMIT_APPOINTMENT',
  input: formObj
});

