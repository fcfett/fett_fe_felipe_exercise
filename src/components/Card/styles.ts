import styled from 'styled-components';

export const CardContainer = styled.div<{hasNavigation: boolean; hasInitials: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 20px;
    flex: 1 1 100%;
    max-width: 250px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    text-align: center;
    border-radius: 9px;
    transition: transform 0.2s ease;
    margin-top: ${props => (props.hasInitials ? '40px' : undefined)};
    box-shadow: var(--shadow);
    &:hover,
    &:focus {
        transform: ${props => (props.hasNavigation ? 'translateY(-2px)' : undefined)};
    }
`;

export const Avatar = styled.figure`
    display: flex;
    position: relative;
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 3rem;
    margin: -60px 0 10px;
    font-size: 24px;
`;
