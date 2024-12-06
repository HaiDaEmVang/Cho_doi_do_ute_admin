import React, { useEffect, useState } from "react";
import TableTwo from "../../components/Tables/TableNhiemVu";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
import { NhiemVuDTO } from "../../types/NhiemVu";
import { IoIosAddCircle } from "react-icons/io";
import { addMisstionFromAPI, deleteMissionFromAPI, fetchMisstionFromAPI, updateMisstionFromAPI } from "../../api/fetchAPINhiemVu";

const DichVu: React.FC = () => {
  const [data, setData] = useState<NhiemVuDTO[]>([]);
  const [dataView, setDataView] = useState<NhiemVuDTO[]>([]);
  const [status, setStatus] = useState("Tất cả");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [overlay, setOverlay] = useState(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const [missionTypeData, setmissionTypeData] = useState<string>("Ngày");

  const [formValues, setFormValues] = useState<NhiemVuDTO>({
    id: 0,
    name: "",
    description: "",
    point: 0,
    missionType: "NGAY"
  });

  const handleEdit = (value: NhiemVuDTO) => {
    setFormValues({
      id: value.id,
      name: value.name,
      description: value.description,
      missionType: value.missionType,
      point: value.point
    });
    setOverlay(true);
  }

  const addDichVu = async (DichVu: NhiemVuDTO) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");

      await addMisstionFromAPI(token, DichVu);

      setData(prevData => [...prevData, DichVu]);

      setOverlay(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };
  const updateDichVu = async (DichVu: NhiemVuDTO) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");

      await updateMisstionFromAPI(token, DichVu);

      setData((prevData) =>
        prevData.map((item) => (item.id === DichVu.id ? DichVu : item))
      );

      setOverlay(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const deleteDichVu = async (idDichVu: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");
      await deleteMissionFromAPI(token, idDichVu);

      setData(prevData => prevData.filter(service => service.id !== idDichVu));

      setOverlay(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const fetchProducts = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data2 = await fetchMisstionFromAPI();
      setData(data2.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    switch (status) {
      case "Tất cả":
        setDataView(data);
        break;
      case "Ngày":
        setDataView(data.filter(item => item.missionType.toLowerCase() === "ngay"));
        break;
      case "Tháng":
        setDataView(data.filter(item => item.missionType.toLowerCase() === "thang"));
        break;
      default:
        setDataView(data.filter(item => item.missionType.toLowerCase() === "nam"));
    }
  }, [status, data]);


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setDataView(data)
  }, [data])

  useEffect(() => {
    var missionType = "NGAY";
    if(missionTypeData === 'Tháng')
      missionType =  "THANG";
    else if(missionType === "Năm") 
      missionType = "NAM";
    setFormValues({
      ...formValues,
      missionType
    })
  }, [missionTypeData])

  return (
    <>
      <div>
        {isLoading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center justify-between">
          <div className="min-w-50">
            <SelectGroupOne title="Tùy chọn" data={["Tất cả", "Ngày", "Tháng", "Năm"]} selectedOption={status} setSelectedOption={setStatus} />
          </div>
          <div className=' group-hover:bg-red-300 max-w-50 cursor-pointer flex items-center flex-nowrap px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400' onClick={() => {
            handleEdit({id: 0,
              name: "",
              description: "",
              missionType: "NGAY",
              point: 0});
            setIsAdd(true);
          }}>
            <IoIosAddCircle />
            <button className='ml-2'>Thêm giá trị</button>
          </div>
        </div>
        {dataView.length > 0 ?(<TableTwo data={dataView} setIsAdd={setIsAdd} handleEdit={handleEdit} deleteDichVu={deleteDichVu} />) : (!isLoading && <p>Không có dịch vụ nào.</p>)}
      </div>
      <div
        className={`fixed w-full h-full left-0 right-0 bottom-0 bg-[rgba(100,100,100,0.5)] z-[9999] cursor-pointer  ${overlay ? "block" : "hidden"
          }`}
        onClick={() => setOverlay(!overlay)}
      >
        <div
          className="w-[50%] mt-10 m-auto border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Nhiệm vụ</h3>
          </div>
          <div className="flex gap-5.5 p-6.5">
            <div className='flex flex-col gap-5.6 flex-4'>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Tên nhiệm vụ
                </label>
                <input
                  name='name'
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.name}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Mô tả
                </label>
                <textarea
                  name='description'
                  rows={3}
                  onChange={handleInputChange}
                  value={formValues.description}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
            </div>
            <div className='flex flex-col gap-5.6 flex-1'>
              <div>
                <SelectGroupOne title="Loại" data={["Ngày", "Tháng", "Năm"]} selectedOption={missionTypeData} setSelectedOption={setmissionTypeData} />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Điểm thưởng
                </label>
                <input
                  name='point'
                  type="number"
                  onChange={handleInputChange}
                  value={formValues.point}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div
                onClick={() => {
                  if (isAdd) {
                    formValues.id = 0;
                    addDichVu(formValues);
                  }
                  updateDichVu(formValues);
                }}
                className="inline-flex items-center mt-5 justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <span>
                  {/* Icon */}
                </span>
                Lưu thông tin
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default DichVu;
