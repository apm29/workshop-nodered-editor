import { remote } from "~/composables";
import { localToken } from "~/composables";
const JAVA_SUCCESS_CODE = "1";

const loadingInstance = ref(null);
const loadingCount = ref(0);

export const install = () => {
  remote.init({
    //缓存获取相关
    onCacheRetrieve(option) {
      return null;
    },

    //设置token
    onInterceptRequest(axiosRequest, option) {
      axiosRequest.headers.Authorization = option.token || unref(localToken) || "";
      return axiosRequest;
    },
    //响应处理
    onInterceptResponse(axiosResponse, option) {
      return new Promise((resolve, reject) => {
        if (axiosResponse.status === 200) {
          //在此处进行响应拦截
          if (axiosResponse.data.status === JAVA_SUCCESS_CODE) {
            if (option.showSuccessMessage) {
              alert(axiosResponse.data.msg || axiosResponse.data.text || "操作成功");
            }
            resolve(axiosResponse.data);
          } else {
            alert(axiosResponse.data.msg || axiosResponse.data.text);
            reject(axiosResponse.data.msg);
          }
        } else {
          // alert(axiosResponse.data.msg || axiosResponse.statusText);
          reject(axiosResponse);
        }
      });
    },

    onInterceptRejectedRequest(error, option) {
      if (option.showErrorMessage && error) {
        Notify({
          message: error.message || String(error),
          type: "danger",
        });
      }
      return error;
    },
    onInterceptRejectedResponse(error, option) {
      if (option.showErrorMessage && error) {
        Notify({
          message: error.message || String(error),
          type: "danger",
        });
      }
      return error;
    },

    startLoading(option) {
      if (!option.silent) {
        loadingCount.value += 1;
        if (unref(loadingCount) > 0) {
        }
      }
    },
    stopLoading(option) {
      if (!option.silent) {
        loadingCount.value -= 1;
        if (unref(loadingCount) <= 0) {
        }
      }
    },
  });
}
