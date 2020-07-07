import React,{useEffect, Profiler} from 'react'
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import profileReducer from '../../reducers/profile';
import { createStore } from 'redux';
const DashBoard = ({createProfile, Profile:{profile, loading}}) => {
    console.log(profile)
    useEffect(() => {
        createProfile();   
    },[])
    return (
        
    <div>
        <h2>{profile.name}</h2>
    </div >
            
        
    )
}

const mapStateToProps = state => ({
    Profile:state.profile
})

export default connect(mapStateToProps,{createProfile})(DashBoard);