/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api-hackathon.codedematrixtech.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;