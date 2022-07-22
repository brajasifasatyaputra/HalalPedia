import useSWR from 'swr';
import { GET,NET } from '../helper/axios';
import { getToken, setWadiah,setUserLogin,setReferal,setTot,setTotQty, setEmailUserLogin } from '../helper/localStorage';

const fetcher = async (url) => {
  return await NET("GET",url,{},getToken())
}
export const loginWithGoogle = async () => {
  try {
    await GET("/google");
    return true;
  } catch (error) {
    return false;
  }
}

export const loginWithFacebook = async  () => {
  try {
    await GET("/facebook");
    return true;
  } catch (error) {
    return false;
  }
}

export const resetPassword = async (email) => {
  try {
    await GET(`/password/email?email=${email}`);
    return true;
  } catch (error) {
    return false;
  }
}
export const handlerBillIndihome = async (idpl) => {
  return await NET("GET", `/tagihanIndihome?idpel=${idpl}`, {}, getToken())
}
export const handlerBillTagihanListrik = async (idpl) => {
  return await NET("GET", `/tagihanPLN?idpel=${idpl}`, {}, getToken())
}

const pinFetcher = async (url) => {  
  return await GET(url,{},getToken());
}
export const usePIN = () => {
  const {data, error} = useSWR("/user/pin", pinFetcher);
  const loading = !data && !error;
  const resPIN = data?.data;  
  return {
    loading,
    resPIN
  }
}
const billFetcher = async (url) => {  
  return await GET(url,{},getToken());
}
export const useBill = async (search) => {
  const data = await GET(`/tagihan?id_pelanggan=${search}`,{},getToken()) ; 
  const res = data?.data[0];  
  return {     
    res
  }
}
export const WadiahStatus = (status,page) => {
  const {data, error} = useSWR(`/withdraw/wadiah?status=${status}&page=${page}`, fetcher)
  const loading = !data && !error
  const notFound = (data?.data?.length === 0) || (data?.data == null)
  return{
    resMutation : data?.data?.data,
    loading,
    notFound
  }
}
export const calculate = async (type,gram,duration) => {  
  return await GET(`/pawn/calculate?type_asset=${type}&weight=${gram}&day_count=${duration}`,{},getToken());  
}

const bankMasterFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useBankMaster = () => {
  const {data, error} = useSWR("/user/bank/master", bankMasterFetcher);
  const loading = !data && !error;
  const resBankMaster = data?.data;    
  return {
    loading,
    resBankMaster
  }
}
const followerFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useFollower = () => {
  const {data, error} = useSWR("/user/follower", followerFetcher);
  const loading = !data && !error;
  const resFollower = data?.data;    
  return {
    loading,
    resFollower
  }
}
 
const permuhanListFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const usePerumahanList = () => {
  const {data, error} = useSWR("/smartProperty/perumahan", permuhanListFetcher);
  const loadingPerumahan = !data && !error;
  const resPerumahan = data?.data;    
  return {
    loadingPerumahan,
    resPerumahan
  }
}
const tagihanFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const tagihanPermuhananList = (cid) => {
  const {data, error} = useSWR("/smartProperty/tagihan?cid="+cid, tagihanFetcher);
  const loadingTagihan = !data && !error;
  const notFound = (data?.data?.length === 0) || (data?.data == null)
  const resTagihan = data?.data;    
  return {
    loadingTagihan,
    resTagihan,
    notFound
  }
}
const piutangFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const usePiutangList = () => {
  const {data, error} = useSWR("/smartProperty/cicilan", piutangFetcher);
  const loadingPiutang = !data && !error;
  const notFoundPiutang = (data?.data == null) || (data?.data?.length === 0)
  const resPiutang = data?.data;    
  return {
    loadingPiutang,
    resPiutang,
    notFoundPiutang
  }
}
const piutangDetailFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const piutanDetailgList = (id) => {
  const {data, error} = useSWR("/smartProperty/cicilan/"+id, piutangDetailFetcher);
  const loadingPiutangDetail = !data && !error;
  const resPiutangDetail = data?.data;    
  return {
    loadingPiutangDetail,
    resPiutangDetail
  }
}
const mutationFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useMutation = (page,interval,previousData,type,id) => {
  const {data, error} = useSWR(`/asset/mutation?type=${type}&page=${page}&interval=${interval}&product_id=${id}`, mutationFetcher);    
  let lengDataComeMutation = 0
  if(data?.data?.length == null){
    lengDataComeMutation = 0
  }else{
    lengDataComeMutation = data?.data?.length
  }
  const loading = !data && !error;    
  const resMutation = data?.data?.mutation.concat(previousData);        
  return {
    loading,
    resMutation,
    lengDataComeMutation
  }
   
}
const assetListFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useUserAssetList = (search, filter) => {
  const {data, error} = useSWR(`/product/myAsset?search=${search}&filter=${filter}`, assetListFetcher)
  const loadingAsset = !data && !error
  return{
    loadingAsset,
    resAsset : data?.data
  }
}
const mutationListFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useMutationList = () => {
  const {data, error} = useSWR(`/product/mutation`, mutationListFetcher);    
  
  const loadingList = !data && !error;    
    
  const resMutationList = [{ value: 'WADIAH', label: 'IDR' }];      
  data?.data?.forEach((data)=>{
    resMutationList.push({value:data?.product_id,label:  data?.product_title+' ( SCP-'+data?.product_id+' )' });
  });    
  return {
    loadingList,
    resMutationList,
   
  }
   
}

