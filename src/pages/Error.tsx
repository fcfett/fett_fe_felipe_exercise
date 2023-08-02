import * as React from 'react';
import {Button, Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import {useNavigate} from 'react-router-dom';

interface Props {
    detail?: string;
}

const Error = ({detail: text}: Props) => {
    const navigate = useNavigate();
    return (
        <Container>
            <Header title="Egads!" showBackButton={false} />
            <Container style={{gap: '10px'}}>
                <p>Something went wrong{text && ` ${text}`}...</p>
                <Button onClick={() => navigate('/')}>Back to home</Button>
            </Container>
        </Container>
    );
};

export default Error;
