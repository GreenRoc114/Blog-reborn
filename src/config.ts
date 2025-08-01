import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Ahhf45',
  subtitle: 'GreenRoc的博客',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 180,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'https://alist.ahhf45.top/d/covers/424253.jpeg?sign=ImzjPJvWft24YyIBKYrIeoQLrFayypObDSu_WctLS80=:0',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: 'Hyory Liu',              // Credit text to be displayed
      url: 'https://unsplash.com/photos/brown-wooden-gazebo-near-body-of-water-during-night-time-n4018exJ9kw'                // (Optional) URL link to the original artwork or artist's page
    }
  },
  toc: {
    enable: true,           // Display the table of contents on the right side of the post
    depth: 2                // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [    // Leave this array empty to use the default favicon
    {
      src: 'http://q1.qlogo.cn/g?b=qq&nk=3310149631@qq.com&s=640',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    {
      name: "友联",
      url: "/links/",
    },
    LinkPreset.About,
    {
      name: "联系",
      url: "/contact/",
    },
    {
      name: "21ball",
      url: "/21ball/",
    },
    {
      name: "开往",
      url: "https://www.travellings.cn/go.html",
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'http://q1.qlogo.cn/g?b=qq&nk=3310149631@qq.com&s=640',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'GreenRoc',
  bio: '生命不息，折腾不止。',
  links: [
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/GreenRoc114",
    },
    {
      name: "Bilibili",
      icon: "fa6-brands:bilibili",
      url: "https://space.bilibili.com/1558348500",
    },
    {
      name: "RSS",
      icon: "fa6-solid:rss",
      url: "/rss.xml",
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
