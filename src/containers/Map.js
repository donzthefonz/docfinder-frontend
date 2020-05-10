import React, {useState} from "react";
import {connect} from 'react-redux';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {Button, Card, CardBody, Col, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";
import Row from "reactstrap/es/Row";


function MapComponent(props) {

    const [formInfo, setFormInfo] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modal, setModal] = useState(false);
    const [mapCenter, setMapCenter] = useState({lat: 55.865573, lng: -4.250728});
    const toggle = () => setModal(!modal);

    function renderModal() {
        return (
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <h1 className="text-center">
                            Book an Appointment with {selectedDoctor && selectedDoctor.name}
                        </h1>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={formInfo && formInfo.name} onChange={setFormInfo}/>
                            </label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Request Appointment</Button>{' '}
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

    function handleSubmit() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }


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

let Map = ({doctors}) => (
    <MapWrapper
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBl7lv6GpS081wLJXa3zIxNJlJyG3WsUrI"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `400px`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        doctors={doctors}
    />
);

const mapStateToProps = (state) => ({
    doctors: state.doctors,
});

Map = connect(
    mapStateToProps,
    null
)(Map);


export default Map;


