import React from 'react';
import {connect} from 'react-redux';
import {getDoctors} from '../actions';
import Map from "./Map";

let styles = {
    backgroundColor: 'HotPink',
    width          : '250px',
    height         : '100px',
    borderRadius   : '100px',
    display        : 'block',
    margin         : '50px auto',
    fontSize       : '25px',
    border         : '3px solid '
};

class DoctorButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
    }

    render() {
        return (
            <div>
                <button style={!this.state.hover ? styles : {...styles, backgroundColor: 'DarkTurquoise '}}
                        onMouseOut={() => {
                            this.setState({hover: false});
                        }}
                        onMouseOver={() => {
                            this.setState({hover: true});
                        }}
                        onClick={this.props.getDoctors}
                >Press to find a doctor.
                </button>
                <Map/>
            </div>

        );
    }

};

const mapStateToProps = (state) => ({
    appointment: state.appointment
});

const mapDispatchToProps = {
    getDoctors: getDoctors,
};

DoctorButton = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DoctorButton);

export default DoctorButton;
