import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FireBase";
import Spinner from "../Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../Components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function ListingPage() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandLord, setContactLandLord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 2000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat `,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[7%] right-[4%] z-10 bg-white border-2 border-gray-400 rounded-full cursor-pointer w-10 h-10 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-[15px] text-gray-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[12%] right-[1%] font-semibold border-2 border-gray-400 rounded-md px-1 bg-white z-10">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className="w-full ">
          <p className="text-2xl font-bold mb-3 text-yellow-600">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex justify-start items-center mt-4 mb-4 font-semibold">
            <FaMapMarkerAlt className="text-yellow-500 mr-1" />
            {listing.address}
          </p>

          <div className="flex justify-start items-center space-x-2 w-[75%] mb-2">
            <p className="bg-green-700 w-full max-w-[200px] text-center text-white px-3 py-1 cursor-pointer rounded-md font-semibold shadow-md ">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="bg-yellow-700 w-full max-w-[200px] text-center text-white px-3 py-1 cursor-pointer rounded-md font-semibold shadow-md ">
                ${listing.regularPrice - listing.discountedPrice} Discount
              </p>
            )}
          </div>
          <p className="mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 lg:space-x-10 font-semibold mb-4">
            <li className="flex items-center whitespace-normal">
              <FaBed className="text-lg mr-1" />
              {listing.bedrooms > 1 ? ` ${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-normal">
              <FaBath className="text-lg mr-1" />
              {listing.bathrooms > 1 ? ` ${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-normal">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking Available" : "Parking Not Available"}
            </li>
            <li className="flex items-center whitespace-normal">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandLord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandLord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandLord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>

        <div className="w-full z-10 overflow-x-hidden">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            height={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
