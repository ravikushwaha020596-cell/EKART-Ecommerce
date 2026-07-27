import { Label } from "@/components/ui/label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setProductData((preview) => ({
        ...preview,
        productImage: [...preview.productImage, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setProductData((preview) => {
      const updateImage = preview.productImage.filter((_, i) => i !== index);
      return { ...preview, productImage: updateImage };
    });
  };

  return (
    <div className="grid gap-2">
      <Label>Product Images</Label>
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />
      <Button variant="outline">
        <label htmlFor="file-upload" className="cursor-pointer">
          Upload Images
        </label>
      </Button>

      {/* image preview */}
      {productData.productImage?.length > 0 && (
        <div className="grid grid-cols-2  gap-4 mt-3 sm:grid-cols-3">
          {productData.productImage.map((file, idx) => {
            //check if file is already a file (from input) or a DB object/staring
            let preview;
            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === "string") {
              preview = file;
            } else if (file?.URL) {
              preview = file.URL;
            } else {
              return null;
            }
            return (
              <Card key={idx} className="relative group overflow-hidden">
                <CardContent>
                  <img
                    src={preview}
                    alt=""
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  {/* remove button */}
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
