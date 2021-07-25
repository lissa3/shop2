import authAPI from '@/api/auth'




export const mutationTypes = {
  CLEAR_CREDS:'[auth] CLEAR_CREDS',
  PASS_EMAIL_POTENTIAL_USER:'[auth] PASS_EMAIL_POTENTIAL_USER',
  REGISTER_FAILURE:'[auth] REGISTER_FAILURE',
  SET_ACCESS_TOKEN:'[auth] SET_ACCESS_TOKEN',
  SET_CONFIRM:'[auth] SET_CONFIRM',
  SET_LOG_IN:'[auth] SET_LOG_IN',
  SET_LOGIN_SUCCESS:'[auth] SET_LOGIN_SUCCESS',
  SET_LOGIN_FAILURE:'[auth] SET_LOGIN_FAILURE',
  SET_REFRESH_TOKEN:'[auth] SET_REFRESH_TOKEN',
  SET_USER:'[auth] SET_USER',
  // current user
  SET_CURRENT_USER:'[auth] GET_CURRENT_USER_START',
  GET_CURRENT_USER_SUCCESS:'[auth] GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE:'[auth] GET_CURRENT_USER_FAILURE',
  // reset forgotten password
  SET_EMAIL_CONFIRM_PSW_RESET_FAILURE:'[auth] SET_EMAIL_CONFIRM_PSW_RESET_FAILURE',
  EMAIL_EXIST_PSW_RESET:'[auth] EMAIL_EXIST_PSW_RESET',
  START_CONFIRM_PSW_RESET:'[auth] START_CONFIRM_PSW_RESET',

  RESET_NEW_PSW_SUCCESS:'[auth] RESET_NEW_PSW_SUCCESS',
  RESET_NEW_PSW_FAILURE:'[auth] RESET_NEW_PSW_FAILURE',
  // network-problem
  NETWORK_PROBELM:'[auth] NETWORK_PROBELM',
  STATUS_500:'[auth] STATUS 500 SERVER ERROR',
  INCORRECT_PSW:'[auth] INCORRECT_PSW'

}
export const actionTypes = {
  register:'[auth] register',
  activate:'[auth] activate',
  login:'[auth] login',
  getUser:'[auth] getUser',
  signOut:'[auth] signOut',
  confirmEmailForgottenPsw:'[auth] confirmEmailForgottenPsw',
  setNewPswAfterForget:'[auth] setNewPswAfterForget',
  setNewPswAChange:'[auth] setNewPswAChange'
}
export const getterTypes = {
  currentUser:'[auth] currentUser',
  isLoggedIn:'[auth] isLoggedIn',
  isAnonymous:'[auth] isAnonymous'
}

