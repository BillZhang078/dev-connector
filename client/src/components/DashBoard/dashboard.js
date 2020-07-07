import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import profileReducer from '../../reducers/profile';
import { createStore } from 'redux';
const DashBoard = ({createProfile, profile:{profile, loading}}) => {

    useEffect(() => {
        createProfile();   
    },[])
    return (
        <div>
            <h2>DashBoard</h2>
        </div>
    )
}

const mapStateToProps = state => ({
    profile:state.profile
})

export default connect(mapStateToProps,{createProfile})(DashBoard);