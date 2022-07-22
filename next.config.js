const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa :{
    disable: process.env.NODE_ENV !== 'production',
    dest : "public",
    register : true,
    skipWaiting: true,
  },  
  eslint : {
    ignoreDuringBuilds: true,  
  },
  images: {
    domains: ['apis.scproperty.id','smart.scproperty.id', "halalpedia.oss-ap-southeast-5.aliyuncs.com", "id1-cdn.pgimgs.com"],
  },
});
