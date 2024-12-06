import { UserDTO } from './user'; 
import { DanhMucDTO } from './DanhMuc';
import { ProductImg } from './productImg'; 
import { ProductVideo } from './productVideo'; 

export type SanPhamDTO = {
  id: number;
  title: string;
  description: string;
  price: number;
  timePost: string; 
  isNew: boolean;
  count: number;
  user: UserDTO; 
  category: DanhMucDTO; 
  postProductStatus: string; 
  productImgs: ProductImg[]; 
  productVideos: ProductVideo[]; 
};
