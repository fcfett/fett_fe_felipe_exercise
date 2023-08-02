import * as React from 'react';
import {Button, Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Header title="404" showBackButton={false} />
            <Container style={{gap: '10px'}}>
                <p>Page not found!</p>
                <Button onClick={() => navigate('/')}>Back to home</Button>
            </Container>
        </Container>
    );
};

export default NotFound;
