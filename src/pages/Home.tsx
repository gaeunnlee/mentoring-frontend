import styled from "styled-components";
import Block from "../components/Block";
import HomeBanner from "../components/Banner/HomeBanner";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { HiUserCircle } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Paging from "../components/Paging";
import { LoginProps } from "../props/LoginProps";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 10px 0;
`;
const TopContainer = styled.div`
  padding: 20px 10px 10px 10px;
  background-color: #f2f2f2;
  border-radius: 10px 10px 0 0;
  display: flex;
  gap: 3px;
`;
const ProfileSvg = styled.p`
  svg {
    font-size: 55px;
    color: #969696;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 100%;
`;

const TeamName = styled(Link)`
  font-size: 17px;
  font-weight: bold;
`;
const Mission = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  font-size: 14px;
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
`;

const MissionContainer = styled.div`
  display: flex; 
  gap: 7px;
  align-items: center;
`
const MissionStatus = styled.span`
  svg {
    font-size: 18px;
  }
`;
const ProgressStatus = styled.span`
  color: #ff6a6a;
  svg {
    font-size: 15px;
  }
`;
const CompleteStatus = styled.span`
  color: #609ad3;
`;
const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const ImgItem = styled.div``;
const Img = styled.img`
  width: 100%;
`;
const ContentContainer = styled.div`
  padding: 15px 20px 15px 20px;
  background-color: #f2f2f2;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  svg {
    font-size: 28px;
  }
`;
const Score = styled.span`
  font-size: 18px;
`;
const Content = styled.div`
  line-height: 25px;
`;
const ContentTeam = styled.span`
  font-weight: bold;
  margin-right: 7px;
`;
const ContentTitle = styled.span``;
const ContentBody = styled.p`
  line-height: 125%;
`;
const ContentDate = styled.p`
  margin-top: 2px;
  font-size: 15px;
  color: #8a8a8a;
`;
const AdminContainer = styled.form`
  display: flex;
  gap: 15px;
`;
const AdminScore = styled.input`
  width: 30px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const ScoreRegister = styled.button`
  &:hover {
    cursor: pointer
  }
`;

interface PostProps {
  date: string;
  id: number;
  missionName: string;
  status: string;
  teamName: string;
  title: string;
  totalScore: number;
  registerFiles: [];
  body: string;
  teamId: number;
}

interface PageProps {
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
}

export default function Home() {
  const loginInfo = useRecoilValue(LoginStateAtom);
  const setLogin = useSetRecoilState(LoginStateAtom);
  const [post, setPost] = useState<PostProps[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageProps>({
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
  });
  const limit = 10;
  const token = useRecoilValue(LoginStateAtom);
  const location = useLocation();
  let currentPage = Number(location.search.split("=")[1]);
  const navigate = useNavigate();
  const [score, setScore] = useState(0)
  const axiosUrl = (token.name === "관리자") ? "/register/progress" : "/register" 

  useEffect(() => {
    if (isNaN(currentPage)) {
      getPost(1);
    } else {
      getPost(Number(currentPage));
    }
  }, [location]);
  useEffect(() => {
    getPost(Number(currentPage));
  }, []);

  const getPost = (pageNum: number) => {
    setPost([])
    if (isNaN(pageNum)) {
      pageNum = 1;
    }
    if (token.name === "관리자") {
      axios({
        method: "get",
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        },
        url: `/register/progress/?page=${pageNum}&size=${limit}`,
      }).then(function (response) {
        setPageInfo((prev: any) => ({
          ...prev,
          pageSize: response.data.pageSize,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
          pageNumber: response.data.pageNumber,
        }));
        setPageNum(response.data.pageNumber);
        setPost(response.data.content);
      }).catch((e) => {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.")
          setLogin((prev: LoginProps) => {
            return {
              state: false,
              accessToken: "",
              refreshToken: "",
              name: "",
              studentId: "",
              teamName: "",
            };
          });
          navigate("/login")          
      })
    }
    else {
      axios({
        method: "get",
        url: `/register/?page=${pageNum}&size=${limit}`,
      }).then(function (response) {
        setPageInfo((prev: any) => ({
          ...prev,
          pageSize: response.data.pageSize,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
          pageNumber: response.data.pageNumber,
        }));
        setPageNum(response.data.pageNumber);
        setPost(response.data.content);
      });
    }
  };
  const handlePageClick = (event: any) => {
    navigate(`?page=${event.selected + 1}`);
    
    getPost(event.selected + 1);
    return undefined;
  };

  const getImages = (files: any) => {
    let imgUrl: string[] = [];
    files.forEach((imgId: number) => {
      imgUrl.push(`http://dku-mentor.site/register/image/${imgId}`);
    });
    return imgUrl;
  };
  const getThumbHeight = (imgId: any) => {
    return (`http://dku-mentor.site/register/image/${imgId}`);
  };
  const handleScore = async(scoreNum: number, postId: number) => {
      try {
        await axios({
          method: "patch",
          url: `/register/${postId}/approve`,
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
          data: {
            "adminBonusPoint": scoreNum
          },
        }).then((response) => {
          alert("승인이 완료되었습니다.")
          setPost([])
          getPost(currentPage)
        });
      } catch (e) {
        console.log(e);
      }

  }

  useEffect(() => {}, [handlePageClick]);
  return (
    <>
      <HomeBanner />
      <Block>
        <Paging
          pageCount={pageInfo.totalPages}
          handlePageClick={handlePageClick}
          show={true}
          initialPage={isNaN(currentPage - 1) ? 0 : currentPage - 1}
        />
        {post?.map((item) => {
          return (
            <Card>
              <TopContainer>
                <ProfileSvg>
                  <HiUserCircle />
                </ProfileSvg>
                <TextContainer>
                  <TeamName to={`/team/${item.teamId}`}>{item.teamName}</TeamName>
                  <Mission>
                    <MissionContainer>
                      <span>{item.missionName}</span>
                      <MissionStatus>
                        {item.status === "PROGRESS" ? (
                          <ProgressStatus>
                            <BsClockHistory />
                          </ProgressStatus>
                        ) : (
                          <CompleteStatus>
                            <AiFillCheckCircle />
                          </CompleteStatus>
                        )}
                      </MissionStatus>
                    </MissionContainer>
                    {(token.name === "관리자") && (
                      <ScoreRegister onClick={() => {
                        const score = prompt('보너스 점수를 입력해주세요 (보너스 점수 없을 시 점수 입력 없이 확인 눌러주세요)', '')
                        if (score !== null) {
                          handleScore(Number(score), item.id)
                        }
                    }}>승인</ScoreRegister>
                    )}
                  </Mission>
                </TextContainer>
              </TopContainer>
              <ImgContainer>
                <SimpleImageSlider
                  width={300}
                  height={getThumbHeight(Array.from(item.registerFiles)[0])}
                  images={getImages(item.registerFiles)}
                  showBullets={true}
                  showNavs={item.registerFiles.length > 1}
                />
              </ImgContainer>
              <ContentContainer>
                <ScoreContainer>
                  <TbHeartPlus />
                  <Score>{item.totalScore}점</Score>
                </ScoreContainer>
                <Content>
                  <ContentTeam>{item.teamName}</ContentTeam>
                  <ContentTitle>{item.title}</ContentTitle>
                  <ContentBody>
                    {item.body}
                  </ContentBody>
                </Content>
                <ContentDate>
                  {`${item.date.slice(0, 4)}년 ${item.date.slice(
                    5,
                    7
                  )}월 ${item.date.slice(8, 10)}일 ${item.date.slice(
                    11,
                    13
                  )}시 ${item.date.slice(14, 16)}분`}
                </ContentDate>
              </ContentContainer>
            </Card>
          );
        })}
      </Block>
    </>
  );
}
