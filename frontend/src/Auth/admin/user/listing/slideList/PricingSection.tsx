import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDollarSign, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

// A simple, robust ID generator
const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
}

const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [currentPackage, setCurrentPackage] = useState<Omit<Package, "id">>({
    name: "",
    price: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePackage = () => {
    if (!currentPackage.name || !currentPackage.price) {
      alert("Package name and price are required.");
      return;
    }

    if (editingId) {
      setPackages((prev) =>
        prev.map((pkg) => (pkg.id === editingId ? { ...currentPackage, id: editingId } : pkg))
      );
      setEditingId(null);
    } else {
      const newPackage: Package = { ...currentPackage, id: generateId() };
      setPackages((prev) => [...prev, newPackage]);
    }
    
    setCurrentPackage({ name: "", price: "", description: "" });
  };

  const handleEditPackage = (pkg: Package) => {
    setCurrentPackage(pkg);
    setEditingId(pkg.id);
  };

  const handleDeletePackage = (id: string) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  return {
    packages,
    currentPackage,
    editingId,
    handleInputChange,
    handleSavePackage,
    handleEditPackage,
    handleDeletePackage,
  };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const DarkSoftUIPricing: React.FC = () => {
  const {
    packages,
    currentPackage,
    editingId,
    handleInputChange,
    handleSavePackage,
    handleEditPackage,
    handleDeletePackage,
  } = usePackages();

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-900 text-gray-200">
      <motion.div
        className="w-full max-w-4xl p-8 rounded-3xl shadow-2xl bg-gray-800 flex flex-col items-center border border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white flex items-center justify-center gap-3">
            <FaDollarSign className="text-blue-500" /> Pricing Builder
          </h2>
          <p className="text-gray-400 mt-2 text-lg">
            Create custom packages with ease.
          </p>
        </div>

        {/* Creation Form */}
        <motion.div
          className="w-full p-6 bg-gray-700 rounded-2xl shadow-xl flex flex-col gap-6"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Package Name"
              value={currentPackage.name}
              onChange={handleInputChange}
              className="flex-1 p-4 rounded-xl text-lg bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={currentPackage.price}
              onChange={handleInputChange}
              className="w-full md:w-1/3 p-4 rounded-xl text-lg bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <textarea
            name="description"
            placeholder="Describe the package..."
            value={currentPackage.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-4 rounded-xl text-lg bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          />
          <motion.button
            onClick={handleSavePackage}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlus className="inline-block mr-2" />
            {editingId ? "Update Package" : "Add Package"}
          </motion.button>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                className="relative p-6 bg-gray-700 rounded-2xl shadow-xl flex flex-col justify-between border border-gray-600"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold mb-1">{pkg.name}</h4>
                    <p className="text-3xl font-bold text-blue-500">${pkg.price}</p>
                  </div>
                  <div className="flex gap-2 text-gray-400">
                    <motion.button
                      onClick={() => handleEditPackage(pkg)}
                      className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Edit package"
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="p-2 rounded-full bg-gray-600 hover:bg-red-600 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Delete package"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{pkg.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DarkSoftUIPricing;