import Swal from 'sweetalert2';

export const alertSuccess = async (title, text) => {
  await Swal.fire({title, text, icon:"success"}); 
}

export const alertWarning = async (title, text) => {
  await Swal.fire({title, text, icon:"warning"}); 
}

export const alertError = async (title, text) => {
  await Swal.fire({title, text, icon:"error"}); 
}

export const alertInfo = async (title, text) => {
  await Swal.fire({title, text, icon:"info"}); 
}

export const alertQuestion = async (title, text, confirm="Yes, delete it!",cancel='Cancel') => {
  const res = await Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirm,
    cancelButtonText: cancel
  })
  if(res.isConfirmed) return true;
  return false;
} 