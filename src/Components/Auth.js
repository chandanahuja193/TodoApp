class Auth{

constructor() {
    this.Login = false;
}

login(cb){
    this.isLogin = true;
    cb();
}

logout(cb){
    this.isLogin = false;
    cb();
}

isLogin(){
    return this.Login;
}

}



export default new Auth()