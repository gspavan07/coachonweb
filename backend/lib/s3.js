import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION, // Example: "us-east-1"
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to delete an old image from S3
const deleteFileFromS3 = async (fileUrl) => {
  if (!fileUrl) return;

  // Extract the file key from the URL (e.g., profiles/userid-timestamp.jpg)
  const fileKey = fileUrl.split(".amazonaws.com/")[1];

  if (!fileKey) return;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};

// Function to upload to S3
const uploadFileToS3 = async (fileBuffer, fileName, fileType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `profile_pics/${fileName}`,
    Body: fileBuffer,
    ContentType: fileType,
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/profile_pics/${fileName}`;
};
export { uploadFileToS3, deleteFileFromS3 };
