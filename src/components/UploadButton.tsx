import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { IconButton, Typography, Box } from "@mui/material";
import { useState } from "react";

export default function UploadButton(formData: FormData) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB in bytes

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (formData.has("picture")) {
      setErrorMessage("File already uploaded.");
      return;
    }
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "File size exceeds the 20MB limit. Please upload a smaller file."
      );
      return;
    }

    formData.append("picture", file);
    setSuccessMessage("File Uploaded!");
  };
  // setErrorMessage("");
  // setSuccessMessage("");
  // setUploadProgress(0);

  //   try {
  //     const response = await axios.post("/upload", formData, {
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round(
  //           progressEvent.total
  //             ? (progressEvent.loaded * 100) / progressEvent.total
  //             : 0
  //         );
  //         setUploadProgress(percentCompleted);
  //       },
  //     });
  //     setSuccessMessage("File uploaded successfully!");
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage("Failed to upload file. Please try again.");
  //   }
  // };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <label htmlFor="file-upload">
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <IconButton component="span" color="primary">
          <AddAPhotoIcon />
        </IconButton>
      </label>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && (
        <Typography color="primary">{successMessage}</Typography>
      )}
    </Box>
  );
}
