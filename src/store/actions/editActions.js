export const editUserInfo = (userInfo) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;


        const changePassword = async ({oldPassword, newPassword}) => {
            const user = firebase.auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(
                user.email,
                oldPassword
            );
            user.reauthenticateAndRetrieveDataWithCredential(cred)
                .then(creds => {
                    user.updatePassword(newPassword).then(()=>{
                        firestore.collection('users').doc(uid).set({
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            email: userInfo.email
                          }).then(() => {
                              firestore.collection('projects').where('authorId', '==', uid)
                              .get()  
                              .then(querySnapshot => {
                                    querySnapshot.forEach(doc => {
                                        console.log(doc.id, ' => ', doc.data());
                                        firestore.collection('projects').doc(doc.id).update({
                                            authorFirstName: userInfo.firstName,
                                            authorLastName: userInfo.lastName,
                                        }).then(() => {
                                              dispatch({type: 'PROFILE_EDIT_SUCCESS'});
                                            })
                                        })
                                    console.warn('users collection updated!')
                                }).catch(err=> console.error(err));
                            }).catch((err) => {
                                dispatch({type: 'PROFILE_EDIT_ERROR', err});
                            })
                        });
                    }).catch(err => {
                        console.error(err);
                        dispatch({type: 'PROFILE_EDIT_ERROR', err});
                });
        }


        changePassword(userInfo);
    }
  }
