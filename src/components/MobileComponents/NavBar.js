import styled, { css }from 'styled-components';
import bookmarkIcon from '../../images/bookmark-icon.svg';
import noticeFA1Icon from '../../images/notice-FA1-icon.svg';
import noticeFA2Icon from '../../images/notice-FA2-icon.svg';
import noticeFA35Icon from '../../images/notice-FA35-icon.svg';
import noticeDA1Icon from '../../images/notice-DA1-icon.svg';
import noticeSC1Icon from '../../images/notice-SC1-icon.svg';
import noticeFA34Icon from '../../images/notice-FA34-icon.svg';

const SectionList = [
  {
    id: 'BM',
    icon: bookmarkIcon,
    name: '내 북마크',
  },
  {
    id: 'FA1',
    icon: noticeFA1Icon,
    name: '일반공지',
  },
  {
    id: 'FA2',
    icon: noticeFA2Icon,
    name: '학사공지',
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

const NavBar = ({onSectionClick, selectedSection}) => {
  return (
    <NavBarContainer>
      {SectionList.map((section) => (
        <Section
          key={section.id}
          onClick={() => {
            onSectionClick(section.id);
          }}
        >
          <SectionIcon src={section.icon} />
          <SectionName selected={
            section.id === selectedSection
            }>{section.name}</SectionName>
        </Section>
      ))}
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 0 24px;
  border-radius: 16px;
  background-color: ${props => props.theme.foreground}f4;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 16px;
  border-radius: 16px;
  background-color: ${props => props.theme.foreground}f4;
  user-select: none;
  width: 33%;
  &:active {
    transition: all 0.02s;
    filter: brightness(0.8);
  }
`;

const SectionIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SectionName = styled.span`
  transition: all 0.3s;
  color: ${props => props.theme.contentText};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
  opacity: 0.5;

  ${(props) =>
    props.selected &&
    css`
    opacity: 1;
    font-weight: 700;
  `}

  &:hover {
    opacity: 1;
  }
  /*
  &::after {
    position: absolute;
    top: 0;
    right: -8px;
    content: '';
    width: 6px;
    height: 6px;
    background-color: #408cff;
    border-radius: 50%;
  }
  */
`;
