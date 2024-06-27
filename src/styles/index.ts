import styled from "styled-components";
import { lighten } from 'polished';


export const Header = styled.h1<{$center?: boolean}>`
    font-size: 40px;
    font-weight: 500;
    color: black;
    text-align: ${({$center}) => $center ? "center" : "flex-start"};
`;

export const Paragraph = styled.p<{$center?: boolean}>`
    font-size: 30px;
    font-weight: 300;
    color: black;
    text-align: ${({$center}) => $center ? "center" : "flex-start"};
`;

export const ErrorText = styled.p`
    font-size: 20px;
    font-weight: 300;
    color: red;
    text-align: "flex-start";
`;

export const FlexColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Container = styled.div`
    margin: 0 auto;
	max-width: 1400px;
	padding: 0 2rem;
	width: 100%;
`;

export const Spacer = styled.div<{size: string}>`
    margin-top: ${({size}) => size};
`;

export const Flex = styled.div<{ $gap: string }>`
	display: flex;
	align-items: center;
	gap: ${({ $gap }) => $gap};
`;

export const Table = styled.table`
	font-size: 14px;
	font-weight: 600;
	line-height: 24px;
	border-spacing: 0px;
	width: 100%;
    border: 2px solid #f4f4f4;
    border-radius: 10px;

    th, td {
      text-align: left; 
	  font-size: 18px;
      padding: 8px;
    }

    th { 
        background: #3498db; 
        color: white; 
        font-weight: bold; 
	}
	
    tr:nth-child(even) {
        background: #efefef;
    }

	td {
		font-weight: 400;
        white-space: nowrap;
	}
`;

export const TableBox = styled.div<{$maxWidth: string}>`
    width: 100%;
    max-width: ${({$maxWidth}) => $maxWidth};
    margin: auto;
    overflow-x:auto;
`;

export const Button = styled.button<{$outlined?: boolean; disabled?: boolean}>`
    align-items: center;
	background: ${({$outlined}) => $outlined ? "transparent": "#3498db"};
	color: ${({$outlined}) => $outlined ? "#3498db" : "white"};
	display: flex;
	padding: 10px 40px;
	white-space: nowrap;
    border: ${({$outlined}) => $outlined ? "2px solid #3498db" : "none"};
    border-radius: 2px;
    cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
    font-size: 20px;
    opacity: ${({disabled}) => disabled ? 0.5 : 1} ;

    &:hover {
        opacity: ${({disabled}) => disabled ? 0.5 : 1};
    }

	@media (max-width: 768px) {}
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const MaxWidth = styled.div<{ $maxWidth: string }>`
	max-width: ${({ $maxWidth }) => $maxWidth};
	width: 100%;
`;

export const BadgeStatus = styled.div<{color: string}>`
    background-color: ${({color}) => lighten(0.4, color)}; /* 20% lighter */
    color: ${({color}) => color};
    padding: 5px;
    border-radius: 20px;
    max-width: 100px;
    text-align: center;
    font-size: medium;
`;



export const SelectInput = styled.select`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
`;

export const ActionBox = styled.div`
    cursor: pointer;
`;

export const DetailsLabel = styled.h4`
     font-size: 20px;
    font-weight: 300;
    color: black;
    text-align: "flex-start";
`;

export const DetailsText = styled.h4`
     font-size: 20px;
    font-weight: 500;
    color: black;
    text-align: "flex-start";
`;


export const Input = styled.input.attrs(({
   type
}) => ({ type }))`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
`;