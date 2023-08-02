import * as React from 'react';
import {Button, Container} from 'components/GlobalComponents';

interface Props {
    onClearFilter: () => void;
}

const NoResults = ({onClearFilter}: Props) => {
    const handleFilterClear = () => {
        const searchInput = document.querySelector<HTMLInputElement>('[data-testid=search-bar]');
        searchInput.value = null;
        onClearFilter();
    };

    return (
        <Container style={{gap: '10px'}}>
            <h1>No matching results.</h1>
            <p>Please, try different words or clear this search filter.</p>
            <Button onClick={handleFilterClear}>Clear filter</Button>
        </Container>
    );
};

export default NoResults;
