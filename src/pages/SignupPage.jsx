import '../styles/SignupPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sign } from '../api/sign'; // 회원가입 API 호출
import buttonImage from '../images/arrow_back.png';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(''); // 에러 메시지

  const navigate = useNavigate();

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 회원가입 처리
  const handleRegister = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 여기에서 Fetch API를 호출
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const result = await response.json();

      if (result.isSuccess) {
        alert(result.message || '회원가입 성공!');
        navigate('/login'); // 회원가입 후 로그인 화면으로 이동
      } else {
        setError(result.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 요청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* 뒤로 가기 버튼 */}
      <button onClick={() => navigate(-1)} className="backButton">
        <img src={buttonImage} alt="뒤로가기" />
      </button>

      <h1 className="signup-title">회원가입</h1>

      <form className="signup-form" onSubmit={handleRegister}>
        {/* 이메일 */}
        <div className="form-group">
          <label>Email:</label>
          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label>Password:</label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            className="login-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* 이름 */}
        <div className="form-group">
          <label>Name:</label>
          <input
            className="login-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* 전화번호 */}
        <div className="form-group">
          <label>Phone:</label>
          <input
            className="login-input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* 주소 */}
        <div className="form-group">
          <label>Address:</label>
          <input
            className="login-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* 에러 메시지 */}
        {error && <p className="error-message">{error}</p>}

        {/* 회원가입 버튼 */}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Processing...' : '회원가입'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
