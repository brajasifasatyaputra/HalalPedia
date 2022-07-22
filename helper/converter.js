
export const enumConverter = (val) => {
  switch (val) {
    case 'SHRC_WITHDRAW':
      return 'Penjualan Instant SHRC'
    case 'ETH_WITHDRAW':
      return 'Penjualan Instant ETH'
    case 'SREC_WITHDRAW':
      return 'Penjualan Instant ETH'
    case 'SREC_TOPUP':
      return 'Pembelian Instant SREC'
    case 'SHRC_TOPUP':
      return 'Pembelian Instant SHRC'
    case 'ETH_TOPUP':
      return 'Pembelian Instant ETH'
    case 'PAWN_GOLD_EXTENSION':
      return 'Perpanjang Gadai'
    case 'PAWN_INSTALLMENT':
      return 'Pembiayaan Non Gold'
    case 'GOLD_TOPUP':
      return 'Pembelian Emas'
    case 'SILVER_TOPUP':
      return 'Pembelian Perak'
    case 'WADIAH_TOPUP':
      return 'Top Up Wadiah'
    case 'ASSET_WITHDRAW':
      return 'Penarikan Fisik'
    case 'PAWN_GOLD_SETTLEMENT':
      return 'Pelunasan Gadai'
    case 'PLAN_PROGRESS':
      return 'Progres'
    case 'INSTALLMENT_DOWN_PAYMENT':
      return 'Uang Muka Cicilan'
    case 'INVESTMENT_WADIAH':
      return 'Wadiah Plus'
    case 'INVESTMENT_GOLD':
      return 'Emas Plus'
    case 'DISTRIBUTOR_PURCHASE':
      return 'Pembelian Retail'
    case 'TOPUP_ADMIN':
      return 'Top Up Admin'
    case 'TAX_CHARGE':
      return 'Pajak'
    case 'DEBIT':
      return 'D'
    case 'CREDIT':
      return 'C' 
    default:
      return val
  }
}

