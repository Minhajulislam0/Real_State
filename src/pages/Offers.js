import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "./../FireBase";
import Spinner from "../Components/Spinner";
import ListingItems from "../Components/ListingItems";

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get ref
        const listingRef = collection(db, "listings");
        // create query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        // execute query
        const querySnap = await getDocs(q);
        const laseVisable = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(laseVisable);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Offer Could not Load..");
      }
    }
    fetchListings();
  }, []);

  async function onFetchMoreListings() {
    try {
      // get ref
      const listingRef = collection(db, "listings");
      // create query
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(3)
      );
      // execute query
      const querySnap = await getDocs(q);
      const laseVisable = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(laseVisable);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Offer Could not Load..");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-4">Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
            <div className="flex justify-center items-center mb-6">
              <button
                onClick={onFetchMoreListings}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mt-4 rounded hover:border-slate-600 transition duration-150 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There Are No Current Offers!</p>
      )}
    </div>
  );
}
