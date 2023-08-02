import styled from 'styled-components';

export const Input = styled.input`
    background-image: url(https://f.hubspotusercontent20.net/hubfs/2814970/Pages/Global/Megamenu/search%20icon%20input.svg);
    background-position: left 16px top 12px;
    background-repeat: no-repeat;
    background-size: 18px 18px;
    padding: 8px 15px 10px 50px;
    text-overflow: ellipsis;
    box-shadow: var(--shadow-sm);
    border-radius: 4px;
    max-width: 472px;
    font-weight: 500;
    font-size: 20px;
    width: 100%;
    border: 0;
`;

export const Form = styled.form`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    box-shadow: var(--shadow);
    gap: 10px;
`;
