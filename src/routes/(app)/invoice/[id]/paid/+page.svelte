<script>
  import { scale } from "svelte/transition";
  import Icon from "$comp/Icon.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { browser } from "$app/environment";
  import { t } from "$lib/translations";
  import { fiat, f, s, sat, sats } from "$lib/utils";

  export let data;
  let amount, currency, rate, received, pending, tip, user, id;
  $: update(data);
  let update = (data) => {
    ({ amount, currency, rate, received, pending, tip, user, id } =
      data.invoice);
  };

  toast.pop(0);
</script>

<div class="container px-4 text-center mx-auto">
  {#if received}
    <div
      class="flex w-full py-5 max-w-[200px] mx-auto"
      in:scale={{ start: 0.5 }}
    >
      <Icon icon="check" style="mx-auto" />
    </div>

    <h1 class="text-3xl md:text-4xl font-bold mb-6">
      {$t("invoice.paymentSuccessful")}
    </h1>

    <h2 class="text-2xl md:text-3xl font-semibold">
      {f(fiat(received - tip, rate), currency)}
      {#if tip}
        <span class="text-lg">
          + {f(fiat(tip, rate), currency)}
        </span>
      {/if}
    </h2>
    <h3 class="text-secondary md:text-lg mb-6 mt-1">
      ⚡️{s(received - tip)}

      {#if tip}
        <span class="text-lg">
          + ⚡️{s(tip)}
        </span>
      {/if}
    </h3>
  {/if}

  {#if pending}
    <div
      class="flex w-full py-5 max-w-[200px] mx-auto"
      in:scale={{ start: 0.5 }}
    >
      <Icon icon="orangeclock" style="mx-auto" />
    </div>

    <h1 class="text-3xl md:text-4xl font-bold mb-6">Payment detected</h1>
    <h2 class="text-2xl md:text-3xl font-semibold">
      {f(fiat(pending - tip, rate), currency)}
      {#if tip}
        + {f(fiat(tip, rate), currency)}
      {/if}
    </h2>

    <h3 class="text-secondary md:text-lg mb-6 mt-1">
      ⚡️{s(pending - tip)}
      {#if tip}
        <span class="text-lg">
          + ⚡️{s(tip)}
        </span>
      {/if}
    </h3>
  {/if}
</div>

<a href={`/${user.username}`}>
  <div class="opacity-0 w-screen h-screen fixed top-0 left-0 z-50" />
</a>

<div class="fixed bottom-10 w-full text-center">
  {$t("payments.tapAnywhere")}
</div>