export const useBankMasterSelect = () => {
  const {data, error} = useSWR("/user/bank/master", bankMasterFetcher);
  const loading = !data && !error;
  const resBankMasterSelect = [];      
  data?.data?.forEach((data)=>{
    resBankMasterSelect.push({value:data?.code,label:data?.name});
  });  
  return {
    loading,
    resBankMasterSelect
  }
}

const bankFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useBank = () => {
  const {data, error} = useSWR("/user/bank", bankFetcher);
  const loading = !data && !error;
  const loadingBank = !data && !error;
  const resBank = data?.data;  
  return {
    loading,
    loadingBank,
    resBank
  }
}
export const useBankSelect = () => {
  const {data, error} = useSWR("/user/bank", bankFetcher);
  const loading = !data && !error;  
  const resBankSelect = [];
  data?.data?.forEach((data)=>{
    resBankSelect.push({value: data?.user_bank_id ,label : data?.bank_name+'-'+data?.number})
  })  
  return {
    loading,    
    resBankSelect
  }
}

export const useBankSelectTarikSaldo = () => {
  const {data, error} = useSWR("/user/bank", bankFetcher);
  const loading = !data && !error;  
  const resBankSelect = [];
  data?.data?.forEach((data)=>{
    resBankSelect.push({value:`${data?.name}-${data?.number}-${data?.bank_name}`,label:`Atas Nama - ${data?.name?.toUpperCase()}`});
  })  
  return {
    loading,    
    resBankSelect
  }
}

const transactionListFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useTransactionList = (status) => {
  const {data, error} = useSWR(`/transaction?status=${status}`, transactionListFetcher)
  const loading = !data && !error
  const notFound = (data?.data?.length === 0) || (data?.data == null)
  return{
    resTransactionList : data?.data,
    loading,
    notFound
  }
}

const bannerFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useBanner = () => {
  const {data, error} = useSWR("/banner/gsi/list", bannerFetcher);
  const loading = !data && !error;
  const resBanner = data?.data;  
  return {
    loading,
    resBanner
  }
}

const bannerDetailFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useBannerDetail = (id) => {
  const {data, error} = useSWR(`/banner/gsi/detail/${id}`, bannerDetailFetcher);
  const loading = !data && !error;
  const resBannerDetail = data?.data;  
  return {
    loading,
    resBannerDetail
  }
}
 
export const faqFetcher = async (url) => {
  return await GET(url,{});
}
export const useFAQ = (initData) => {
  const {data, error} = useSWR(`/faq`, faqFetcher, {initialData:initData});
  const loading = !data && !error;
  const resFAQ = data?.data;  
  return {
    loading,
    resFAQ
  }
}

const marketFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useMarket = () => {
   
  const {data, error} = useSWR(getToken()?`/retail/allProducts`:`/retail/reguler`, marketFetcher)
   
  const loadingMarket = !data && !error    
  const resMarket = data?.data
  return{
    loadingMarket,
    resMarket,
    error
  }
}
const marketLoginFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useMarketLogin = () => {
  const {data, error} = useSWR(`/retail/allProducts`, marketLoginFetcher)
  const loadingMarketLogin = !data && !error    
  const resMarketLogin = data?.data
  return{
    loadingMarketLogin,
    resMarketLogin,
    error
  }
}

const marketFetcherDetail = async (url) => {
  return await GET(url,{});
}
export const useMarketDetail = (id) => {
  const {data, error} = useSWR(`/retail/reguler/${id}`, marketFetcherDetail)
  const loadingMarketDetail = !data && !error  
  const resMarketDetail = data?.data
  return{
    loadingMarketDetail,
    resMarketDetail,
    error
  }
}
 
const artikelFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useArtikel = (page,offset, search) => {
  offset = (offset||0)
  page = (page||0)
  search = (search||"")
  if(search !== ""){
    const {data, error} = useSWR(`/articles/search?search=${search}`, artikelFetcherSearch);
    const loadingArtikel = !data && !error;
    const resArtikel = data?.data;  
    return {
      loadingArtikel,
      resArtikel
    }
  }
  else{
    const {data, error} = useSWR(`/articles?limit=5&page=${page}&offset=${offset}`, artikelFetcher);
    const loadingArtikel = !data && !error;
    const resArtikel = data?.data;  
    return {
      loadingArtikel,
      resArtikel
    }
  }  
}

const artikelFetcherDetail = async (url) => {
  return await GET(url,{},getToken());
}
export const useArtikelDetail = (slug) => {
  const {data, error} = useSWR(`/articles/slug/${slug}`, artikelFetcherDetail);
  const loadingArtikelDetail = !data && !error;
  const resArtikelDetail = data?.data;  
  return {
    loadingArtikelDetail,
    resArtikelDetail
  }
}

 
const artikelFetcherSearch = async (url) => {
  return await GET(url,{},getToken());
}
export const useArtikelSearch = (search) => {
  const {data, error} = useSWR(`/articles/search?search=${search}`, artikelFetcherSearch);
  const loadingArtikelSearch = !data && !error;
  const resArtikelSearch = data?.data;  
  return {
    loadingArtikelSearch,
    resArtikelSearch
  }
}
const cartFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useCart= ( ) => {
  const {data, error} = useSWR(`/cart/list`, cartFetcher);
  const loadingCart = !data && !error;
  const resCart = data?.data;  
  const total = data?.total;
  const nominal = data?.nominal;
  setTot(data?.nominal)
  setTotQty(data?.total)
  return {
    loadingCart,
    resCart,
    total,
    nominal
    }
}

const artikelFetcherRandom = async (url) => {
  return await GET(url,{},getToken());
}
export const useArtikelRandom = () => {
  const {data, error} = useSWR(`/articles/random`, artikelFetcherRandom);
  const loadingArtikelRandom = !data && !error;
  const resArtikelRandom = data?.data;  
  return {
    loadingArtikelRandom,
    resArtikelRandom
  }
}
export const termConditionFetcher = async (url) => {
  return await GET(url, {}, getToken());
}
export const useTermCondition = (initData) => {
  const {data, error} = useSWR(`/termCondition`, termConditionFetcher, {initialData:initData});
  const loading = !data && !error;
  const resTermCondition = data?.data;  
  return {
    loading,
    resTermCondition
  }
}

const pawnUserFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const usePawnUser =  (status,type_pawn, page, previousData, limit) => {
  const {data, error} = useSWR(`/pawn/user?status=${status}&type_pawn=${type_pawn}&page=${page}&limit=${limit}`, pawnUserFetcher);    
  let lengDataComePawnUser = 0
  if(data?.data?.length == null){
    lengDataComePawnUser = 0
  }else{
    lengDataComePawnUser = data?.data?.length
  }
  const loading = !data && !error;    
  const resPawnUser = data?.data?.concat(previousData);          
  return {
    loading,
    resPawnUser,
    lengDataComePawnUser
  }
}

const pawnUserDetailFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const usePawnUserDetail = (id) => {
  const {data, error} = useSWR(`/pawn/user/detail/${id}`, pawnUserDetailFetcher);
  const loading = !data && !error;
  const resPawnUserDetail = data?.data;  
  return {
    loading,
    resPawnUserDetail
  }
}

const akadFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useAkad = () => {
  const {data, error} = useSWR(`/pawn/akad`, akadFetcher);
  const loading = !data && !error;  
  const resAkad = data?.link;    
  return {
    loading,
    resAkad
  }
}

const akadDetailFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useAkadDetail = (id) => {
  const {data, error} = useSWR(`/pawn/user/akad/detail?user_pawn_id=${id}`, akadDetailFetcher);
  const loading = !data && !error;
  const resAkadDetail = data;  
  return {
    loading,
    resAkadDetail
  }
}

const akadDownloadFetcher = async (url) => {
  return await GET(url,{},getToken(),"",true);
}
export const useAkadDonwload = (id) => {
  const {data, error} = useSWR(`/pawn/akad/download/${id}`, akadDownloadFetcher);
  const loading = !data && !error;
  const resAkadDownload = data?.data;  
  return {
    loading,
    resAkadDownload
  }
}

const pawnCalculateFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const usePawnCalculate = (weight, dayCount) => {
  const {data, error} = useSWR(`/pawn/user/akad?type_asset=${"GOLD"}&weight=${weight}&day_count=${dayCount}`, pawnCalculateFetcher);
  const loading = !data && !error;
  const resAkadCalculate = data?.data;  
  return {
    loading,
    resAkadCalculate
  }
}


const provinsiFetcher = async (url) => {
  return await GET(url,{},getToken());
}
export const useProvinsi = () => {
  const {data, error} = useSWR("/address/provinces", provinsiFetcher);
  const loadingProvinsi = !data && !error;
  const resProvinsi = [];
  data?.data?.forEach((e)=>{
    resProvinsi.push({label:e?.province_name.toUpperCase(), value:e?.roprovince_id});
  });
  return{
    loadingProvinsi,
    resProvinsi
  }
}

export const useKota = async (id) => {
  const res = await GET(`/address/cities/${id}`,{},getToken());
  const data = [];
  res?.data?.forEach((e)=>{
    data.push({label:e?.city_name.toUpperCase(), value:e?.rocity_id});
  });  
  return data;
}


export const useDesa = async (id) => {
  const res = await GET(`/address/subdistrict/${id}`,{},getToken());
  const data = [];
  res?.data?.forEach((e)=>{
    data.push({label:e?.subdistrict_name.toUpperCase(), value:e?.subdistrict_id});
  });
  return data;
}


export const statusUserHandler = async () => {  
  const res = await GET('/user/information', {}, getToken());
  if(res == null) return;
  setUserLogin(res?.data?.name)
  setReferal(res?.data?.referral_code)
  setEmailUserLogin(res?.data?.email)
  return res?.data.status;
}
export const getAsset = async () => {  
  const res = await GET('/asset', {}, getToken());
  if(res == null) return;
  setWadiah(res?.data?.WADIAH)
  // setReferal(res?.data?.referral_code)
  return res?.data;
}
export const getUserPhone = async () => {  
  try {
    const res = await GET('/user/phone', {}, getToken())    
    return res?.data?.phone?.toString()
  } catch (error) {
    return ""
  }  
}

export const checkUserStatusHandler = async () => {
  const statusUser = await statusUserHandler();
  switch (statusUser) {
    case "REGISTERED"  :     
      return 1;      
    case "EMAIL_VERIFIED":
      return 2;      
    case "DETAIL_REVIEW":
      return 3;
    case "DETAIL_VERIFIED":
      return 4;
    case "BANNED":
      return 5;      
    case "SUSPENDED":
      return 6;
    default : 
      return 0;
  }  
}

export const getStatusPinHandler = async (pin) => {  
  const res = await GET('/user/pin', {}, getToken());
  if(res == null) return false;
  if(!res?.data?.verified) return false;
  else {
    if(res?.data?.pin == pin) return true;
    return true;
  }
}

export const alamatUserFetcher = async (url) => {
  return await GET(url, {}, getToken())
}
export const useAlamatUser = () => {
  const {data, error} = useSWR("/alamat", alamatUserFetcher)
  const loadingAlamatUser = !data && !error  
  const resAlamatUser = []
  data?.data?.forEach((e)=>{
    resAlamatUser.push({label:e?.shipment_title+" - "+e?.shipment_district, value:e?.rajaongkir_subdistrict_id});
  });  
  return{
    loadingAlamatUser,
    resAlamatUser,
    error
  }
}
const fetcherRekap = async (url) => {  
  return await GET(url, {});
}

export function useRekap() {  
  const {data, error} = useSWR("/product/rekap", fetcherRekap);
  const loading = !data && !error;
  const result = data?.data;  
  return {
    loading,
    result
  }
}
const fetcherAsset = async (url) => {  
  return await GET(url, {}, getToken());
}

export function useAsset() {  
  const {data, error} = useSWR("/asset", fetcherAsset);
  const loading = !data && !error;
  const result = data?.data;  
  return {
    loading,
    result
  }
}
const fetcherProduk = async (url) => {  
  return await GET(url, {}, getToken());
}

export function useProduk() {  
  const {data, error} = useSWR("/asset/portofolio", fetcherProduk);
  const loadingProduk = !data && !error;
  const resultProduk = data?.data;
  const resultProdukFirst = data?.data[0];  
  return {
    loadingProduk,
    resultProduk,
    resultProdukFirst
  }
}
const fetcherNews = async (url) => {
  return await GET(url);
}

