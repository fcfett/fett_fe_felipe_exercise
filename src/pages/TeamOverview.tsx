import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {ListContainer} from 'components/List/styles';
import SearchBar from 'components/SearchBar';
import NoResults from 'components/NoResults';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const mapArray = (users: UserData[]) => {
    return users.map(u => {
        const columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

const mapTLead = tlead => {
    console.log(tlead);
    if (!tlead) {
        return null;
    }

    const columns = [
        {
            key: 'Team Lead',
            value: undefined,
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead} />;
};

const doesFilterMatchesName = (filter: string, {firstName, lastName}: UserData) =>
    `${firstName} ${lastName}`.toLowerCase().includes(filter.toLowerCase());

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [leadData, setLeadData] = React.useState<UserData>();
    const [teamData, setTeamData] = React.useState<UserData[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<string>(null);

    const leadItem = leadData
        ? (!filter || doesFilterMatchesName(filter, leadData)) && mapTLead(leadData)
        : null;

    const teamItems = mapArray(
        filter ? teamData.filter(user => doesFilterMatchesName(filter, user)) : teamData
    );

    const hasTeamItens = teamItems.length > 0;
    const hasFilter = !isLoading && Boolean(filter);
    const hasResults = !isLoading && (leadItem || hasTeamItens);

    React.useEffect(() => {
        getTeamOverview(teamId).then(({teamLeadId, teamMemberIds = []}) => {
            getUserData(teamLeadId).then(teamLead => setLeadData(teamLead));

            const teamMembers: UserData[] = [];
            for (const teamMemberId of teamMemberIds) {
                getUserData(teamMemberId).then(data => {
                    teamMembers.push(data);

                    if (teamMembers.length === teamMemberIds.length) {
                        setIsLoading(false);
                        setTeamData(
                            teamMembers.sort((a, b) => a.firstName.localeCompare(b.firstName))
                        );
                    }
                });
            }
        });
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && (
                <SearchBar placeholder="Search by member name..." onSubmit={setFilter} />
            )}
            {!isLoading && leadItem && <ListContainer>{leadItem}</ListContainer>}
            {(isLoading || hasTeamItens) && <List items={teamItems} isLoading={isLoading} />}
            {hasFilter && !hasResults && <NoResults onClearFilter={() => setFilter(null)} />}
        </Container>
    );
};

export default TeamOverview;
