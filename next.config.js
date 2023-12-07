/** @type {import('next').NextConfig} */
const nextConfig = {
    middleware: true,
    images: {
       domains: [
         "res.cloudinary.com"
       ]
    }
   }
   
   module.exports = nextConfig