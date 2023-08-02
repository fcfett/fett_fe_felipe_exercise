import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {Avatar, CardContainer} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
    hideColumnKey?: boolean;
    initials?: string;
}

const Card = ({
    id,
    url,
    columns,
    initials,
    hasNavigation = true,
    navigationProps = null,
    hideColumnKey = false,
}: Props): JSX.Element => {
    const navigate = useNavigate();

    return (
        <CardContainer
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            hasInitials={Boolean(initials)}
            onClick={(e: Event) => {
                e.preventDefault();
                if (hasNavigation) {
                    navigate(url, {
                        state: navigationProps,
                    });
                }
            }}
        >
            {initials && (
                <Avatar>
                    <figcaption>{initials}</figcaption>
                </Avatar>
            )}
            {columns.map(({key, value}) => (
                <p key={key}>
                    {!hideColumnKey && (
                        <React.Fragment>
                            <strong>{key}</strong>
                            {value && <strong>:</strong>}{' '}
                        </React.Fragment>
                    )}
                    <span>{value}</span>
                </p>
            ))}
        </CardContainer>
    );
};

export default Card;
export {Props as CardProps};
