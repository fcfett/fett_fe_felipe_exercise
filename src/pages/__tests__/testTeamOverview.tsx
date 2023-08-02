import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {nextTick} from 'process';
import {UserData} from 'types';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3', '4', '5'],
        };

        const userMock = {
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            avatarUrl: '',
            location: '',
        };

        jest.spyOn(API, 'getTeamOverview').mockResolvedValueOnce(teamOverview);

        jest.spyOn(API, 'getUserData').mockResolvedValueOnce({
            ...userMock,
            id: teamOverview.teamLeadId,
        });

        for (const id of teamOverview.teamMemberIds) {
            jest.spyOn(API, 'getUserData').mockImplementationOnce(() =>
                Promise.resolve({...userMock, id})
            );
        }

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });

    it('should filter teams by name', async () => {
        const teamOverview = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3', '4'],
        };

        const getUserMock = (id: string, firstName: string, lastName: string): UserData => ({
            id,
            firstName,
            lastName,
            displayName: 'userData',
            avatarUrl: '',
            location: '',
        });

        jest.spyOn(API, 'getTeamOverview').mockResolvedValueOnce(teamOverview);

        jest.spyOn(API, 'getUserData').mockResolvedValueOnce(getUserMock('2', 'Boba', 'Fett'));

        jest.spyOn(API, 'getUserData').mockResolvedValueOnce(getUserMock('3', 'Luke', 'Skywalker'));

        jest.spyOn(API, 'getUserData').mockResolvedValueOnce(getUserMock('4', 'Jango', 'Fett'));

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.getAllByText('userData')).toHaveLength(3);
        });

        const searchBar = screen.getByTestId<HTMLInputElement>('search-bar');
        searchBar.value = 'fett';
        searchBar.form.submit();

        nextTick(() => {
            expect(screen.getAllByText('Fett')).toHaveLength(2);
            expect(screen.queryByText('Skywalker')).not.toBeInTheDocument();
        });
    });
});
