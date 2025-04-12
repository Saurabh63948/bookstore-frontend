/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Cards({ Item, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = async () => {
    try {
      setDeleting(true);
      
      await axios.delete(`https://bookstore-backend-tcp8.onrender.com/books/${Item._id}`);
      toast.success("Book deleted successfully!");
      onDelete(Item._id); // Update UI
    } catch (error) {
      toast.error("Failed to delete book");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleTitleClick = () => {
    if (Item.pdf) {
      window.open(Item.pdf, "_blank");
    } else {
      alert("No PDF available for this book.");
    }
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card bg-base-100 w-94 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border ">
      <figure className="w-full h-[288px] overflow-hidden">
  <img
    src={Item.image}
    alt={Item.name}
    className="max-w-full h-[288px] object-cover"
  />
</figure>

        <div className="card-body">
          <h2 className="card-title cursor-pointer" onClick={handleTitleClick}>
            {Item.name}
            <div className="badge badge-secondary">{Item.category}</div>
          </h2>
          <p>{Item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${Item.price}</div>
            <button
              disabled={deleting}
              className={`badge badge-outline cursor-pointer px-2 py-1 rounded-full border-[2px] duration-200 ${
                deleting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "hover:bg-red-800 hover:text-white"
              }`}
              onClick={handleDeleteClick}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
