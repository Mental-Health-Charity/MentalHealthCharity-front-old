import StyledDefaultButton from "./DefaultButton.style"

interface DefaultButtonProps {
    isFilled: boolean,
    service: Function,
    content: string,
}

const DefaultButton = ({isFilled, service, content}: DefaultButtonProps) => {
    
    return (
        <StyledDefaultButton onClick={service} isFilled={isFilled}>
            {content}
        </StyledDefaultButton>
    )
}

export default DefaultButton;