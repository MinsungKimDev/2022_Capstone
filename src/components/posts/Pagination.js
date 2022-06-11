import React from "react";
import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";

const PaginationBlock = styled.div`
    position: relative;
    width: 33.3%;
    margin: 0 auto;
    justify-content: space-between;
    margin-bottom: 3rem;
    float: left;
    text-align: center;
    `;

const PageNumber= styled.div`
`;

const buildLink = ({ username, page}) => {
    const query = qs.stringify({page});
    return username ? `/%${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username}) => {
    return(
        <div style={{position:"absolute", width:"100%"}}>
        <PaginationBlock>
            <Button
                disabled={page===1}
                to={page===1?undefined: buildLink({username, page:page -1})
                }
            >
                이전
            </Button>
            </PaginationBlock>
            <PaginationBlock>
                <PageNumber>{page}</PageNumber>
            </PaginationBlock>
            <PaginationBlock>
            <Button
                disabled={page===lastPage}
                to={
                    page===lastPage ? undefined : buildLink({username, page: page + 1})
                }
                >
                다음
            </Button>
            </PaginationBlock>
        </div>
    );
};

export default Pagination;
