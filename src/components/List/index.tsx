import * as React from 'react';
import {ListItem} from 'types';
import Card, {CardProps} from '../Card';
import {Spinner} from '../Spinner';
import {ListContainer} from './styles';

interface Props extends Pick<CardProps, 'hideColumnKey'> {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}

const List = ({items, hasNavigation = true, isLoading, hideColumnKey = false}: Props) => {
    return (
        <ListContainer isLoading={isLoading}>
            {isLoading ? (
                <Spinner />
            ) : (
                items.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                            hideColumnKey={hideColumnKey}
                        />
                    );
                })
            )}
        </ListContainer>
    );
};

export default List;
