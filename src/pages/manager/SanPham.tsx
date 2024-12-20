import React, { useEffect, useState } from "react";
import TableTwo from "../../components/Tables/TableSanPham";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
import { SanPhamDTO } from "../../types/SanPham"; "../../api/fetchAPINhiemVu";
import { UserDTO } from "../../types/user";
import { DanhMucDTO } from "../../types/DanhMuc";
import { deleteProduct, fetchProductsFromAPI, updateStatusProduct } from "../../api/fetchAPISanPham";

const DichVu: React.FC = () => {
  const [data, setData] = useState<SanPhamDTO[]>([]);
  const [dataView, setDataView] = useState<SanPhamDTO[]>([]);
  const [status, setStatus] = useState("Tất cả");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [overlay, setOverlay] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [isImage, setIsImage] = useState<boolean>(true);


  const [formValues, setFormValues] = useState<SanPhamDTO>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    timePost: "",
    isNew: true,
    count: 0,
    user: {} as UserDTO,
    category: {} as DanhMucDTO,
    postProductStatus: "",
    productImgs: [],
    productVideos: [],
  });

  const handleEdit = (value: SanPhamDTO) => {
    setFormValues(value);
    setOverlay(true);
  }


  const updateProduct = async (DichVu: SanPhamDTO, valueStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");

      await updateStatusProduct(token, valueStatus, DichVu.id);

      DichVu.postProductStatus = valueStatus;
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
      await deleteProduct(token, idDichVu);

      setData(prevData => prevData.filter(service => service.id !== idDichVu));

      setOverlay(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };



  const fetchProducts = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");
      const data2 = await fetchProductsFromAPI(token);
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
      case "Đã duyệt":
        setDataView(data.filter(item => item.postProductStatus === "DA_DUYET"));
        break;
      case "Từ chối":
        setDataView(data.filter(item => item.postProductStatus === "DA_TUCHO"));
        break;
      case "Chờ duyệt":
        setDataView(data.filter(item => item.postProductStatus === "CHO_DUYET"));
        break;
      default:
        setDataView(data.filter(item => item.postProductStatus === "DA_AN"));
    }
  }, [status, data]);


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setDataView(data.filter(item => item.id < 10))
  }, [data])

  useEffect(() => {
    if (formValues.productImgs !== null && formValues.productImgs.length > 0)
      setUrl(formValues.productImgs[0].urlImg)
  }, [formValues])

  useEffect(() => {
    if (!overlay)
      setIsImage(true);
  }, [overlay])

  return (
    <>
      <div>
        {isLoading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center justify-between">
          <div className="min-w-50">
            <SelectGroupOne title="Tùy chọn" data={["Tất cả", "Đã duyệt", "Từ chối", "Chờ duyệt", "Đã ẩn"]} selectedOption={status} setSelectedOption={setStatus} />
          </div>
          {/* <div className=' group-hover:bg-red-300 max-w-50 cursor-pointer flex items-center flex-nowrap px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400' onClick={() => {
            handleEdit({id: 0,
              name: "",
              description: "",
              postProductStatus: "NGAY",
              point: 0});
            setIsAdd(true);
          }}>
            <IoIosAddCircle />
            <button className='ml-2'>Thêm giá trị</button>
          </div> */}
        </div>
        {dataView.length > 0 ? (<TableTwo data={dataView} handleEdit={handleEdit} deleteDichVu={deleteDichVu} />) : (!isLoading && <p>Không có dịch vụ nào.</p>)}
      </div>
      <div
        className={`fixed w-full h-full left-0 right-0 bottom-0 bg-[rgba(100,100,100,0.5)] z-[9999] cursor-pointer  ${overlay ? "block" : "hidden"}`}
        onClick={() => setOverlay(!overlay)}
      >
        <div
          className="w-[50%] mt-10 m-auto border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Sản phẩm</h3>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="p-4">
              <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {formValues.productImgs.map((item, key) => (
                  <img key={key} className="w-20 h-20 rounded-lg shadow-md cursor-pointer object-cover" height="80"
                    onClick={() => {
                      setUrl(item.urlImg)
                      setIsImage(true);
                    }}
                    src={item.urlImg || ""} width="80" />
                ))}
              </div>
              <div className="mt-4">
                {formValues.productVideos.map((item, key) => {
                  return (
                    <video
                      key={key}
                      onClick={() => {
                        console.log(item.videoUrl);
                        setUrl(item.videoUrl);
                        setIsImage(false);
                      }}
                      className="w-20 h-20 rounded-lg shadow-md"
                      height="20"
                      width="20"
                    >
                      <source src={item.videoUrl || ""} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  );
                })}
              </div>
            </div>

            {isImage ? (
              <div className="p-4">
                <img alt="" className="w-[250px] h-[250px] rounded-lg shadow-md object-cover" src={url || ""} />
              </div>
            ) : (
              <div className="p-4">
                <video className="w-[250px] h-[250px] rounded-lg shadow-md" height="250" width="250" controls>
                  <source src={url || ""} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="md:w-1/2 p-4">
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">
                    Name
                  </label>
                  <input
                    value={formValues.title}
                    onChange={() => { }}
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 " type="text" />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Danh mục
                  </label>
                  <input
                    value={formValues.category.name} onChange={() => { }} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" name="email" type="text" />
                </div>
                <div>
                  <label className="block text-gray-700" >
                    Giá
                  </label>
                  <input
                    value={formValues.price} onChange={() => { }} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" id="phone" name="phone" type="number" />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Số lượng
                  </label>
                  <input value={formValues.count} onChange={() => { }} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" />
                </div>
                <div className="flex gap-4">
                  {formValues.postProductStatus === "CHO_DUYET" ? (
                    <div
                      onClick={() => {
                        updateProduct(formValues, "DA_DUYET");
                      }}
                      className="text-center w-full p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Duyệt
                    </div>
                  ) : ("")}

                  <div
                    onClick={() => {
                      updateProduct(formValues, "TU_CHOI");
                    }}
                    className="text-center w-full p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                    Từ chối
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default DichVu;
