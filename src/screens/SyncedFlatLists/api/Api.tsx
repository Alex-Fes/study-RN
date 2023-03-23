import axios from 'axios'

const API_KEY = 'viZoNRBCkktRD16S1l8KrVPIEjy69hVb63xbZJkYajCVG4IvduqjCkTp'
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20'

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Authorization: API_KEY,
  },
})

export const API_IMAGES = {
  getImages() {
    return instance.get(API_URL)
  },
}

export const fetchImagesFromPixels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })

  return await data.json()

  // console.log(result)
}
