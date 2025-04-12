import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://bookstore-backend-tcp8.onrender.com";

const AddBook = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    const bookData = {
      name: data.name,
      title: data.title,
      price: data.price,
      category: data.category,
      image: data.image,
      pdf: data.pdf,
    };

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      toast.error("Unauthorized: Token not found");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/books/add-book`, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("📚 Book added successfully!");
        reset();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add book. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg space-y-4 mt-16"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Add New Book</h2>

        {/* Book Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Book Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Book Name"
            className="w-full mt-2 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            {...register("name", { required: "Book name is required" })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* Book Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Book Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter Book Title"
            className="w-full mt-2 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            {...register("title", { required: "Book title is required" })}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Enter Price"
            className="w-full mt-2 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price must be a positive number" },
            })}
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Enter Category"
            className="w-full mt-2 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Image URL</label>
          <input
            id="image"
            type="text"
            placeholder="Enter Image URL"
            className="w-full mt-2 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            {...register("image", {
              required: "Image URL is required",
              pattern: {
                value: /^(https?:\/\/[^\s]+)$/,
                message: "Invalid URL format",
              },
            })}
          />
          {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
        </div>

        {/* PDF URL */}
        <div>
          <label htmlFor="pdf" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">PDF URL</label>
          <input
            id="pdf"
            type="text"
            placeholder="Enter PDF URL"
            className="w-full mt-2 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            {...register("pdf", {
              required: "PDF URL is required",
              pattern: {
                value: /^(https?:\/\/[^\s]+)$/,
                message: "Invalid PDF URL format",
              },
            })}
          />
          {errors.pdf && <span className="text-red-500 text-sm">{errors.pdf.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