export function useNews(tipe,limit,offset,page){  
  const {data, error} = useSWR(`/articles?category=${tipe}&limit=${limit}&offset=${offset}&page=${page}`, fetcherNews);
  const loadings = !data && !error;
  const results = data?.data; 
   
   
  return {
    loadings,
    loadingNews : loadings, 
    results
  }
}

const fetcherEvent = async (url) => {
  return await GET(url);
}

export function useEvent(limit,offset,page){  
  const {data, error} = useSWR(`/news?banner_type=news&limit=${limit}&offset=${offset}&page=${page}`, fetcherEvent);
  const loadings = !data && !error;
  const resultsEvent = data?.data; 
   
   
  return {
    loadings,
    loadingEvents : loadings, 
    resultsEvent
  }
}

const fetcherNewsEvent = async (url) => {
  return await GET(url);
}

export function useNewsEvent(limit,offset,page){  
  const {data, error} = useSWR(`/news?banner_type=events&limit=${limit}&offset=${offset}&page=${page}`, fetcherNewsEvent);
  const loadings = !data && !error;
  const results = data?.data; 
   
   
  return {
    loadings,
    loadings : loadings, 
    results
  }
}

const productFetcher = async (url) => {
  const getProduct = await GET(url);  
  // localStorage.setItem('products-sell', JSON.stringify(getProduct?.data));
  return getProduct;
}

export function useProductsSell() {  
  
  const { data, mutate, error } = useSWR('/product/retail', productFetcher);  
  
  const loading = !data && !error;
  
  const loading2 = !data && !error;

  let resultProduct = data?.data;

  let limitProductSell = []

  resultProduct?.forEach((e,i)=>{
    if(i < 3){
      limitProductSell.push(e)
    }    
  })
  
  return {
    loading,
    loading2,
    loadingProductSell : loading,
    error,    
    data : resultProduct,    
    limitProductSell,
    mutate,    
  };
}

const productFetcherWeb = async (url) => {
  const getProduct = await GET(url?.split("-")[0]);
  // localStorage.setItem('products', JSON.stringify(getProduct?.data));
  return getProduct;
}

export function useProductsWeb(limit,offset,page,search,tipe) {  
  
  search = (search||"")
  tipe = (tipe||"")

  const { data, mutate, error } = useSWR(`/product/listweb?limit=${limit}&offset=${offset}&page=${page}-${search}-${tipe}`, productFetcherWeb);      
  const notFoundProductInvest = (data?.data?.data?.length === 0) || (data?.data?.data == null)       
  const loading = !data && !error;  
  let resultProduct = [];       
  
  if(search !== "" && search?.length > 3 || tipe !== ""){
    const tmp = new RegExp(search, 'ig')    
    data?.data?.data?.forEach((data)=>{      
      if(tmp.test(data?.product_title)){
        if(tipe === "ALL"){
          resultProduct.push(data)  
        }else if(tipe === data?.status){
          resultProduct.push(data)  
        }
      }
    })      
  }  
  else{
    resultProduct = data?.data?.data
  }

  return {
    error,    
    mutate,        
    notFoundProductInvest,
    dataProduct:resultProduct,        
    loadingProduct:loading,    
  };
}

const productRetailDetail = async (url) => {
  const res = await GET(url)
  return res
}

export function useProductRetailDetail(id){
  const {data, mutate, error} = useSWR(`/product/retail/detail?property_retail_id=${id}`, productRetailDetail)
  const loadingProductRetailDetail = !data && !error
  const notFoundProductRetailtDetail = data?.data == null
  return{
    mutateProductRetailDetail : mutate,
    resProductRetailDetail : data?.data,
    loadingProductRetailDetail,
    notFoundProductRetailtDetail
  }
}


const productInvestmentDetail = async (url) => {
  const res = await GET(url)
  return res
}

export function useProductInvestDetail(id){
  const {data, mutate, error} = useSWR(`/product/detail/${id}`, productInvestmentDetail)
  const loadingProductInvestDetail = !data && !error
  const notFoundProductInvestDetail = data?.data[0] == null
  return{
    mutateProductInvestDetail : mutate,
    resProductInvestDetail : data?.data[0],
    loadingProductInvestDetail,
    notFoundProductInvestDetail
  }
} 

const userInformationDetailFetcher = async (url) => {
  const res = await GET(url, {}, getToken())
  return res
}

export function useUserInformationDetail(){
  const {data, error, mutate} = useSWR("/user/information/detail", userInformationDetailFetcher)
  const loadingUserInformationDetail = !data && !error
  const notFoundUserInformationDetail = data?.data == null
  return{
    resUserInformationDetail : data?.data,
    mutate,
    loadingUserInformationDetail,
    notFoundUserInformationDetail
  }
}
