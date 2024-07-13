import React from 'react'
import styled from 'styled-components'
import foodIcon from '../../../images/white-food-icon.svg';

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
        <CardIcon src={foodIcon} />
        <CardTitle>학식</CardTitle>
      </CardTopBarLeft>
    </CardTopBar>
  );
};

export default TopBar;
