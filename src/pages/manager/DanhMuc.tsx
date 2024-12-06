import React, { useEffect, useState } from "react";
import TableTwo from "../../components/Tables/TableDanhMuc";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
import { DanhMucDTO } from "../../types/DanhMuc";
import { IoIosAddCircle } from "react-icons/io";
import { addCategoryFromAPI, deleteCategoryFromAPI, fetchCategoryFromAPI, updateCategoryFromAPI } from "../../api/fetchAPIDanhMuc";

const DanhMuc: React.FC = () => {
  const [data, setData] = useState<DanhMucDTO[]>([]);
  const [dataView, setDataView] = useState<DanhMucDTO[]>([]);
  const [status, setStatus] = useState("Tất cả");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [overlay, setOverlay] = useState(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const [image, setImage] = useState<File | string>("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR3IDENwkVOK-OW4IbeL9uKlOkSeybRK2nlg&s");

  const [formValues, setFormValues] = useState<DanhMucDTO>({
    id: 0,
    name: "",
    url: ""
  });

  const handleEdit = (value: DanhMucDTO) => {
    setFormValues({
      id: value.id,
      name: value.name,
      url: value.url
    });
    setOverlay(true);
  }

  const addDichVu = async (DichVu: DanhMucDTO) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");

      var value = new FormData();
      value.append("name", DichVu.name);
      value.append("categoryImg", image)
      await addCategoryFromAPI(token, value);

      if(typeof image !== "string"){
        DichVu.url = URL.createObjectURL(image)
      }
      setData(prevData => [...prevData, DichVu]);

      setOverlay(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };
  const updateDichVu = async (DichVu: DanhMucDTO) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");

      var value = new FormData();
      value.append("name", DichVu.name);
      value.append("categoryImg", image)
      
      await updateCategoryFromAPI(token, value);

      if(typeof image !== "string"){
        DichVu.url = URL.createObjectURL(image)
      }
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
      await deleteCategoryFromAPI(token, idDichVu);

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
      const data2 = await fetchCategoryFromAPI();
      setData(data2.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };




  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setDataView(data)
  }, [data])

  useEffect(() => {
    setImage(formValues.url);
  }, [formValues.url])

  return (
    <>
      <div>
        {isLoading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center justify-between">
          <div className="min-w-50">
            {/* <SelectGroupOne title="Tùy chọn" data={["Người mới", "Dịch vụ"]} selectedOption={status} setSelectedOption={setStatus} /> */}
          </div>
          <div className=' group-hover:bg-red-300 max-w-50 my-2 cursor-pointer flex items-center flex-nowrap px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400' onClick={() => {
            handleEdit({ id: 0, name: "", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR3IDENwkVOK-OW4IbeL9uKlOkSeybRK2nlg&s" });
            setIsAdd(true);
          }}>
            <IoIosAddCircle />
            <button className='ml-2'>Thêm giá trị</button>
          </div>
        </div>
        {dataView.length > 0 ? (<TableTwo data={dataView} setIsAdd={setIsAdd} handleEdit={handleEdit} deleteDichVu={deleteDichVu} />) : (!isLoading && <p>Không có dịch vụ nào.</p>)}
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
            <h3 className="font-medium text-black dark:text-white">Danh mục</h3>
          </div>
          <div className="flex gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Hình ảnh
              </label>
              {typeof image === "string" ? (
                <img className="w-50 h-50 object-cover rounded-md" src={image} alt="Placeholder" />
              ) : (
                <img className="w-50 h-50 object-cover rounded-md" src={URL.createObjectURL(image)} alt="Selected Image" />
              )}

              <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  className="mt-3 w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
            </div>
            <div className="">

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Tên danh mục
                </label>
                <input
                  name='name'
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.name}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div
                onClick={() => {
                  if (isAdd) {
                    formValues.id = 0;
                    addDichVu(formValues);
                  }
                  updateDichVu(formValues)
                }}
                className="inline-flex items-center justify-center gap-2.5 mt-3 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
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

export default DanhMuc;
