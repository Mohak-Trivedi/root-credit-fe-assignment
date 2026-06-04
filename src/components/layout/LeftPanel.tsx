import illustration from "../../assets/Artboard11.svg";

export function LeftPanel() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between pt-[81px] pr-[calc(49.2%+3rem)] pb-12 pl-14">
      <div>
        <p className="text-[24px] font-light text-[#132C4A]">
          Let&apos;s get started
        </p>
        <h1 className="mt-3 text-[54px] font-bold leading-tight tracking-tight text-[#132C4A]">
          Create your account
        </h1>
        <p className="mt-3 text-[16px] text-[#132C4A]">
          Follow the steps to create your account
        </p>
      </div>
      <img
        src={illustration}
        alt=""
        className="w-full h-auto object-contain"
        aria-hidden
      />
    </div>
  );
}
