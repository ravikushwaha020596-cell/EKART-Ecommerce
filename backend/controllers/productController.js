import Product  from "../models/productModel.js";
import getDataUrl from "../utils/dataUrl.js";
import cloudinary from "../utils/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    
    const { productName, productDesc, productPrice, category, brand } =
      req.body;
    const userId = req.id;
    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Handle multiple images upload
    let productImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUrl = getDataUrl(file);
        const result = await cloudinary.uploader.upload(fileUrl.content, {
          folder: "mern_products", // cloudinary folder name
        });
       productImages.push({
  URL: result.secure_url,
  public_id: result.public_id,
});
      }
    }
    // Create a product in DB
    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImage: productImages, // Array of  objects [{ url, public_id },{ url, public_id }]}
    });
    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products available",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // Delete images from Cloudinary
    if (product.productImage && product.productImage.length > 0) {
      for (let img of product.productImage) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }
    // Delete product from MongoDB
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      existingImages,
    } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updatedImages = [];
    //keep selected old images
    if (existingImages) {
      const keepIds = JSON.parse(existingImages);
      updatedImages = product.productImage.filter((img) =>
        keepIds.includes(img.public_id),
      );

      //Delete only revomved images
      const removedImages = product.productImage.filter(
        (img) => !keepIds.includes(img.public_id),
      );
      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      product.productImage = updatedImages; // keep all if nothing sent
    }

    // upload new images if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUrl = getDataUrl(file);
        const result = await cloudinary.uploader.upload(fileUrl.content, {
          folder: "mern_products",  // cloudinary folder name
        });
        updatedImages.push({
          URL: result.secure_url,
          public_id: result.public_id
        });
      }
    }
    // Update product details in DB
    product.productName = productName || product.productName;
    product.productDesc = productDesc || product.productDesc;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.productImage = updatedImages; // Updated images array
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
