const URL = "http://moblaze.net/service_login/login";
 function LoginAPI(username,password) {
    return fetch(URL,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:username,
            password:password
        }),
    })
        .then(res => res.json())
        .then(resJSON => resJSON)
        .catch(err => err)

}
export default LoginAPI;