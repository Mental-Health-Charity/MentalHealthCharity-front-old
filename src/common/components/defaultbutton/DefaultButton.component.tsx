import StyledDefaultButton from "./DefaultButton.style"

interface DefaultButtonProps {
    isFilled: boolean,
    service: () => void,
    content: string,
    fontSize: number,
}

const DefaultButton = ({isFilled, service, content, fontSize}: DefaultButtonProps) => {
    
    return (
        <StyledDefaultButton fontSize={fontSize ? fontSize : .9} onClick={service} isFilled={isFilled}>
            {content}
        </StyledDefaultButton >
    )
}

export default DefaultButton;