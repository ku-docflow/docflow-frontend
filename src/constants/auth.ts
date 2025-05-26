export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ANIMATION_DURATION = 600; // milliseconds

export const ERROR_MESSAGES = {
  LOGIN_FAILED: "로그인 실패: 이메일 또는 비밀번호를 확인해주세요.",
  GOOGLE_LOGIN_FAILED: "Google 로그인 실패",
  ALL_FIELDS_REQUIRED: "모든 칸을 채워주세요.",
  PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
} as const;
