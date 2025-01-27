import mongoose from "mongoose";
const mongoURI =
  "mongodb+srv://admin1:coachon123@cluster0.8swww.mongodb.net/example?retryWrites=true&w=majority&appName=Cluster0";

const connectMongoDB = async (err) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI).then(async () => {
      console.log("Mongo connected");
      const fetchData = mongoose.connection.db.collection("institutes");
      let data = await fetchData.find({}).toArray();
      global.instituteData = data;
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default connectMongoDB;
