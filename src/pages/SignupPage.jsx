import '../styles/SignupPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sign } from '../api/sign';
import { checkDuplicateId } from '../api/checkDuplicateId';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    address: '',
  });
  const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 중복확인 여부
  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 비밀번호 일치 여부

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 입력 변화 시 관련 상태 초기화
    if (name === 'id') setIsIdChecked(false); // 아이디 변경 시 중복확인 초기화
    if (name === 'confirmPassword') setIsPasswordMatch(false); // 비밀번호 확인 초기화
  };

  const handleIdCheck = async () => {
    if (!formData.id.trim()) {
      alert('아이디를 입력하세요.');
      return;
    }

    try {
      const isDuplicate = await checkDuplicateId(formData.id);
      if (isDuplicate) {
        alert('이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
      } else {
        alert('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      }
    } catch (error) {
      alert('아이디 중복확인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handlePasswordCheck = () => {
    if (formData.password === formData.confirmPassword) {
      alert('비밀번호 일치!');
      setIsPasswordMatch(true);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
      setIsPasswordMatch(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isIdChecked) {
      alert('아이디 중복확인을 해주세요.');
      return;
    }

    if (!isPasswordMatch) {
      alert('비밀번호 확인을 완료해주세요.');
      return;
    }

    try {
      const response = await sign({
        name: formData.name,
        profile_image: '', // 프로필 이미지는 생략
        login_type: 'default',
        email: formData.id,
      });

      if (response.isSuccess) {
        alert(response.message || '회원가입 성공!');
        // 사용자 정보 로컬스토리지에 저장
        localStorage.setItem('userInfo', JSON.stringify({
          id: formData.id,
          password: formData.password,
          name: formData.name,
          nickname: formData.nickname,
        }));

        navigate('/login');
      } else {
        alert(response.message || '회원가입 실패! 다시 시도해주세요.');
      }
    } catch (error) {
      alert('회원가입 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <form className="signup-form" onSubmit={handleRegister}>

            <div className="form-group">
                <label>
                    ID:   
                    <button type="button" className="check-button" onClick={handleIdCheck}>
                    중복확인
                    </button>
                </label>
                <input
                    className='login-input'
                    type="email"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                />
            </div>

        <div className="form-group">
          <label>PW:</label>
          <input
            className='login-input'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
        <label>
            PW 확인:
            <button type="button" className="check-button" onClick={handlePasswordCheck}>
            OK
            </button>
        </label>
        <input
            className='login-input'
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
        />
        </div>  

        <div className="form-group">
          <label>이름:</label>
          <input
            className='login-input'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>닉네임:</label>
          <input
            className='login-input'
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>주소:</label>
          <input
           className='login-input'
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;
