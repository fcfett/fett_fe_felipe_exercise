import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
`;

export const Button = styled.button`
    background-color: var(--secondary-color);
    color: #fff;
    padding: 16px 33px;
    font-size: 18px;
    border-radius: 3rem;
    border: 0;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
        background-color: var(--secondary-color-darken);
    }
`;
