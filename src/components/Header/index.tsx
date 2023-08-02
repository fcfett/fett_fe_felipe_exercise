import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, BackButton, BackButtonIcon, Title} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            {showBackButton && (
                <BackButton
                    aria-label="Go back to previous page"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <BackButtonIcon>🔙</BackButtonIcon>
                </BackButton>
            )}
            <Title>{title}</Title>
        </HeaderContainer>
    );
};

export default Header;
