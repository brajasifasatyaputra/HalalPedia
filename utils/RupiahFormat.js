export const convertRupiah = (price) => {
  let rupiah = '';
  let rupiahRev = !isNan(price) ? 
  price.toString().split('').reverse().join('') : '0';

  for (let i = 0; i < rupiahRev.length; i++) {
    if (i % 3 === 0) rupiah += rupiahRev.substr(i, 3) + '.';
  }
  return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
};
