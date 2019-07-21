import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { editUserInfo } from '../../store/actions/editActions';
import { Redirect } from 'react-router-dom';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            oldPassword: '',
            newPassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        if(nextProps.auth &&
            Object.keys(nextProps.auth).length &&
            nextProps.currentUser &&
            Object.keys(nextProps.currentUser).length) {
                this.setState({
                    firstName: nextProps.currentUser.firstName,
                    lastName: nextProps.currentUser.lastName,
                    email: nextProps.auth.email,
                    newPassword: nextProps.currentUser.newPassword,
                    oldPassword: nextProps.currentUser.oldPassword
                });
            }
    }
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.editUserInfo(this.state);
    }

    render() {
        const {currentUser, auth, profile} = this.props;
        if(profile && profile.contentEdited) return <Redirect to='/' />
        
        if(currentUser && auth.uid) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="input-field">
                            <label htmlFor="firstName">First Name: </label>
                            <br/>
                            <input type="text" id="firstName" onChange={this.handleChange} value={this.state.firstName} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name: </label>
                            <br/>
                            <input type="text" id="lastName" onChange={this.handleChange} value={this.state.lastName} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email: </label>
                            <br/>
                            <input type="email" id="email" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="oldPassword">Old Password:</label>
                            <input type="password" id="oldPassword" onChange={this.handleChange} value={this.state.password}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="newPassword">New Password:</label>
                            <input type="password" id="newPassword" onChange={this.handleChange} value={this.state.password}/>
                        </div>
                        <div className="input-field">
                            <input type="submit" value="Edit" />
                        </div>
                    </div>
                </form>
             );
        } else {
            return <div className="center">Loading data...</div>
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    if(state.firestore.data.users) {
        const auth = state.firebase.auth;
        const currentUser = state.firestore.data.users[auth.uid];
        return {
            auth,
            currentUser,
            profile: state.profile
        }
    } else {
        return {
            auth: {},
            currentUser: {}
        }
    }
  }

  const mapDispatchToProps = (dispatch) => {
      return {
          editUserInfo: (creds) => dispatch(editUserInfo(creds))
      }
  }
 
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{
        collection: 'users'
    }])
)(ProfileDetails);