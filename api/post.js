import { POST,POST2,NET } from '../helper/axios';
import { setToken,setTotTrx, getToken, clear,setTrxId} from '../helper/localStorage';
import { alertError } from '../helper/sweetalert';
import { getUserPhone } from './get';

export const login = async (email, password) => {  
  const res = await POST2("/auth/login", {email, password});    
  if(res?.status){
    setToken(res?.data?.data.token) 
  }
  return res  
}

export const register = async (name, email, password, password_confirmation, phone,referral_code) => {
  try {
    const res = await POST2("/auth/register", {name, email, password, password_confirmation,referral_code, phone, app:"GSI"});
    return {kondisi:res?.status,res}
  } catch (error) {
    return null;
  }
}

export const logout = async () => {
  try { 
    await POST("/auth/logout");
    if(clear() === null) return false;
    return true;  
  } catch (error) {
    return false;
  }
}

export const createPIN = async(pin, pin_confirmation) => {
  try { 
    await POST("/user/pin", {pin, pin_confirmation}, getToken());          
  } catch (error) {    
    return false;
  }
  return true;
}
export const  createPayment = async (user_transaction_id, type, pin) => {
  try {
    const res = await POST2("/transaction/payment", {user_transaction_id, type}, getToken(), pin);
      
    return {kondisi:res?.status,res}
  } catch (error) {
    return null;
  }
   
}

export const addBankUser = async(name, number, bank_code, bank_name) => {
  try {
    const res = await POST("/user/bank", {name, number, bank_code, bank_name}, getToken());    
    if(res == null ) return false
  } catch (error) {
    return false;
  }
  return true;
}

export const postWadiahHandler = async (
  name, number, amount, bank
)  =>{
  
  const res = await POST2("/withdraw/wadiah", {
    name, number, amount, bank
  },getToken())
  return res
}

export const updateCart = async(cart_id, qty) => {  
  try {
    const res = await POST2("/cart/update", {cart_id, qty}, getToken());    
     
    return {kondisi:res?.status,res}
  } catch (error) {
    return null;
  }
 
}

export const createTransactionRetail = async (amount, shipment_address_id, shipment_courier, shipment_fee,dropship_fee,shipment_service, amount_asuransi=0, shipment_weight=1, asuransi=false) => {
  try {
    
    const res = await POST2("/transaction/",{type:"DISTRIBUTOR_PURCHASE",amount, detail:{
      shipment_address_id,
      shipment_courier,
      shipment_fee,
      amount_asuransi,
      shipment_service,
      shipment_weight,
      dropship_fee,
      asuransi,
      type:'GSI-WEB'
    }}, getToken());

    if(res?.status){
      setTotTrx(amount)
      setTrxId(res?.data?.data?.user_transaction_id)
      return res?.data?.data;        
    }
    else{
      alertError(res?.data?.message)
      return null
    }
  } catch (error) {
    return null;
  }
}
export const createTransactionTopup = async (amount) => {
  try {
    const res = await POST("/transaction/",{type:"WADIAH_TOPUP", amount, detail:{}}, getToken());
    return res?.data;
  } catch (error) {
    return null;
  }
}

export const paymentHandlerForMyBill = async (amount, idPelanggan, pin, tipePembayaran) => {
  const resPhone = await getUserPhone()
  if(resPhone == null)  {
    return{
      status:false,
      data:null
    }
  }
  const resTransaction = await POST2("/transaction", {type:"DIRECT_PAYMENT", amount, detail:{phone:parseInt(resPhone), idpel:idPelanggan}}, getToken())
  if(!resTransaction?.status) return resTransaction
  const objparamPayment = {
    user_transaction_id : resTransaction?.data?.data?.user_transaction_id,
    type : tipePembayaran
  }
  const resPayment = await POST2("/transaction/payment", objparamPayment, getToken(), pin)
  return resPayment
}

export const paymentHandlerForInvestment = async (id, amount, pin) => {
  const resTransaction = await POST2("/transaction", {type : "SREC_TOPUP", amount : amount, detail : { product_id : id}}, getToken())
  if(resTransaction?.status === false){
    return {
      status : false,
      data : resTransaction?.data?.message
    }
  }
  const objparamPayment = {
    user_transaction_id : resTransaction?.data?.data?.user_transaction_id,
    type : "WADIAH"
  }
  const resPayment = await POST2("/transaction/payment", objparamPayment, getToken(), pin)
  if(resPayment?.status === false) {    
    return {
      status : false,
      data : resPayment?.data?.message
    }
  }  
  return {
    status : true,
    data : resPayment
  }
}

