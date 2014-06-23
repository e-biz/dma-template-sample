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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * StreamUtils class providing Stream to X converters
 *
 */
public class StreamUtils {

  /**
   * Converts a java.io.InputStream to a java.lang.String object
   * @throws java.lang.IllegalStateException if an error occurs while reading the stream or closing the reader
   * @param is
   * @return the String representation of the provided InputStream
   */
  public static String inputStreamToString(InputStream is) {
    String line = "";

    StringBuilder builder = new StringBuilder();

    BufferedReader rd = new BufferedReader(new InputStreamReader(is));

    try {
      while ((line = rd.readLine()) != null) {
        builder.append(line);
      }
    } catch (IOException e) {
      throw new IllegalStateException(e);
    } finally {
      try {
        if(rd != null)
          rd.close();
      } catch (IOException e) {
        throw new IllegalStateException(e);
      }
    }

    return builder.toString();
  }
}
