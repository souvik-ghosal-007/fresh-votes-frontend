import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FeatureDescriptionDialog from "../components/features/FeatureDescriptionDialog";
import FeatureDescriptionEditDialog from "../components/features/FeatureDescriptionEditDialog";
import FeatureNameEditDialog from "../components/features/FeatureNameEditDialog";

const FeatureDetailPage = () => {
  const { productId, featureId } = useParams();

  const [feature, setFeature] = useState({
    title: "",
    description: "",
  });

  const [isOpenFeatureNameEditDialog, setIsOpenFeatureNameEditDialog] =
    useState(false);
  const [
    isOpenFeatureDescriptionEditDialog,
    setIsOpenFeatureDescriptionEditDialog,
  ] = useState(false);
  const [isOpenFeatureDescriptionDialog, setIsOpenFeatureDescriptionDialog] =
    useState(false);

  const [searchParams] = useSearchParams();
  const authorised = searchParams.get("authorised");

  const getFeature = () => {
    axios
      .get(`http://localhost:8080/products/${productId}/features/${featureId}`)
      .then((res) => {
        const data = res.data;
        console.log(data);

        setFeature(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFeature();
  }, []);

  function takeFirst10Words(inputString) {
    if (inputString === null) return "";

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
        <span className="font-bold uppercase text-xl">Feature Details</span>
      </nav>

      <div className="flex flex-col items-start w-[60%] mt-12">
        <div className="flex flex-col m-4 w-full">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm">Name</span>
              <div onClick={() => setIsOpenFeatureNameEditDialog(authorised)}>
                {authorised && (
                  <EditIcon sx={{ fontSize: "13px", cursor: "pointer" }} />
                )}
              </div>
            </div>
            <div className="bg-blue-500 rounded py-1 px-2">
              <span className="capitalize font-semibold text-[#FAF9F6]">
                {feature.status}
              </span>
            </div>
          </div>
          <span className="text-2xl font-semibold">{feature.title}</span>
        </div>

        {isOpenFeatureNameEditDialog && (
          <FeatureNameEditDialog
            productId={productId}
            featureId={featureId}
            title={feature.title}
            getFeature={getFeature}
            isOpenFeatureNameEditDialog={isOpenFeatureNameEditDialog}
            setIsOpenFeatureNameEditDialog={setIsOpenFeatureNameEditDialog}
          />
        )}

        <div className="flex flex-col m-4">
          <div className="flex items-center gap-1">
            <span className="text-sm">Description</span>
            <div
              onClick={() => setIsOpenFeatureDescriptionEditDialog(authorised)}
            >
              {authorised && (
                <EditIcon sx={{ fontSize: "13px", cursor: "pointer" }} />
              )}
            </div>
          </div>
          <div>
            <span className="text-2xl font-semibold">
              {takeFirst10Words(feature.description)}
            </span>
            <span> . . . </span>
            <span
              className="cursor-pointer"
              onClick={() => setIsOpenFeatureDescriptionDialog(true)}
            >
              read more
            </span>
          </div>
        </div>

        {isOpenFeatureDescriptionDialog && (
          <FeatureDescriptionDialog
            description={feature.description}
            isOpenFeatureDescriptionDialog={isOpenFeatureDescriptionDialog}
            setIsOpenFeatureDescriptionDialog={
              setIsOpenFeatureDescriptionDialog
            }
          />
        )}

        {isOpenFeatureDescriptionEditDialog && (
          <FeatureDescriptionEditDialog
            productId={productId}
            featureId={featureId}
            description={feature.description}
            getFeature={getFeature}
            isOpenFeatureDescriptionEditDialog={
              isOpenFeatureDescriptionEditDialog
            }
            setIsOpenFeatureDescriptionEditDialog={
              setIsOpenFeatureDescriptionEditDialog
            }
          />
        )}
      </div>
    </div>
  );
};

export default FeatureDetailPage;
