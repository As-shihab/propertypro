import { motion, AnimatePresence } from "framer-motion";
import { FiLoader, FiX } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { httpClient } from "../../services/http";
import { useState } from "react";

interface ImageModalProps {
  images: string[];
  onClose: () => void;
  onRemove: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, onClose, onRemove }) => {
  const [deleteLoading, setDeletLoading] = useState(false)
  const http = new httpClient();
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  console.log(images, 'from view')


  const onDeleteMedia = async (file: any, index: number) => {
    if (file?.preview.startsWith('blob')) {
      onRemove(index)
    }
    else {
      setDeletLoading(true)
      await http.delete("/api/media", file?.file.id)
        .then(() => {
          onRemove(index)
        }).catch(() => {
          console.warn("somthing went wrong during delete")
        }).finally(() => {
          setDeletLoading(false)
        })
    }
  }

  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-95 backdrop-blur-md p-4"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative w-full h-full max-w-7xl mx-auto overflow-y-auto">
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-gray-800 text-white shadow-xl hover:bg-gray-700 transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX className="w-6 h-6" />
          </motion.button>

          <div className="pt-24 pb-8">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              All Uploaded Images
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={galleryVariants}
              initial="hidden"
              animate="visible"
            >
              {images.map((src: any, index) => (
                <motion.div
                  key={src.preview + index + 2}
                  className="relative aspect-video rounded-xl overflow-hidden group shadow-xl"
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-center w-full h-full bg-gray-100 overflow-hidden">
                    <LazyLoadImage
                      src={src?.preview.startsWith('blob') ? src?.preview : http.image + src?.file.fileName}
                      alt={`Uploaded media ${index + 3}`}
                      className="max-w-full max-h-full object-contain"
                      effect="blur"
                      placeholderSrc={src?.preview}
                    />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { onDeleteMedia(src, index) }}
                      className={`  ${deleteLoading? `bg-slate-600` : `bg-red-600`} text-white rounded-full p-3 transition-transform hover:scale-110`}
                      aria-label="Remove image"
                    >
                    {deleteLoading ? <FiLoader className="animate-spin"/> :   <FiX className="w-6 h-6" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;