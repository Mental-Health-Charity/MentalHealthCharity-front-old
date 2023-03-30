import colorPallete from "@/common/styles/Colorpallete";
import styled from "styled-components";

interface StyledNavbarProps {
    isMobileVisible: boolean,
}

const StyledNavbar = styled.nav<StyledNavbarProps>`
    height: 6em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em 0em 1em 0em;
    font-size: 1rem;
    position: relative;

    & .nav_btns_wrapper {
        display: flex;
        position: absolute;
        width: 100%;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    & .nav_auth_wrapper button {
        margin: .5em;
    }

    & .nav_logo, .nav_auth_wrapper {
        margin: 0 3% 0 3%;
    }

    & .logo_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    @media (max-width: 1300px) {
            & .nav_btns_wrapper {
            position: inherit;
            width: auto;
        };
    }

    @media (max-width: 1080px) {
        & {
            height: ${props => props.isMobileVisible ? "auto" : "8em"};
            overflow: hidden;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            padding: 1em;
            transition: 1s;
        }

        & .nav_btns_wrapper {
            position: inherit;
            width: 100%;
            justify-content: space-around;
            flex-wrap: nowrap;
        };
        & .logo_wrapper {
            width: 100%;
        }
        & .nav_auth_wrapper {
            margin: 0;
        }
    }

    @media (max-width: 380px) {
        & {
            padding: 0;
            margin: 0;
        }
        & .nav_btns_wrapper {
            width: 100%;
        }



    }
`

export default StyledNavbar;