/** @type {import('next').NextConfig} */
const nextConfig = {
    // React 19 এবং কড়া এরর ট্র্যাকিং নিশ্চিত করার জন্য
    reactStrictMode: true,
  
    // Three.js এবং R3F প্যাকেজগুলো Next.js App Router-এ স্মুথ চলার জন্য
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
    // Clerk, Supabase, Cloudflare R2 এবং ইউজার অবতারের ইমেজ রুলস
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
        {
          protocol: 'https',
          hostname: 'images.clerk.dev',
        },
        {
          protocol: 'https',
          hostname: '*.supabase.co',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
      ],
    },
  
    // OWASP Top 10 এবং security.md অনুযায়ী এন্টারপ্রাইজ সিকিউরিটি হেডার্স
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
          ],
        },
      ];
    },
  
    // 3D Spatial অফিসের জন্য 3D Assets (.glb, .gltf) সাপোর্ট
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(glb|gltf)$/,
        type: 'asset/resource',
      });
  
      return config;
    },
  };
  
  export default nextConfig;