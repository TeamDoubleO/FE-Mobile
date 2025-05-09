import axios from './AxiosInstance';

//회원가입 (회원 정보 생성)
export const createMemberInfo = async (form) => {
  const response = await axios.post('/members', {
    name: form.name,
    regNo: form.rrn,
    contact: form.phone,
    email: form.email,
    password: form.pw,
  });

  return response.data;
};
