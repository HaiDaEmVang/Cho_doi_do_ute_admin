import { SanPhamDTO } from '../../types/SanPham';
import React from 'react';
import { ImBin } from "react-icons/im";

interface TableTwoProps {
  data: SanPhamDTO[]; 
  handleEdit: (dichVu: SanPhamDTO) => void;
  deleteDichVu: (idDichVu: number) => void;
}

const TableTwo: React.FC<TableTwoProps> = ({ data, handleEdit , deleteDichVu}) => {
  
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Sản phẩm
          </h4>
        </div>

        <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Tên sản phẩm</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Danh mục</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Giá</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Số lượng</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Trạng thái</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Tùy chọn</p>
          </div>
        </div>

        {data.map((product, key) => (
          <div
            className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 hover:bg-gray-200 cursor-pointer"
            key={key}
            onClick={() =>{
              handleEdit(product);
            }}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="w-15 h-15 rounded-md overflow-hidden object-cover" >
                  <img src={product.productImgs[0].urlImg} alt="Product" />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {product.title}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.category.name}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                ${product.price}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.count}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className={`text-sm text-black  dark:text-white ${product.postProductStatus == "CHO_DUYET" ? "text-orange-500": "text-green-400"}`}>
                {product.postProductStatus}
              </p>
            </div>
            <div className="col-span-1 flex items-center group"
            onClick={(e)=>{
              e.stopPropagation();
              deleteDichVu(product.id);
             }}>
              <div className='group-hover:bg-red-300 cursor-pointer flex items-center flex-nowrap px-5 py-2 bg-red-500 text-white rounded-lg'>
              <ImBin />
              <button className='ml-2'>Xóa</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TableTwo;
