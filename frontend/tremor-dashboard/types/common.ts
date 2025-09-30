export interface Step {
  index: number;
  content: string;
}

export interface IMedia {
  image: string;
}

export interface CdnResponse {
  data: {
    width: number;
    height: number;
    image: ImageInfo;
  };
}

export interface ImageInfo {
  filename: string;
  url: string;
}

export interface SortItem {
  key: string;
  direction: string;
}

export type TSearchParams = {
  id?: string;
  query?: string;
  isAvailable?: string;
  status?: string;
  page?: number;
  sortBy?: string;
  orderBy?: string;
};

export interface TFieldSocial {
  name: string;
  id: string;
  label: string;
  value: string;
}
