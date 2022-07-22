import { NET } from '../helper/axios';
import { getToken } from '../helper/localStorage';

export const changePassword = async (password, password_confirmation, old_password) => {
  const res = await NET("PUT", "/auth/password/change", {password, password_confirmation, old_password}, getToken())
  return res
}

export const changePIN = async (pin, pin_confirmation, password) => {
  const res = await NET("PUT", "/user/pin", {pin, pin_confirmation, password}, getToken())  
  return res  
}
