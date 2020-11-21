import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    margin-right:10px;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: black;
    }
`;

export default (props) => <StyledLink {...props} />;