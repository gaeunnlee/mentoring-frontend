import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
`;
const TeamCard = styled.div`
  box-sizing: border-box;
  background: linear-gradient(139.68deg, #f0c268 5.07%, #fd9569 117.95%);
  box-shadow: 0px 2.76726px 5.42382px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;
const Score = styled.div`
  display: flex;
  gap: 25px;
  padding: 40px 30px 15px 30px;
  align-items: flex-end;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  color: #555;
`;
const ScoreText = styled.span``;
const ScoreNum = styled.span`
  font-size: 70px;
  color: #ff8b52;
  font-weight: bold;
`;
const Member = styled.div`
  padding: 30px;
  color: #fff;
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;
const Mentor = styled.p`
  font-size: 20px;
`;
const Mentee = styled.span``;
const MissionCard = styled.ul`
  box-shadow: 0px 2.76726px 5.42382px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MissionTitle = styled.h2`
  font-size: 22px;
  color: #444;
  font-family: "Jalnan";
  padding: 0 10px;
  margin-bottom: 15px;
  align-self: center;
`;
const MissionList = styled(Link)`
  display: flex;
  line-height: 120%;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  color: #444;
`;
const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  background: url("https://s.wemep.co.kr/ui/v2.8.307/dist/pc/css/spr/common.png")
    0 -438px no-repeat;
  background-position: -75px -438px;
  vertical-align: top;
`;
const MissionText = styled.span`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
  font-size: 17px;
`;

interface CompletedMissionProps {
  missionName: string;
  totalScore: number;
  missionInfo: string;
  missionCategory: string;
  lastModifiedAt: string;
  id: number;
}
interface TeamProps {
  id: number;
  userName_mentor: string;
  teamName: string;
  mentee: string;
  score: number;
  completedMission: CompletedMissionProps[];
}

export default function TeamDetail() {
  const location = useLocation().pathname;
  const [team, setTeam] = useState<TeamProps>();
  const teamId = location.split("/")[2];
  useEffect(() => {
    axios({
      method: "get",
      url: `/team/${teamId}`,
    }).then(function (response) {
      setTeam(response.data);
    });
  }, []);

  return (
    <>
      <Banner title={team?.teamName || "null"} prev />
      <Block>
        <Container>
          <TeamCard>
            <Score>
              <ScoreText>현재 점수</ScoreText>
              <ScoreNum>{team?.score}</ScoreNum>
            </Score>
            <Member>
              <Mentor>{team?.userName_mentor}</Mentor>
              {team?.mentee?.split(",").map((name) => {
                return <span>{name}</span>;
              })}
            </Member>
          </TeamCard>

          <MissionCard>
            <MissionTitle>수행한 미션</MissionTitle>
            {team?.completedMission?.length !== 0
              ? team?.completedMission.map((item) => {
                  return (
                    <MissionList to={`/post/${item.id}`}>
                      <CheckBox className="checkBox" />
                      <MissionText>
                        <span>{item.missionName}</span>
                        <span>{item.totalScore}</span>
                      </MissionText>
                    </MissionList>
                  );
                })
              : "아직 없습니다"}
          </MissionCard>
        </Container>
      </Block>
    </>
  );
}
