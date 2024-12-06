import { ImBin } from "react-icons/im";
import { NhiemVuDTO } from '../../types/NhiemVu';
import React from "react";

interface TableTwoProps {
  data: NhiemVuDTO[];
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: (dichVu: NhiemVuDTO) => void;
  deleteDichVu: (idDichVu: number) => void;
}


const TableTwo: React.FC<TableTwoProps> = ({ data, setIsAdd, handleEdit, deleteDichVu}) => {
  
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Nhiệm vụ
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Tên Nhiệm vụ</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium text-center">Mô tả</p>
          </div>
          
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-center">Điểm</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-center">Loại</p>
          </div>
          
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Tùy chọn</p>
          </div>
        </div>

        {data.map((product, key) => (
          <div
            className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5 hover:bg-gray-200 cursor-pointer"
            key={key}
            onClick={() =>{
              setIsAdd(false);
              handleEdit(product);
            }}
          >
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white me-1">
                {product.description}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.point}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className={`text-sm text-black  dark:text-white inline-block p-2 bg-green-50 rounded-md ${product.missionType === "NGAY" ? "bg-green-50" : "bg-yellow-50" }`}>
                {product.missionType === "NGAY" ? "Ngày" : product.missionType === "THANG" ? "Tháng" : "Năm"}
              </p>
            </div>
            <div className="col-span-1 flex items-center group">
              <div
               onClick={(e)=>{
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
    </>
  );
};

export default TableTwo;
