import LoginAPI from './api/LoginAPI';
import {START_FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR, SAVE_TOKEN} from './Type';
import {AsyncStorage} from "react-native";

export function StatrtFetchRequest(isloading) {
    return {type: "START_FETCH_REQUEST", isloading: isloading};
}

export function FetchSuccess(user) {
    return {type: "FETCH_SUCCESS", user};
}

export function FetchError(error) {
    return {type: "FETCH_ERROR", error: error};
}

export function LoginUser(username, password, navigateTo) {
    let alph = /^[a-zA-Z]+[@]+[a-z]+[.]+[a-z]+$/;
    isChecked = true;
    if (!username) return dispatch => dispatch(FetchError("please enter username"));
    if (!password) return dispatch => dispatch(FetchError("please enter password"));
    if (alph.test(username) === false) return dispatch => dispatch(FetchError("Email is Not Correct"));
    if (password.length < 8) return dispatch => dispatch(FetchError("Passwords must be at least 8 characters long"));
    return dispatch => {
        dispatch(StatrtFetchRequest(true));
        LoginAPI(username, password)
            .then((data) => {
                user = data[0];
                token = user.data[0].token;
                message = data[1].response.message;
                if (message == "Login Success") {
                    dispatch(FetchSuccess(user), navigateTo("Home"));
                    AsyncStorage.multiSet([["token",token],["username",username],["password",password],["check",JSON.stringify(isChecked)]]);
                }
            })
            .catch(error => dispatch(FetchError(error)))
    }
}

getData = async () => {
    AsyncStorage.multiGet(['username', 'password','check','token']).then((data) => {
       username = data[0][1];
       password = data[1][1];
       check    = data[2][1];
       token    = data[3][1];
       return {username,password,check,token};
    });
}

export function LoginToken(navigateTo) {

    return dispatch => {
        dispatch(StatrtFetchRequest(true));
        getData()
            .then(token => {
                if (token != null) {
                    setTimeout(() => {
                        navigateTo("Home");
                        dispatch(StatrtFetchRequest(false));
                    }, 1000);
                } else {
                    dispatch(StatrtFetchRequest(false));
                }
            })
            .catch(err => console.log(err));
    }
}

export function RemoveToken(navigateTo) {
    return dispatch => {
        dispatch(StatrtFetchRequest(true));
        AsyncStorage.removeItem("token");
        setTimeout(() => {
            navigateTo("Login");
            dispatch(StatrtFetchRequest(false));
        }, 1000);
    }

}
