import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../props/LoginProps";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: center;
  gap: 15px;
  margin-top: 30px;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  input[type="text"],
  input[type="password"] {
    height: 40px;
    padding: 3px 10px;
    font-size: 20px;
  }
  input[type="text"]:focus,
  input[type="password"]:focus {
    outline: 0;
  }
`;
const Label = styled.label`
  font-family: "TheJamsil";
  font-size: 20px;
`;
const CurrentPwInput = styled.input.attrs({ type: "password" })`
  font-family: "TheJamsil";
`;
const Password = styled.input.attrs({ type: "password" })`
  font-family: "TheJamsil";
`;
const LoginBtn = styled.input.attrs({ type: "submit" })`
  height: 45px;
  font-size: 20px;
  border-radius: 10px;
  background: linear-gradient(139.68deg, #f0c268 5.07%, #fd9569 117.95%);
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
`;
const ErrorMsg = styled.p`
  font-size: 15px;
  color: #cf3939;
`;
const schema = yup
  .object({
    currentPw: yup.string().required("*비밀번호를 입력해주세요"),
    password: yup.string().required("*비밀번호를 입력해주세요"),
    passwordCheck: yup
      .string()
      .required("*비밀번호를 입력해주세요")
      .oneOf([yup.ref("password")], "*일치하지 않습니다"),
  })
  .required();
type FormProps = {
  currentPw: string;
  password: string;
  passwordCheck: string;
};
export default function LostPw() {
  const token = useRecoilValue(LoginStateAtom);
  const [inputState, setInputState] = useState<FormProps>({
    currentPw: "",
    password: "",
    passwordCheck: "",
  });
  const [currentPw, setCurrentPw] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loginState, setLoginState] = useRecoilState(LoginStateAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormProps>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormProps> = async (loginData) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginData,
      });
      setLoginState(data);
      setLoginState((prev: LoginProps) => {
        return {
          ...prev,
          state: true,
        };
      });
      navigate("/");
    } catch (e) {
      alert("아이디 또는 비밀번호가 잘못되었습니다");
    }
  };
  useEffect(() => {
    console.log(loginState);
  }, [loginState]);
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setInputState((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    if (name === ("currentPw" || "password" || "passwordCheck")) {
      trigger(name);
      if ("currentPw") {
        setCurrentPw(value);
      } else if ("password") {
        setPassword(value);
      } else if ("passwordCheck") {
        setPasswordCheck(value);
      }
    }
  };

  const changePw = async (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log(inputState)
    try {
      await axios({
        method: "patch",
        url: `/user/change/password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        data: {
          "newPassword": inputState.password,
          "newPasswordConfirm": inputState.passwordCheck,
          "presentPassword": inputState.currentPw
        },
      }).then((response) => {
        console.log(response)
        alert("비밀번호 변경이 완료되었습니다")
        navigate("/")
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Banner title="비밀번호 변경" prev />
      <Block>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Label>현재 비밀번호</Label>
              <CurrentPwInput
                {...register("currentPw")}
                name="currentPw"
                type="password"
                onInput={onInputHandler}
                placeholder="********"
              />
              <ErrorMsg>
                {errors.currentPw ? errors.currentPw.message : ""}
              </ErrorMsg>
            </InputContainer>
            <InputContainer>
              <Label>새로운 비밀번호</Label>
              <Password
                {...register("password")}
                name="password"
                type="password"
                onInput={onInputHandler}
                placeholder="********"
              />
              <ErrorMsg>
                {errors.password ? errors.password.message : ""}
              </ErrorMsg>
            </InputContainer>
            <InputContainer>
              <Label>새로운 비밀번호 확인</Label>
              <Password
                {...register("passwordCheck")}
                name="passwordCheck"
                type="password"
                onInput={onInputHandler}
                placeholder="********"
              />
              <ErrorMsg>
                {errors.passwordCheck ? errors.passwordCheck.message : ""}
              </ErrorMsg>
            </InputContainer>
            <LoginBtn
              onClick={(e) => {
                changePw(e);
              }}
              value="변경하기"
            />
          </Form>
        </Container>
      </Block>
    </>
  );
}
