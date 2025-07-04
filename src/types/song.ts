export type Song = {
  country: string,
  flag: string,
  title: string,
  author: string,
  links: SongLinks,
  colors: string[],
  result: string
}

export type SongLinks = {
  youtube: string,
  spotify: string
}
