import { motion } from "framer-motion";
import Dialog from "../dialogs/Dialog";

interface ImageGalleryDialogProps {
  open: boolean;
  handleClose: () => void;
}

const ImageGalleryDialog: React.FC<ImageGalleryDialogProps> = ({
  open,
  handleClose,
}) => {
  const images = [1, 2, 3, 4, 5, 6];

  return (
    <Dialog isOpen={open} title="View Images" onClose={handleClose}>
      {/* Overlay */}
      <div className="fixed " aria-hidden="true" />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full min-w-[80vw] max-w-6xl p-6 rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={`/room${img}.jpg`}
                  alt={`Room ${img}`}
                  className="object-cover h-64 w-full transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>

          {/* Close Button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleClose}
              className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Close Gallery
            </button>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
};

export default ImageGalleryDialog;
