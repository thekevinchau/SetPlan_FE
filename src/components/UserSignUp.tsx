import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import SetPlanLogo2 from "../assets/SetPlanLogo2.png";
import type { UserRegistration } from "@/types/userTypes";
import { registerUser } from "@/api/users";

interface UserSignUpProps {
  setPageType: (pageType: string) => void;
}

interface validateFormDataResponse {
  field: string,
  message: string,
}

const validateFormData = (formData: UserRegistration): { field: string; message: string } | null => {
  // Email validation
  if (!formData.email || formData.email.trim() === "") {
    return { field: "email", message: "Email is required" };
  } 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return { field: "email", message: "Invalid email format" };
  }

  // Password validation
  if (!formData.password || formData.password.trim() === "") {
    return { field: "password", message: "Password is required" };
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^+=])[A-Za-z\d@$!%*#?&^+=]{8,64}$/;
  if (!passwordRegex.test(formData.password)) {
    return {
      field: "password",
      message:
        "Password must be 8-64 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
    };
  }

  // Display name validation
  if (!formData.displayName || formData.displayName.trim() === "") {
    return { field: "displayName", message: "Username is required" };
  }
  const displayNameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
  if (!displayNameRegex.test(formData.displayName)) {
    return {
      field: "displayName",
      message:
        "Username must be 3-20 characters and can only contain letters, numbers, underscores, hyphens, and periods",
    };
  }

  // Birthday validation
  if (!formData.birthday || formData.birthday.trim() === "") {
    return { field: "birthday", message: "Birthday is required" };
  }
  const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthdayRegex.test(formData.birthday)) {
    return { field: "birthday", message: "Birthday must be in YYYY-MM-DD format" };
  }

  // Phone number has no constraints
  return null; // No errors
};


export function UserSignUp({ setPageType }: UserSignUpProps) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: UserRegistration = {
      email,
      displayName,
      password,
      birthday,
      phoneNumber,
    };

    const errors: validateFormDataResponse | null = validateFormData(formData);
    if (errors){
      setErrorMsg(errors.message);
    }
    const submission = await registerUser(formData);
    if (submission.error){
      return;
    }
    setErrorMsg('');
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-white px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-2 left-2 w-20 sm:w-24 md:w-32">
        <a href="/">
          <img
            src={SetPlanLogo2}
            alt="RosterU Logo"
            className="object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-6 bg-white px-4 sm:px-6 py-6 sm:py-8 shadow-md rounded-lg">
        <div className="space-y-1 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            New Here?
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-black text-sm sm:text-base">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full border-gray-200 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-black text-sm sm:text-base"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border-gray-200 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Label
              htmlFor="username"
              className="text-black text-sm sm:text-base"
            >
              Display Name
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Display Name..."
              className="w-full border-gray-200 mt-1"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          {/* Birthday + Phone Stack on Mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor="birthday"
                className="text-black text-sm sm:text-base"
              >
                Birthday
              </Label>
              <Input
                type="date"
                id="birthday"
                className="border-gray-200 mt-1 w-full"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="phone"
                className="text-black text-sm sm:text-base"
              >
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                className="border-gray-200 mt-1 w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-2 bg-blue-500 text-white hover:opacity-80 transition-opacity duration-300"
          >
            Create Account
          </Button>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle size={20} />
            Sign Up With Google
          </Button>
        </form>

        {/* Login link */}
        <h4 className="text-sm text-muted-foreground text-center">
          Already a user?{" "}
          <button
            onClick={() => setPageType("login")}
            className="text-blue-500 underline"
            type="button"
          >
            Sign in
          </button>
        </h4>
        {errorMsg && <p className="text-xs">Error: {errorMsg}</p>}
      </div>
    </div>
  );
}
