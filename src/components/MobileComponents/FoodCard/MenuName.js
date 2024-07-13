import React from 'react'
import styled, {css} from 'styled-components'

const NameText = styled.span`
  color: ${(props) => props.theme.titleText};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -2px;
  ${props => props.type === 'sub' && css`
    color: ${(props) => props.theme.subText};
    font-size: 14px;
    letter-spacing: -0.5px;
  `}
`

const MenuName = ({ name, type }) => {
  return (
    <NameText type={type}>{name}</NameText>
  )
};

export default MenuName;
