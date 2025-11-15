const baseURL = import.meta.env.VITE_API_URL_BACK || '';

export const loadImage = (imagePath: string) => {
  return `${baseURL}/uploads/${imagePath}`;
}