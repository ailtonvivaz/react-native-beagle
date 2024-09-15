import axios from 'axios';
import { Beagle, ErrorLog } from 'react-native-beagle';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
}

export const request = async ({
  url,
  method = 'GET',
  body,
}: RequestOptions) => {
  try {
    await axios.request({
      url,
      method,
      data: body,
    });
  } catch (error) {
    Beagle.log(new ErrorLog(error));
  }
};
