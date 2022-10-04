import { auth } from './firebaseConfig';
import { saveData, uriToBlob, downloadImage } from './utility';
import Toast from "react-native-simple-toast"
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function signUp(User) {
  let success = true;
  let token;
  await auth.createUserWithEmailAndPassword(User.email, User.password)
    .then(async user => {
      token = user.user.uid
      // user.user.sendEmailVerification()
      await saveData('Users', user.user.uid, {
        id: user.user.uid,
        email: User.email,
        full_name: User.full_name,
        signup_stage: 1,
      }).then((result) => {
        if (result) {
          success = true
        }
      }).catch((error) => {
        success = false
      })
    })
    .catch(function (error) {
      success = false;
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        Toast.show(
          'The information provided does not match our records. Please try again',
        );
      } else if (error.code === 'auth/wrong-password') {
        Toast.show(
          "The password is invalid and does not match this user's password",
        );
      } else if (error.code === 'auth/unknown') {
        Toast.show(
          'A network error (such as timeout, interrupted connection or unreachable host) has occurred',
        );
      } else {
        Toast.show(error.message);
      }
    });
  return { success, token }
}
export async function userSignUp(email, password) {
  let userData = null;
  await auth.createUserWithEmailAndPassword(email, password).
    then(async (user) => {
      userData = user
    }).catch((error) => {
      Toast.show(error.code)


    })
  return userData
}
export async function signInWithEmail(email, password) {
  let success = true;
  let token;
  await auth.signInWithEmailAndPassword(email, password)
    .then(async user => {
      token = user.user.uid
      success = true
    })
    .catch(function (error) {
      success = false;
      console.log(error)
      if (error.code === 'auth/user-not-found') {
        Toast.show("The information provided does not match our records. Please try again");
      }
      else if (error.code === 'auth/wrong-password') {
        Toast.show("The password is invalid and does not match this user's password");
      }
      else if (error.code === 'auth/unknown') {
        Toast.show("A network error (such as timeout, interrupted connection or unreachable host) has occurred");
      }

      else {
        Toast.show(error.message)
      }
    });
  return { success, token }
}
export async function signInWithPhoneNumber(phoneNo, password) {
  let success = true;
  await auth.signInWithEmailAndPassword(phoneNo, password).catch(function (error) {
    success = false;
    alert(error.code + ': ' + error.message);
  });
  return success;
}
export async function getCurrentUserId() {
  var user = auth.currentUser;
  if (user != null) {
    return user.uid;
  }
}
export async function getCurrentUser() {
  return auth.currentUser;
}
export async function logout() {
  await auth.signOut()
    .then(() => { return true })
    .catch(error => { return false });
}