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
package mobi.designmyapp.template.sample.ods.util;

import java.lang.Integer;
import java.lang.StringBuilder;
import java.net.URI;
import java.net.URISyntaxException;

public class ODSQueryBuilder {

  private static final String URL_BASE = "http://public.opendatasoft.com/api/records/1.0/search";

  public static SearchBuilder search() {
    return new SearchBuilder();
  }


  /**
   * SearchBuilder inner class
   * Builder pattern class for ODSQueryBuilder
   */
  public static class SearchBuilder {

    private StringBuilder sb;

    private SearchBuilder() {
      sb = new StringBuilder(URL_BASE).append("?");
    }

    public SearchBuilder dataset(String dataset) {
      sb.append("&dataset=")
        .append(dataset);
      return this;
    }

    public SearchBuilder exclude(String facet, String value) {
      sb.append("&exclude.")
        .append(facet)
        .append("=")
        .append(value);
      return this;
    }

    public SearchBuilder facet(String facet) {
      sb.append("&facet=")
        .append(facet);
      return this;
    }

    public SearchBuilder limit(Integer limit) {
      sb.append("&rows=")
        .append(limit);
      return this;
    }

    public SearchBuilder contains(String search) {
      sb.append("&q=")
        .append(search);
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