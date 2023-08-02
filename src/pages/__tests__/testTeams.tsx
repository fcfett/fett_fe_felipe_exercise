import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {nextTick} from 'process';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

const TEAMS_MOCK = [
    {
        id: '1',
        name: 'Team1',
    },
    {
        id: '2',
        name: 'Team2',
    },
];

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue(TEAMS_MOCK);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });

    it('should filter teams by name', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue(TEAMS_MOCK);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();

        const searchBar = screen.getByTestId<HTMLInputElement>('search-bar');
        searchBar.value = 'team1';
        searchBar.form.submit();

        nextTick(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
            expect(screen.queryByText('Team2')).not.toBeInTheDocument();
        });
    });
});
