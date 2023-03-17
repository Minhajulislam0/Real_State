import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

export default function Listing() {
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: "1",
    bathrooms: "1",
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountPrice,
    latitude,
    longitude,
    images,
  } = formData;
  const onChange = (e) => {
    let boolean = null;
    // for Boolean data
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // for Image data
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // text/ boolean/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (discountPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted Price Needs To Be Less Than Regular Price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Six(6) Images Are Allowed");
      return;
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create Listing</h1>
      <form onSubmit={onSubmit}>
        {/* Sell / Rent */}

        <p className=" text-lg mt-6 font-semibold ">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } `}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } `}
          >
            Rent
          </button>
        </div>

        {/* name */}

        <p className="text-lg mt-6 font-semibold ">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          maxLength="32"
          minLength="6"
          required
          onChange={onChange}
          className="w-full rounded bg-white border-gray-400 text-lg transition ease-in-out"
        />

        {/* beds & bath */}

        <div className="flex w-7/12">
          <div className="mr-3">
            <p className="text-lg mt-6 font-semibold ">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              min="1"
              max="10"
              required
              onChange={onChange}
              className="text-center font-semibold w-full rounded bg-white border-gray-400 text-lg transition ease-in-out"
            />
          </div>
          <div className="ml-3">
            <p className="text-lg mt-6 font-semibold ">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              min="1"
              max="10"
              required
              onChange={onChange}
              className=" text-center font-semibold w-full rounded bg-white border-gray-400 text-lg transition ease-in-out"
            />
          </div>
        </div>

        {/* parking Spot */}

        <p className=" text-lg mt-6 font-semibold ">Parking Spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            } `}
          >
            yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            } `}
          >
            no
          </button>
        </div>

        {/* furnishd */}

        <p className=" text-lg mt-6 font-semibold ">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            } `}
          >
            yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            } `}
          >
            no
          </button>
        </div>

        {/* Address */}

        <p className="text-lg mt-6 font-semibold ">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          maxLength="32"
          minLength="6"
          required
          onChange={onChange}
          className="rounded w-full bg-white border-gray-400 text-lg transition ease-in-out"
        />
        {!locationEnabled && (
          <div className="flex space-x-5">
            <div className="">
              <p className="text-lg mt-6 font-semibold">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                min="-90"
                max="90"
                className=" w-full text-center font-semibold rounded bg-white border-gray-400 text-lg transition ease-in-out"
              />
            </div>
            <div className="">
              <p className="text-lg mt-6 font-semibold">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                min="-180"
                max="180"
                className="w-full text-center font-semibold rounded bg-white border-gray-400 text-lg transition ease-in-out"
              />
            </div>
          </div>
        )}
        {/* Description */}

        <p className="text-lg mt-6 font-semibold ">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          placeholder="Description"
          maxLength="32"
          minLength="6"
          required
          onChange={onChange}
          className="w-full rounded bg-white border-gray-400 text-lg transition ease-in-out"
        />

        {/* Offer */}

        <p className=" text-lg mt-6 font-semibold ">Offer</p>
        <div className="flex">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            } `}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            } `}
          >
            no
          </button>
        </div>

        {/* Regular Price */}

        <div className="">
          <p className="text-lg mt-6 font-semibold ">Regular Price</p>
          <div className="flex justify-center items-center space-x-4">
            <input
              type="number"
              id="regularPrice"
              value={regularPrice}
              min="100"
              max="1000000"
              required
              onChange={onChange}
              className="w-full text-center font-semibold rounded bg-white border-gray-400 text-lg transition ease-in-out"
            />
            {type === "rent" && (
              <div className="text-md w-full whitespace-nowrap">
                {" "}
                <p>$ / Month</p>{" "}
              </div>
            )}
          </div>
        </div>

        {/* discounted price */}

        {offer && (
          <div className="mb-6">
            <p className="text-lg mt-6 font-semibold ">Discount Price</p>
            <div className="flex justify-center items-center space-x-4 ">
              <input
                type="number"
                id="discountPrice"
                value={discountPrice}
                min="100"
                max="1000000"
                required
                onChange={onChange}
                className="w-full text-center font-semibold rounded bg-white border-gray-400 text-lg transition ease-in-out"
              />
              {type === "rent" && (
                <div className="text-md w-full whitespace-nowrap">
                  {" "}
                  <p>$ / Month</p>{" "}
                </div>
              )}
            </div>
          </div>
        )}

        {/* image */}

        <div className=" mb-6">
          <p className="text-lg font-semibold ">Images</p>
          <p className="text-gray-500">
            The first image will be the cover (max 6).
          </p>

          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-400 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded font-semibold uppercase transition duration-150 ease-in-out shadow-md active:bg-blue-800 mb-6 "
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}
