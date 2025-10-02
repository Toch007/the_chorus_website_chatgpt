// Test script to validate Firebase upload functionality
import { storage, auth } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function testFirebaseUpload() {
  try {
    console.log("Testing Firebase Storage connection...");

    // Check authentication
    const currentUser = auth.currentUser;
    console.log("Current user:", currentUser?.email || "Not logged in");

    if (!currentUser) {
      throw new Error("User not authenticated. Please log in first.");
    }

    // Create a simple text file for testing
    const testContent = "Test file upload - " + new Date().toISOString();
    const testFile = new Blob([testContent], { type: "text/plain" });

    // Create a reference
    const fileName = `test/upload-test-${Date.now()}.txt`;
    const fileRef = ref(storage, fileName);

    console.log("Uploading test file...");
    const snapshot = await uploadBytes(fileRef, testFile);

    console.log("Getting download URL...");
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("✅ Upload successful!");
    console.log("File URL:", downloadURL);

    return {
      success: true,
      url: downloadURL,
      path: fileName,
    };
  } catch (error) {
    console.error("❌ Upload failed:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Export for use in components
export default testFirebaseUpload;
