import { authConstants } from "../constants";
import { history } from "../helpers/history";
import { authService } from "../services";

export const authActions = {
  login,
  logout,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request(username));
    authService.login(username, password).then(response => {

        // localStorage.setItem("uid",response.data.associate_id);
        dispatch(success({user_name:response.data.associate_name,user_email:response.data.email,user_id:response.data.associate_id}));
        const isAdmin = response.data.isAdmin;
        const isManager = response.data.isManager;
        if(isAdmin && isManager ){
          history.push('/admin/adminhome');
        }else if(isAdmin){
          history.push('/adminhome');
        }else{
          history.push('/');
        }
       
    })
    .catch(error => {
        if(error.response){
            dispatch(failure(error.response.data.message || error.response.statusText));
        }
        else{
            dispatch(failure(error))
        }
    });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    console.log("Name from actions : "+user.user_name);
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return { type: authConstants.LOGOUT };
}
