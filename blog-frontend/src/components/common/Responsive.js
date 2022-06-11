import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto; 
    position: absolute;
    
    @media  {
        width: 768px;
    }
    @media {
        width: 100%;
    }
    `;

    const Responsive = ({children, ...rest}) => {
        //style, className, onClick, onMouseMove 등의 props를 사용할 수 있도록
        //...rest 를 사용하여 ResponsiveBlock에게 전달
        return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
    };

    export default Responsive;