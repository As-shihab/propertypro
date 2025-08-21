import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiX } from "react-icons/fi";
import ImageModal from "../../../../../components/MediaModel/MediaModel"; // Import the new component
import { ListingContext } from "../../../../../Context/ListingContext";

const MediaSection: React.FC = () => {
  const { uploadedImages, setUploadedImages, uploadedVideos, setUploadedVideos, isUploading, setIsUploading, uploadProgress, setUploadProgress

  } = useContext(ListingContext);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal


  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

    const newVideos = Array.from(files)
      .filter((file) => file.type.startsWith("video/"))
      .map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

    setUploadedImages((prev: any) => [...prev, ...newImages]);
    setUploadedVideos((prev: any) => [...prev, ...newVideos]);
  };


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImages((prev: string[]) =>
      prev.filter((_: string, index: number) => index !== indexToRemove)
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const maxPreviews = 3;
  const shouldShowMoreButton = uploadedImages.length > maxPreviews;
  const previewsToShow = shouldShowMoreButton ? maxPreviews : uploadedImages.length;

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <motion.div
        className="w-full max-w-6xl mx-auto bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col p-8 lg:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
            <FiUploadCloud className="text-blue-500" /> Media
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Add photos and videos to showcase your property.
          </p>
        </motion.div>

        {/* Drag and Drop Zone */}
        <motion.div
          className={`relative border-2 border-dashed rounded-2xl  p-8 text-center transition-all ${isUploading?`cursor-wait`:`cursor-pointer`} overflow-hidden ${isDragOver
            ? "border-blue-500 bg-gray-700 scale-[1.01]"
            : "border-gray-600 bg-gray-700/50"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Add this div for the animated background fill */}
          {isUploading && (
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 ease-out"
              style={{
                width: `${uploadProgress}%`,
                background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 100%)',
                zIndex: 0, // Ensure it's behind the content
              }}
            ></div>
          )}

          {/* Existing content */}
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            disabled={isUploading}
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <FiUploadCloud
            className={`w-12 h-12 mx-auto mb-4 relative z-10 transition-transform ${isDragOver ? "scale-110 text-blue-400" : "text-gray-400"
              }`}
          />
          {/* You will need to add a z-index to your p tags as well to make sure they are above the background div*/}
          <p className="text-sm text-gray-400 font-medium relative z-10">
            {isUploading ? (
              <span className="text-blue-400 font-semibold">{`Uploading... ${uploadProgress}%`}</span>
            ) : (
              <span className="text-blue-400 font-semibold">Click to upload</span>
            )}{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1 relative z-10">
            PNG, JPG, MP4 up to 10MB
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div className="mt-8">
          <AnimatePresence>
            {uploadedImages.length > 0 && (
              <motion.h3
                className="text-2xl font-semibold text-white mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Uploaded Media
              </motion.h3>
            )}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 relative"
              variants={containerVariants}
            >
              <AnimatePresence>
                {uploadedImages.slice(0, previewsToShow).map((src: any, index: number) => (
                  <motion.div
                    key={src.preview + index + 11}
                    className="relative aspect-video rounded-xl overflow-hidden group shadow-lg"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <img
                      src={src?.preview}
                      alt={`Uploaded preview ${index + 22}`}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="bg-red-500 text-white rounded-full p-2 transition-transform hover:scale-110"
                        aria-label="Remove image"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
                {/* View All Button */}
                {shouldShowMoreButton && (
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute inset-0 rounded-xl bg-gray-900/80 text-white font-bold text-xl flex items-center justify-center transition-all hover:bg-gray-700/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    View All ({uploadedImages.length})
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <ImageModal
            images={uploadedImages}
            onClose={() => setIsModalOpen(false)}
            onRemove={handleRemoveImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaSection;