/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages:['mongoose','@typegoose/typegoose']
    }, 
}

module.exports = nextConfig