export const paymnetHandlerForRetail = async (id, amount, pin,tipePembayaran) => {
  const resTransaction = await POST2("/transaction", {type : "RETAIL_PURCHASE", amount : amount, detail : { product_id : id}}, getToken())
  if(resTransaction?.status === false){
    return {
      status : false,
      data : resTransaction?.data?.message
    }
  }
  const objparamPayment = {
    user_transaction_id : resTransaction?.data?.data?.user_transaction_id,
    type :tipePembayaran
  }
  const resPayment = await POST2("/transaction/payment", objparamPayment, getToken(), pin)
  if(resPayment?.status === false) {    
    return {
      status : false,
      data : resPayment?.data?.message
    }
  }  
  return {
    status : true,
    data : resPayment
  }
}


export const createUserAnalogPawn = async (image, weight, day_count, delivery, pin,user_bank_id) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("weight", weight);
  formData.append("day_count", day_count);
  formData.append("type_asset", "GOLD");
  formData.append("delivery", delivery);
  formData.append("user_bank_id", user_bank_id);
  try {
    await POST("/pawn/user/analog", formData, getToken(), pin);
    return true;
  } catch (error) {
    return false;
  }
}

export const completeProfile = async (phone,gender, birthday, provinsi, kota, desa, alamat, ktp, image_ktp, image_ktp_face, npwp, image_npwp) => {
  const formData = new FormData();  
  formData.append('phone',phone)
  formData.append('gender',gender)
  formData.append('birthday',birthday)
  formData.append('province',provinsi)
  formData.append('city',kota)
  formData.append('district',desa,)
  formData.append('address',alamat)
  formData.append('ktp',ktp)
  formData.append('image_ktp',image_ktp)
  formData.append('image_ktp_face',image_ktp_face)
  formData.append('npwp',npwp)
  formData.append('image_npwp',image_npwp)
  try {
    const res = await POST("/user/post/detail", formData, getToken(),"",true);
    if(res == null) return false
  } catch (error) {
    return false;
  }
  return true;
}

export const tambahKeranjang = async (product_id, product_title, product_price, qty, product_image) => {
  try {
    const res = await POST("/cart/add",{product_id, product_title, product_price, qty, product_image}, getToken());  
    if(res == null) return false
    else{
      return true
    }
  } catch (error) {
    return false;
  }
}

export const tambahAlamat = async (shipment_buyername, shipment_address, shipment_province, shipment_city, shipment_district, shipment_buyerphone, is_dropship, rajaongkir_subdistrict_id, shipment_title) => {
  try {
    const res = await POST("/alamat/add",{shipment_buyername, shipment_address, shipment_province, shipment_city, shipment_district, shipment_buyerphone, is_dropship, rajaongkir_subdistrict_id, shipment_title}, getToken());  
    if(res == null) return false
    else{
      return true
    }
  } catch (error) {
    return false;
  }
}

export const getJasaKirim = async (id) => {  
  if(id == null){
    return ""
  }
  const res = await POST("/shipping/distributor/ongkir", {subdistrict_id:id, weight:1}, getToken())  
  const data = [];
  res?.data?.forEach((e)=>{
    data.push({label:`${e?.courier} - ${e?.text}`, value:`${e?.courier} - ${e?.price} - ${e?.text}`});
  });  
  return data;
}

export const changePhoneUser = async (phone) => {  
  try {
    const res = await POST("/user/phone/verification/update_phone", {phone}, getToken())
    if(res == null) return false
  } catch (error) {
    return false
  }
  return true  
}
export const noAuthBill = async (phone, idpel) => {
  const res = await NET("POST", "/tagihanNoauth", {phone, idpel}, getToken())
  return res
}
export const noAuthBillPayment = async (type, user_transaction_id) => {
  const res = await NET("POST", "/paymentNoauth?type="+type+"&user_transaction_id="+user_transaction_id, {}, getToken())
  return res
}

// "api/user/post/detail";

