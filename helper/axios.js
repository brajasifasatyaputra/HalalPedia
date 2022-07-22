import axios from 'axios';
 

export const BASE_URL = "https://apis.scproperty.id/api"
// export const BASE_URL = "http://127.0.0.1:8000/api"
export const logoutEvent = () => {
  if(typeof window === 'undefined') return;
  window.location.href = "/logout";
}

export const NET = async (tipe, url, data, token, pin, isMultipart, isStream) => {
  
  tipe = (tipe||"GET")
  url = (url||"")
  data = (data||{})
  token = (token||"")
  pin = (pin||"")
  isMultipart = (isMultipart||false)
  isStream = (isStream||false)

  let objectResponse = {
    status : true,
    data : {}
  }

  try {
    const res = await axios({
      method : tipe,      
      url : (BASE_URL+url),      
      data,
      responseType : (isStream)?"stream":"json",
      headers : {
        'Content-Type' : (isMultipart)?"multipart/form-data":"application/json",
        'Authorization-pin' : pin,
        'Authorization' : `Bearer ${token}`,        
      }      
    }) 
    objectResponse.status = true
    objectResponse.data = res?.data     
  } 
  
  catch (error) {   
    if(/401/ig.test(error)){
      logoutEvent();    
    }
    objectResponse.status = false
    objectResponse.data = error?.response?.data    
  }

  return objectResponse

}
export const GET = async (url, data, token, pin,isStream) => {
  
  url = (url||"");
  pin = (pin||"");
  data = (data||{});
  token = (token||"");
  isStream = (isStream||false);

  try {
    const res = await axios({
      method:"GET",
      data,
      url:BASE_URL+url,
      responseType: (isStream)?"stream":"json",
      headers : {
        'Content-Type' : 'application/json',
        'Authorization-pin' : pin,
        Authorization: `Bearer ${token}`,        
      }
    });    
    return res?.data;
  } catch (error) {    
    if(/401/ig.test(error.message)){      
      logoutEvent();    
    }
    return
  }

}

export const POST = async (url, data, token, pin, multipart) => {
  
  url = (url||"");
  pin = (pin||"");
  data = (data||{});
  token = (token||"");
  multipart = (multipart||false);

  try {
    const res = await axios({
      method:"POST",
      data,
      url:BASE_URL+url,
      headers : {
        'Content-Type' : (multipart)?"multipart/form-data":'application/json',
        'Authorization-pin' : pin,
        Authorization: `Bearer ${token}`,        
      }
    });
    return res?.data;
  } catch (error) {
    if(/401/ig.test(error.message)){
      logoutEvent();    
    }
    return
  }

}
export const POST2 = async (url, data, token, pin, multipart) => {
  
  url = (url||"");
  pin = (pin||"");
  data = (data||{});
  token = (token||"");
  multipart = (multipart||false);

  let objReturn = {}

  try {
    const res = await axios({
      method:"POST",
      data,
      url:BASE_URL+url,
      headers : {
        'Content-Type' : (multipart)?"multipart/form-data":'application/json',
        'Authorization-pin' : pin,
        Authorization: `Bearer ${token}`,        
      }
    });
    objReturn.status = true
    objReturn.data = res?.data
    return objReturn    
  } catch (error) {
    if(/401/ig.test(error.message)){
      logoutEvent();    
    }
    objReturn.status = false
    objReturn.data = error?.response?.data
    return objReturn        
  }

}
export const PUT = async (url, data, token, pin) => {
  
  url = (url||"");
  pin = (pin||"");
  data = (data||{});
  token = (token||"");

  try {
    const res = await axios({
      method:"PUT",
      data,
      url:BASE_URL+url,
      headers : {
        'Content-Type' : 'application/json',
        'Authorization-pin' : pin,
        Authorization: `Bearer ${token}`,        
      }
    });
    return res?.data;
  } catch (error) {
    if(/401/ig.test(error.message)){
      logoutEvent();    
    }
    return
  }

}

export const DELETE = async (url, data, token, pin) => {
  
  url = (url||"");
  pin = (pin||"");
  data = (data||{});
  token = (token||"");

  try {
    const res = await axios({
      method:"DELETE",
      data,
      url:BASE_URL+url,
      headers : {
        'Content-Type' : 'application/json',
        'Authorization-pin' : pin,
        Authorization: `Bearer ${token}`,        
      }
    });
    return res?.data;
  } catch (error) {
    if(/401/ig.test(error.message)){
      logoutEvent();    
    }
    return
  }

}
