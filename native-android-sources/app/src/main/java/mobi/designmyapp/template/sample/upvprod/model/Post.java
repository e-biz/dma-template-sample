package mobi.designmyapp.template.sample.upvprod.model;

import android.graphics.Bitmap;

/**
 * Created by loic on 15/07/2014.
 */
public class Post {
  private String uuid;
  private String type;
  private String content;
  private Integer image;
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

  public Integer getImage() {
    return image;
  }

  public void setImage(Integer image) {
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

    public Builder image(Integer image) {
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
