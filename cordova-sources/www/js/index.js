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


// Wait for device API libraries to load
//
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady(), false);
}

// device APIs are available
//
function onDeviceReady() {
  // Now safe to use device APIs

  //Retrieve Data for ODS sample
  $('#ODSSample').click(function () {
    ODSstart();
  });

  //Center samples buttons
  $('#index-content').css('margin-top',($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('[data-role=content]').outerHeight())/2);



};