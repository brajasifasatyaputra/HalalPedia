import {useState} from 'react'
import loadable from '@loadable/component'
import { convertToRp } from '../../helper/converter'

const NotFound = loadable(()=>import("../NotFound-Component"))

export default function DetailComponent({data}){  

  data = (data||null)  

  const [showTutor, setShowTutor] = useState(false);
  const a = data?.payment?.type;
  let b = a.split('_');

  if(data === null) {
    return(
      <NotFound></NotFound>
    )
  }
  else{
    return(      
      <div className="w-full px-5 py-4 border border-t-0 border-gray-200 rounded-b bg-gray-50">                
        <div className="w-full p-5 border border-t-0 border-gray-200 bg-white rounded-b">

          <p className="text-2xl text-gray-800 font-semibold">Detail Transaksi</p>
          {
            (data?.payment?.status === "PENDING")?(
              <p className="text-sm text-gray-800">*Mohon segera melakukan pembayaran sebelum
                <span className="text-red-500 text-lg font-semibold"> {data?.payment?.payment_expired}</span>
              </p>                                      
            ):(
              <p className="text-sm text-gray-800">*Terima kasih telah melakukan pembayaran tepat waktu</p>                                      
            )
          }

          <div className="flex justify-between py-2 mt-5">
            <p>Tanggal Transaksi</p>
            <p>{data?.created_at}</p>
          </div>

          <div className="border border-gray-100 my-10"></div>

          <p className="text-gray-800 font-semibold text-xl">Rincian Pembayaran</p>

          <div className="flex justify-between py-2 mt-5">
            <p>Total Tagihan</p>
            <p>{convertToRp(data?.transaction?.amount)}</p>
          </div>

          <div className="flex justify-between py-2">
            <p>{b[0]==='VA'?'Biaya Virtual Account':'Kode Unik'}</p>
            <p>{convertToRp(data?.payment?.amount - data?.transaction?.amount)}</p>
          </div>

          <div className="flex justify-between py-2">
            <p className="text-2xl">Total</p>
            <p className="text-2xl">{convertToRp(data?.payment?.amount)}</p>
          </div>

          <div className="mb-2 mt-7">
            {(showTutor)?(
            <p className="text-gray-800 text-sm">
              Apakah Penjelasan Sudah Cukup?
              <span onClick={()=>setShowTutor(false)} className="text-blue-500 cursor-pointer font-medium"> Sembunyikan</span>
            </p>
            ):(
            <p className="text-gray-800 text-sm">
              Butuh Penjelasan Tata Cara Pembayaran?
              <span onClick={()=>setShowTutor(true)} className="text-blue-500 cursor-pointer font-medium"> Selengkapnya</span>
            </p>
            )}
          </div>

          {(!showTutor)?null:(
            data?.payment?.type==='INDOMARET'||data?.payment?.type==='ALFAMART'?
<>
            <div className="border border-gray-100 my-10"></div>

            <p className="text-gray-800 font-semibold text-xl">Tata Cara Pembayaran</p>

            <p className="mt-7 text-lg">Pembayaran Melalui { data?.payment?.type}</p>

            <p className="text-sm text-gray-800 mt-5">1. Setelah mendapatkan kode pembayaran narobil {data?.payment?.detail?.account} tunjukan nomer ini kepada kasir.</p>
            <p className="text-sm text-gray-800 mt-5">2. Pembayaran akan diproses, kemudian kasir akan menyerahkan bukti pembayaran kepada kamu.</p>
            <p className="text-sm text-gray-800 mt-5">3. Kemudian status transaksi kamu akan berubah dari pending menjadi selesai atau done.</p>
             
 
            </>

            :
            <>
            <div className="border border-gray-100 my-10"></div>

            <p className="text-gray-800 font-semibold text-xl">Tata Cara Pembayaran</p>

            <p className="mt-7 text-lg">Pembayaran Melalui ATM {b[0]==='VA'?'Virtual Account '+b[1]:data?.payment?.type}</p>

            <p className="text-sm text-gray-800 mt-5">1. Pada ATM, Pilih opsi Transaksi Lainnya, lalu pilih opsi Transfer.</p>
            <p className="text-sm text-gray-800 mt-5">2. Kemudian pilih Rekening Tabungan kemudian pilih Rekening .</p>
            <p className="text-sm text-gray-800 mt-5">3. Masukkan nomor rekening tujuan.</p>
            <p className="text-sm text-gray-800 mt-5">4. Konfirmasi dan selesaikan pembayaran.</p>
            <p className="text-sm text-gray-800 mt-5">5. Konfirmasi dan selesaikan pembayaran.</p>

            <p className="mt-4 text-lg">Pembayaran Melalui Internet Banking</p>

            <p className="text-sm text-gray-800 mt-5">1. Login ke iBanking {b[0]==='VA'?b[1]:data?.payment?.type}, pilih Transfer, lalu atur & tambah Rekening Tujuan.</p>
            <p className="text-sm text-gray-800 mt-5">2. Masukkan nomor rekening tujuan, dan kode Otentifikasi Token.</p>
            <p className="text-sm text-gray-800 mt-5">3. Pilih Transfer Antar Rekening {b[0]==='VA'?b[1]:data?.payment?.type}, pilih Rek. Tujuan, dan pilih Rek. Debit.</p>
            <p className="text-sm text-gray-800 mt-5">4. Masukkan nominal bayar, kode otentikasi token, dan selesaikan pembayaran.</p>                      

            <p className="mt-4 text-lg">Pembayaran Melalui Mobile Banking</p>

            <p className="text-sm text-gray-800 mt-5">1. Login ke Mobile banking {b[0]==='VA'?b[1]:data?.payment?.type} kemudian pilih Transfer</p>
            <p className="text-sm text-gray-800 mt-5">2. Pilih menu Antar Rekening {b[0]==='VA'?b[1]:data?.payment?.type}, kemudian menu Input Rekening Baru.</p>
            <p className="text-sm text-gray-800 mt-5">3. Masukkan nomor Rekening Debit dan Rekening Tujuan.</p>
            <p className="text-sm text-gray-800 mt-5">4. Masukkan Password, dan selesaikan pembayaran.</p>
            <p className="text-sm text-gray-800 mt-5">5. Konfirmasi dan selesaikan pembayaran.</p>

            <p className="mt-4 text-lg">Pembayaran Melalui ATM Bersama</p>

            <p className="text-sm text-gray-800 mt-5">1. Masukkan kartu ke mesin ATM bersama</p>
            <p className="text-sm text-gray-800 mt-5">2. Pilih Transaksi Lainnya</p>
            <p className="text-sm text-gray-800 mt-5">3. Pilih menu Transfer.</p>
            <p className="text-sm text-gray-800 mt-5">4. Masukkan kode bank dan nomor rekening tujuan.</p>
            <p className="text-sm text-gray-800 mt-5">5. Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda tidak dapat diproses.</p>
            <p className="text-sm text-gray-800 mt-5">6. Konfirmasi rincian Anda akan tampil di layar, cek dan tekan Ya untuk melanjutkan.</p>
            <p className="text-sm text-gray-800 mt-5">7. Transaksi Berhasil.</p>                      

            <p className="mt-4 text-lg">Pembayaran Melalui Transfer Dari Bank Lain</p>

            <p className="text-sm text-gray-800 mt-5">1. Pilih menu Transfer antar bank atau Transfer online antar bank</p>
            <p className="text-sm text-gray-800 mt-5">2. Masukkan kode bank atau pilih bank yang dituju .</p>
            <p className="text-sm text-gray-800 mt-5">3. Masukan nomor rekening tujuan.</p>
            <p className="text-sm text-gray-800 mt-5">4. Masukkan jumlah pembayaran.</p>
            <p className="text-sm text-gray-800 mt-5">5. Konfirmasi rincian Anda akan tampil di layar, cek dan apabila sudah sesuai silahkan lanjutkan transaksi sampai dengan selesai.</p>
            </>
          )}
                                

          </div>
      </div>
    )
  }
}