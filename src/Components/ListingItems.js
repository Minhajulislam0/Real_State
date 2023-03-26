import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";

export default function ListingItems({ listing, id }) {
  return (
    <li>
      <Link to={`/category/${listing.type}/${id}`}>
        <img src={listing.imgUrls[0]} alt="" />
        <Moment fromNow>{listing.timestamp?.toDate()}</Moment>
        <div>
          <div>
            <MdLocationPin />
            <p>{listing.address}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
