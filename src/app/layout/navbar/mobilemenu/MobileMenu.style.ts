import colorPallete from "@/common/styles/Colorpallete";
import styled from "styled-components";

const StyledMobileMenu = styled.button`
    display: none;
    position: absolute;
    right: 0; 
    cursor: pointer;
    background-color: transparent;
    border: 0;
    height: auto;
    &:active > .hamburger_deco_line{
        transform: scaleX(120%);
    }

    & .hamburger_deco_line {
        display: flex;
        width: 40px;
        height: 4px;
        margin: 8px;
        background-color: ${colorPallete.black};
        border-radius: 20px;
        transition: .2s;
    }

    @media (max-width: 1080px) {
        display: block;
    }
`

export default StyledMobileMenu;