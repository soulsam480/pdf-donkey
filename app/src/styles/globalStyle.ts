import { createGlobalStyle } from 'styled-components';
import { colors } from './variables';

export const Global = createGlobalStyle`
  :root,body{
    background-color: ${colors.bg};
    font-size: 16px;
    padding:0;
    margin:0;
    font-family: 'Quicksand', sans-serif;
  }
  .content {
    width:100%;
    padding:60px 5px 0 5px;
  }
  .btn {
    background-color: ${colors.prd};
    color: black !important;
    &:hover {
      background-color: ${colors.pr};
      color: black !important;
    }
    &:disabled{
      background-color: ${colors.prdisabled};
      color: black !important;
    }
  }
  .center{
    text-align:center;
  }
  .text-right{
    text-align: right;
  }
  .pointer{
    cursor: pointer;
  }
  .input{
    background-color: ${colors.prd};
    border:none;
    font-family: 'Quicksand', sans-serif;
  }
`;
