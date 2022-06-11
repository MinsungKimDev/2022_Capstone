import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    margin-left: 15px;
    button + button {
        margin-left: 0.5rem;
    }
`;

const StyledButton = styled(Button)`
    height: 2.215rem;
    & + & {
        margin-left: 0.5rem;
    }
`;
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem
    margin-top: 1rem;
    `;

const WriteActionButtons = ({onCancel, onPublish, nullPostTitle, nullPostBody, nullPostLevel, isEdit})=>{
    return (
        <WriteActionButtonsBlock>
            <StyledButton cyan onClick={onPublish}>
                포스트 {isEdit ? '수정' : '등록'}
            </StyledButton>
            <StyledButton onClick = {onCancel}>취소</StyledButton>
            {nullPostTitle? nullPostTitle&&<ErrorMessage>{nullPostTitle}</ErrorMessage> : ""}
            {nullPostBody? nullPostBody&&<ErrorMessage>{nullPostBody}</ErrorMessage> : ""}
            {nullPostLevel? nullPostLevel&&<ErrorMessage>{nullPostLevel}</ErrorMessage> : ""}
        </WriteActionButtonsBlock>

    );
};

export default WriteActionButtons;