import * as React from 'react';
import {Form, Input} from './styles';

interface Props {
    onSubmit?: (search: string) => void;
    placeholder?: string;
}

const SearchBar = ({onSubmit, placeholder = 'Search...'}: Props) => {
    const inputRef = React.createRef<HTMLInputElement>();

    const handleSubmit = (e: React.SyntheticEvent<SubmitEvent>) => {
        const searchValue = inputRef.current.value;
        e.preventDefault();
        if (onSubmit) {
            onSubmit(searchValue || null);
        }
    };

    const handleClear = () => {
        setTimeout(() => {
            if (inputRef.current.value === '' && onSubmit) {
                onSubmit(null);
            }
        }, 0);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="search"
                ref={inputRef}
                onClick={handleClear}
                data-testid="search-bar"
                placeholder={placeholder}
            />
        </Form>
    );
};

export default SearchBar;
