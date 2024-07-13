import React from 'react'
import styled from 'styled-components'
import libraryIcon from '../../../images/white-library-icon.svg';

const CardTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const CardTopBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`
const CardTitle = styled.span`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.5px;
`

const CardIcon = styled.img`
  width: 36px;
  height: 36px;
`

const TopBar = ({handleClose}) => {
  return (
    <CardTopBar>
      <CardTopBarLeft>
        <CardIcon src={libraryIcon} />
        <CardTitle>도서관</CardTitle>
      </CardTopBarLeft>
    </CardTopBar>
  );
};

export default TopBar;
