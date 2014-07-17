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
package mobi.designmyapp.template.sample.upvprod.model;

/**
 * Created by Loic Ortola on 16/07/2014.
 */
public class Properties {
  private String id;
  private Long count;
  private String image;
  private String name;
  private String web;
  private String upload_date;
  private String px_categories;
  private String px_service;


  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Long getCount() {
    return count;
  }

  public void setCount(Long count) {
    this.count = count;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getWeb() {
    return web;
  }

  public void setWeb(String web) {
    this.web = web;
  }

  public String getUpload_date() {
    return upload_date;
  }

  public void setUpload_date(String upload_date) {
    this.upload_date = upload_date;
  }

  public String getPx_categories() {
    return px_categories;
  }

  public void setPx_categories(String px_categories) {
    this.px_categories = px_categories;
  }

  public String getPx_service() {
    return px_service;
  }

  public void setPx_service(String px_service) {
    this.px_service = px_service;
  }
}
