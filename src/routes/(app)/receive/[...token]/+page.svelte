<script>
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { enhance } from "$app/forms";
  import { tick } from "svelte";
  import { browser } from "$app/environment";
  import { t } from "$lib/translations";
  import Avatar from "$comp/Avatar.svelte";
  import Icon from "$comp/Icon.svelte";
  import Spinner from "$comp/Spinner.svelte";
  import { back, fail, focus } from "$lib/utils";

  export let data;
  export let form;

  let { token } = data;
  data.subject = data.user;

  let el, text, pasted, w;

  let keypress = (e) => e.key === "Enter" && (e.preventDefault() || el.click());

  let paste = async () => {
    text = await navigator.clipboard.readText();
  };

  $: if (browser && pasted && text) el.click() && (pasted = false);
</script>

<svelte:window bind:innerWidth={w} />

<div class="container px-4 max-w-lg mx-auto space-y-5 mt-20">
  <h1 class="px-3 md:px-0 text-center text-3xl md:text-4xl font-semibold">
    {$t("user.dashboard.receive")}
  </h1>

  <form method="POST" use:enhance class="space-y-2 text-xl">
    {#if form?.error}
      <div class="mb-5">
        <div class="text-red-600">
          {form.error === "default"
            ? $t("error.unrecognizedInput")
            : form.error}
        </div>
      </div>
    {/if}

    <div class="mb-2">
      <textarea
        use:focus
        name="text"
        placeholder={$t("payments.voucherText")}
        on:keypress={keypress}
        class="w-full p-4 border rounded-xl h-32 text-xl"
        bind:value={text}
        on:paste={() => (pasted = true)}
        autocapitalize="none"
      />
    </div>

    <div class="flex gap-2">
      <a href="/scan" class="w-full">
        <button
          type="button"
          class="flex border rounded-2xl px-5 py-4 hover:opacity-80 w-full justify-center gap-1"
        >
          <Icon icon="camera" style="w-8 my-auto" />
          <div class="my-auto">{$t("user.send.scan")}</div>
        </button>
      </a>

      <button
        type="button"
        class="flex border rounded-2xl px-5 py-4 hover:opacity-80 w-full justify-center gap-1"
        on:click={paste}
      >
        <Icon icon="paste" style="w-8 my-auto" />
        <div class="my-auto">{$t("user.send.paste")}</div>
      </button>
    </div>

    <button
      bind:this={el}
      type="submit"
      class="bg-black text-white border rounded-2xl px-6 py-5 w-full font-bold"
    >
      {$t("user.send.next")}
    </button>
  </form>
</div>
