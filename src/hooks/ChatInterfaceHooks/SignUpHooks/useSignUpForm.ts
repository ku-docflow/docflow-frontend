import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitSignUpForm } from "../../../utils/SignUpUtils/submitSignUpForm";
import { useHandleChangeName } from "../../ChatInterfaceHooks/SettingHooks/useHandleChangeName";

export const useSignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email || !password || !confirmPass) {
      setError("모든 칸을 채워주세요.");
      return;
    }
    if (password !== confirmPass) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError(null);
    setCurrentStep(1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const changeName = useHandleChangeName(firstName, lastName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitSignUpForm({
        email,
        password,
        firstName,
        lastName,
        changeName,
      });
      navigate("/");
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.message);
    }
  };

  return {
    currentStep,
    email,
    password,
    confirmPass,
    firstName,
    lastName,
    error,
    setEmail,
    setPassword,
    setConfirmPass,
    setFirstName,
    setLastName,
    handleNext,
    handlePrevious,
    handleSubmit,
  };
};
