Basic app that shows properties for sale in Durham.

@author Alex Debsnas

<template class="styling">
<div id="app">
    <h1>Durham Properties for Sale</h1>
    <br>
    <p id="welcome">
      This page allows you to search through properties for sale in Durham! Each
      property is displayed in its own box and displays the property's address, price, and
      square footage. You can sort the properties based on their price, square footage, or both.
      This page is powered by the <strong>
      <a href="https://rapidapi.com/datascraper/api/realtor-com-real-estate/endpoints">
      Realtor.com Real Estate API</a></strong> from
       <strong><a href="https://rapidapi.com/marketplace">RapidAPI.com</a></strong>.
    </p>
    <br>
    <b-button @click="getServerData">Refresh Data</b-button>
          <br>
          <br>
          <h5
          v-if="priceIsChecked">Number of properties displayed: {{ filteredProperties.length }}
          </h5>
          <h5 v-else-if="sqftIsChecked">
              Number of properties displayed: {{ filteredProperties.length }}
          </h5>
          <h5 v-else-if="bothAreChecked">
              Number of properties displayed: {{ filteredProperties.length }}
          </h5>
          <h5 v-else>Number of properties displayed: {{ propertiesData.data.results.length }} </h5>
          <section>
              <input type="checkbox" id="Price under $300,000"
              name="price" value="Price under $300,000"
              @click="filterPrice">
              <label for="price"> Price under $300,000</label><br>
              <br>
              <input
              type="checkbox" id="Square Footage under 1000"
              name="sqft" value="Square Footage under 1000"
              v-model="sqftIsChecked" @click="filterSqFt"
              >
              <label for="price"> Square Footage under 1000 sq. ft.</label><br>
          </section>
          <section v-if="priceIsChecked">
              <br>
              <div v-for="(property, i) in filteredProperties" :key="i" class="property">
                  <h4>{{property.location.address.line}}</h4>
                  <img :src="property.primary_photo.href" class="houseimg">
                  <p>Price: ${{property.list_price}}</p>
                  <p v-if="property.description">Square Feet: {{property.description.sqft}}</p>
                  <b-dropdown text="View More Info" class="dropdown">
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bedrooms: {{property.description.beds}}
                          </span>
                      </b-dropdown-item>
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bathrooms: {{property.description.baths}}
                          </span>
                      </b-dropdown-item>
                  </b-dropdown>
              </div>
          </section>
          <section v-else-if="sqftIsChecked">
              <br>
              <div v-for="(property, i) in filteredProperties" :key="i" class="property">
                  <h4>{{property.location.address.line}}</h4>
                  <img :src="property.primary_photo.href" class="houseimg">
                  <p>Price: ${{property.list_price}}</p>
                  <p v-if="property.description">Square Feet: {{property.description.sqft}}</p>
                  <b-dropdown text="View More Info" class="dropdown">
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bedrooms: {{property.description.beds}}
                          </span>
                      </b-dropdown-item>
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bathrooms: {{property.description.baths}}
                          </span>
                      </b-dropdown-item>
                  </b-dropdown>
              </div>
          </section>
          <section v-else-if="bothAreChecked">
              <br>
              <div v-for="(property, i) in filteredProperties" :key="i" class="property">
                  <h4>{{property.location.address.line}}</h4>
                  <img :src="property.primary_photo.href" class="houseimg">
                  <p>Price: ${{property.list_price}}</p>
                  <p v-if="property.description">Square Feet: {{property.description.sqft}}</p>
                  <b-dropdown text="View More Info" class="dropdown">
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bedrooms: {{property.description.beds}}
                          </span>
                      </b-dropdown-item>
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bathrooms: {{property.description.baths}}
                          </span>
                      </b-dropdown-item>
                  </b-dropdown>
              </div>
          </section>
          <section v-else>
              <br>
              <div v-for="(property, i) in propertiesData.data.results" :key="i" class="property">
                  <h3>{{property.location.address.line}}</h3>
                  <img :src="property.primary_photo.href"
                  v-if="property.primary_photo" class="houseimg">
                  <p>Price: ${{property.list_price}}</p>
                  <p v-if="property.description">Square Feet: {{property.description.sqft}}</p>
                  <b-dropdown text="View More Info" class="dropdown">
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bedrooms: {{property.description.beds}}
                          </span>
                      </b-dropdown-item>
                      <b-dropdown-item disabled>
                          <span v-if="property.description">
                              Bathrooms: {{property.description.baths}}
                          </span>
                      </b-dropdown-item>
                  </b-dropdown>
              </div>
          </section>

  </div>
