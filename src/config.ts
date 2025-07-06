export const SITE = {
  website: "https://blog.tonek.org/", // replace this with your deployed domain
  author: "Anton Safonov",
  profile: "https://blog.tonek.org/",
  desc: "Personal site of Anton Safonov.",
  title: "Anton Safonov",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/tonek/blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "US/Pacific",
} as const;
