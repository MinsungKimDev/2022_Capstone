import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const SubInfoBlock = styled.div`
    ${props =>
    props.hasMarginTop &&
    css`
        margin-top: 1rem;
    `}
    color: #94A4A5;
    font-size: 20px;
    text-align: center;

    span + span:before {
        color: #0307fc;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';    
    }

`;

const LevelBlock = styled.div`
    font-weight: bold;
    color: #FE502D;
`;


const SubInfo = ({ username, createdAt, hasMarginTop, level }) => {
    let levelString;

    switch (level) {
        case 0:
            levelString = 'πμ΄κΈπ';
            break;
        case 1:
            levelString = 'πμ€κΈπ';
            break;
        case 2:
            levelString = 'πκ³ κΈπ';
            break;
        case 3:
            levelString = 'πμμ·¨9λ¨π';
            break;
        default:
            break;
    }

    console.log(levelString);
    return (    
        <SubInfoBlock hasMarginTop={hasMarginTop}>
            <LevelBlock>
                <span>{levelString}</span>
            </LevelBlock>
            <br></br>
            <span>
                <b>
                    <Link to={`/@${username}`}>{username}</Link>
                </b>
            </span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
        </SubInfoBlock>
    );
};

export default SubInfo;