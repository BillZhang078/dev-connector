import React, { Fragment,useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { createProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import Edit from '../layouts/edit'

const DashBoard = ({ createProfile, Profile: { profile, loading }, user }) => {
  console.log(profile);
  useEffect(() => {
    createProfile();
  }, []);
    return (
    <Fragment>
            {loading && profile === null ?
                <Spinner />
                :
                <div>
                    <h1 className='large text-primary'>DashBoard</h1>
                    <p className='lead'>
                        <i className='fas fa-user'></i>Welcome {user.name}
                    </p>
                </div>
            }
            {profile === null ? <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/createProfile" className="btn btn-primary my-1">
                    Create Profile
        </Link>
            </Fragment> : <Edit/>
            }
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  Profile: state.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, { createProfile })(DashBoard);
