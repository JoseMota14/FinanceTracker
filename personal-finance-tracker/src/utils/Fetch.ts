import axios from "axios";

interface iRequestParams {
  obj?: object;
  header: object;
}

const url: string = "https://service";

const request: iRequestParams = {
  obj: {},
  header: { "Content-Type": "application/json" },
};

export async function postData(
  endpoint: string,
  payload: object,
  headers: object
) {
  const response = await axios.post(url + endpoint, payload, {
    headers,
  });

  return response.data;
}

export async function getData(endpoint: string) {
  try {
    const response = await axios.get(url + endpoint, {
      headers: request.header,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateData(endpoint: string, payload: object) {
  const response = await axios.put(url + endpoint, payload, {
    headers: request.header,
  });

  return response.data;
}
