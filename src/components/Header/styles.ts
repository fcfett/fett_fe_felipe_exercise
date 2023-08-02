import styled from 'styled-components';

export const HeaderContainer = styled.header`
    min-height: 72px;
    padding: 16px 25px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(6px);
    box-shadow: var(--shadow-sm);
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 10;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: semibold;
`;

export const BackButton = styled.button`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    outline: 0;
    background-color: var(--secondary-color);
    color: #fff;
    border: 0;
    border-radius: 3rem;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
        background-color: var(--secondary-color-darken);
    }
`;

export const BackButtonIcon = styled.span`
    filter: invert(1) brightness(2);
`;
