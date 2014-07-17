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
public class Post {
  private String uuid;
  private String type;
  private String content;
  private String image;
  private String description;

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  /**
   * Will instanciate a new Builder instance for Post
   * @return the new Instance
   */
  public static Builder builder() {
    return new Builder();
  }

  /**
   * Builder pattern class for Post
   */
  public static class Builder {
    private Post post;

    private Builder() {
      post = new Post();
    }

    public Builder uuid(String uuid) {
      post.uuid = uuid;
      return this;
    }

    public Builder description(String description) {
      post.description = description;
      return this;
    }

    public Builder image(String image) {
      post.image = image;
      return this;
    }

    public Builder content(String content) {
      post.content = content;
      return this;
    }

    public Builder type(String type) {
      post.type = type;
      return this;
    }

    public Post build() {
      return post;
    }
  }
}
