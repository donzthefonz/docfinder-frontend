import React, {useState} from "react";
import {connect} from 'react-redux';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {Button, Card, CardBody, Col, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";
import Row from "reactstrap/es/Row";
import {getDoctors, submitAppointment} from '../actions';


const useAppointmentForm = (callback) => {
    const [inputs, setInputs] = useState({});
    // const handleSubmit = (event) => {
    //     if (event) {
    //         event.preventDefault();
    //         console.log('submit2...');
    //     }
    //     console.log('submit3...');
    //     callback();
    // };
    const handleInputChange = (event) => {
        event.persist();
        // console.log('INPUTS: ', inputs);
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };


    return {
        // handleSubmit,
        handleInputChange,
        inputs
    };
};


function MapComponent(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState(null);
    const [time, setTime] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modal, setModal] = useState(false);
    const [mapCenter, setMapCenter] = useState({lat: 55.865573, lng: -4.250728});
    const toggle = () => setModal(!modal);

    const {inputs, handleInputChange} = useAppointmentForm();

    function submitAppointmentForm() {
        console.log('submit...');
        console.log('inputs: ', inputs);
        console.log('name: ', inputs.Name);
        // let formObj = {
        //     name  : name,
        //     email : email,
        //     doctor: selectedDoctor,
        //     time  : time
        // };
        let formObj = {
            name: inputs.Name
        };
        console.log('formObj: ', formObj);
        console.log('props: ', props);
        props.submitAppointment(formObj);
    }

    function renderModal() {

        return (
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Book an Appointment with {selectedDoctor && selectedDoctor.name}
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <label>
                                Name:
                                <input type="text" name="Name" onChange={handleInputChange} value={inputs.name}
                                       required/>
                            </label>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={submitAppointmentForm}>Request Appointment</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    function openDoctorForm(doctor) {
        setSelectedDoctor(doctor);
        setModal(true);
    }

    // function handleSubmit() {
    //     return (
    //         <form onSubmit={this.handleSubmit}>
    //             <label>
    //                 Name:
    //                 <input type="text" value={this.state.value} onChange={this.handleChange}/>
    //             </label>
    //             <input type="submit" value="Submit"/>
    //         </form>
    //     );
    // }

    console.log('props', props);
    return (
        <div>

            {renderModal()}
            <GoogleMap
                defaultZoom={8}
                center={{lat: mapCenter.lat, lng: mapCenter.lng}}
            >

                {props.doctors && props.isMarkerShown && props.doctors.map(doctor => (
                    <Marker
                        key={doctor.id}
                        position={{
                            lat: parseFloat(doctor.lat),
                            lng: parseFloat(doctor.lng)
                        }}
                        onClick={() => {
                            openDoctorForm(doctor);
                        }}
                    />


                ))}
            </GoogleMap></div>);
}

const MapWrapper = withScriptjs(withGoogleMap((props) => {
    return MapComponent(props);
}));

const errorMessage = {
    color: 'red'
};

let Map = (state) => (
    <MapWrapper
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBl7lv6GpS081wLJXa3zIxNJlJyG3WsUrI"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `400px`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        doctors={state.doctors}
        submitAppointment={state.submitAppointment}
    />
);

// let Map = ({doctors}) => (
//     <MapWrapper
//         isMarkerShown
//         googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBl7lv6GpS081wLJXa3zIxNJlJyG3WsUrI"
// loadingElement={<div style={{height: `100%`}}/>} containerElement={<div style={{height: `400px`}}/>}
// mapElement={<div style={{height: `100%`}}/>} doctors={doctors} /> );

const mapStateToProps = (state) => ({
    doctors          : state.doctors,
    submitAppointment: state.submitAppointment
});

const mapDispatchToProps = {

    submitAppointment: submitAppointment,
};

Map = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Map);


export default Map;


