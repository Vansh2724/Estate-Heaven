import React, { useState } from "react";
import "../../styles/ListProperty/PropertyForm.css";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

interface ImageFile extends File {
  preview?: string;
}

interface FormData {
  title: string;
  description: string;
  price: number | string;
  type: string;
  for: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  ownerName: string;
  ownerContact: string;
  ownerEmail: string;
  bedrooms: number | string;
  hall: number | string;
  kitchen: number | string;
  bathrooms: number | string;
  area: number | string;
  images: ImageFile[];
}

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    type: "",
    for: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    bedrooms: "",
    hall: "",
    kitchen: "",
    bathrooms: "",
    area: "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDrop = (acceptedFiles: File[]) => {
    const validFiles: ImageFile[] = []; // Explicitly define the type
    const invalidFiles: string[] = []; // Also define the type here

    acceptedFiles.forEach((file) => {
      if (file.size <= 5 * 1024 * 1024) {
        // 5 MB limit
        validFiles.push(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) as ImageFile
        );
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(
        `Files not uploaded: ${invalidFiles.join(", ")} (Exceeds 5MB)`
      );
    }

    setFormData({ ...formData, images: [...formData.images, ...validFiles] });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 15,
    accept: {
      "image/*": [],
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = [
      "title",
      "description",
      "price",
      "type",
      "for",
      "city",
      "state",
      "pincode",
      "address",
      "ownerName",
      "ownerContact",
      "ownerEmail",
      "bedrooms",
      "hall",
      "kitchen",
      "bathrooms",
      "area",
    ];
    const emptyFields = fields.filter(
      (field) => !formData[field as keyof FormData]
    );

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
        );
      });
      return;
    }

    console.log(formData);
    // Handle form submission
  };

  return (
    <form className="real-estate-form-container" onSubmit={handleSubmit}>
      <ToastContainer />
      <h2>Real Estate Listing Form</h2>

      {/* Section: Property Details */}
      <div className="real-estate-form-section">
        <h3>Property Details</h3>
        <input
          className="real-estate-form-input"
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          className="real-estate-form-textarea"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <div className="real-estate-form-two-column">
          <input
            className="real-estate-form-input"
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <select
            className="real-estate-form-select"
            name="type"
            onChange={handleChange}
            required
          >
            <option value="">Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>
        <div className="real-estate-form-two-column">
          <select
            className="real-estate-form-select"
            name="for"
            onChange={handleChange}
            required
          >
            <option value="">For</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
          <input
            className="real-estate-form-input"
            type="number"
            name="area"
            placeholder="Area (sq ft)"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Section: Location Details */}
      <div className="real-estate-form-section">
        <h3>Location Details</h3>
        <input
          className="real-estate-form-input"
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <div className="real-estate-form-two-column">
          <input
            className="real-estate-form-input"
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
          />
          <input
            className="real-estate-form-input"
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            required
          />
        </div>
        <input
          className="real-estate-form-input"
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          required
        />
      </div>

      {/* Section: Owner Details */}
      <div className="real-estate-form-section">
        <h3>Owner Details</h3>
        <div className="real-estate-form-two-column">
          <input
            className="real-estate-form-input"
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            onChange={handleChange}
            required
          />
          <input
            className="real-estate-form-input"
            type="tel"
            name="ownerContact"
            placeholder="Owner Contact"
            onChange={handleChange}
            required
          />
        </div>
        <input
          className="real-estate-form-input"
          type="email"
          name="ownerEmail"
          placeholder="Owner Email"
          onChange={handleChange}
          required
        />
      </div>

      {/* Section: Property Specifications */}
      <div className="real-estate-form-section">
        <h3>Specifications</h3>
        <div className="real-estate-form-two-column">
          <input
            className="real-estate-form-input"
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={handleChange}
            required
          />
          <input
            className="real-estate-form-input"
            type="number"
            name="hall"
            placeholder="Hall"
            onChange={handleChange}
            required
          />
        </div>
        <div className="real-estate-form-two-column">
          <input
            className="real-estate-form-input"
            type="number"
            name="kitchen"
            placeholder="Kitchen"
            onChange={handleChange}
            required
          />
          <input
            className="real-estate-form-input"
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="real-estate-form-section">
        <h3>Upload Images (max 15)</h3>
        <div {...getRootProps({ className: "real-estate-form-dropzone" })}>
          <input {...getInputProps()} />
          <FaUpload size={40} />
          <p>Drag & drop or click to select images</p>
        </div>
        <p className="real-estate-form-image-limit">Max 15 images, 5MB each</p>
        <div className="real-estate-form-image-preview">
          {formData.images.map((file, index) => (
            <div key={index} className="real-estate-form-image-container">
              <img src={file.preview} alt="Preview" />
            </div>
          ))}
        </div>
      </div>

      <button className="real-estate-form-submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;
