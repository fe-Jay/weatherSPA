import React from 'react'
import styled from "styled-components";

export default function Loading() {
    return (
        <Spinner>
            <span className="a11y-hidden">Loading...</span>
        </Spinner>
    )
};

const Spinner = styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        margin: -25px 0 0 -25px;
        border-radius: 50%;
        border: 4px solid #ffffff30;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `