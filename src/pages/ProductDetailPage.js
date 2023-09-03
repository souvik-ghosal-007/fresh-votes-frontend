import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentDialog from "../components/ContentDialog";
import DescriptionEditDialog from "../components/DescriptionEditDialog";
import Features from "../components/Features";
import NameEditDialog from "../components/NameEditDialog";
import PublishedDialog from "../components/PublishedDialog";

const ProductDetailPage = () => {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [product, setProduct] = useState({
    description: "",
    features: [],
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [openNameEditDialog, setOpenNameEditDialog] = useState(false);
  const [openDescriptionEditDialog, setOpenDescriptionEditDialog] =
    useState(false);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);

  const getProduct = () => {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(data);

        setProduct(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getProduct();
  }, []);

  function takeFirst10Words(inputString) {
    const words = inputString.split(" ");
    const first10Words = words.slice(0, 10);
    const result = first10Words.join(" ");
    return result;
  }

  return (
    <div
      className="flex flex-col items-center bg-slate-100 overflow-y-scroll"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <nav className="flex justify-around w-full py-3 items-center bg-white fixed">
        <span className="font-bold uppercase text-xl">Product Details</span>
        <div className="flex gap-4 items-center">
          {product.published ? (
            <div
              className={` bg-green-500 px-1 py-0.5 rounded`}
              onClick={() => setOpenDialog(true)}
            >
              <span className="text-sm">Published</span>
            </div>
          ) : (
            <div
              className={`bg-gray-300 px-1 py-0.5 rounded`}
              onClick={() => setOpenDialog(true)}
            >
              <span className="text-sm">Not Published</span>
            </div>
          )}
        </div>
      </nav>

      {openDialog && (
        <PublishedDialog
          productId={product.id}
          isOpen={openDialog}
          setIsOpenDialog={setOpenDialog}
          getProduct={getProduct}
          published={product.published}
        />
      )}

      <div className="flex flex-col items-start w-[60%] mt-12">
        <div className="flex flex-col m-4">
          <div className="flex items-center gap-1">
            <span className="text-sm">Name</span>
            <div onClick={() => setOpenNameEditDialog(true)}>
              <EditIcon sx={{ fontSize: "13px", cursor: "pointer" }} />
            </div>
          </div>
          <span className="text-2xl font-semibold">{product.name}</span>
        </div>

        {openNameEditDialog && (
          <NameEditDialog
            productId={product.id}
            userId={user.id}
            name={product.name}
            getProduct={getProduct}
            isOpen={openNameEditDialog}
            setIsOpenEditDialog={setOpenNameEditDialog}
          />
        )}

        <div className="flex flex-col m-4">
          <div className="flex items-center gap-1">
            <span className="text-sm">Description</span>
            <div onClick={() => setOpenDescriptionEditDialog(true)}>
              <EditIcon sx={{ fontSize: "13px", cursor: "pointer" }} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-semibold">
              {takeFirst10Words(product.description)}
            </span>
            <span> . . . </span>
            <span
              className="cursor-pointer"
              onClick={() => setOpenDescriptionDialog(true)}
            >
              read more
            </span>
          </div>
        </div>

        {openDescriptionDialog && (
          <ContentDialog
            description={product.description}
            isOpen={openDescriptionDialog}
            setIsOpenEditDialog={setOpenDescriptionDialog}
          />
        )}

        {openDescriptionEditDialog && (
          <DescriptionEditDialog
            productId={product.id}
            userId={user.id}
            description={product.description}
            getProduct={getProduct}
            isOpen={openDescriptionEditDialog}
            setIsOpenEditDialog={setOpenDescriptionEditDialog}
          />
        )}

        <div className="w-full">
          <Features product={product} getProduct={getProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
