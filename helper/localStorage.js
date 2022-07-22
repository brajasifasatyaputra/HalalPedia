export const setSuggestChrome = (kondisi) => {
  if(kondisi == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("sugestChromerScProperti", kondisi);
}
export const getSuggestChromer = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("sugestChromerScProperti");
}
export const setToken = (token) => {
  if(token == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("tokenUserProperti", token);
}
export const setTokenFirebase = (token) => {
  if(token == null) return false;
  if(typeof window === "undefined") return false;
  localStorage.setItem("tokenFirebaseScproperti", token) 
  return true
}
export const setCIDTagihan = (id) => {
  if(id == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("cidTagihanScProperti", id);
}
export const getCIDTagihan = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("cidTagihanScProperti");
}
export const setNonAuth = (data) => {
  if(data == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("nonAuthScProperti", data);
}
export const getNonAuth= () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("nonAuthScProperti");
}
export const setPayment = (data) => {
  if(data == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("noPayment", data);
}
export const getPayment= () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("noPayment");
}
export const setIDTagihan = (id) => {
  if(id == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("idTagihanScProperti", id);
}
export const getIDTagihan = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("idTagihanScProperti");
}
export const getTokenFirebase = () => {
  if(typeof window === "undefined") return null;
  return localStorage.getItem("tokenFirebaseScproperti")
}
export const setEmailUserLogin = (email) => {
  if(email == null) return null
  if(typeof window === "undefined") return null
  localStorage.setItem("emailUserLoginProperti", email)
}
export const getEmailUserLogin = () => {
  if(typeof window === "undefined") return null
  return localStorage.getItem("emailUserLoginProperti")
}
export const getToken = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("tokenUserProperti");
}
export const setTot = (tot) => {
  if(tot == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("totProperti", tot);
}
export const getTotQty = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("totQtyProperti");
}
export const setTotQty = (totQty) => {
  if(totQty == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("totQtyProperti", totQty);
}
export const getTrxId = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("trxIdProperti");
}
export const setTrxId = (trxId) => {
  if(trxId == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("trxIdProperti", trxId);
}
export const getTotTrx = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("totTrxProperti");
}
export const setTotTrx = (totTrx) => {
  if(totTrx == null) return null;
  if(typeof window === 'undefined') return null;
  localStorage.setItem("totTrxProperti", totTrx);
}
export const getTot = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.getItem("totProperti");
}
export const setStatusUser = (status) => {
  status = (status||"")
  if(typeof window === 'undefined') return "";  
  return localStorage.setItem("statusUserProperti", status)
}

export const getStatusUser = () => {
  if(typeof window === 'undefined') return "";  
  return localStorage.getItem("statusUserProperti")
}

export const setUserLogin = (user) => {
  user = (user||"")
  if(typeof window === 'undefined') return "";  
  return localStorage.setItem("userLoginUserProperti", user)
}
export const setReferal = (ref) => {
  ref = (ref||"")
  if(typeof window === 'undefined') return "";  
  return localStorage.setItem("userReferalProperti", ref)
}
export const setWadiah = (wadiah) => {
  wadiah = (wadiah||"")
  if(typeof window === 'undefined') return "";  
  return localStorage.setItem("userWadiahProperti", wadiah)
}

export const getUserLogin = () => {
  if(typeof window === 'undefined') return "";    
  const user = localStorage.getItem("userLoginUserProperti")
  if(user == null) return ""
  return user
}
export const getUserReferal = () => {
  if(typeof window === 'undefined') return "";    
  const ref = localStorage.getItem("userReferalProperti")
  if(ref == null) return ""
  return ref
}
export const getUserWadiah = () => {
  if(typeof window === 'undefined') return "";    
  const wadiah = localStorage.getItem("userWadiahProperti")
  if(wadiah == null) return ""
  return wadiah
}
export const clear = () => {
  if(typeof window === 'undefined') return null;
  return localStorage.clear();
}