export const listFilterMyAsset = () => {
  return[
    {
      label:"ONGOING",
      value:"CLOSED"
    },
    {
      label:"COMPLETED",
      value:"COMPLETED"
    },
  ]
}
export const listStatusWithdrawWadiah = () => {
  return [
   
    { value: 'REQUESTED', label: 'Sedang Proses Persetujuan' },    
    { value: 'DONE', label: 'Selesai' },
    { value: 'REJECTED', label: 'Pengajuan ditolak' }
  ];
}
export const listChooseBank = () => {
  return [
    {
      label: 'SALDO',
      value: 'WADIAH',
    },
    {
      label: 'Bank Syariah Mandiri',
      value: 'BSM',
    },
    {
      label: 'BRI',
      value: 'BRI',
    },
    {
      label: 'BCA',
      value: 'BCA',
    },
    {
      label: 'BNI',
      value: 'BNI',
    },
    {
      label: 'MANDIRI',
      value: 'MANDIRI',
    },
    {
      label: 'CIMB Niaga',
      value: 'CIMB',
    },
     
    
    {
      label: 'Virtual Account Bank Mandiri',
      value: 'VA_MANDIRI',
    },
    {
      label: 'Virtual Account Bank BRI',
      value: 'VA_BRI',
    },
    {
      label: 'Virtual Account Bank BNI',
      value: 'VA_BNI',
    },
    {
      label: 'Virtual Account Bank Permata',
      value: 'VA_PERMATA',
    },
    {
      label: 'Alfamart',
      value: 'ALFAMART',
    },
    {
      label: 'Indomaret',
      value: 'INDOMARET',
    },

  ]
}
export const listChooseBankTopup = () => {
  return [
     
    {
      label: 'Bank Syariah Mandiri',
      value: 'BSM',
    },
    {
      label: 'BRI',
      value: 'BRI',
    },
    {
      label: 'BCA',
      value: 'BCA',
    },
    {
      label: 'BNI',
      value: 'BNI',
    },
    {
      label: 'MANDIRI',
      value: 'MANDIRI',
    },
    {
      label: 'CIMB Niaga',
      value: 'CIMB',
    },
    
    
    {
      label: 'Virtual Account Bank Mandiri',
      value: 'VA_MANDIRI',
    },
    {
      label: 'Virtual Account Bank BRI',
      value: 'VA_BRI',
    },
    {
      label: 'Virtual Account Bank BNI',
      value: 'VA_BNI',
    },
    {
      label: 'Virtual Account Bank Permata',
      value: 'VA_PERMATA',
    },
    {
      label: 'Alfamart',
      value: 'ALFAMART',
    },
    {
      label: 'Indomaret',
      value: 'INDOMARET',
    },

  ]
}
export const listChooseBankMarket = () => {
  return [
     
    {
      label: 'SALDO',
      value: 'WADIAH',
    },
    // {
    //   label: 'Transfer Bank Syariah Mandiri/BSI',
    //   value: 'BSM',
    // },
    {
      label: 'Virtual Account Mandiri',
      value: 'VA_MANDIRI',
    },
    {
      label: 'Virtual Account BRI',
      value: 'VA_BRI',
    },
    {
      label: 'Virtual Account BNI',
      value: 'VA_BNI',
    },
    {
      label: 'Virtual Account Permata',
      value: 'VA_PERMATA',
    },
    {
      label: 'Alfamart',
      value: 'ALFAMART',
    },
    {
      label: 'Indomaret',
      value: 'INDOMARET',
    },

  ]
}
export const listTempo = () => {
  return [
    { value: '0.5', label: '12 jam' },
    { value: '1', label: '1 Hari' },
    { value: '2', label: '2 Hari' },
    { value: '3', label: '3 Hari' },
    { value: '4', label: '4 Hari' },
    { value: '5', label: '5 Hari' },
    { value: '6', label: '6 Hari' },
    { value: '7', label: '7 Hari' },
    { value: '8', label: '8 Hari' },
    { value: '9', label: '9 Hari' },
    { value: '10', label: '10 Hari' },
    { value: '11', label: '11 Hari' },
    { value: '12', label: '12 Hari' },
    { value: '13', label: '13 Hari' },
    { value: '14', label: '14 Hari' },
    { value: '30', label: '30 Hari' },
    { value: '120', label: '120 Hari' }    
  ];
}

export const listTipeInvestment = () => {
  return[
    {
      label: 'ALL',
      value: 'ALL',
    },
    {
      label: 'ACTIVE',
      value: 'OPEN',
    },
  ]
}

export const listChooseBankForRetail = () => {
  return [       
    {
      label: 'SALDO',
      value: 'WADIAH',
    },
    {
      label: 'Transfer Bank Syariah Mandiri',
      value: 'BSM',
    },
    {
      label: 'Transfer BRI',
      value: 'BRI',
    },
    {
      label: 'Transfer BCA',
      value: 'BCA',
    },
    {
      label: 'Transfer BNI',
      value: 'BNI',
    },
    {
      label: 'Transfer MANDIRI',
      value: 'MANDIRI',
    },
    {
      label: 'Transfer CIMB Niaga',
      value: 'CIMB',
    },
    
    {
      label: 'Transfer Virtual Account Mandiri',
      value: 'VA_MANDIRI',
    },
    {
      label: 'Transfer Virtual Account BRI',
      value: 'VA_BRI',
    },
    {
      label: 'Transfer Virtual Account BNI',
      value: 'VA_BNI',
    },
    {
      label: 'Transfer Virtual Account Permata',
      value: 'VA_PERMATA',
    },
    {
      label: 'Alfamart (Maximal pembayaran Rp. 5.000.000)',
      value: 'ALFAMART',
    },
    {
      label: 'Indomaret (Maximal pembayaran Rp. 5.000.000)',
      value: 'INDOMARET',
    },
  ]
}

