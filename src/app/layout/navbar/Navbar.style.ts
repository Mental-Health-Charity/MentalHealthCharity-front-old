import colorPallete from "@/common/styles/Colorpallete";
import styled from "styled-components";

const StyledNavbar = styled.nav`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1em 4em 1em 4em;

    & .nav_auth_wrapper button {
        margin: .5em;
    }
`

export default StyledNavbar;