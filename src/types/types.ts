export interface Card {
  id: number,
  code: string,
  name: string,
  address: string,
  published: boolean,
  images: Images[],
};

export interface Images {
id: number,
url: string,
file?: File,
}