export const listLayanan = () => {
  return [
    { value: 'COD', label: 'Datang Ke Kantor SC Property Indonesia Mampang' },
    { value: 'EXPEDITION', label: 'Kirim ke Kantor SC Property Indonesia Mampang' },
    { value: 'PICKUP', label: 'PICKUP(max 3 KM dari Mampang) ' },

  ];
}
export const listStatusGadai = () => {
  return [
    { value: 'APPROVED', label: 'Berjalan' },
    { value: 'REQUESTED', label: 'Sedang Proses Persetujuan' },    
    { value: 'DONE', label: 'Selesai' },
    { value: 'REJECTED', label: 'Pengajuan ditolak' }
  ];
}
export const listInterval = () => {
  return [
    { value: '1', label: '1 Hari' },
    { value: '7', label: '1 Minggu' },    
    { value: '30', label: '1 Bulan' } 
  ];
}
export const listGender = () => {
  return [
    { value: "p", label: "Perempuan" },
    { value:"l", label:"Laki-Laki"}
  ]
}
export const convertToRp = (val) => {
  val = (val || "");
  if (val == 0) {
    return 'Rp. ' + 0
  }
  if (val) {
    const num = parseInt(val).toFixed(0)
    const rp = new Intl.NumberFormat('id-ID', {
    }).format(num)

    return 'Rp. ' + rp
  }
  return '0'
}
export const convertToRp2 = (val) => {
  val = (val || "");
  if (val == 0) {
    return 'Rp. ' + val
  }
  if (val) {
    const num = parseInt(val).toFixed(0)
    const rp = new Intl.NumberFormat('id-ID', {
    }).format(num)

    return '' + rp
  }
  return '0'
}
export const convertTo = (val) => {
  if (val) {
    return parseFloat(val).toFixed(3)
  }
  return '0'
}
export const convertToMiliyar = (val) => {
  if (val == 0) {
    return 'Rp. ' + val
  }
  if (val) {
    const num = parseInt(val).toFixed(0)
    const rp = new Intl.NumberFormat('id-ID', {
    }).format(num)
    const m = rp.toString();
    const miliyar = m.substring(0, 5)
    return 'Rp. ' + miliyar + ' M'
  }
  return '0'
}
export const convertToJuta = (val) => {
  if (val == 0) {
    return 'Rp. ' + val
  }
  if (val) {
    const num = parseInt(val).toFixed(0)
    const rp = new Intl.NumberFormat('id-ID', {
    }).format(num)
    const m = rp.toString();
    const miliyar = m.substring(0, 5)
    return 'Rp. ' + miliyar + ' JT'
  }
  return '0'
}
export const formatUnit = (bilangan = new String()) => {

  var number_string = bilangan.toString();

  let sisa = number_string.length % 3;
  let rupiah = number_string.substr(0, sisa);
  let ribuan = number_string.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    var separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return rupiah + ' Lot';
}

export const isFormatEmail = (email = new String()) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const replaceKomaWithDot = (nominal=new String()) => {
  const rex = new RegExp(",", "g")
  const rep = nominal.replace(rex, ".")  
  return rep
}

export const checkBrowser = () => {
          
  // Get the user-agent string
  let userAgentString = 
      navigator.userAgent;

  // Detect Chrome
  let chromeAgent = 
      userAgentString.indexOf("Chrome") > -1;

  // Detect Internet Explorer
  let IExplorerAgent = 
      userAgentString.indexOf("MSIE") > -1 || 
      userAgentString.indexOf("rv:") > -1;

  // Detect Firefox
  let firefoxAgent = 
      userAgentString.indexOf("Firefox") > -1;

  // Detect Safari
  let safariAgent = 
      userAgentString.indexOf("Safari") > -1;
        
  // Discard Safari since it also matches Chrome
  if ((chromeAgent) && (safariAgent)) 
      safariAgent = false;

  // Detect Opera
  let operaAgent = 
      userAgentString.indexOf("OP") > -1;
        
  // Discard Chrome since it also matches Opera     
  if ((chromeAgent) && (operaAgent)) 
      chromeAgent = false;

  return chromeAgent
}