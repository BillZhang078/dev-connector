import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postProfile, createProfile } from '../../actions/profile';


const EditProfile = ({ postProfile, Profile:{loading,profile} }) => {
  const [SocialDisplay, toggleSocialDisplay] = useState(false);
  const history = useHistory();
  const [profiles, setProfile] = useState({
    company: '',
    status: '',
    website: '',
    location: '',
    skills: '',
    bio: '',
    githubusername: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: '',
  });

  const {
    company,
    status,
    website,
    location,
    skills,
    bio,
    githubusername,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  } = profiles;

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handlePostProfile = async (e) => {
      e.preventDefault();
      postProfile(profiles,history);
  };
    
    useEffect(() => {
        createProfile();   
        setProfile({
            company: loading || !profile.company ? '' : profile.company,
            status: loading || !profile.status ? '' : profile.status,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            skills: loading || !profile.skills ? '' : profile.skills,
            bio: loading || !profile.bio ? '' : profile.bio,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            twitter: loading || !profile.twitter ? '' : profile.twitter,
            facebook: loading || !profile.facebook ? '' : profile.facebook,
            youtube: loading || !profile.youtube ? '' : profile.youtube,
            linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
            instagram:loading || !profile.instagram ? '' : profile.instagram
        })
        
    }, [])
    
    console.log(profiles);

  return (
    <div className='container'>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => handlePostProfile(e)}>
        <div className='form-group'>
          <select
            name='status'
            value={status}
            onChange={(e) => handleProfileChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => handleProfileChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => handleProfileChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => handleProfileChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => handleProfileChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={(e) => handleProfileChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => handleProfileChange(e)}></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialDisplay(!SocialDisplay)}
            onChange={(e) => handleProfileChange(e)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {SocialDisplay && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => handleProfileChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => handleProfileChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => handleProfileChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => handleProfileChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => handleProfileChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
    Profile:state.profile
})

export default connect(mapStateToProps, { postProfile,createProfile })(EditProfile);
