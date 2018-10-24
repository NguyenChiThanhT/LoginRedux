import {START_FETCH_REQUEST,FETCH_SUCCESS,FETCH_ERROR} from '../Type'
const defaultState = {
    user:[],
    isLoading:false,
    error:null,
    token:null,
    username:null,
    password:null
}
const reducer = (state=defaultState,action) =>{
        switch (action.type) {
            case "START_FETCH_REQUEST":
                 return {...state,isLoading:action.isloading};
            case "FETCH_SUCCESS":
                return {...state,user:action.user,isLoading:false};
            case "FETCH_ERROR":
                return {...state,error:action.error,isLoading:false};
            case "RememberAccount":
                return {...state,username:action.username,password:action.password};
            default:
                    return state;
        }
}

export default reducer;