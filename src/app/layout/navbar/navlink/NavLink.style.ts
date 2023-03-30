import colorPallete from "@/common/styles/Colorpallete";
import Link from "next/link";
import styled from "styled-components";

interface StyledNavLinkProps {
    isActive: boolean,
}

const StyledNavLink = styled(Link)<StyledNavLinkProps>`
    text-decoration: none;
    color: ${colorPallete.gray};
    position: relative;
    margin: 1em;
    text-align: center;

    &::before {
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        background-color: ${colorPallete.yellow};
        border-radius: 50%;
        bottom: -.6em;
        left: 50%;
        right: 50%;
        scale: ${props => props.isActive ? "100%" : "0%"};
        transform: translate(-50%, 0);
        translate: 1s;
    }

`;

export default StyledNavLink;