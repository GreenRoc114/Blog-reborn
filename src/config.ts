import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'LookSky',
  subtitle: 'GreenRoc的博客',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 25,          // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/banner/iShot_2025-01-03_15.42.49-1536x860.webp',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
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
  favicon: [
    {
      src: '/favicon/avatar.jpg',
      sizes: '32x32',
    },
  ],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Archive,
    {
      name: '友联',
      url: '/links/',
      icon: 'material-symbols:share-outline',
    },
    LinkPreset.About,
    {
      name: '碎碎念',
      url: '/memos/',
      icon: 'fa6-solid:comment-dots',
    },
  ],
  moreLinks: [
    {
      name: '21ball',
      url: '/21ball/',
      icon: 'material-symbols:sports-baseball',
    },
    {
      name: '随机漫游',
      url: '/random/',
      icon: 'fa6-solid:dice',
    },
    {
      name: '开往',
      url: 'https://www.travellings.cn/go.html',
      external: true,
      icon: 'material-symbols:rocket-launch-outline',
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: '/favicon/avatar.jpg',
  name: 'GreenRoc',
  bio: '生命不息，折腾不止。',
  nowPlaying: '本周在折腾：kimi-k3 + kimi-code',
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
