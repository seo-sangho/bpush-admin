import axios from 'axios';

export async function sendPush(messages) {
  const url = process.env.NEXT_PUBLIC_BPUSH_API ?? '';
  const api = process.env.NEXT_PUBLIC_BPUSH_API_PUSH ?? '';

  try {
    axios
      .post(url + api, messages)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err: any) {
    console.log(`error: ${err}`);
  }
}

export async function sendPushForCompany(
  messages: object,
  companyCode: string,
) {
  const url = process.env.NEXT_PUBLIC_BPUSH_API ?? '';
  const api = process.env.NEXT_PUBLIC_BPUSH_API_PUSH_FOR_COMPANY ?? '';

  console.log('112312123' + companyCode, api);

  // try {
  //   axios
  //     .post(url + api + '/' + companyCode, messages)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // } catch (err: any) {
  //   console.log(`error: ${err}`);
  // }
}

export async function sendPushForUsers(messages) {
  const url = process.env.NEXT_PUBLIC_BPUSH_API ?? '';
  const api = process.env.NEXT_PUBLIC_BPUSH_API_PUSH_FOR_USERS ?? '';

  try {
    axios
      .post(url + api, messages)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err: any) {
    console.log(`error: ${err}`);
  }
}
