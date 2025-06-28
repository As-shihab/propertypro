echo "starting app"

cd server
npm run dev || { echo "Failed to start server"; exit 1; }
cd ..
cd frontend
npm run dev  || { echo "Failed to start frontend"; exit 1; }
cd ..
echo "app started"
