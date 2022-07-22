import { DELETE } from '../helper/axios';
import { getToken} from '../helper/localStorage';
export const deleteBankUser = async (id) => {
  try {
    await DELETE("/user/bank/"+id,{}, getToken());
    return true;
  } catch (error) {
    return false;
  }
}
export const deleteCart = async (id) => {
  try {
    await DELETE("/cart/id/"+id,{}, getToken());
    return true;
  } catch (error) {
    return false;
  }
}