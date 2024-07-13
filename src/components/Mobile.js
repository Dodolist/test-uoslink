import '../App.css';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import bookmarkIcon from '../images/bookmark-icon.svg';
import noticeFA1Icon from '../images/notice-FA1-icon.svg';
import noticeFA2Icon from '../images/notice-FA2-icon.svg';
import noticeFA35Icon from '../images/notice-FA35-icon.svg';
import noticeDA1Icon from '../images/notice-DA1-icon.svg';
import noticeSC1Icon from '../images/notice-SC1-icon.svg';
import noticeFA34Icon from '../images/notice-FA34-icon.svg';
import TopBar from './MobileComponents/TopBar';
import NavBar from './MobileComponents/NavBar';
import SelectedSection from './MobileComponents/SelectedSection';
import NoticeList from './MobileComponents/NoticeList';
import ArticleList from './ArticleList';
import GroundBackground from './GroundBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import Viewer from './MobileComponents/Viewer';


const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-bottom: 16px;
  gap: 16px;

  position: sticky;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${props => props.theme.background};
`;

const Offline = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 64px;
  border-radius: 16px;
  background-color: #ffdb7c;
`

const OfflineText = styled.span`
  color: #00000080;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -2px;
`;

const SectionList = [
  {
    id: 'BM',
    icon: bookmarkIcon,
    name: '내 북마크'
  },
  {
    id: 'FA1',
    icon: noticeFA1Icon,
    name: '일반공지',
    link: 'https://www.uos.ac.kr/korNotice/list.do?list_id=FA1'
  },
  {
    id: 'FA2',
    icon: noticeFA2Icon,
    name: '학사공지',
  },
  {
    id: 'DA1',
    icon: noticeDA1Icon,
    name: '학과공지',
  },
  {
    id: 'FA35',
    icon: noticeFA35Icon,
    name: '창업공지',
  },
  {
    id: 'SC1',
    icon: noticeSC1Icon,
    name: '장학공지',
  },
  {
    id: 'FA34',
    icon: noticeFA34Icon,
    name: '직원채용',
  },
];

const List = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 24px;
`
const Mobile = ({ theme, toggleTheme }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedSection, setSelectedSection] = useState('FA1');
  const [selectedNoticeId, setSelectedNoticeId] = useState('');
  const [selectedNoticeSection, setSelectedNoticeSection] = useState('');
  const [selectedNoticeLink, setSelectedNoticeLink] = useState('');
  const [selectedSectionIcon, setSelectedSectionIcon] = useState(noticeFA1Icon);
  const [selectedSectionName, setSelectedSectionName] = useState('일반공지');
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  document.addEventListener("touchstart", { capture: false, once: false, passive: true });
  
  const selectSection = (id) => {
    window.scrollTo(0, 0);
    setSelectedSection(id);
    
    for(let i = 0; i < SectionList.length; i++) {
      if(SectionList[i].id === id) {
        setSelectedSectionIcon(SectionList[i].icon);
        setSelectedSectionName(SectionList[i].name);
      }
    }
  };

  useEffect(() => {
    // 온라인 및 오프라인 상태 변경 이벤트 핸들러 등록
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러 제거
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const handleOnlineStatusChange = () => {
    setIsOnline(navigator.onLine);
  };
  
  const openViewer = (id, section, link) => {
    setSelectedNoticeId(id);
    setSelectedNoticeSection(section);
    setSelectedNoticeLink(link);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setTimeout(() => {
      setSelectedNoticeId('');
      setSelectedNoticeSection('');
      setSelectedNoticeLink('');
    }, 200);
    setIsViewerOpen(false);
  };

  return (
    <div className="Back">
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <div className="Mobile">
        <GroundBackground />
        <TopBar
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <ContentContainer>
          <SelectedSectionContainer>
            <SelectedSection
              selectedSectionIcon={selectedSectionIcon}
              selectedSectionName={selectedSectionName}
            />
          </SelectedSectionContainer>
          <NavBar
            onSectionClick={selectSection}
            selectedSection={selectedSection}
          />
        </ContentContainer>
        {
        isOnline ? (
            <NoticeList
              openViewer={openViewer}
              selectedSection={selectedSection}
            />
        ) : (
          <Offline>
            <FontAwesomeIcon icon={faTriangleExclamation} size="4x" bounce style={{color: "#ffb800",}} />
            <OfflineText>인터넷이 연결되어 있지 않아요.</OfflineText>
          </Offline>
        )}
      </div>
      <Viewer
        isViewerOpen={isViewerOpen}
        selectedNoticeId={selectedNoticeId}
        selectedNoticeSection={selectedNoticeSection}
        selectedNoticeLink={selectedNoticeLink}
        closeViewer={closeViewer}
      />
    </div>
  );
};

export default Mobile;

const bigsmall = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: transform(-50%, -50%) scale(1.5);
  }
`

const SelectedSectionContainer = styled.div`
  position: sticky;
  top: 72px;
  height: 40px;
  margin-left: 24px;
`

const Circle1 = styled.div`
  animation: ${bigsmall} 5s infinite ease-in-out alternate;
  filter: blur(64px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 340px;
  height: 800px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #408cff, #408cff00);
  border: 1px solid #ffffff;
`
const Circle2 = styled.div`
  animation: ${bigsmall} 5s 1s infinite ease-in-out alternate;
  filter: blur(64px);
  position: fixed;
  top: 25%;
  left: 25%;
  transform: translate(-50%, -50%) scale(0);

  width: 340px;
  height: 800px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #408cff, #408cff00);
  border: 1px solid #ffffff;
`
const Circle3 = styled.div`
  animation: ${bigsmall} 5s 2s infinite ease-in-out alternate;
  filter: blur(64px);
  position: fixed;
  top: 75%;
  left: 75%;
  transform: translate(-50%, -50%) scale(0);

  width: 340px;
  height: 800px;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #408cff, #408cff00);
  border: 1px solid #ffffff;
`
