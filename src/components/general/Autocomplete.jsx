import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

export default (props) => (
    <PlacesAutocomplete
        value={props.value}
        onChange={props.onChange}
        onSelect={props.onSelect}
        searchOptions={props.searchOptions}
    >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
            <input
            {...getInputProps({
                placeholder: props.placeholder,
                className: 'location-search-input',
            })}
            />
            <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
                const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                <div
                    {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                    })}
                >
                    <span>{suggestion.description}</span>
                </div>
                );
            })}
            </div>
        </div>
        )}
    </PlacesAutocomplete>
);
