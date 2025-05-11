/**
 * Validates product data according to specified business rules
 *
 * @function ProductValidation
 * @description Validates all fields of a product object including title, description,
 *              image URL, and price. Returns an error object with validation messages.
 *
 * @param {IProductValidation} product - The product object to validate
 * @param {string} product.title - Product title (10-80 characters)
 * @param {string} product.description - Product description (10-900 characters)
 * @param {string} product.imageURL - Valid image URL (must match URL pattern)
 * @param {string} product.price - Product price (must be a valid number)
 *
 * @returns {IProductValidation} An error object with validation messages for each field.
 *                              Empty strings indicate valid fields.
 *
 * @example
 * const product = {
 *   title: "Test Product",
 *   description: "Test description",
 *   imageURL: "https://example.com/image.jpg",
 *   price: "19.99"
 * };
 *
 * const errors = ProductValidation(product);
 * if (Object.values(errors).some(error => error !== "")) {
 *   // Handle validation errors
 * }
 */

import { IProductValidation } from "../interface";

export const ProductValidation = (product: IProductValidation) => {
  const validURL = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i;

  const errors: IProductValidation = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  // Title validation
  if (!product.title.trim()) {
    errors.title = "Product title is required!";
  } else if (product.title.length < 10 || product.title.length > 80) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }

  // Description validation
  if (!product.description.trim()) {
    errors.description = "Product description is required!";
  } else if (
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters";
  }

  // Image URL validation
  if (!product.imageURL.trim()) {
    errors.imageURL = "Image URL is required!";
  } else if (!validURL.test(product.imageURL)) {
    errors.imageURL =
      "Please enter a valid image URL (must start with http/https and end with .png, .jpg, etc.)";
  }

  // Price validation
  if (!product.price.trim()) {
    errors.price = "Price is required!";
  } else if (isNaN(Number(product.price))) {
    errors.price = "Price must be a valid number";
  } else if (Number(product.price) <= 0) {
    errors.price = "Price must be greater than 0";
  } else if (!product.title.replace(/\s/g, "").length) {
    errors.title = "Title cannot be only whitespace";
  }
  // For price - maximum value check
  else if (Number(product.price) > 1000000) {
    errors.price = "Price must be less than 1,000,000";
  }

  return errors;
};
