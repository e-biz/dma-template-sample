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
package mobi.designmyapp.template.sample.upvprod.listener;

/**
 * Created by Loic Ortola on 17/07/2014
 * OnTaskCompletedListener
 * T result type provided as a parameter in onTaskCompleted
 */
public interface OnTaskCompletedListener<T> {
  /**
   * Method called when the task execution is over
   * @param result
   */
  public void onTaskCompleted(T result);
}
