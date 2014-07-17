package mobi.designmyapp.template.sample.upvprod.util;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by Loic Ortola on 17/07/2014.
 */
public class PoiProxyQueryBuilder {

  private static final String URL_BASE = "http://app.prodevelop.es/poiproxy/";

  public static RetrieveBuilder retrieve() {
    return new RetrieveBuilder();
  }


  /**
   * RetrieveBuilder inner class
   * Builder pattern class for PoiProxyQueryBuilder
   */
  public static class RetrieveBuilder {

    private StringBuilder sb;

    private RetrieveBuilder() {
      sb = new StringBuilder(URL_BASE).append("browseByLonLat").append("?");
    }

    public RetrieveBuilder service(String service) {
      sb.append("&service=")
          .append(service);
      return this;
    }

    public RetrieveBuilder lat(double lat) {
      sb.append("&lat=")
          .append(lat);
      return this;
    }

    public RetrieveBuilder lon(double lon) {
      sb.append("&lon=")
          .append(lon);
      return this;
    }

    public RetrieveBuilder distance(int distance) {
      sb.append("&dist=")
          .append(distance);
      return this;
    }

    public URI build() {
      try {
        return new URI(sb.toString());
      } catch (URISyntaxException e) {
        throw new IllegalArgumentException(e);
      }
    }

  }
}