</template>

<script>
// export this object anonymously, i.e., named after the module (file) name
export default {
    name: 'App',

    data() {
        return {
            // change this to access server deployed locally or remotely
            useRemoteServer: true,
            priceIsChecked: false,
            sqftIsChecked: false,
            bothAreChecked: false,
            // message to display while waiting for first forecast
            message: 'Loading ...',
            // user's current location as latitude and longitude
            location: null,
            // image returned from Flickr API to display
            imageURL: '',
            // weather information returned from OpenWeatherAPI
            propertiesData: null,
            filteredProperties: [],
        };
    },

    methods: {
        // get data after browser has identified user's location
        // (may require getting permission first)
        setLocation(position) {
            this.location = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            this.getServerData();
        },
        // get data from server to display
        async getServerData() {
            // cannot access server without user's location
            // get JSON data from server and use to update app's variables
            const url = 'https://banana-crisp-29603.herokuapp.com/api/get_data';
            console.log(url);
            const response = await fetch(url);
            const serverData = await response.json();
            // ensure valid response (HTTP-status is 200-299)
            // and expected data (not error JSON object)
            console.log(serverData);
            if (serverData) {
                // convert server data into Vue data or update existing Vue data
                this.propertiesData = serverData.propertiesData;
            } else {
                // may not always be wise to simply echo given error
                this.message = serverData.message;
            }
        },
        filterPrice() {
            this.priceIsChecked = !this.priceIsChecked;
            this.bothAreChecked = this.priceIsChecked && this.sqftIsChecked;
            if (this.bothAreChecked) {
                this.bothAreTrue();
                return;
            }
            if (!this.priceIsChecked && this.sqftIsChecked) {
                this.sqftIsChecked = !this.sqftIsChecked;
                this.filterSqFt();
                return;
            }
            this.filteredProperties = [];
            let i = 0;
            while (i < this.propertiesData.data.results.length) {
                if (this.propertiesData.data.results[i].list_price < 300000) {
                    this.filteredProperties.push(this.propertiesData.data.results[i]);
                }
                i += 1;
            }
        },
        filterSqFt() {
            this.sqftIsChecked = !this.sqftIsChecked;
            this.bothAreChecked = this.priceIsChecked && this.sqftIsChecked;
            if (this.bothAreChecked) {
                this.bothAreTrue();
                return;
            }
            if (this.priceIsChecked && !this.sqftIsChecked) {
                this.priceIsChecked = !this.priceIsChecked;
                this.filterPrice();
                return;
            }
            this.filteredProperties = [];
            let i = 0;
            while (i < this.propertiesData.data.results.length) {
                if (this.propertiesData.data.results[i].description.sqft) {
                    if (this.propertiesData.data.results[i].description.sqft < 1000) {
                        this.filteredProperties.push(this.propertiesData.data.results[i]);
                    }
                }
                i += 1;
            }
        },
        bothAreTrue() {
            this.filteredProperties = [];
            let i = 0;
            while (i < this.propertiesData.data.results.length) {
                if (this.propertiesData.data.results[i].description.sqft) {
                    if ((this.propertiesData.data.results[i].description.sqft < 1000)
                    && (this.propertiesData.data.results[i].list_price < 300000)) {
                        this.filteredProperties.push(this.propertiesData.data.results[i]);
                    }
                }
                i += 1;
            }
        },
    },

    mounted() {
        this.getServerData();
    },
};
</script>
