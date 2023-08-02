import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {UserData} from 'types';
import {ListContainer} from 'components/List/styles';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const mapU = (user: UserData) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const initials = fullName.match(/\b\w/g).join('');

    const columns = [
        {
            key: 'Name',
            value: fullName,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];
    return (
        <Card
            columns={columns}
            hasNavigation={false}
            navigationProps={user}
            /* Since fakercloud is not available, I'll use initials as avatar alternative */
            initials={initials}
        />
    );
};

const UserOverview = () => {
    const location = useLocation();
    return (
        <Container>
            <Header title={`User ${location.state.firstName} ${location.state.lastName}`} />
            <ListContainer>{mapU(location.state)}</ListContainer>
        </Container>
    );
};

export default UserOverview;
