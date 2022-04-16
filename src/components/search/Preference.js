import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Title } from './Search';
import { connect, useDispatch } from 'react-redux';
import {
  resetMainCategory,
  resetSubCategory,
  getSearchResult,
} from '../../redux/category/actions';

const smoothAppear = keyframes`
  from {
    opacity: 0;
    transform: translateX(-5%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
}
`;
const PreferContainer = styled.div`
  justfy-contnet: center;
  width: 512px;
  height: 512px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

  margin: 0 auto;
  margin-top: 32px;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
  animation: ${smoothAppear} 1s;
`;
const Header = styled.div`
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;

  .category {
    margin-bottom: 5px;
    font-size: 21px;
  }
`;
const CategoryContainer = styled.div`
  display: flex;

  button {
    width: 150px;
    height: 29px;
    color: white;
    background-color: #0000CD;

    border: 1px none;
    border-radius: 10px;
    margin-left: auto;
    margin-bottom: 4px;
    padding-left: 3px;
    padding-right: 3px;
    &:hover {
      background-color: #4646CD;
    
  }
`;
const Prefer = styled.div`
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  h1 {
    margin: 0;
    font-size: 21px;

  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  color: #505050;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid black;

  outline: none;
  border-radius: 2px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    filter: brightness(90%);
  }
`;
const SearchButton = styled.button`
  width: 100%;
  height: 50px;
  color: white;
  background-color: #0000cd;
  border: 1px none;

  border-radius: 10px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 45px;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #4646cd;
  }
`;

function Preference({ main, sub, getSearchResult }) {
  const [deliveryScore, setDeliveryScore] = useState(0);
  const [sizeScore, setSizeScore] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);

  const dispatch = useDispatch();
  const resetMain = () => {
    dispatch(resetMainCategory());
  };
  const resetSub = (main) => {
    dispatch(resetSubCategory(main));
  };
  const handleScore = (pref, score) => {
    if (Number.isNaN(score)) {
      switch (pref) {
        case 'delivery':
          setDeliveryScore(score);
          break;
        case 'size':
          setSizeScore(score);
          break;
        case 'quality':
          setQualityScore(score);
          break;
        default:
          break;
      }
    }
  };
  const handleSearch = () => {
    // let body = {
    //   mainCategory: main,
    //   subCategory: sub,
    //   deliveryScore: deliveryScore,
    //   sizeScore: sizeScore,
    //   qualityScore: qualityScore,
    // };
    getSearchResult({
      mainCategory: main,
      subCategory: sub,
      deliveryScore: deliveryScore,
      sizeScore: sizeScore,
      qualityScore: qualityScore,
    });
  };
  return (
    <div>
      <Title>선호도</Title>
      <PreferContainer>
        <Header>
          <CategoryContainer>
            <div className="category">대분류: {main}</div>
            <button onClick={resetMain}> 대분류 다시 고르기</button>
          </CategoryContainer>
          <CategoryContainer>
            <div className="category"> 소분류: {sub}</div>
            <button onClick={() => resetSub(main)}>소분류 다시 고르기</button>
          </CategoryContainer>
        </Header>
        <Prefer>
          <Label>배송</Label>
          <Input
            placeholder="점수를 입력하세요"
            onChange={(e) => handleScore('delivery', e.target.value)}
          />
          <Label>사이즈</Label>
          <Input
            placeholder="점수를 입력하세요"
            onChange={(e) => handleScore('size', e.target.value)}
          />
          <Label>품질</Label>
          <Input
            placeholder="점수를 입력하세요"
            onChange={(e) => handleScore('quality', e.target.value)}
          />

          <SearchButton className="search" onClick={handleSearch}>
            검색하기
          </SearchButton>
        </Prefer>
      </PreferContainer>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResult: (body) => {
      return dispatch(getSearchResult(body));
    },
  };
};

React.memo(Preference);
export default connect(mapStateToProps, mapDispatchToProps)(Preference);