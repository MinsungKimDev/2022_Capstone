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
            levelString = '😊초급😊';
            break;
        case 1:
            levelString = '😆중급😆';
            break;
        case 2:
            levelString = '😍고급😍';
            break;
        case 3:
            levelString = '😎자취9단😎';
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