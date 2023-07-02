import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { createNewStreamer } from "../../api/createNewStreamer";
import * as Yup from "yup";
import { Platform } from "../../lib/types/Platforms";
import { ErrorAlert } from "../common/ErrorAlert";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorInfo } from "../common/ErrorInfo";

export const StreamerSubmissionForm = () => {
  const {
    mutate: createNewStreamerMutation,
    isSuccess,
    isError,
    reset,
  } = useMutation(createNewStreamer, {
    onSuccess: () => {
      toast.success(
        `Congratulations! You have successfully added a new streamer.`,
        {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      streamerName: "",
      platform: Platform.YouTube,
      description: "",
    },
    validationSchema: Yup.object({
      streamerName: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(20, "Must be less than 20 characters")
        .required("This field is required"),
      platform: Yup.string()
        .oneOf(Object.values(Platform))
        .required("This field is required"),
      description: Yup.string()
        .min(10, "Must be at least 10 characters")
        .required("This field is required"),
    }),
    onSubmit: (values) => {
      createNewStreamerMutation({
        streamerName: values.streamerName,
        platform: Platform[values.platform],
        description: values.description,
      });
    },
  });

  const handlePlatformChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    formik.setFieldValue("platform", value);
  };

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      reset();
    }
  }, [isSuccess, formik, reset]);

  return (
    <Container>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Add a new streamer</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Streamer name"
              fullWidth
              id="streamerName"
              name="streamerName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streamerName}
              inputProps={{ "data-testid": "streamerNameInput" }}
            />
            {formik.errors.streamerName && formik.touched.streamerName && (
              <ErrorInfo error={formik.errors.streamerName} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="platform-select"
              id="platform"
              name="platform"
              label="Platform"
              onChange={handlePlatformChange}
              onBlur={formik.handleBlur}
              value={formik.values.platform}
              sx={{ width: "100%" }}
              inputProps={{ "data-testid": "platformSelect" }}
            >
              <MenuItem value="Twitch">Twitch</MenuItem>
              <MenuItem value="YouTube">YouTube</MenuItem>
              <MenuItem value="TikTok">TikTok</MenuItem>
              <MenuItem value="Kick">Kick</MenuItem>
              <MenuItem value="Rumble">Rumble</MenuItem>
            </Select>
            {formik.errors.platform && formik.touched.platform && (
              <ErrorInfo error={formik.errors.platform} />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Streamer description"
              fullWidth
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              inputProps={{ "data-testid": "streamerDescriptionInput" }}
            />
            {formik.errors.description && formik.touched.description && (
              <ErrorInfo error={formik.errors.description} />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              data-testid="submitBtn"
            >
              Submit
            </Button>
          </Grid>
          {isError && (
            <ErrorAlert>
              Oops! Something went wrong. Please try again.
            </ErrorAlert>
          )}
        </Grid>
      </form>
    </Container>
  );
};
