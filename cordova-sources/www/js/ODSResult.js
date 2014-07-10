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

var ODSResult = {
  // ---------------------------------------------------------------------------
  // Attributes
  // ---------------------------------------------------------------------------
  id:null,
  title:null,
  description:null,
  latitude:null,
  longitude:null,

  setId: function (id) {
    this.id = id;
    return this;
  },
  setTitle: function (title) {
    this.title = title;
    return this;
  },
  setDescription: function (description) {
    this.description = description;
    return this;
  },
  setLatitude: function (latitude) {
    this.latitude = latitude;
    return this;
  },
  setLongitude: function (longitude) {
    this.longitude = longitude;
    return this;
  },

  /**
   * Will return the html tag of a entry
   * @returns {string}
   */
  getDisplay: function(){
    var tag = [];
    tag.push('<li data-filtertext="' + this.title + '">');
    tag.push('<div class="title">');
    tag.push(this.title);
    tag.push('</div>');
    tag.push('<div class="description">');
    tag.push(this.description);
    tag.push('</div>');
    tag.push('<div class="coordinates">Lat ');
    tag.push(this.latitude);
    tag.push('</div>');
    tag.push('<div class="coordinates">Lng ');
    tag.push(this.longitude);
    tag.push('</div>');
    tag.push('</li>');
    return tag.join("");
  }
};
