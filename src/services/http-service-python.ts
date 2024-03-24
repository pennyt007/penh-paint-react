import { apiClientPython, setJwt } from "./api-client-python";

// interface Entity {
//   id: number;
// }

// this code defines an HttpService class that
// encapsulates common HTTP operations such as GET, POST, 
// PATCH, and DELETE requests
class HttpServicePython {
  endpoint: string;
  subendpoint: string;

  // takes endpoint string and assigns it to
  // this.endpoint property
  constructor(endpoint: string, subendpoint: string) {
    this.endpoint = endpoint;
    this.subendpoint = subendpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClientPython.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getId<T>(id: number) {
    const controller = new AbortController();
    const request = apiClientPython.get<T[]>(this.endpoint + "/" + id, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  getIds<T>(ids: number[]) {
    const controller = new AbortController();
    const request = apiClientPython.get<T[]>(this.endpoint + "/" + ids, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  // Method to handle requests to nested endpoints
  getNested<T>(parentId: number) {
    const controller = new AbortController();
    // Constructs the URL for the nested endpoint
    const url = `${this.endpoint}/${parentId}/${this.subendpoint}`;
    const request = apiClientPython.get<T>(url, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClientPython.delete(this.endpoint + "/" + id);
  }

  deleteIds(ids: number[]) {
    let params: string = "";
    for (const id of ids) {
      params = params + "/" + id;
    }
    return apiClientPython.delete(this.endpoint + params);
  }

  create<T>(entity: T) {
    return apiClientPython.post(this.endpoint, entity);
  }

  update<T>(id: number, entity: T) {
    return apiClientPython.put(this.endpoint + "/" + id, entity);
  }

  // sends a POST request to the specified endpoint with the
  // provided entity for login purposes. It retrieves the JWT
  // from the response headers, stores it in local storage, 
  // and sets it in the default headers of the apiClient using setJwt
  async login<T>(entity: T) {
    try {
      const keyToken = "token";
      const request = await apiClientPython.post(this.endpoint, entity);
  
      const token = request.headers["x-userauthenticate-token"];

      localStorage.setItem(keyToken, token);

      setJwt(token);

      return request;
    } catch (error) {
       throw new Error("login failed.")
    }
  }
}

// removes the JWT from the local storage
export const logout = () => {
  const keyToken= "token";
  localStorage.removeItem(keyToken);
}

// a factory function that creates instances of the HttpService class
// takes an endpoint string as a parameter and returns a new instance
// of the HttpService class with the provided endpoint.
const createHttpServicePython = (endpoint: string, subendpoint: string ) => new HttpServicePython(endpoint, subendpoint);

export default createHttpServicePython;
