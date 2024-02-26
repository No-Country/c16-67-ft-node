import React, { useEffect } from 'react';
const locationiqKey = import.meta.env.VITE_LOCATION_IQ_API_KEY;

function AutocompleteSearch({ setAddress }) {
  useEffect(() => {
    $('#search-box-input').autocomplete({
      minChars: 3,
      deferRequestBy: 250,
      serviceUrl: 'https://api.locationiq.com/v1/autocomplete',
      paramName: 'q',
      params: {
        key: locationiqKey,
        format: 'json',
        limit: 5
      },
      ajaxSettings: {
        dataType: 'json'
      },
      formatResult: function (suggestion, currentValue) {
        var format =
          "<div class='autocomplete-suggestion-name bg-white cursor-pointer'>" +
          highlight(suggestion.data.display_address, currentValue);
        ('</div>');
        return format;
      },
      transformResult: function (response) {
        var suggestions = $.map(response, function (dataItem) {
          return {
            value: dataItem.display_address,
            data: dataItem
          };
        });

        return {
          suggestions: suggestions
        };
      },
      onSelect: function (suggestion) {
        setAddress(suggestion.value);
        //displayLatLon(suggestion.data.display_name, suggestion.data.lat, suggestion.data.lon);
      }
    });
  }, []); // Ejecutar solo una vez al montar el componente

  // function displayLatLon(display_name, lat, lng) {
  //   var resultString =
  //     'You have selected ' + display_name + '<br/>Lat: ' + lat + '<br/>Lon: ' + lng;
  //   document.getElementById('result').innerHTML = resultString;
  // }

  function highlight(text, focus) {
    var r = RegExp('(' + escapeRegExp(focus) + ')', 'gi');
    return text.replace(r, '<strong>$1</strong>');
  }

  function escapeRegExp(str) {
    return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
  }

  return (
    <div className="container">
      <div id="search-box">
        <div
          className="locationiq-autocomplete-control locationiq-bounds locationiq-control locationiq-autocomplete-expanded"
          id="search-box-area"
        >
          <input
            className="locationiq-autocomplete-input ui-autocomplete-input mt-4 block w-full border border-gray-500 rounded-xl shadow-sm p-3 pl-6 text-gray-700"
            id="search-box-input"
            title="Search"
            placeholder="Search for an address..."
          />
          <a className="locationiq-autocomplete-search-icon"></a>
        </div>
      </div>
      <div id="result"></div>
    </div>
  );
}

export default AutocompleteSearch;