const state ={
  accessToken:null,
  refreshToken:null,
  confirmation:false,
  googleAuthSuccess:null,
  googleAuthFail:null,
  // waiting for current user info
  isLoading:false,
  // result of login  
  loginFailure:false,
  loginSuccess:false,
  isLogIn:null, // null,false,true,  
  signUpFailure:false,
  showEmailCheck:'',
  // confirmation sent to email after signUp
  user:null,
  userId:null,
  // reset psw instead of forgotten
  confirmResetPsw:false,
  emailPswResetFailure:false,
  resetPswSuccess:false,
  pswResetFailure:false,
  netWorkErr:false,
  status500:false,
  incorrectEmail:false

}
const getters = {
  [getterTypes.currentUser]:state=>{
    return state.user||JSON.parse(localStorage.getItem('user'))
  },
  [getterTypes.isLoggedIn]:state=>{
    // scheiden false|null
    // console.log("getter isLoggedIn",Boolean(state.isLogIn))
    return Boolean(state.isLogIn)
  },
  [getterTypes.isAnonymous]:state=>{
    // scheiden false|null
    // console.log("getter isAnonym",state.isLogIn===null)
    return state.isLogIn === null
  }
}
const mutations = {
  [mutationTypes.CLEAR_CREDS](state){
    state.isLogIn=false
    state.accessToken=null
    state.refreshToken=null
    state.user =null
    state.isLogIn = false
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    
  },
  [mutationTypes.PASS_EMAIL_POTENTIAL_USER](state,email) {
    // console.log("inside mutation PASS EMAIL POT USER with email",email)
    state.showEmailCheck=email;
  },
  [ mutationTypes.REGISTER_FAILURE](state){
    state.signUpFailure = true;
  },
  [mutationTypes.SET_ACCESS_TOKEN](state,access){
    localStorage.setItem("accessToken",access)
    state.accessToken = access
  },
  [mutationTypes.SET_CONFIRM](state){
    state.confirmation = true
  },
  [mutationTypes.SET_LOG_IN](state){
    state.isLogIn = true
  },
  [mutationTypes.SET_LOGIN_SUCCESS](state){
    state.loginSuccess = true
  },
  [mutationTypes.SET_LOGIN_FAILURE](state){
    state.loginFailure = true
  },  
  
  [mutationTypes.SET_REFRESH_TOKEN](state,refresh){
    localStorage.setItem("refreshToken",refresh)
    state.refreshToken = refresh
  },
  [mutationTypes.GET_CURRENT_USER_START](state){
    state.isLoading = true
  },
  [mutationTypes.SET_CURRENT_USER](state,payload){
    state.isLoading = false    
    state.user = payload
    state.userId = payload.id    
    localStorage.setItem("user",JSON.stringify(payload))
  },
  [mutationTypes.GET_CURRENT_USER_FAILURE](state){
    state.isLoading = false,
    state.isLogIn = null,
    state.currentUser = null
  },
  [mutationTypes.START_CONFIRM_PSW_RESET](state){
    state.isLoading = true    
  },
  [mutationTypes.EMAIL_EXIST_PSW_RESET](state,email){
    state.isLoading = false
    state.showEmail = email
  },
  [mutationTypes.SET_EMAIL_CONFIRM_PSW_RESET_FAILURE](state,email){
    state.emailPswResetFailure = true
    state.showEmail = email,
    state.isLoading=false
  },
  [mutationTypes.NETWORK_PROBELM](state){
    state.netWorkErr = true    
    state.isLoading=false
  },
  [mutationTypes.STATUS_500](state){
    state.status500 = true    
    state.isLoading=false
  },
  [mutationTypes.INCORRECT_PSW](state){
    state.incorrectEmail = true    
    state.isLoading=false
  },
  [mutationTypes.RESET_NEW_PSW_SUCCESS](state){
    state.isLoading = false
    state.resetPswSuccess = true
    
  },
  [mutationTypes.RESET_NEW_PSW_FAILURE](state){
    state.pswResetFailure = true    
    state.isLoading=false    
  }
  
}
const actions = {
    async [actionTypes.register]({commit},creds){
        console.log("store dispatching with creds",creds)
        let servResp = {
            status:"",
            firstNameErr:[],
            lastNameErr:[],
            emailErr:[],
            pswErr:[],
            nonFieldErr:[],
            netWorkErr:[]
            };      
        const resp = await authAPI.register(creds)        
          console.log("response is",resp) //.config,.data (f_name,l_name,email),status=201
          servResp.status = resp.status;
          console.log('in store action register status is:',resp.status)
          servResp.email = resp.data.email;     
          commit(mutationTypes.PASS_EMAIL_POTENTIAL_USER,resp.data.email);          
          // let op:status is already above, but email is creaded here
          return resp            
  },
  [actionTypes.activate]({commit},creds){
    // endpoint will return only: response status=204, no data
    return new Promise((resolve,reject)=>{
      let status = ""
      authAPI.activate(creds)
      .then((resp)=>{
        // dj server response == 204        
        commit(mutationTypes.SET_CONFIRM);
        console.log("msg from store: email confirmed")
        status = resp.status
        resolve(status)
      })
      .catch((err)=>{
        console.log("err during email confirmation");
        status = err.response.status;
        commit('REGISTER_FAILURE')
        reject(status)
      })

    })
  },
  async [actionTypes.login]({commit},creds){
    console.log("msg from store... func login")
    try{
    const resp = await authAPI.login(creds)         
        // console.log("got from server",resp) 
        if(resp.status ===200){   
          console.log("making mutaions in store")     
          commit(mutationTypes.SET_LOGIN_SUCCESS)  
          commit(mutationTypes.SET_ACCESS_TOKEN,resp.data.access)
          commit(mutationTypes.SET_REFRESH_TOKEN,resp.data.refresh)
        }
        console.log("passing resp to component",resp)
        console.log("calling for getUser for info")
        // call for user data (user = {id,first_name,last_name,email})
            
        return resp
    }  catch(err){
        // console.log("store passes this error to component:",err)           
        commit('SET_LOGIN_FAILURE')
        localStorage.clear()
        // console.log("login failed and Local storage is cleaned")        
        return err
      }
    
  },
  
  async [actionTypes.getUser]({commit}){    
    // data from djoser:userId,
    console.log("inside getUser")   
    try{
      // commit(mutationTypes.GET_CURRENT_USER_START)   
      const resp= await authAPI.getUser()
      if(resp.status === 200){          
        let user = resp.data             
        commit(mutationTypes.SET_CURRENT_USER,user)
        commit(mutationTypes.SET_LOG_IN) 
        commit(mutationTypes.SET_LOGIN_SUCCESS) 
        return resp      
        }
      }
      catch(err){
        commit(mutationTypes.GET_CURRENT_USER_FAILURE)
        localStorage.clear()
      }
    },
    
    [actionTypes.signOut]({commit}){
      console.log("store starts sign out")
      commit(mutationTypes.CLEAR_CREDS)
      console.log("local storage is clear")
    },
    async [actionTypes.confirmEmailForgottenPsw]({commit},creds){   
      // Sally2020#
      commit(mutationTypes.START_CONFIRM_PSW_RESET) 
      const servResp = {}    
      try{
        let email = {"email":creds.email}
        // console.log("to server email",creds)         
        const resp = await authAPI.confirmEmailPswForget(email)
        console.log("resp in auth.js",resp) 
        commit(mutationTypes.EMAIL_EXIST_PSW_RESET,email)
        /* if email exists in db=> resp.status=204,data="" statusText="No content" */     
        return resp 
  
      }catch(err){
        console.log("where are my mutations?")
        // commit(mutationTypes.PASS_EMAIL_POTENTIAL_USER,null)
        commit(mutationTypes.SET_EMAIL_CONFIRM_PSW_RESET_FAILURE,creds.email)
        if(err.response === undefined){
          commit(mutationTypes.NETWORK_ERROR)
          // console.log("err resp",err.response)
          servResp.servDown = true
        }
        else{
          commit(mutationTypes.INCORRECT_PSW)
          servResp.status = err.response.status        
          servResp.currentPsw = err.response.data.email,
          servResp.nonFieldErr = err.response.data.non_field_errors
        }
        localStorage.clear()
        return servResp
      }
  
    },
    async [actionTypes.setNewPswAfterForget]({commit},creds){
      // Sally2020#
      commit(mutationTypes.START_CONFIRM_PSW_RESET) 
      const payload = {
        "new_password":creds.psw,
        "re_new_password":creds.psw2,
        "uid":creds.uid,
        "token":creds.token,
      };    
      try{
        const resp = await authAPI.requestNewPsw(payload)
            
        commit(mutationTypes.RESET_NEW_PSW_SUCCESS)
        console.log("resp success after forget",resp) 
        return resp
         
      }catch(err){
        commit(mutationTypes.RESET_NEW_PSW_FAILURE)
        console.log("my arrorz:",err)
        
      }
    },
    //requestChangePsw
  async [actionTypes.setNewPswAChange]({commit},creds){
    // Sally2020#
    // console.log("line 300 with creds",creds)
    commit(mutationTypes.START_CONFIRM_PSW_RESET)
    const servResp = {}      
    const payload = {
        "new_password":creds.newPsw,
        "re_new_password":creds.newPsw2,
        "current_password":creds.currentPsw           
    }   
    try{      
      // console.log("payload is",payload) 
      const resp = await authAPI.requestChangePsw(payload)               
      commit(mutationTypes.RESET_NEW_PSW_SUCCESS)      
      // console.log("status is",resp.status) 
      servResp.status = resp.status
      // console.log("resp park:",servResp)
      return servResp
       
    }catch(err){
      commit(mutationTypes.RESET_NEW_PSW_FAILURE)
      // console.log("store auth.js err",Object.keys(err))
      console.dir(err)
      if(err.response === undefined){
        console.log("err resp",err.response)
        servResp.servDown = true

      }else{
        servResp.status = err.response.status
        servResp.newPsw =err.response.data.new_password,
        servResp.newPsw2 = err.response.data.re_new_password,
        servResp.currentPsw = err.response.data.current_password,
        servResp.nonFieldErr = err.response.data.non_field_errors
      }
      console.log("from store err obj",servResp)
      return servResp
      
    }
  },
  
} 

export default {
  state,
  getters,  
  mutations,
  actions
  
}