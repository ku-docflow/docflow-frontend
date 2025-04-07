// src/services/dummyApi.ts
export interface UserData {
  id: string;
  name: string;
  email: string;
}

// 더미 유저 데이터 예시
const dummyUserData: UserData = {
  id: "d",
  name: "d",
  email: "d@gmail.com",
};

// 간단한 지연 효과를 주는 함수
const simulateDelay = <T>(data: T, delay: number = 1000): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

// 유저 데이터를 가져오는 함수 (로컬 저장소 활용)
export const fetchUserData = async (): Promise<UserData> => {
  const localData = localStorage.getItem("userData");
  if (localData) {
    return simulateDelay(JSON.parse(localData));
  }
  // 로컬에 데이터가 없으면 더미 데이터를 저장하고 반환
  localStorage.setItem("userData", JSON.stringify(dummyUserData));
  return simulateDelay(dummyUserData);
};

// 유저 데이터를 업데이트하는 함수
export const updateUserData = async (data: UserData): Promise<UserData> => {
  localStorage.setItem("userData", JSON.stringify(data));
  return simulateDelay(data);
};
