import axios from 'axios';
//192.168.0는 pc의 ip
const BASE_URL = 'http://192.168.0.225:8081';

//회원가입 (회원 정보 생성)
export const createMemberInfo = async (form) => {
  const response = await axios.post(`${BASE_URL}/members`, {
    name: form.name,
    regNo: form.rrn,
    contact: form.phone,
    email: form.email,
    password: form.pw,
  });
  return response.data;
};
