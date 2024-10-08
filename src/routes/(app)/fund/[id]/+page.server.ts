import { redirect } from "@sveltejs/kit";
import { auth, get, post } from "$lib/utils";
import Qr from "qrcode-base64";

export let load = async ({ params: { id }, url }) => {
  let { amount, payments } = await get(`/fund/${id}`);

  let src = Qr.drawImg(url.href, { size: 300 });
  return { amount, payments, src };
};

export const actions = {
  default: async ({ cookies, locals, params }) => {
    let { user } = locals;

    if (user) {
      await post("/redeem", params, auth(cookies));
      redirect(307, `/payments`);
    }

    redirect(307, "/register");
  },
};
