
import React from 'react';
import { ImBin } from "react-icons/im";
import { DanhMucDTO } from '../../types/DanhMuc';

interface TableTwoProps {
  data: DanhMucDTO[];
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: (dichVu: DanhMucDTO) => void;
  deleteDichVu: (idDichVu: number) => void;
}

const TableTwo: React.FC<TableTwoProps> = ({ data, setIsAdd, handleEdit, deleteDichVu }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Danh mục
        </h4>
      </div>

      <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Id</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Tên</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Hình ảnh</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Tùy chọn</p>
        </div>
      </div>

      {data.map((product, key) => (
        <div
          className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5 hover:bg-gray-200 cursor-pointer"
          key={key}
          onClick={() => {
            setIsAdd(false);
            handleEdit(product);
          }}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

              <p className="text-sm text-black dark:text-white">
                {product.id}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="w-15 h-15 rounded-md overflow-hidden object-cover" >
              <img src={product.url} alt="Product" />
            </div>
          </div>

          <div className="col-span-1 flex items-center group">
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteDichVu(product.id);
              }}
              className='group-hover:bg-red-300 cursor-pointer flex items-center flex-nowrap px-5 py-2 bg-red-500 text-white rounded-lg'>
              <ImBin />
              <button className='ml-2'>Xóa</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
