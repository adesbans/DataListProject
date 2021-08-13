/*
 * Keeps the app's secret tokens.
 *
 * @author Alex Desbans
 */

// Note, these objects can hold whatever you need to access your API (e.g., username/password, etc.)
exports.FLICKR_API = {
    URL: 'https://www.flickr.com/services/rest/',
    TOKEN: '0677de6a559772c8cb27dd22219dfa0c',
};
exports.OPENWEATHER_API = {
    URL: 'https://api.openweathermap.org/data/2.5/',
    TOKEN: '45713cc0d54c4bfa1c7efbbdbd1c6c2b',
};
exports.REALTOR_API = {
    URL: 'https://realtor.p.rapidapi.com/properties/v2/list-for-sale',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};
exports.REALTORCOM_API = {
    URL: 'https://realtor-com-real-estate.p.rapidapi.com/for-sale',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};

//https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=Durham&limit=400&offset=0&state_code=NC&sort=relevance