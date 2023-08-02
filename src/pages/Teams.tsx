import * as React from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import SearchBar from 'components/SearchBar';
import NoResults from 'components/NoResults';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const MapT = (teams: TeamsList[]) => {
    return teams.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const [teams, setTeams] = React.useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [filter, setFilter] = React.useState<string>();

    const listItems = MapT(
        filter ? teams.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase())) : teams
    );

    const hasItems = listItems.length > 0;
    const hasFilter = !isLoading && Boolean(filter);
    const hasResults = !isLoading && hasItems;

    React.useEffect(() => {
        fetchTeams().then(resp => {
            setTeams(resp);
            setIsLoading(false);
        });
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            {!isLoading && <SearchBar placeholder="Search by team name..." onSubmit={setFilter} />}
            {(isLoading || hasItems) && (
                <List items={listItems} isLoading={isLoading} hideColumnKey />
            )}
            {hasFilter && !hasResults && <NoResults onClearFilter={() => setFilter(null)} />}
        </Container>
    );
};

export default Teams;
