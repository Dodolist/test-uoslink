import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import TopBar from './TopBar.js';
import MainInfo from './MainInfo.js';
import SubInfo from './SubInfo.js';
import PlaceList from './PlaceList.js';

const LibraryCardContainer = styled('div')`
  transition: all 0.3s;
  position: fixed;
  left: 50%;
  bottom: 0px;
  width: calc(100% - 32px);
  max-width: 400px;
  min-height: 85vh;

  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#1d2128' } ;

  z-index: 100;

  border-radius: 16px 16px 0 0;
  box-shadow: 0px 12px 16px rgb(0 0 0 / 25%) inset;
  overflow: hidden;

  transform: ${(props) => (props.isshow ? 'translate(-50%, 0)' : 'translate(-50%, 100%)')};
  user-select: ${(props) => (props.isshow ? 'auto' : 'none')};
  pointer-events: ${(props) => (props.isshow ? 'auto' : 'none')};
`

const LibraryCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 12px 16px 12px;
  background-color: #408cff;
  border-radius: 0 0 16px 16px;
  gap: 16px;
`

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 12px 12px 12px;
  gap: 12px;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

const LibaryCard = ({ isShow, handleClose }) => {
  const [libraryInfo, setLibraryInfo] = useState([]);
  const [selectedLibraryPlace, setSelectedLibraryPlace] = useState('a');
  const initialDashValues = [44, 44, 44, 44];
  const [dashValues, setDashValues] = useState(initialDashValues);
  const initialLinearDashValues = [0, 0, 0];
  const [linearDashValues, setLinearDashValues] = useState(initialLinearDashValues);

  useEffect(() => {
    axios.get('https://www.iflab.run/api/scraping/library/'+ selectedLibraryPlace)
      .then(response => {
        setLibraryInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [isShow, selectedLibraryPlace]);

  useEffect(() => {
    if(isShow) {
      let newDashValues;
      let newLinearDashValues;

      if(selectedLibraryPlace === 'a') {
        newDashValues = libraryInfo.slice(0, 4).map(item => {
          return 44 * (1 - item.use_rate / 100);
        });
        newLinearDashValues = libraryInfo.slice(4, 7).map(item => {
          return item.use_rate;
        });
      } else {
        newDashValues = libraryInfo.slice(0, 2).map(item => {
          return 44 * (1 - item.use_rate / 100);
        }).concat([44, 44]);
        newLinearDashValues = initialLinearDashValues;
      }
      setDashValues(newDashValues);
      setLinearDashValues(newLinearDashValues);
    }
  }, [isShow, selectedLibraryPlace, libraryInfo]);

  return (
    <LibraryCardContainer isshow={undefined ? undefined : isShow}>
      <LibraryCardHeader>
        <TopBar handleClose={handleClose} />
        <PlaceList
          selectedLibraryPlace={selectedLibraryPlace}
          onLibraryPlaceClick={setSelectedLibraryPlace}
        />
      </LibraryCardHeader>
      <PlaceContainer>
        <InfoWrapper>
          { libraryInfo.slice(0, 2).map((item, index) => (
            <MainInfo
              key={index}
              item={item}
              isShow={isShow}
              delay={0.1}
              dashOffset={dashValues[index]}
              dashColor={
                dashValues[index] <= 11
                  ? 'red'
                  : dashValues[index] <= 33
                  ? 'yellow'
                  : null
              }
            />
          ))}
        </InfoWrapper>
        { selectedLibraryPlace === 'a' && libraryInfo.length > 4 &&
          <InfoWrapper>
            { libraryInfo.slice(2, 4).map((item, index) => (
              <MainInfo
                key={index + 2}
                item={item}
                isShow={isShow}
                delay={0.3}
                dashOffset={dashValues[index + 2]}
                dashColor={
                  dashValues[index + 2] <= 11
                    ? 'red'
                    : dashValues[index + 2] <= 33
                    ? 'yellow'
                    : null
                }
              />
            ))}
          </InfoWrapper>
        }
        { selectedLibraryPlace === 'a' && libraryInfo.length > 4 &&
          <InfoWrapper>
            {libraryInfo.slice(4, 7).map((item, index) => (
              <SubInfo
                key={index + 4}
                item={item}
                isShow={isShow}
                delay={0.5}
                dashOffset={linearDashValues[index]}
              />
            ))}
          </InfoWrapper>
        }
      </PlaceContainer>
    </LibraryCardContainer>
  )
};

export default LibaryCard;
