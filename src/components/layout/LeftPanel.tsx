import illustration from "../../assets/Artboard11.svg";

export function LeftPanel() {
  return (
    <aside className="relative hidden min-h-screen w-full max-w-[520px] shrink-0 flex-col justify-between bg-[#132C4A] px-10 py-12 text-white lg:flex lg:w-[42%]">
      <div>
        <p className="text-sm font-medium text-white/75">Let&apos;s get started</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
          Create your account
        </h1>
      </div>
      <img
        src={illustration}
        alt=""
        className="mx-auto mt-10 w-full max-w-md object-contain"
        aria-hidden
      />
    </aside>
  );
}
