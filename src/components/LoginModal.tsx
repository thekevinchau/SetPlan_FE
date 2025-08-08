import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  // Replace bgcolor with backgroundImage for gradient
  backgroundImage: "linear-gradient(to bottom, #111827, #0f172a)",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  color: "#fff",
  display: "flex",
  flexDirection: "column",
};

const gradientCircleStyle = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #f58fbc 0%, #5a87f9 100%)",
  marginRight: 12,
};
const inputBg = "linear-gradient(to bottom, #111827, #0f172a)";
const borderColor = "#4B5563"; // Tailwind gray-400 hex

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ minWidth: 120 }}>
        Open Login
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="login-title">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={style}
          noValidate
          autoComplete="off"
        >
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "#aaa",
              "&:hover": { color: "#fff" },
            }}
          ></IconButton>
          {/* Header with gradient circle */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={gradientCircleStyle} />
            <Typography
              id="login-title"
              variant="h6"
              component="h2"
              fontWeight="700"
              sx={{ userSelect: "none" }}
            >
              Log in
            </Typography>
          </Box>
          {/* Email input */}
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            sx={{
              mb: 2,
              bgcolor: inputBg,
              borderRadius: 1,
              border: `1px solid ${borderColor}`, // add border here
              "& .MuiFilledInput-root": {
                color: "#eee",
                bgcolor: inputBg,
                borderRadius: 1,
                "&:before, &:after": {
                  borderBottomColor: "transparent",
                },
                "&:hover": {
                    borderColor: "#FFFFFF"
                },
              },
              "& .MuiInputLabel-root": {
                color: "#999",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5a87f9",
              },
            }}
          />
          {/* Password input */}
          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            sx={{
              mb: 1,
              bgcolor: inputBg,
              borderRadius: 1,
              border: `1px solid ${borderColor}`,
              "& .MuiFilledInput-root": {
                color: "#eee",
                bgcolor: inputBg,
                borderRadius: 1,
                "&:before, &:after": {
                  borderBottomColor: "transparent",
                },
                "&:hover": {
                  borderColor: "#FFFFFF",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#999",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5a87f9",
              },
            }}
          />
          {/* Forgot password link */}
          <Typography
            variant="body2"
            component="a"
            href="#"
            sx={{
              mb: 3,
              color: "#5a87f9",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
              alignSelf: "flex-start",
              userSelect: "none",
            }}
          >
            Forgot password?
          </Typography>
          {/* Log in button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#5a87f9",
              fontWeight: "400",
              fontSize: "0.75rem",
              borderRadius: 2,
              py: 1,
              "&:hover": {
                backgroundColor: "#3f65d6",
              },
            }}
          >
            Log in
          </Button>
          {/* Footer */}
          <Box
            sx={{
              mt: 3,
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#999",
              userSelect: "none",
            }}
          >
            Don&apos;t have an account?{" "}
            <Typography
              component="a"
              href="#"
              sx={{
                color: "#5a87f9",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: "600",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign up
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
