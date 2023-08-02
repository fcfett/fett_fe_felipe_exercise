import styled from 'styled-components';

export const ListContainer = styled.section<{isLoading: boolean}>`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: auto;
    gap: 20px;
    width: 100%;
    align-content: ${props => (props.isLoading ? 'center' : 'flex-start')};

    & + section,
    &:only-of-type {
        flex: 1;
    }
`;
