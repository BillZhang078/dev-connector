import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteExperience, deleteEducation } from '../../actions/profile';


const Experience = ({ profile, deleteExperience,deleteEducation }) => {
  const handelExpDelete = (e, id) => {
    deleteExperience(id);
  };
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            profile.experience.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p.company}</td>
                  <td className='hide-sm'>{p.title}</td>
                  <td>
                    <Moment format='YYYY/MM/DD'>{moment.utc(p.from)}</Moment> -{' '}
                    {p.to === null ? (
                      ' Now'
                    ) : (
                      <Moment format='YYYY/MM/DD'>{moment.utc(p.to)}</Moment>
                    )}
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={(e) => handelExpDelete(e, p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            profile.education.map(edu => {
              return <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className='hide-sm'>{edu.degree}</td>
                <td className='hide-sm'>
                  <Moment format='YYYY/MM/DD'>{moment.utc(edu.from)}</Moment> -{' '}
                    {edu.to === null ? (
                      ' Now'
                    ) : (
                      <Moment format='YYYY/MM/DD'>{edu.utc(edu.to)}</Moment>
                    )}
                </td>
              <td>
                <button className='btn btn-danger' onClick={()=> deleteEducation(edu._id) }>Delete</button>
              </td>
            </tr>
            })
           
          }
        </tbody>
      </table>

      <div className='my-2'>
        <button className='btn btn-danger'>
          <i className='fas fa-user-minus'></i>
          Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

// const mapStateToProps = state => ({
//     Profile: state.profile
// })

export default connect(null, { deleteExperience,deleteEducation })(Experience);
