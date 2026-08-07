import { FaArrowDown } from "react-icons/fa6";

const CTA = ({ content }: { content: string }) => {
  return (
    <a href="" className=" text-[#102233] px-10 py-5 text-lg mt-10 font-bold rounded-lg flex items-center gap-5 w-fit CTA-hero max-xl:px-5 max-xl:py-3 max-xl:text-base max-lg:text-small max-md:text-xs">
      {content}
      <FaArrowDown />
    </a>
  )
}

export default CTA