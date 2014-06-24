/*
 Copyright 2014 eBusiness Information

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const URL_BASE = "http://public.opendatasoft.com/api/records/1.0/search"

// ---------------------------------------------------------------------------
// Sample params
// ---------------------------------------------------------------------------
const SAMPLE_LIMIT = 500;
const SAMPLE_DATASET = "positions_geographiques_des_stations_du_reseau_ratp";
const SAMPLE_FACET = "reseau";


var query = {
  url: URL_BASE.concat('?'),
  dataset: function (dataset) {
    this.url = this.url.concat("&dataset=", dataset);
    return this;
  },
  exclude: function (facet, value) {
    this.url = this.url.concat("&exclude.", facet, "=", value);
    return this;
  },
  facet: function (facet) {
    this.url = this.url.concat("&facet", facet);
    return this;
  },
  limit: function (limit) {
    this.url = this.url.concat("&rows=", limit);
    return this;
  },
  getUrl: function () {
    return this.url
  }
};

