import React, { useEffect, useState } from "react";
import TableTwo from "../../components/Tables/TableTaiKhoan";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
import { fetchUsersFromAPI } from "../../api/fetchAPIUser";

const TaiKhoan: React.FC = () => {
  const [post, setPost] = useState([]);
  const [postView, setPostView] = useState([]);
  const [status, setStatus] = useState("Tất cả");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");
      
      const data = await fetchUsersFromAPI(token);
      setPost(data.data);
      setPostView(data.data)
      console.log(data.data)
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (status === "Tất cả") {
      setPostView(post);
    } else if(status == "Nguời dùng"){
      setPostView(post.filter(item => item.role === "USER"))
    }else {
      setPostView(post.filter(item => item.role !== "USER"))
    }
  }, [status]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-w-50">
        <SelectGroupOne title="Tùy chọn" data={[ "Nguời dùng", "Quản trị"]} selectedOption={status} setSelectedOption={setStatus} />
      </div>
      {post.length > 0 ? (
        <TableTwo data={postView} />
      ) : (
        !isLoading && <p>No products available.</p>
      )}
    </div>
  );
};

export default TaiKhoan;
