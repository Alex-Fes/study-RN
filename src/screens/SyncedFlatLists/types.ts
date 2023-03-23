export type RootObject = {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: RootObjectSrc
  liked: boolean
  alt: string
}
export type RootObjectSrc = {
  original: string
  large2x: string
  large: string
  medium: string
  small: string
  portrait: string
  landscape: string
  tiny: string
}

//--------------------------
