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
package mobi.designmyapp.template.sample.ods.model;

public class ODSResult {

  // ---------------------------------------------------------------------------
  // Attributes
  // ---------------------------------------------------------------------------
  private String id;
  private String title;
  private String description;
  private double latitude;
  private double longitude;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public double getLatitude() {
    return latitude;
  }

  public void setLatitude(double latitude) {
    this.latitude = latitude;
  }

  public double getLongitude() {
    return longitude;
  }

  public void setLongitude(double longitude) {
    this.longitude = longitude;
  }


  /**
   * Will instanciate a new Builder instance for ODSResult
   * @return the new Instance
   */
  public static Builder builder() {
    return new Builder();
  }

  /**
   * Builder pattern class for ODSResult
   */
  public static class Builder {
    private ODSResult result;

    private Builder() {
      result = new ODSResult();
    }

    public Builder id(String id) {
      result.id = id;
      return this;
    }

    public Builder title(String title) {
      result.title = title;
      return this;
    }

    public Builder description(String description) {
      result.description = description;
      return this;
    }

    public Builder latitude(double latitude) {
      result.latitude = latitude;
      return this;
    }

    public Builder longitude(double longitude) {
      result.longitude= longitude;
      return this;
    }

    public ODSResult build() {
      return result;
    }

  }

}
