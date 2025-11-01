import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Standalone режим для уменьшения размера деплоя
  output: 'standalone',
  
  experimental: {
    // Минимизация серверного кода
    serverMinification: true,
    serverSourceMaps: false,
    
    // Оптимизация компиляции
    optimizePackageImports: [
      'next-intl',
      'lucide-react',
      'react-icons',
      // Добавьте другие тяжелые библиотеки если используете
    ],
  },

  // Отключение source maps в продакшене
  productionBrowserSourceMaps: false,

  // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Webpack оптимизации
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Разделение на меньшие чанки
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Отдельный чанк для next-intl
            nextIntl: {
              name: 'next-intl',
              test: /[\\/]node_modules[\\/](next-intl|use-intl)[\\/]/,
              priority: 10,
            },
            // Отдельный чанк для React
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 20,
            },
          },
        },
      };
    }

    // Исключение ненужных локалей из больших библиотек
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },

  // Минимизация размера серверных функций
  compress: true,
};

export default withNextIntl(nextConfig);