import axios from 'axios';

export const checkDuplicateId = async (id) => {
  try {
    const response = await axios.post(' http://localhost:3000/api/members/login', { id });
    return response.data.isDuplicate; // 서버에서 중복 여부를 반환 (true/false)
  } catch (error) {
    console.error('중복 확인 실패:', error);
    throw new Error('중복 확인 실패');
  }
};
